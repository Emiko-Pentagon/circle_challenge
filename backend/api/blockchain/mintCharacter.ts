/**
 * @file mintCharacter.ts
 * @description NFT Minting Service for EtherFantasy
 * 
 * This module handles the minting of character NFTs on Pentagon Chain.
 * It uses a "moderator" wallet to sign and submit mint transactions on behalf of users.
 * 
 * FLOW:
 * 1. User completes payment (verified separately in verifyPayment.ts)
 * 2. Backend calls mintCharacter() with user's wallet + character data
 * 3. MODERATOR_PRIVATE_KEY signs the mint transaction
 * 4. CHARACTER_CONTRACT.mintPredefined() is called on-chain
 * 5. NFT is minted directly to user's wallet
 * 6. tokenId is parsed from Transfer event and returned
 * 
 * SECURITY NOTE:
 * - MODERATOR_PRIVATE_KEY must NEVER be exposed or committed
 * - This wallet pays gas fees for minting
 * - Monitor this wallet for unexpected transactions
 * 
 * @network Pentagon Chain (3344)
 * @contract 0x8F83c6122Dd4d275B53a7846B3D3dB29Cca1e698
 */

import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

// Environment variable validation
// These are required for the minting service to function
if (!process.env.PENTAGON_RPC) throw new Error("PENTAGON_RPC missing");
if (!process.env.CHARACTER_CONTRACT) throw new Error("CHARACTER_CONTRACT missing");
if (!process.env.MODERATOR_PRIVATE_KEY) throw new Error("MODERATOR_PRIVATE_KEY missing");

// Initialize ethers provider for Pentagon Chain RPC
const provider = new ethers.JsonRpcProvider(process.env.PENTAGON_RPC);

// Create signer wallet from moderator private key
// This wallet has permission to call mintPredefined() on the contract
const signer = new ethers.Wallet(
  process.env.MODERATOR_PRIVATE_KEY,
  provider
);

// Minimal ABI for the CHARACTER_CONTRACT
// Only includes the functions/events we need
const ABI = [
  // mintPredefined: Mints a character NFT with predefined stats
  // @param to - Recipient wallet address
  // @param characterId - Base character type ID
  // @param items - Array of equipment IDs [weapon, helmet, armor, guard]
  // @param stats - Array of stats [atk, def, hp, perfection]
  // @returns tokenId of the minted NFT
  "function mintPredefined(address to, uint256 characterId, uint256[] items, uint16[] stats) returns (uint256)",
  
  // Transfer event: Emitted when an NFT is transferred
  // We listen for this to confirm the mint and get the tokenId
  // from=0x0 indicates a mint (new token created)
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Initialize contract instance with signer
const contract = new ethers.Contract(
  process.env.CHARACTER_CONTRACT,
  ABI,
  signer
);

/**
 * Mints a character NFT to a user's wallet
 * 
 * @param to - Recipient wallet address (the user who will own the NFT)
 * @param characterId - Base character type (determines appearance/class)
 * @param items - Equipment IDs array [weapon, helmet, armor, guard]
 * @param stats - Character stats array [atk, def, hp, perfection]
 * @returns The minted tokenId as a string
 * @throws Error if transaction fails or tokenId cannot be parsed
 * 
 * @example
 * const tokenId = await mintCharacter(
 *   "0xUserWallet...",
 *   1,                    // Character type 1
 *   [101, 201, 301, 401], // Equipment IDs
 *   [50, 30, 100, 85]     // ATK=50, DEF=30, HP=100, Perfection=85
 * );
 */
export async function mintCharacter(
  to: string,
  characterId: number,
  items: number[],
  stats: number[]
): Promise<string> {

  // Log mint request (useful for debugging, but be careful not to log sensitive data)
  console.log("mintPredefined called");
  console.log("to:", to);
  console.log("characterId:", characterId);
  console.log("items:", items);
  console.log("stats:", stats);

  // Submit the mint transaction to Pentagon Chain
  // The signer (moderator wallet) pays gas fees
  const tx = await contract.mintPredefined(
    to,
    characterId,
    items,
    stats
  );

  console.log("⏳ Mint TX:", tx.hash);

  // Wait for transaction to be mined
  const receipt = await tx.wait();

  // Verify transaction succeeded
  if (!receipt || receipt.status !== 1) {
    throw new Error("Mint transaction failed");
  }

  // Parse the Transfer event to find the minted tokenId
  // We look for Transfer(from=0x0, to=user) which indicates a mint
  const iface = contract.interface;
  const ZERO = ethers.ZeroAddress.toLowerCase();  // 0x0000...0000
  const TO = to.toLowerCase();

  let foundTokenId: string | null = null;

  // Iterate through all logs in the receipt
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      // Check if this is a Transfer event from 0x0 to our user
      // from=0x0 means this is a mint (new token created)
      if (
        parsed?.name === "Transfer" &&
        parsed.args.from.toLowerCase() === ZERO &&
        parsed.args.to.toLowerCase() === TO
      ) {
        foundTokenId = parsed.args.tokenId.toString();
        break;
      }
    } catch {
      // Log didn't match our ABI, skip it
      continue;
    }
  }

  if (!foundTokenId) {
    throw new Error("Minted tokenId not found in Transfer event");
  }

  console.log("✅ Minted contractTokenId:", foundTokenId);

  return foundTokenId;
}

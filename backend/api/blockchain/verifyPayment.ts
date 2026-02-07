/**
 * @file verifyPayment.ts
 * @description Payment Verification Service for EtherFantasy
 * 
 * This module verifies that a user has successfully completed a USDC payment
 * before allowing the backend to mint their character NFT.
 * 
 * FLOW:
 * 1. User sends USDC to PAYMENT_CONTRACT
 * 2. Contract emits PaymentReceived(skuId, buyer, minted) event
 * 3. Frontend sends txHash to backend
 * 4. This function verifies the transaction and event
 * 5. If valid, backend proceeds to mint the NFT
 * 
 * WHY VERIFY?
 * - Prevents minting without payment
 * - Ensures the correct buyer is credited
 * - Validates transaction was successful (status=1)
 * 
 * @network Pentagon Chain (3344)
 * @contract 0x3930B34a524170Cc8966859Da167DB7B5413A0ba
 */

import dotenv from "dotenv";
dotenv.config(); 
import { ethers } from "ethers";
import { provider } from "./provider";

// Minimal ABI for PAYMENT_CONTRACT
// Only includes the PaymentReceived event we need to verify
const PAYMENT_ABI = [
  /**
   * PaymentReceived Event
   * Emitted when a user successfully pays for a product
   * 
   * @param skuId - Product identifier (9 = character mint)
   * @param buyer - Wallet address that made the payment
   * @param minted - Whether the item was auto-minted (usually false, we mint manually)
   */
  "event PaymentReceived(uint256 indexed skuId, address indexed buyer, bool indexed minted)"
];

// Initialize contract instance for reading events
const paymentContract = new ethers.Contract(
  process.env.PAYMENT_CONTRACT!,
  PAYMENT_ABI,
  provider
);

/**
 * Verifies a payment transaction on-chain
 * 
 * Checks that:
 * 1. Transaction was confirmed (status=1)
 * 2. PaymentReceived event was emitted
 * 3. Event matches expected skuId and buyer address
 * 
 * @param txHash - The transaction hash to verify
 * @param buyer - Expected buyer wallet address
 * @param skuId - Expected product SKU (default: 9 for character mint)
 * @returns true if payment is valid
 * @throws Error if transaction not confirmed or event not found
 * 
 * @example
 * try {
 *   await verifyPayment(
 *     "0xabc123...",           // Transaction hash from user
 *     "0xUserWallet...",       // User's wallet address
 *     9                        // SKU for character mint
 *   );
 *   // Payment verified, proceed to mint
 * } catch (error) {
 *   // Payment invalid, reject mint request
 * }
 */
export async function verifyPayment(
  txHash: string,
  buyer: string,
  skuId = 9  // Default SKU for character minting
) {
  // Fetch transaction receipt from chain
  const receipt = await provider.getTransactionReceipt(txHash);
  
  // Check transaction was confirmed and successful
  if (!receipt || receipt.status !== 1) {
    throw new Error("Payment transaction not confirmed");
  }

  // Parse logs to find PaymentReceived event
  const iface = paymentContract.interface;

  // Find the PaymentReceived event that matches our criteria
  const evt = receipt.logs
    .map((log) => {
      try {
        return iface.parseLog(log);
      } catch {
        // Log didn't match our ABI, return null
        return null;
      }
    })
    .find(
      (e) =>
        // Must be a PaymentReceived event
        e?.name === "PaymentReceived" &&
        // SKU must match (9 = character mint)
        Number(e.args?.skuId) === skuId &&
        // Buyer address must match (case-insensitive)
        e.args?.buyer.toLowerCase() === buyer.toLowerCase()
    );

  // If no matching event found, payment is invalid
  if (!evt) {
    throw new Error("Valid PaymentReceived event not found");
  }

  // Payment verified successfully
  return true;
}

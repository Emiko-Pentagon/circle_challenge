# Browser Mint Guide - EtherFantasy USDC Purchase

This guide documents how to mint EtherFantasy NFTs using USDC via browser wallet.

## Prerequisites

- **ETH on Ethereum mainnet** (~$0.05 for gas fees)
- **USDC on Ethereum mainnet** ($1 per mint)
- **Rabby Wallet** (recommended) or MetaMask

---

## Step 1: Install Rabby Wallet

We recommend **Rabby** over MetaMask for agents — simpler setup, no seed phrase quiz.

### Install
1. Go to [rabby.io](https://rabby.io) or Chrome Web Store
2. Click "Add to Chrome"
3. Pin the extension for easy access

### Import or Create Wallet
**Option A: Import existing key**
1. Click "I already have an address"
2. Select "Import Private Key"
3. Paste your private key
4. Set a password

**Option B: Create new wallet**
1. Click "Create new address"
2. Choose "Create from Seed Phrase" or "Create via Private Key"
3. Back up your credentials securely

---

## Step 2: Fund Your Wallet

You need:
- **~0.01 ETH** for gas (approval + mint transactions)
- **$1+ USDC** for mint

### Check Balances in Rabby
- Open Rabby extension
- View total balance on dashboard
- Click token icons to see breakdown by chain

---

## Step 3: Connect to EtherFantasy

1. Navigate to **[etherfantasy.com/pentagon](https://etherfantasy.com/pentagon)**
2. Click **"Connect Wallet"** or the wallet button in navbar
3. Select **Rabby** when prompted
4. Approve the connection in Rabby popup

You should see your address displayed (e.g., `0xE52d...9eB8`)

---

## Step 4: Mint with USDC

1. Click the **"Mint"** button
2. Select chain: **Ethereum ETH**
3. Select payment: **USDC $1**
4. Click **"Mint"** to start transaction

### Transaction Flow

**Transaction 1: USDC Approval**
- Rabby popup appears requesting token approval
- Review: Approving 1.0000 USDC to mint contract
- Gas: ~$0.02
- Click **"Sign"** then **"Confirm"**

**Transaction 2: Purchase**
- Second Rabby popup for `purchaseWithToken`
- Review: -1.0000 USDC payment
- Gas: ~$0.02
- Click **"Sign"** then **"Confirm"**

### Wait for Confirmation

After both transactions confirm:
- Site shows: **"✓ Payment Submitted"**
- Message: "Your NFT will be minted shortly"
- Wait ~2-5 minutes for cross-chain relay

---

## Step 5: View Your NFT

1. **Reload the page** after a few minutes
2. Scroll to **"Your Minted Characters"** section
3. Your new character appears with:
   - Character image
   - Name and ID (e.g., "LEAH #201000299000000")
   - **"View Tx ↗"** link to Pentagon Chain explorer

---

## Contract Details

| Item | Address |
|------|---------|
| Payment Processor | `0xe6bde156369d209c4d420e966541ee17093705b5` |
| USDC (Ethereum) | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |
| NFT Contract | `0x8F83c6122Dd4d275B53a7846B3D3dB29Cca1e698` |
| Chain | Pentagon Chain (ID: 3344) |

**Function:** `purchaseWithToken(uint256 skuId, address tokenAddress)`
- `skuId`: 9 (EtherFantasy Pentagon mint)
- `tokenAddress`: USDC contract address

---

## Troubleshooting

### "Insufficient funds for gas"
- You need ETH on Ethereum mainnet, not just USDC
- Add ~0.01 ETH to cover gas fees

### Transaction stuck on "Processing..."
- Check Rabby for pending signature requests
- May need to approve both approval and purchase transactions

### NFT not showing after payment
- Wait 2-5 minutes for cross-chain relay
- Refresh the page
- Check Pentagon Chain explorer for your address

### Rabby not connecting
- Make sure you're on Ethereum mainnet
- Try disconnecting and reconnecting
- Clear browser cache if needed

---

## Why USDC on Ethereum?

EtherFantasy uses **cross-chain USDC payments**:
- Pay with USDC on **any supported chain** (Ethereum, Base, Polygon, etc.)
- NFT mints on **Pentagon Chain** automatically
- No bridging required — the system handles it

This is powered by Circle's cross-chain infrastructure, enabling seamless Web3 commerce.

---

*Last updated: 2026-02-07*
*Tested by: Cerise01 🍒 (AI Agent)*

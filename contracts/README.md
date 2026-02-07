# Smart Contracts

## Overview

EtherFantasy uses a two-contract architecture to enable cross-chain USDC payments:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USDC PAYMENT FLOW                                │
│                                                                      │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐ │
│  │ USDCPayment      │     │    Backend       │     │ EtherFantasy │ │
│  │ Processor        │ ──▶ │    (Oracle)      │ ──▶ │ Character    │ │
│  │ (Ethereum/Base)  │     │                  │     │ (Pentagon)   │ │
│  └──────────────────┘     └──────────────────┘     └──────────────┘ │
│        User pays               Monitors              Mints NFT      │
│        USDC here             events here            to user         │
└─────────────────────────────────────────────────────────────────────┘
```

## Contracts

### EtherFantasyCharacter.sol

**Chain:** Pentagon Chain (ID: 3344)  
**Address:** `0xdEca6be9e148504Fa3f3C2AbE61626F98B009ae5`

ERC-721 NFT contract with:
- On-chain stats (ATK, DEF, HP, Level)
- Equipment slots (Weapon, Armor, Accessory)
- Role-based access (Admin, Minter, Moderator)
- Two mint functions:
  - `purchaseWithNative()` — Direct PC payment
  - `mintPredefined()` — Backend-triggered after USDC payment

### USDCPaymentProcessor.sol

**Chains:** Ethereum (live), Base/Polygon (planned)

Handles USDC payments with:
- Payment recording with unique IDs
- Event emission for backend monitoring
- Payment verification and processing
- Double-spend protection

## Deployment Addresses

| Contract | Chain | Address |
|----------|-------|---------|
| EtherFantasyCharacter | Pentagon (3344) | `0xdEca6be9e148504Fa3f3C2AbE61626F98B009ae5` |
| USDCPaymentProcessor | Ethereum (1) | `0x3930B34a524170Cc8966859Da167DB7B5413A0ba` |
| USDC | Ethereum (1) | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |
| USDC | Base (8453) | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| USDC | Polygon (137) | `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` |

## Cross-Chain Pattern

The key innovation is decoupling payment from minting:

1. **User pays USDC** on their preferred chain (ETH, Base, Polygon)
2. **Backend monitors** `PaymentReceived` events
3. **Backend verifies** payment amount and user address
4. **Backend calls** `mintPredefined()` on Pentagon Chain with moderator key
5. **User receives NFT** on Pentagon Chain without bridging

**To add a new chain:**
1. Deploy `USDCPaymentProcessor` with that chain's USDC address
2. Add backend cron job to monitor the new contract
3. Done — users can now pay from that chain

## Security Considerations

- **Moderator key** must be secured (used for minting after payment)
- **Event monitoring** should have confirmation depth (12+ blocks for ETH)
- **Payment processor** uses ReentrancyGuard
- **Role-based access** prevents unauthorized minting

## Development

```bash
# Install dependencies
npm install @openzeppelin/contracts

# Compile
npx hardhat compile

# Test
npx hardhat test

# Deploy
npx hardhat run scripts/deploy.js --network pentagon
```

## License

MIT

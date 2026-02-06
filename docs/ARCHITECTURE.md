# EtherFantasy Architecture

> Technical deep-dive for developers and AI agents

---

## USDC-First Design Philosophy

EtherFantasy is built around **USDC** (Circle's stablecoin) as the primary payment method:

- **Why USDC?** — Stable value, widely held, Circle-backed infrastructure
- **Cross-chain payments** — Pay with USDC from Ethereum/Polygon, mint on Pentagon Chain
- **Bridge support** — USDC can be bridged via [bridge.pentagon.games](https://bridge.pentagon.games)
- **Low barrier** — Just 1 USDC to mint a character

### Pentagon Chain = Polygon CDK

Pentagon Chain (ID: 3344) is built on **Polygon CDK**, which means:
- ZK-rollup security anchored to Ethereum
- Fast finality (~2 seconds)
- Low gas fees (fractions of a cent)
- Native bridge infrastructure for USDC and other assets

---

## System Overview

EtherFantasy is a **web3 NFT gaming platform** with three main components:

1. **Frontend** — React SPA for user interaction
2. **Backend** — Node.js API for business logic & blockchain orchestration  
3. **Smart Contracts** — On-chain NFT minting and payment handling

---

## Frontend Architecture

### Tech Stack
- **React 19** — UI framework
- **Vite 7** — Build tool & dev server
- **TailwindCSS 4** — Styling
- **wagmi 2.x** — React hooks for Ethereum
- **Web3Modal** — Wallet connection UI

### Key Files

```
frontend/src/
├── main.jsx          # App entry point
├── App.jsx           # React Router setup
├── wagmiConfig.jsx   # Web3 configuration (chains, connectors)
├── index.jsx         # Root render
└── pages/
    ├── Layout.jsx    # Common layout wrapper
    ├── Home.jsx      # Landing page
    ├── Pentagon.jsx  # Pentagon Chain info
    ├── Docs.jsx      # Documentation page
    └── ...
```

### Wallet Connection Flow

```javascript
// wagmiConfig.jsx configures:
// 1. Supported chains (Ethereum, Polygon, Pentagon, Monad)
// 2. Connectors (injected wallets, WalletConnect)
// 3. Web3Modal theming

// Chain definitions include:
pentagon = {
  id: 3344,
  name: "Pentagon Chain",
  rpcUrls: { default: { http: ["https://rpc.pentagon.games"] } },
  blockExplorers: { default: { url: "https://explorer.pentagon.games" } }
}
```

---

## Backend Architecture

### Tech Stack
- **Node.js** — Runtime
- **Express** — HTTP framework
- **TypeScript** — Type safety
- **Sequelize** — MySQL ORM
- **ethers.js v6** — Blockchain interactions
- **JWT** — Authentication

### Directory Structure

```
backend/api/
├── blockchain/           # Smart contract interactions
│   ├── mintCharacter.ts  # NFT minting function
│   ├── verifyPayment.ts  # Payment verification
│   └── provider.ts       # ethers provider setup
│
├── config/               # Configuration
│   ├── sequelize.ts      # Database connection
│   ├── expressSetup.ts   # Express middleware
│   └── index.ts          # Config exports
│
├── controllers/          # HTTP route handlers
│   ├── auth.controller.ts
│   ├── character.controller.ts
│   ├── user.controller.ts
│   └── displayCharacter.controller.ts
│
├── dto/                  # Data Transfer Objects
│   ├── auth/
│   ├── character/
│   ├── user/
│   └── profile/
│
├── entity/               # Sequelize models (database schemas)
│   ├── Users.ts          # User accounts
│   ├── Characters.ts     # Minted character data
│   ├── Mint.ts           # Mint transaction records
│   ├── ArmorItems.ts     # Equipment definitions
│   └── AuthVerification.ts
│
├── interface/            # TypeScript interfaces
│   ├── IUserRequest.ts
│   ├── JWTPayload.ts
│   └── ...
│
├── libs/                 # Utility libraries
├── middlewares/          # Express middleware (auth, validation)
├── routes/               # API route definitions
├── services/             # Business logic layer
│   ├── auth-service/
│   ├── character-service/
│   └── profile-service/
│
└── utils/                # Helper functions
```

### Minting Pipeline

```typescript
// 1. Verify payment transaction
// backend/api/blockchain/verifyPayment.ts
async function verifyPayment(txHash, buyer, skuId = 9) {
  // - Fetch transaction receipt
  // - Parse PaymentReceived event
  // - Confirm buyer address matches
  // - Return true if valid
}

// 2. Mint NFT to user
// backend/api/blockchain/mintCharacter.ts  
async function mintCharacter(to, characterId, items, stats) {
  // - Call CHARACTER_CONTRACT.mintPredefined()
  // - Wait for transaction confirmation
  // - Parse Transfer event to get tokenId
  // - Return minted tokenId
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,  -- email
  password VARCHAR(255),                   -- hashed, nullable for OAuth
  address VARCHAR(255) NOT NULL UNIQUE,   -- wallet address
  isActive BOOLEAN DEFAULT false,
  google VARCHAR(255),                     -- Google OAuth ID
  typeOfUser ENUM('owner') NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  tokenKind ENUM('google', 'efc'),
  lastLogin VARCHAR(255),
  profilePic VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Characters Table
```sql
CREATE TABLE characters (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  characterId INT NOT NULL,              -- base character type
  tokenId VARCHAR(255) NOT NULL UNIQUE,  -- NFT token ID
  owner VARCHAR(255),                    -- wallet address
  weapon INT NOT NULL,                   -- equipment slot 1
  helmet INT NOT NULL,                   -- equipment slot 2
  armor INT NOT NULL,                    -- equipment slot 3
  guard INT NOT NULL,                    -- equipment slot 4
  perfection INT NOT NULL,               -- quality score
  atk INT NOT NULL,                      -- attack stat
  def INT NOT NULL,                      -- defense stat
  hp INT NOT NULL,                       -- health points
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Mints Table
```sql
CREATE TABLE mints (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tokenId VARCHAR(255) NOT NULL,         -- internal token ID
  contractTokenId VARCHAR(255),          -- on-chain token ID
  characterId INT NOT NULL,
  owner VARCHAR(255) NOT NULL,           -- wallet address
  source VARCHAR(255) DEFAULT 'backend', -- mint source
  txHash VARCHAR(255),                   -- blockchain tx hash
  metadata JSON,                         -- additional data
  createdAt DATETIME
);
```

---

## Smart Contract Integration

### CHARACTER_CONTRACT
- **Address:** `0x8F83c6122Dd4d275B53a7846B3D3dB29Cca1e698`
- **Network:** Pentagon Chain (3344)
- **Standard:** ERC-721

**Key Function:**
```solidity
function mintPredefined(
  address to,           // recipient wallet
  uint256 characterId,  // base character type
  uint256[] items,      // equipment IDs [weapon, helmet, armor, guard]
  uint16[] stats        // character stats [atk, def, hp, perfection]
) returns (uint256)     // minted tokenId
```

### PAYMENT_CONTRACT
- **Address:** `0x3930B34a524170Cc8966859Da167DB7B5413A0ba`
- **Network:** Pentagon Chain (3344)

**Key Event:**
```solidity
event PaymentReceived(
  uint256 indexed skuId,   // product SKU (9 = character mint)
  address indexed buyer,   // payer wallet
  bool indexed minted      // mint status flag
)
```

---

## Authentication Flow

1. **Wallet Signature** — User signs message with wallet
2. **Backend Verification** — Verify signature matches address
3. **JWT Issued** — Return access + refresh tokens
4. **Protected Routes** — Bearer token required for API calls

---

## API Endpoints (Summary)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Wallet-based login |
| GET | `/characters` | List all characters |
| GET | `/characters?token=X` | Get character by tokenId |
| GET | `/characters/minted?owner=X` | Get user's minted characters |
| GET | `/characters/total` | Get total minted count |
| POST | `/characters` | Create character record |
| PUT | `/characters` | Update character |

---

## Environment Configuration

### Required Environment Variables

```env
# Server
MODE=development|production
PORT=3020

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=etherfantasy
DB_USER=<username>
DB_PASSWORD=<password>

# Authentication
JWT_SECRET=<random-string>
JWT_LIFE=1d
REFRESH_JWT_SECRET=<random-string>
REFRESH_JWT_LIFE=7d

# URLs
LANDING_URL=http://localhost:3020
OWNER_URL=http://localhost:3020
SERVER_URL=http://localhost:3020

# Blockchain
PENTAGON_RPC=https://rpc.pentagon.games
PAYMENT_CONTRACT=0x3930B34a524170Cc8966859Da167DB7B5413A0ba
CHARACTER_CONTRACT=0x8F83c6122Dd4d275B53a7846B3D3dB29Cca1e698
MODERATOR_PRIVATE_KEY=<wallet-private-key>  # ⚠️ CRITICAL - NEVER COMMIT
```

---

## Security Considerations

### ⚠️ Critical Secrets
- `MODERATOR_PRIVATE_KEY` — Wallet that signs mint transactions. NEVER expose.
- `JWT_SECRET` / `REFRESH_JWT_SECRET` — Token signing keys.
- `DB_PASSWORD` — Database credentials.

### Best Practices
1. Use `.env` files (not committed)
2. Rotate keys periodically
3. Use separate wallets for dev/staging/production
4. Monitor moderator wallet for unexpected transactions

---

## For AI Agents

When working with this codebase:

1. **Backend changes** — Test locally before deploying, especially blockchain functions
2. **Database migrations** — Sequelize auto-syncs in dev; use migrations in prod
3. **Contract interactions** — All blockchain calls go through `/api/blockchain/`
4. **Secrets** — Never log or expose private keys, even in error messages
5. **Minting** — The `mintCharacter()` function uses real gas; test carefully

### 🤖 Agent Onboarding

**Want to test EtherFantasy?** Two paths:

#### Path 1: Pay with USDC (1 USDC)
- Connect wallet with USDC balance
- Approve + pay via the payment contract
- Character NFT mints to your wallet

#### Path 2: Free PC Tokens (Social)
- Follow [@nftprof](https://x.com/nftprof) on X
- Post about EtherFantasy from your agent's social
- DM or mention your wallet address
- Receive free PC gas tokens for testing

**Why we support agents:** AI agents are the future of web3 interaction. We want to be agent-friendly from day one.

---

## USDC Payment Flow (Detailed)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USER/AGENT WALLET                                │
│  Has USDC on Ethereum, Polygon, or Pentagon Chain                   │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          │ 1. Approve USDC spend
                          │ 2. Call payment function
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   PAYMENT_CONTRACT                                   │
│  Address: 0x3930B34a524170Cc8966859Da167DB7B5413A0ba                │
│  - Receives USDC payment                                            │
│  - Emits PaymentReceived(skuId=9, buyer, minted=false)             │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          │ 3. Frontend sends txHash to backend
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND API                                     │
│  - verifyPayment(txHash, buyer) checks on-chain                     │
│  - Confirms PaymentReceived event exists                            │
│  - If valid, proceeds to mint                                       │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          │ 4. Call mintCharacter()
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 CHARACTER_CONTRACT                                   │
│  Address: 0x8F83c6122Dd4d275B53a7846B3D3dB29Cca1e698                │
│  - mintPredefined(to, characterId, items, stats)                    │
│  - NFT minted directly to user's wallet                             │
│  - Emits Transfer(0x0, user, tokenId)                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Cross-Chain USDC (How It Works)

For users paying with USDC from **Ethereum** or **Polygon**:

1. User can either:
   - **Bridge first** via [bridge.pentagon.games](https://bridge.pentagon.games) (USDC supported)
   - **Pay cross-chain** (future: CCTP integration planned)

2. Payment is verified on the source chain
3. Mint occurs on Pentagon Chain
4. User receives NFT on Pentagon Chain

---

*Last updated: 2026-02-05 by Cerise01*

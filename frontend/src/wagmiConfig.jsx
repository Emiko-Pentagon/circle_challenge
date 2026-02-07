/**
 * @file wagmiConfig.jsx
 * @description Web3 configuration for EtherFantasy
 * 
 * Configures supported chains, wallets, and Web3Modal.
 * 
 * SUPPORTED CHAINS:
 * - Ethereum Mainnet (1) — USDC payments
 * - Polygon (137) — USDC payments
 * - Pentagon Chain (3344) — Primary game chain (Polygon CDK)
 * - Base (8453) — Future realm expansion (Circle/Coinbase ecosystem)
 * 
 * USDC INTEGRATION:
 * Users can pay with USDC on Ethereum/Polygon, and receive NFTs on Pentagon Chain.
 * Base support planned for Male character collection.
 * 
 * @see https://bridge.pentagon.games for USDC bridging
 */

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { http, createConfig } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { mainnet, polygon } from "wagmi/chains";

/**
 * Pentagon Chain Configuration
 * 
 * Pentagon Chain is built on Polygon CDK, providing:
 * - Fast finality (~2 seconds)
 * - Low gas fees
 * - USDC bridge support via bridge.pentagon.games
 * 
 * @network Pentagon Chain
 * @chainId 3344 (0xd10)
 */
export const pentagon = {
  id: 3344,
  name: "Pentagon Chain",
  nativeCurrency: { name: "PC", symbol: "PC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.pentagon.games"] },
    public: { http: ["https://rpc.pentagon.games"] },
  },
  blockExplorers: {
    default: {
      name: "Pentagon Explorer",
      url: "https://explorer.pentagon.games",
    },
  },
  testnet: false,
};

/**
 * Base Chain Configuration
 * 
 * Base is Coinbase's L2, part of the Circle/Coinbase ecosystem.
 * Planned for future EtherFantasy realm expansion (Male character collection).
 * 
 * @network Base
 * @chainId 8453 (0x2105)
 */
export const base = {
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] },
    public: { http: ["https://mainnet.base.org"] },
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
  },
  testnet: false,
};

/**
 * EIP-3085 Chain Parameters
 * Used for wallet_addEthereumChain requests
 */
export const EIP3085_BY_ID = {
  1: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://eth.llamarpc.com"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  137: {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  3344: {
    chainId: "0xd10",
    chainName: "Pentagon Chain",
    nativeCurrency: { name: "PC", symbol: "PC", decimals: 18 },
    rpcUrls: ["https://rpc.pentagon.games"],
    blockExplorerUrls: ["https://explorer.pentagon.games"],
  },
  8453: {
    chainId: "0x2105",
    chainName: "Base",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"],
  },
};

// WalletConnect Project ID (public, safe to commit)
const projectId = "8f70c9ef23cce4424b66bb84882ae517";

// App metadata for WalletConnect
const metadata = {
  name: "EtherFantasy",
  description: "EtherFantasy - A Multiverse of Auto-Dungeons | USDC-Powered NFT Gaming",
  url: "https://etherfantasy.com",
  icons: ["https://etherfantasy.com/logo1.png"],
};

// Supported chains array
const chains = [mainnet, polygon, pentagon, base];

/**
 * Wagmi Configuration
 * 
 * Configures:
 * - Supported chains (Ethereum, Polygon, Pentagon, Base)
 * - HTTP transports for each chain
 * - Wallet connectors (injected + WalletConnect)
 */
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [pentagon.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    injected(),                    // MetaMask, Rabby, etc.
    walletConnect({ projectId }), // WalletConnect v2
  ],
});

/**
 * Web3Modal Configuration
 * 
 * Creates the wallet connection modal with dark theme.
 * Disabled email/social logins to keep it crypto-native.
 */
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  walletFeatures: {
    email: false,
    socials: false,
    smartWallet: false,
  },
  explorer: {
    enabled: true
  }
});

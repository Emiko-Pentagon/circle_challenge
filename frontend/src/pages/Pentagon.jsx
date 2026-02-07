import React, { useEffect, useState } from "react";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import axios from "axios";
import { pentagon } from "../wagmiConfig";
import abi from "../abi/paymentProcessor.json";
import uniswapLogo from "../assets/uniswap.svg";
import PCFaucetLogo from "../assets/pcfaucet.svg";
import BridgePCLogo from "../assets/bridgepc.svg";

const CONTRACT = "0x3930B34a524170Cc8966859Da167DB7B5413A0ba";
const SKU_ID = 9;
const PRICE = "50000000000000000";
const API = `${import.meta.env.VITE_API_URL}/api/character`;

const Pentagon = () => {
  const { address, isConnected, chain } = useAccount();
  const { open } = useWeb3Modal();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const [nfts, setNfts] = useState([]);
  const [isMinting, setIsMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState(null);

  const isCorrectNetwork = isConnected && chain?.id === pentagon.id;

  const loadMintedNFTs = async () => {
    if (!address) return;
    try {
      const res = await axios.get(`${API}/minted?owner=${address}`);

      if (res.data?.data) {
        setNfts(res.data.data);
      } else {
        setNfts([]);
      }
    } catch (err) {
      console.error("Failed loading NFTs", err);
    }
  };

  const fetchTotalMinted = async () => {
    try {
      const res = await axios.get(`${API}/total`);
      setTotalMinted(res.data?.total ?? null);
    } catch {
      setTotalMinted(null);
    }
  };

  useEffect(() => {
    fetchTotalMinted();
  }, []);

  useEffect(() => {
    if (isConnected) loadMintedNFTs();
  }, [isConnected, address]);

  const callBackend = async (txHash) => {
    if (!address) return;

    try {
      await axios.put(API, { owner: address, txHash });

      localStorage.removeItem("pendingMintTx");

      await loadMintedNFTs();
      await fetchTotalMinted();
      setIsMinting(false);
    } catch {
      setTimeout(() => callBackend(txHash), 5000);
    }
  };

  useEffect(() => {
    const pendingTx = localStorage.getItem("pendingMintTx");
    if (pendingTx && address) {
      setIsMinting(true);
      callBackend(pendingTx);
    }
  }, [address]);

const handleMintNow = async () => {
  if (!isConnected) return open();
  if (!isCorrectNetwork)
    return switchChainAsync({ chainId: pentagon.id });

  setIsMinting(true);

  try {
    const hash = await writeContractAsync({
      address: CONTRACT,
      abi,
      functionName: "purchaseWithNative",
      args: [SKU_ID],
      value: PRICE,
    });

    // console.log("Saved TX:", hash);

    localStorage.setItem("pendingMintTx", hash);


    // console.log(
    //   "Stored:",
    //   localStorage.getItem("pendingMintTx")
    // );

    await callBackend(hash);
  } catch (err) {
    console.error(err);
    setIsMinting(false);
  }
};

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">
        Pentagon Realm Mint
      </h1>

      <p className="text-center text-gray-400 text-lg mb-10">
        Total Minted:{" "}
        <span className="text-white font-semibold">
          {totalMinted !== null ? totalMinted : "NA"}
        </span>
      </p>


      <div className="flex justify-center mb-6">
        {!isConnected ? (
          <button
            onClick={open}
            className="bg-blue-600 px-10 py-4 rounded-xl text-white font-bold"
          >
            Connect Wallet
          </button>
        ) : !isCorrectNetwork ? (
          <button
            onClick={() => switchChainAsync({ chainId: pentagon.id })}
            className="bg-yellow-600 px-10 py-4 rounded-xl text-white font-bold"
          >
            Switch to Pentagon
          </button>
        ) : (
          <button
            onClick={handleMintNow}
            disabled={isMinting}
            className="bg-green-600 px-12 py-4 rounded-xl text-white font-bold disabled:bg-gray-700"
          >
            {isMinting ? "Minting..." : "Mint Now (0.05 PC)"}
          </button>
        )}
      </div>


      <div className="mt-8 mb-8 mx-auto max-w-2xl bg-gray-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8">
        <h4 className="text-2xl font-semibold text-white mb-2">
          How to Mint
        </h4>

        <p className="text-gray-300 text-sm">
          You'll need the <span className="text-emerald-400 font-semibold">PC token</span> to mint.
        </p>

        <ul className="mt-6 space-y-4">
          <li className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={uniswapLogo} className="h-6 w-6" />
              <span>Acquire PC on Uniswap</span>
            </div>
            <a href="https://app.uniswap.org" target="_blank">Swap ↗</a>
          </li>

          <li className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={BridgePCLogo} className="h-6 w-6" />
              <span>Bridge PC → Pentagon</span>
            </div>
            <a href="https://bridge.pentagon.games/" target="_blank">Bridge ↗</a>
          </li>

          <li className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={PCFaucetLogo} className="h-6 w-6" />
              <span>Claim from Faucet</span>
            </div>
            <a href="https://faucet.pentagon.games/" target="_blank">Claim ↗</a>
          </li>
        </ul>
      </div>


      <h2 className="text-3xl font-bold text-center mb-6">
        Your Minted Characters
      </h2>

      {isConnected && nfts.length === 0 && (
        <p className="text-center text-gray-400">
          You haven't minted any characters yet.
        </p>
      )}

      {isConnected && nfts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className="bg-gray-900 p-4 rounded-xl border border-gray-800"
            >
              <img
                src={nft.imageUrl}
                alt={nft.tokenId}
                className="w-full rounded-lg border border-gray-700"
              />
              <p className="text-white mt-3 font-bold">
                LEAH #{nft.tokenId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pentagon;

import React from "react";
import { FaEnvelope, FaWallet, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

const CtaButton = ({ icon, title, subtitle, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-start gap-3 text-left p-4 rounded-lg border border-gray-700 
                hover:border-blue-500 hover:bg-gray-800/50 transition-all 
                w-[400px] min-h-[80px] cursor-pointer ${className}`}
  >
    {icon}
    <div className="ml-4">
      <div className="font-semibold text-white">{title}</div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
  </button>
);

const RealmButton = ({ to, label, position }) => (
  <Link
    to={to}
    className={`
      absolute flex items-center justify-center
      w-40 h-40 rounded-full text-white
      text-center font-semibold text-sm
      backdrop-blur-[1px] shadow-lg
      transition-all duration-300 ease-out
      hover:bg-white/10 hover:backdrop-blur-[3px]
      hover:scale-110 hover:shadow-amber-500/30 hover:shadow-2xl
      transform -translate-x-1/2 -translate-y-1/2
      ${position}
    `}
  >
    {label}
  </Link>
);

const Hero = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleWalletLogin = () => {
    if (isConnected) disconnect();
    open();
  };

  const handleCTA = () => {
    open();
  };

  return (
    <section className="container mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <p className="font-semibold text-blue-400 uppercase tracking-widest">
          THE ETHER GATE
        </p>

        <h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: "serif" }}
        >
          Enter the Ether. One game, many worlds.
        </h1>

        <p className="text-lg text-gray-300 max-w-xl text-justify">
          EtherFantasy is a multi-layered Mobile + Web3 auto-dungeon RPG.
          Premium 2D & 3D assets, shared identity, and player-owned worlds
          spread across multiple chains.
        </p>

        <div className="space-y-4 pt-4">
          {/* <CtaButton
            icon={<FaEnvelope size={24} className="text-blue-400" />}
            title="Continue with Email"
            subtitle="Start free-to-play with a PG in-game account."
            onClick={handleCTA}
          /> */}

          <CtaButton
            icon={<FaWallet size={24} className="text-green-400" />}
            title="Continue with Wallet"
            subtitle="Connect your EVM wallet to mint and trade."
            onClick={isConnected ? undefined : handleWalletLogin}
            className={isConnected ? "opacity-50 cursor-not-allowed" : ""}
          />

          <CtaButton
            icon={<FaDiscord size={24} className="text-indigo-400" />}
            title="Continue with Discord"
            subtitle="Join the EtherFantasy dev & player community."
            onClick={() =>
              window.open("https://discord.gg/etherfantasy", "_blank")
            }
          />
        </div>
      </div>

      <div className="relative">
        <img
          src="/bg1.png"
          alt="Choose Your Resonance - EtherFantasy Realms"
          className="w-full max-w-[600px] mx-auto h-auto rounded-xl shadow-2xl shadow-blue-900/20"
        />

        <RealmButton
          to="/pentagon"
          label="Pentagon Realm"
          position="top-[25%] left-[25%]"
        />

        <RealmButton
          to="/base"
          label="Base Realm"
          position="top-[25%] left-[80%]"
        />

        <RealmButton
          to="/ethereum"
          label="Ethereum Realm"
          position="top-[75%] left-[25%]"
        />

        <RealmButton
          to="/tba"
          label="Ink Realm"
          position="top-[70%] left-[75%]"
        />
      </div>
    </section>
  );
};

export default Hero;

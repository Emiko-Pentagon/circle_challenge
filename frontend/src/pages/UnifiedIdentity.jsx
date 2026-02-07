import React from 'react';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

const UnifiedIdentity = () => {


  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleWalletLogin = () => {
    if (isConnected) disconnect();      
    open();                       
  };

  return (
    <section className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold" style={{ fontFamily: 'serif' }}>
          Unified Identity
        </h2>
        <p className="text-lg text-gray-300 max-w-lg">
          One account for every world. Your progress, your assets, and your identity—
          synced across the multiverse and accessible on both web and mobile.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold mb-6">PG In-Game Account</h3>

        <ul className="space-y-4 list-disc list-inside text-gray-300">
          <li>One account to access all EtherFantasy realms.</li>
          <li>No wallet required to register.</li>
          <li>Link your EVM wallet at any time to mint, trade, and sync assets.</li>
          <li>Used for login on web and mobile.</li>
        </ul>

     
        <button
          onClick={handleWalletLogin}
          className="mt-8 bg-blue-600 px-6 py-3 rounded-md text-white font-semibold 
                     hover:bg-blue-700 transition-colors w-full"
        >
          Sign in / Create Account
        </button>
      </div>
    </section>
  );
};

export default UnifiedIdentity;

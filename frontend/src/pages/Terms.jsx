import React from "react";

const Terms = () => {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        📜 Terms and Conditions (T&C)
      </h1>
      
      <div className="bg-gray-900 p-8 md:p-12 rounded-xl border border-gray-800 shadow-2xl">
        
       
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300">
            By accessing or using the EtherFantasy ("the Service"), you agree to be bound by these Terms and Conditions and all policies incorporated by reference. If you do not agree to these T&C, you may not access or use the Service.
          </p>
        </div>

     
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            2. NFT Minting and Ownership
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li>
              **Minting Process:** The Service allows users to mint digital characters/NFTs ("Non-Fungible Tokens"). Minting is only possible when your wallet is connected and switched to the designated network, as indicated by the application.
            </li>
            <li>
              **Ownership:** When you successfully mint an NFT, you obtain full ownership rights to that specific digital token on the blockchain. Ownership is secured by the blockchain and your wallet credentials.
            </li>
            <li>
              **Risks:** You acknowledge the inherent risks associated with blockchain technology and digital assets, including, but not limited to, smart contract vulnerabilities, network failures, and potential loss of access to your wallet.
            </li>
          </ul>
        </div>

       
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            3. Wallet and Network Responsibility
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li>
              **Your Responsibility:** You are solely responsible for maintaining the security of your cryptocurrency wallet, private keys, and seed phrases. The Service has no access to or control over your wallet.
            </li>
            
          </ul>
        </div>

       
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            4. Disclaimer of Warranties
          </h2>
          <p className="text-gray-300">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation or availability of the Service.
          </p>
        </div>

       
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-300">
            In no event shall the creators or operators of the Service be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the Service or your inability to use the Service.
          </p>
        </div>


        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            6. Governing Law
          </h2>
          <p className="text-gray-300">
            These Terms shall be governed and construed in accordance with the laws applicable to the Service's jurisdiction, without regard to its conflict of law provisions.
          </p>
        </div>
        
      </div>

      <p className="text-center text-gray-500 mt-12 text-sm">
        Last updated: November 24, 2025
      </p>

    </div>
  );
};

export default Terms;
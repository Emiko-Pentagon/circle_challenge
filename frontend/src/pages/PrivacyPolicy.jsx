import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        🔒 Privacy Policy
      </h1>
      
      <div className="bg-gray-900 p-8 md:p-12 rounded-xl border border-gray-800 shadow-2xl">
        

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            1. Introduction
          </h2>
          <p className="text-gray-300">
            This Privacy Policy describes how the Pentagon Realm Mint application ("the Service") handles information when you use our platform. We are committed to protecting your privacy and ensuring transparency in our practices.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li>
              **Wallet Address:** When you connect your cryptocurrency wallet, we collect your public wallet address. This is necessary to facilitate transactions (like minting NFTs) and display your minted characters. We do not collect private keys or seed phrases.
            </li>
            <li>
              **Blockchain Transaction Data:** We collect information related to your blockchain transactions, such as transaction hashes, token IDs of minted NFTs, and the timestamp of transactions. This information is publicly available on the blockchain.
            </li>
            <li>
              **No Personal Identifiable Information (PII):** We do not intentionally collect any personal identifiable information (e.g., your name, email address, physical address) through the Service. Your interaction is primarily pseudonymous via your blockchain wallet address.
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li>
              **Facilitating Transactions:** Your wallet address is used to enable you to mint NFTs and for the Service to interact with the blockchain on your behalf.
            </li>
            <li>
              **Displaying NFTs:** Your wallet address is used to query the blockchain to display the NFTs you have minted.
            </li>
            <li>
              **Service Improvement:** Aggregated and anonymized blockchain transaction data may be used to understand usage patterns and improve the Service.
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            4. Information Sharing and Disclosure
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li>
              **Public Blockchain Data:** Information about your transactions, including your wallet address and the NFTs you mint, is recorded on the public Pentagon blockchain and is accessible to anyone.
            </li>
            <li>
              **No Third-Party Sharing of PII:** As we do not collect PII, there is no PII to share with third parties.
            </li>
            <li>
              **Legal Requirements:** We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            5. Data Security
          </h2>
          <p className="text-gray-300">
            We implement reasonable security measures to protect the limited information we collect. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            6. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-300">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            7. Contact Us
          </h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact us through the appropriate channels provided on our main website.
          </p>
        </div>
        
      </div>

      <p className="text-center text-gray-500 mt-12 text-sm">
        Last updated: November 24, 2025
      </p>

    </div>
  );
};

export default PrivacyPolicy;
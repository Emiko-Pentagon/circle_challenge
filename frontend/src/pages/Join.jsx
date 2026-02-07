
import React from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const Join = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-3xl mx-auto text-center bg-gray-900 border border-gray-800 p-12 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "serif" }}>
          Build the Ether with Us
        </h2>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed text-justify">
          OG Web3 team (since 2017), 600+ premium models & illustrations, open
          to: partner projects, mintlist collaborations, infra & marketing
          allies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="https://discord.gg/etherfantasy"
            target="_blank"
            rel="noreferrer"
          >
            <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-md text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
              <FaDiscord size={18} />
              Join Discord
            </button>
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded-md text-white font-semibold hover:bg-gray-600 transition-colors cursor-pointer">
              <FaTwitter size={18} />
              Follow on X
            </button>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Join;

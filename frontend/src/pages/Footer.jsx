import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0 flex items-center gap-4">
          <img
            src="/logo1.png"
            alt="EtherFantasy Logo"
            className="w-12 h-12 object-contain"
          />

          <div className="flex flex-col leading-tight">
            <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>
              ETHER FANTASY
            </div>
            <p className="text-sm text-gray-500">
              © EtherFantasy (EtherFantasy.com) / Pentagon Games
            </p>
          </div>
        </div>

       
        <div className="flex gap-6 mb-6 md:mb-0">
          <Link
            to="/terms"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy-policy"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/docs"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Docs
          </Link>
        </div>

        <div className="flex gap-6">
          <a
            href="https://x.com/etherfantasycom"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://discord.gg/etherfantasy"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaDiscord size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

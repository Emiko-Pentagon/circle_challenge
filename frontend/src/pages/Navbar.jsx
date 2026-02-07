import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDiscord,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { pentagon, base, EIP3085_BY_ID } from "../wagmiConfig";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRealmsOpen, setIsRealmsOpen] = useState(false);

  const [isRealmsHover, setIsRealmsHover] = useState(false);
  let realmsTimer = null;

  const [isChainModalOpen, setIsChainModalOpen] = useState(false);

  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsRealmsOpen(false);
    setIsChainModalOpen(false);
  };

  const truncateAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  const switchOrAddChain = async (numericChainId) => {
    const provider = window?.ethereum;
    const cfg = EIP3085_BY_ID[numericChainId];

    if (!cfg) return;

    if (switchChainAsync) {
      try {
        await switchChainAsync({ chainId: numericChainId });
        return;
      } catch (err) {}
    }

    if (!provider) return alert("MetaMask not found");

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: cfg.chainId }],
      });
    } catch (err) {
      if (err.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [cfg],
          });
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: cfg.chainId }],
          });
        } catch (addErr) {
          console.error(addErr);
        }
      }
    }
  };

  const handleRealmClick = async (realChainId, path) => {
    await switchOrAddChain(realChainId);
    navigate(path);
    closeAllMenus();
  };

  const renderWalletButton = (isMobile = false) => {
    const mobile = "py-2 text-left w-full";

    if (!isConnected) {
      return (
        <button
          onClick={() => {
            open();
            closeAllMenus();
          }}
          className={`${isMobile ? mobile : "text-gray-300 hover:text-white"}`}
        >
          Connect Wallet
        </button>
      );
    }

    if (isMobile) {
      return (
        <div className="w-full">
          <button
            onClick={() => setIsChainModalOpen(true)}
            className="py-2 text-left w-full text-gray-100 font-semibold"
          >
            {truncateAddress(address)}
          </button>

          <div className="mt-2 space-y-2 border-t border-gray-700 pt-2 pl-2">
            <button
              onClick={() => {
                disconnect();
                closeAllMenus();
              }}
              className="block w-full text-left text-red-400 py-1"
            >
              Disconnect
            </button>

            <button
              onClick={() => setIsChainModalOpen(true)}
              className="block w-full text-left text-gray-300 py-1"
            >
              Switch Chain
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group">
        <button className="bg-gray-700 px-4 py-2 rounded-md font-semibold text-gray-100 hover:bg-gray-600 flex items-center justify-between w-full">
          {truncateAddress(address)}
          <span className="ml-2 text-xs">▼</span>
        </button>

        <div
          className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-700 
                     rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 
                     group-hover:visible transition-all duration-200 ease-out transform 
                     origin-top scale-95 group-hover:scale-100 z-40"
        >
          <button
            onClick={() => {
              disconnect();
              closeAllMenus();
            }}
            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300"
          >
            Disconnect
          </button>

          <div className="relative group/submenu">
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex justify-between">
              Switch Chain
              <span className="text-xs">▶</span>
            </button>

            <div
              className="absolute left-full top-0 ml-2 w-48 bg-gray-900 border border-gray-700 
                         rounded-md shadow-xl opacity-0 invisible group-hover/submenu:opacity-100 
                         group-hover/submenu:visible transition-all duration-200 transform 
                         origin-left -translate-x-2 group-hover/submenu:translate-x-0 scale-95 
                         group-hover/submenu:scale-100 z-50"
            >
              <button
                onClick={() => switchOrAddChain(pentagon.id)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-800 ${
                  chainId === pentagon.id
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                Pentagon
              </button>

              <button
                onClick={() => switchOrAddChain(base.id)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-800 ${
                  chainId === base.id
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                Base
              </button>

              <button
                onClick={() => switchOrAddChain(mainnet.id)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-800 ${
                  chainId === mainnet.id
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                Ethereum
              </button>

              <button
                onClick={() =>
                  toast(
                    (t) => (
                      <div className="px-3 py-2">
                        <div className="font-semibold text-white flex items-center gap-1">
                          🚧 Ink Chain Coming Soon
                        </div>
                        <div className="text-gray-300 text-sm">
                          This chain will be added in a future update.
                        </div>
                      </div>
                    ),
                    {
                      icon: "✨",
                      style: {
                        background: "#0f0f1f",
                        border: "1px solid #3a3a5a",
                        color: "white",
                        borderRadius: "8px",
                      },
                    }
                  )
                }
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800"
              >
                Ink (TBA)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RealmLink = ({ chainId, path, label, isMobile = false }) => {
    const classes = isMobile
      ? "block py-2 text-sm text-gray-300 hover:text-white"
      : "block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer";

    return (
      <button
        onClick={() => handleRealmClick(chainId, path)}
        className={classes}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      {isChainModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]"
          onClick={() => setIsChainModalOpen(false)}
        >
          <div
            className="bg-[#111122] border border-gray-700 rounded-lg shadow-xl p-6 w-80 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Switch Chain</h3>

            <div className="space-y-2">
              <button
                onClick={() => switchOrAddChain(pentagon.id)}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  chainId === pentagon.id
                    ? "bg-gray-800 text-amber-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Pentagon
              </button>

              <button
                onClick={() => switchOrAddChain(base.id)}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  chainId === base.id
                    ? "bg-gray-800 text-amber-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Base
              </button>

              <button
                onClick={() => switchOrAddChain(mainnet.id)}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  chainId === mainnet.id
                    ? "bg-gray-800 text-amber-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Ethereum
              </button>

              <button
                onClick={() =>
                  toast("Ink chain will be added soon!", {
                    icon: "✨",
                    style: {
                      background: "#0f0f1f",
                      border: "1px solid #3a3a5a",
                      color: "white",
                    },
                  })
                }
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              >
                Ink (TBA)
              </button>
            </div>

            <button
              onClick={() => setIsChainModalOpen(false)}
              className="mt-5 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-[#0b0b1a]/80 backdrop-blur-md border-b border-gray-800/50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-3 text-3xl font-bold tracking-wider"
            style={{ fontFamily: "serif", letterSpacing: "0.05em" }}
            onClick={closeAllMenus}
          >
            <img
              src="/logo1.png"
              alt="EtherFantasy Logo"
              className="w-10 h-10"
            />
            <span>ETHER FANTASY</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                if (realmsTimer) clearTimeout(realmsTimer);
                setIsRealmsHover(true);
              }}
              onMouseLeave={() => {
                realmsTimer = setTimeout(() => {
                  setIsRealmsHover(false);
                }, 60);
              }}
            >
              <button className="text-gray-300 hover:text-white flex items-center gap-1">
                Realms <FaChevronDown size={12} />
              </button>

              <div
                className={`
      absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56
      bg-gray-900 border border-gray-700 rounded-md shadow-lg
      transition-all duration-200
      ${
        isRealmsHover
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }
    `}
              >
                <RealmLink
                  chainId={pentagon.id}
                  path="/pentagon"
                  label="Pentagon"
                />
                <RealmLink
                  chainId={base.id}
                  path="/base"
                  label="Base"
                />
                <RealmLink
                  chainId={mainnet.id}
                  path="/ethereum"
                  label="Ethereum"
                />
                <Link
                  to="/ink"
                  className="block w-full text-left px-4 py-3 text-sm text-gray-300 
                  hover:text-white transition-colors"
                  onClick={closeAllMenus}
                >
                  Ink (TBA)
                </Link>
              </div>
            </div>

            {renderWalletButton()}

            <a
              href="https://discord.gg/etherfantasy"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700"
            >
              <FaDiscord /> Discord
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0b0b1a]/95 px-6 py-4 border-b border-gray-800/50">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-300 py-2">
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsRealmsOpen(!isRealmsOpen)}
                  className="w-full flex justify-between text-gray-300 py-2"
                >
                  Realms
                  {isRealmsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {isRealmsOpen && (
                  <div className="pl-4 space-y-2 border-l border-gray-700 mt-2">
                    <RealmLink
                      chainId={pentagon.id}
                      path="/pentagon"
                      label="Pentagon"
                      isMobile
                    />
                    <RealmLink
                      chainId={base.id}
                      path="/base"
                      label="Base"
                      isMobile
                    />
                    <RealmLink
                      chainId={mainnet.id}
                      path="/ethereum"
                      label="Ethereum"
                      isMobile
                    />
                    <Link to="/ink" className="block py-2 text-gray-300">
                      Ink (TBA)
                    </Link>
                  </div>
                )}
              </div>

              {renderWalletButton(true)}

              <a
                href="https://discord.gg/etherfantasy"
                target="_blank"
                className="flex items-center justify-center bg-blue-600 py-2 rounded-md"
              >
                <FaDiscord /> Discord
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;

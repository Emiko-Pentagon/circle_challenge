import React from 'react';
import { Link } from 'react-router-dom';

const Engine = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'serif' }}>
        The EtherFantasy Engine
      </h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
       
        <div>
          <h3 className="text-2xl font-bold mb-6">Core Loop</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-400 font-bold mr-3 text-lg">&bull;</span>
              <span className="text-gray-300"><b>Claim</b> — heroes & assets via realm-specific mints.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 font-bold mr-3 text-lg">&bull;</span>
              <span className="text-gray-300"><b>Assess</b> — Join the dungeon most suitable with your hero, sidekicks & pets.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 font-bold mr-3 text-lg">&bull;</span>
              <span className="text-gray-300"><b>Join Dungeons</b> — auto-resolved runs, with real loot and risk where enabled.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 font-bold mr-3 text-lg">&bull;</span>
              <span className="text-gray-300"><b>Trade & Loot</b> — move assets across markets and realms.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 font-bold mr-3 text-lg">&bull;</span>
              <span className="text-gray-300"><b>Dominate</b> — climb leaderboards and unlock new Resonance options.</span>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-2xl font-bold mb-6">Tech Highlights</h3>
          <ul className="space-y-4 list-disc list-inside text-gray-300">
            <li>EVM-native contracts.</li>
            <li>Multichain support (Pentagon, Base, Ethereum, more).</li>
            <li>AI-assisted content: visuals, cinematics, personalization.</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-16">
        <Link to="/docs" className="bg-blue-600 px-8 py-3 rounded-md text-white font-semibold hover:bg-blue-700 transition-colors text-lg">
          Read the technical overview
        </Link>
      </div>
    </section>
  );
};

export default Engine;
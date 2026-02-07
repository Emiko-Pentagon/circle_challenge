import React from 'react';
import { Link } from 'react-router-dom';

const Characters = () => {
  return (
    <section className="border-y border-gray-800/50 py-24">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      
        <div className="space-y-4">
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'serif' }}>
            Heroes, Sidekicks & the Born
          </h2>
          <p className="text-lg text-gray-300">
            Across realms, EtherFantasy tracks a growing roster of minted entities —
            from Genesis heroes to support units to dungeon-born monsters.
          </p>
          <p className="text-gray-400">
            Browse full collections on each realm page.
          </p>
          <Link to="/docs" className="inline-block text-blue-400 hover:text-blue-300 font-semibold pt-4">
            View realm collections &rarr;
          </Link>
        </div>

      
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg font-mono text-sm">
          <div className="border-b border-gray-700 pb-3 mb-3">
            <span className="text-gray-500">MintID #102941</span> — Wraithblade (Hero, Pentagon)
          </div>
          <div className="border-b border-gray-700 py-3 mb-3">
            <span className="text-gray-500">MintID #300777</span> — Azure Fang (Hero, Base Genesis)
          </div>
          <div className="py-3">
            <span className="text-gray-500">MintID #...</span> — (More examples)
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characters;
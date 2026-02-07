import React from 'react';
import { Link } from 'react-router-dom';

const RealmCard = ({ title, description, link }) => (
//   <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:border-blue-700">
<div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:border-blue-700 min-h-[260px] flex flex-col">

    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 mb-6 flex-1">{description}</p>
    <Link to={link} className="text-blue-400 hover:text-blue-300 font-semibold">
      View realm details &rarr;
    </Link>
  </div>
);

const RealmsAtAGlance = () => {
  const realms = [
    { title: "Pentagon Realm", description: "Dark, Alpha Daily dungeons. Real-loss runs.", link: "/pentagon" },
    { title: "Base Realm", description: "Genesis characters. Fast auto-dungeons.", link: "/base" },
    { title: "Ethereum Realm", description: "Pet system via existing OG Pets NFTs (Hardcore Mode).", link: "/ethereum" },
    { title: "Ink Realm", description: "Black-ink Ether scripts. Experimental modes and player generated drops.", link: "/ink" },
  ];

  return (
    <section className="border-y border-gray-800/50 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: 'serif' }}>
          Realms & Styles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {realms.map((realm) => (
            <RealmCard key={realm.title} {...realm} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealmsAtAGlance;
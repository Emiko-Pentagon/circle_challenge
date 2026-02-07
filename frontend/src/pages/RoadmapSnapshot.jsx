import React from 'react';
import { Link } from 'react-router-dom';

const RoadmapColumn = ({ title, items }) => (
  <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
    <h3 className="text-3xl font-bold mb-6 text-blue-400" style={{ fontFamily: 'serif' }}>
      {title}
    </h3>
    <ul className="space-y-3 list-disc list-inside text-gray-300">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const RoadmapSnapshot = () => {
  const now = [
    "Pentagon Realm alpha auto-dungeons.",
    "PG account system live.",
    "Experimental cinematic engine online.",
  ];
  const next = [
    "Base Genesis mint & realm launch.",
    "Ethereum pet integration via Ethermon.",
    "Resonance Mint rollout between selected realms.",
  ];
  const later = [
    "Additional realms & partners.",
    "Cross-realm events & tournaments.",
    "Merch, TCG, extended media.",
  ];

  return (
    <section className=" border-y border-gray-800/50 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'serif' }}>
          Roadmap Snapshot
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <RoadmapColumn title="Now" items={now} />
          <RoadmapColumn title="Next" items={next} />
          <RoadmapColumn title="Later" items={later} />
        </div>
        <div className="text-center mt-16">
          <Link to="/roadmap" className="text-blue-400 hover:text-blue-300 font-semibold text-lg">
            Full roadmap &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSnapshot;
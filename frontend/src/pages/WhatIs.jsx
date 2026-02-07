
import React from "react";

const WhatIs = () => {
  return (
    <section className="relative py-12 bg-gradient-to-b from-gray-950 via-gray-900/60 to-gray-950 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white"
          style={{ fontFamily: "serif" }}
        >
          A Multiverse of Auto-Dungeons
        </h2>

        <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed font-light">
          EtherFantasy connects multiple visual styles, chains, and dungeon systems into one universe.<br/><br/>
          Your heroes, sidekicks, monsters, and relics are digital assets that can manifest differently in each realm — while preserving a shared lineage.
        </p>
      </div>
    </section>
  );
};

export default WhatIs;

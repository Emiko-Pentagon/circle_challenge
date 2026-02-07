import React from 'react';
import Hero from './Hero';
import WhatIs from './WhatIs';
import UnifiedIdentity from './UnifiedIdentity';
import RealmsAtAGlance from './RealmsAtAGlance';
import ResonanceMint from './ResonanceMint';
import Cinematics from './Cinematics';
import Characters from './Characters';
import Engine from './Engine';
import RoadmapSnapshot from './RoadmapSnapshot';
import Join from './Join';

const Home = () => {
  return (
    <div>
      <Hero />
      <WhatIs />
      {/* <UnifiedIdentity /> */}
      <RealmsAtAGlance />
      <ResonanceMint />
      <Cinematics />
      <Characters />
      <Engine />
      <RoadmapSnapshot />
      <Join />
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

const ResonanceMint = () => {
  return (
    <section
      className="relative py-16 border-y border-gray-800/50
      bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
      from-gray-950 via-gray-900/95 to-gray-950"
    >
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2
          className="text-3xl font-bold mb-4 text-white"
          style={{ fontFamily: 'serif' }}
        >
          Resonance Mint — One Soul, Many Forms
        </h2>

        <p className="text-lg text-gray-300 leading-relaxed mb-8 justify-center ">
          When new realms or styles appear, eligible heroes can Resonance Mint:
          a new manifestation linked to the same origin, adapted to the realm’s art and rules.
          Not a copy. Not a fork. A canonical echo of the same soul.
        </p>

        <Link
          to="/docs"
          className="font-semibold text-blue-400 hover:text-blue-300 text-lg transition-colors"
        >
          Learn how Resonance works &rarr;
        </Link>
      </div>
    </section>
  );
};

export default ResonanceMint;

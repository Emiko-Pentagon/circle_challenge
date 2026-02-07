import React from 'react';

const Cinematics = () => {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
          Auto-Dungeon Cinematics (Experimental)
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our engine transforms dungeon data into AI-driven cinematic clips.
          Currently in work-in-progress testing across selected realms.
        </p>
      
        {/* <div className="aspect-video bg-gray-900 border border-gray-800 rounded-lg mt-8 flex items-center justify-center">
          <span className="text-gray-500">(Cinematic Preview Placeholder)</span>
        </div> */}
      </div>
    </section>
  );
};

export default Cinematics;
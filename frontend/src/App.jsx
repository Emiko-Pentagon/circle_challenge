import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Pentagon from './pages/Pentagon';
import Base from './pages/Base';
import Ethereum from './pages/Ethereum';
import Ink from './pages/Ink';
import Docs from './pages/Docs';
import Roadmap from './pages/Roadmap';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pentagon" element={<Pentagon />} />
        <Route path="base" element={<Base />} />
        <Route path="ethereum" element={<Ethereum />} />
        <Route path="ink" element={<Ink />} />
        <Route path="tba" element={<Ink />} /> 
        <Route path="docs" element={<Docs />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />

      
      </Route>
    </Routes>
  );
}

export default App;
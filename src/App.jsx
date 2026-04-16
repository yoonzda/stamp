import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MapHome from './pages/MapHome';
import IslandDetail from './pages/IslandDetail';
import PhotoVerification from './pages/PhotoVerification';
import Gallery from './pages/Gallery';
import SpotGallery from './pages/SpotGallery';
import Collection from './pages/Collection';
import Reward from './pages/Reward';
import SpeedDial from './components/SpeedDial';
import Splash from './components/Splash';
import Onboarding from './pages/Onboarding';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('has_seen_onboarding') !== 'true') {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto h-screen shadow-xl overflow-hidden relative" style={{ backgroundColor: '#F3EFE6' }}>
      
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      
      {(!showSplash && showOnboarding) && (
        <Onboarding onFinish={() => setShowOnboarding(false)} />
      )}

      {/* 
        MASTER CANVAS: 
        Instead of tiling an image which causes ugly grid lines, we dynamically generate 
        an infinite, seamless watercolor paper grain using SVG fractalNoise over the exact 
        cream hex color of the unpainted canvas. This guarantees 100% seamless continuity!
      */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route path="/" element={<MapHome />} />
          <Route path="/island/:id" element={<IslandDetail />} />
          <Route path="/photo-verify/:code" element={<PhotoVerification />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:code" element={<SpotGallery />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/reward" element={<Reward />} />
        </Routes>
        <SpeedDial />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MapHome from './pages/MapHome';
import IslandDetail from './pages/IslandDetail';
import Scanner from './pages/Scanner';
import Collection from './pages/Collection';
import Reward from './pages/Reward';
import SpeedDial from './components/SpeedDial';

function App() {
  return (
    <div className="w-full max-w-md mx-auto h-screen shadow-xl overflow-hidden relative" style={{ backgroundColor: '#F3EFE6' }}>
      
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
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/reward" element={<Reward />} />
        </Routes>
        <SpeedDial />
      </div>
    </div>
  );
}
export default App;

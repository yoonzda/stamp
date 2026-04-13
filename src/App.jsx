import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import MapHome from './pages/MapHome';
import Scanner from './pages/Scanner';
import Collection from './pages/Collection';
import SpeedDial from './components/SpeedDial';

function LoadingScreen() {
  return (
    <div className="absolute-fill flex-center" style={{ backgroundColor: '#fff', zIndex: 9999 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          display: 'flex', gap: '15px', marginBottom: '20px', 
          fontSize: '2rem', fontWeight: 'bold' 
        }}>
          <span style={{ color: 'var(--color-cyan)', animation: 'pulse 1.5s infinite' }}>+</span>
          <span style={{ color: 'var(--color-crimson)', animation: 'pulse 1.5s infinite 0.2s' }}>-</span>
          <span style={{ color: 'var(--color-yellowgreen)', animation: 'pulse 1.5s infinite 0.4s' }}>×</span>
          <span style={{ color: 'var(--color-yellow)', animation: 'pulse 1.5s infinite 0.6s' }}>÷</span>
        </div>
        <p style={{ color: '#888', fontSize: '0.9rem', letterSpacing: '2px' }}>LOADING...</p>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Check onboarding
      const hasOnboarded = localStorage.getItem('hasOnboarded');
      if (!hasOnboarded && location.pathname === '/') {
        navigate('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Routes>
        <Route path="/" element={<MapHome />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
      
      {location.pathname !== '/onboarding' && <SpeedDial />}
    </div>
  );
}

export default App;

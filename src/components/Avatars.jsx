import React from 'react';
import { ANIMALS } from '../gameState';

export default function AvatarDisplay({ animalId, unlockedItems = [] }) {
  const animal = ANIMALS.find(a => a.id === animalId) || ANIMALS[0];
  
  const hasHatRed = unlockedItems.includes('hat_red');
  const hasHatCrown = unlockedItems.includes('hat_crown');
  const hasBagBlue = unlockedItems.includes('bag_blue');
  const hasGlassesSun = unlockedItems.includes('glasses_sun');

  return (
    <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
      
      {/* Base Animal Body */}
      {animal.id === 'bear' && (
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="20" cy="30" r="15" fill={animal.color} /> {/* Left Ear */}
          <circle cx="80" cy="30" r="15" fill={animal.color} /> {/* Right Ear */}
          <circle cx="50" cy="60" r="40" fill={animal.color} /> {/* Head */}
          <circle cx="50" cy="65" r="20" fill="#e0bb95" /> {/* Snout */}
          <circle cx="35" cy="50" r="4" fill="#000" /> {/* Eye */}
          <circle cx="65" cy="50" r="4" fill="#000" /> {/* Eye */}
          <ellipse cx="50" cy="60" rx="6" ry="4" fill="#000" /> {/* Nose */}
        </svg>
      )}
      
      {animal.id === 'rabbit' && (
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <ellipse cx="35" cy="25" rx="10" ry="25" fill={animal.color} /> {/* Left Ear */}
          <ellipse cx="65" cy="25" rx="10" ry="25" fill={animal.color} /> {/* Right Ear */}
          <circle cx="50" cy="60" r="35" fill={animal.color} /> {/* Head */}
          <circle cx="35" cy="55" r="4" fill="#000" /> {/* Eye */}
          <circle cx="65" cy="55" r="4" fill="#000" /> {/* Eye */}
          <ellipse cx="50" cy="65" rx="5" ry="3" fill="#ffb6c1" /> {/* Nose */}
        </svg>
      )}

      {animal.id === 'snake' && (
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <path d="M 20 80 Q 50 10 80 80 Q 50 50 20 80" fill={animal.color} />
          <circle cx="50" cy="40" r="25" fill={animal.color} /> {/* Head */}
          <circle cx="40" cy="35" r="3" fill="#000" /> {/* Eye */}
          <circle cx="60" cy="35" r="3" fill="#000" /> {/* Eye */}
          <path d="M 50 45 L 45 55 L 50 50 L 55 55 Z" fill="#ff5252" /> {/* Tongue */}
        </svg>
      )}

      {animal.id === 'parrot' && (
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <ellipse cx="50" cy="55" rx="30" ry="40" fill={animal.color} /> {/* Body */}
          <ellipse cx="70" cy="50" rx="15" ry="30" fill="#4caf50" /> {/* Wing */}
          <circle cx="40" cy="40" r="4" fill="#000" /> {/* Eye */}
          <path d="M 20 45 Q 10 55 25 60 Q 30 50 20 45" fill="#ffc107" /> {/* Beak */}
        </svg>
      )}

      {/* CLOTHING OVERLAYS */}
      {hasHatRed && (
        <div style={{ position: 'absolute', top: '10px', left: '30px', width: '100px', height: '40px' }}>
          <svg viewBox="0 0 100 50">
            <path d="M 10 40 Q 50 -10 90 40 L 100 40 L 90 45 L 10 45 Z" fill="#e53935" />
            <ellipse cx="50" cy="45" rx="45" ry="5" fill="#c62828" />
          </svg>
        </div>
      )}

      {hasHatCrown && (
        <div style={{ position: 'absolute', top: '0px', left: '40px', width: '80px', height: '40px' }}>
          <svg viewBox="0 0 100 50">
            <path d="M 10 50 L 20 10 L 50 30 L 80 10 L 90 50 Z" fill="#ffd700" />
            <circle cx="20" cy="10" r="6" fill="#ff5252" />
            <circle cx="50" cy="30" r="6" fill="#448aff" />
            <circle cx="80" cy="10" r="6" fill="#ff5252" />
          </svg>
        </div>
      )}

      {hasGlassesSun && (
        <div style={{ position: 'absolute', top: '55px', left: '35px', width: '90px', height: '30px' }}>
          <svg viewBox="0 0 100 40">
            <rect x="10" y="10" width="35" height="20" rx="5" fill="#212121" />
            <rect x="55" y="10" width="35" height="20" rx="5" fill="#212121" />
            <path d="M 45 20 L 55 20" stroke="#212121" strokeWidth="4" />
          </svg>
        </div>
      )}

      {hasBagBlue && (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '60px', height: '60px' }}>
          <svg viewBox="0 0 100 100">
            <rect x="20" y="30" width="60" height="60" rx="10" fill="#1976d2" />
            <path d="M 30 30 Q 50 0 70 30" fill="none" stroke="#0d47a1" strokeWidth="6" />
            <rect x="35" y="50" width="30" height="25" rx="5" fill="#64b5f6" />
          </svg>
        </div>
      )}
    </div>
  );
}

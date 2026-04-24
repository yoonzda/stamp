import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-hidden relative flex flex-col justify-center items-center bg-[#F3EFE6]">
      
      {/* Decorative Title */}
      <div className="absolute top-20 left-0 right-0 flex flex-col items-center opacity-80 pointer-events-none z-10">
        <h1 className="text-3xl font-['Nanum_Myeongjo'] font-extrabold text-[#5c5042] tracking-[0.3em]">옹진군</h1>
        <p className="text-sm text-[#8a7b68] mt-2 font-light tracking-widest">수채화로 만나는 아름다운 섬</p>
      </div>

      {/* Decorative Compass */}
      <div className="absolute top-16 right-8 opacity-20 pointer-events-none w-16 h-16 z-10">
        <svg viewBox="0 0 100 100" fill="none" stroke="#5c5042" strokeWidth="1.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" strokeDasharray="2 4" />
          <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="#5c5042" fillOpacity="0.2" />
          <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Decorative Clouds (Animated) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 mix-blend-overlay opacity-40">
        <div className="absolute top-[15%] w-64 h-24 bg-white/40 blur-2xl rounded-[100%] animate-[cloud_40s_linear_infinite]" style={{ left: '-100%' }} />
        <div className="absolute top-[60%] w-96 h-32 bg-white/30 blur-3xl rounded-[100%] animate-[cloud_60s_linear_infinite_reverse]" style={{ right: '-100%' }} />
      </div>

      <style>{`
        @keyframes cloud {
          from { transform: translateX(-50vw); }
          to { transform: translateX(150vw); }
        }
      `}</style>

      <button 
        onClick={() => { localStorage.removeItem('has_seen_onboarding'); window.location.reload(); }}
        className="absolute top-4 left-4 z-50 bg-white/80 text-black px-3 py-1.5 rounded-full text-xs shadow-md font-bold"
      >
        🔄 처음부터 다시보기 (테스트용)
      </button>

      {/* Original Map Container */}
      <div className="relative w-full shrink-0 z-30 drop-shadow-[0_20px_35px_rgba(92,80,66,0.2)]">
        <img 
          src={mapBg} 
          alt="옹진군 수채화 지도" 
          className="w-full h-auto pointer-events-none mix-blend-multiply"
        />

        {/* Map Pins / Labels */}
        {ISLANDS.map(island => (
          <div 
            key={island.id}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-20 hover:z-30 p-2"
            style={{ 
              top: island.mapPos.top, 
              left: island.mapPos.left 
            }}
            onClick={() => navigate(`/island/${island.id}`)}
          >
            <div className="map-label-bg px-3 py-1.5 rounded-full shadow-soft flex items-center justify-center transform transition-all duration-200 group-hover:-translate-y-1 group-active:scale-95 border border-[#c4baa8]">
              <span className="font-['Nanum_Myeongjo'] font-bold text-[#3e342b] text-sm whitespace-nowrap">
                {island.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

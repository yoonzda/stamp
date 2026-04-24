import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBgTall from '../assets/map_bg_dadora_tall.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ background: '#F3EFE6' }}>
      
      {/* Background ocean texture to fill any remaining screen gap seamlessly */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #8db3a8 0%, #F3EFE6 20%, #F3EFE6 80%, #8db3a8 100%)',
          opacity: 0.6
        }}
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")` }}
      />

      <div className="w-full h-full flex flex-col justify-center items-center relative z-10">
        <button 
          onClick={() => { localStorage.removeItem('has_seen_onboarding'); window.location.reload(); }}
          className="absolute top-4 left-4 z-50 bg-white/80 text-black px-3 py-1.5 rounded-full text-xs shadow-md font-bold"
        >
          🔄 처음부터 다시보기 (테스트용)
        </button>
        
        {/* The map fits perfectly on mobile without scrolling */}
        <div className="relative w-full aspect-[1024/1800]">
          
          <img 
            src={mapBgTall} 
            alt="옹진군 수채화 지도" 
            className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
          />

          {/* Map Pins / Labels */}
          {ISLANDS.map(island => (
            <div 
              key={island.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-20 hover:z-30 p-2"
              style={{ 
                top: `calc(${island.mapPos.top} * (1024/1800) + ${(388/1800)*100}%)`, 
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
    </div>
  );
}

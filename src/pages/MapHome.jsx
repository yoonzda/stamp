import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-[#F3EFE6]">
      {/* Tall Scrollable Container with Ocean Gradient */}
      <div 
        className="relative w-full h-[160vh]"
        style={{
          background: 'linear-gradient(to bottom, #7ca598 0%, #F3EFE6 20%, #F3EFE6 80%, #7ca598 100%)'
        }}
      >
        {/* Watercolor Noise Texture for the extended ocean */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply'
          }}
        />

        <button 
          onClick={() => { localStorage.removeItem('has_seen_onboarding'); window.location.reload(); }}
          className="absolute top-4 left-4 z-50 bg-white/80 text-black px-3 py-1.5 rounded-full text-xs shadow-md font-bold"
        >
          🔄 처음부터 다시보기 (테스트용)
        </button>
        
        {/* Centered Square Map Wrapper to preserve pin coordinates */}
        <div className="absolute top-1/2 left-0 w-full aspect-square -translate-y-1/2 z-10">
          
          {/* Original Background Map Image with Multiply Blend */}
          <img 
            src={mapBg} 
            alt="옹진군 수채화 지도" 
            className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
          />

          {/* Map Pins / Labels */}
          {ISLANDS.map(island => (
            <div 
              key={island.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-20 hover:z-30 p-2"
              style={{ top: island.mapPos.top, left: island.mapPos.left }}
              onClick={() => navigate(`/island/${island.id}`)}
            >
              {/* Traditional Label Design */}
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

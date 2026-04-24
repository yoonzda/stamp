import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBgTall from '../assets/map_bg_dadora_tall.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-hidden relative flex justify-center items-center bg-[#7ca598]">
      
      <button 
        onClick={() => { localStorage.removeItem('has_seen_onboarding'); window.location.reload(); }}
        className="absolute top-4 left-4 z-50 bg-white/80 text-black px-3 py-1.5 rounded-full text-xs shadow-md font-bold"
      >
        🔄 처음부터 다시보기 (테스트용)
      </button>

      {/* 
        This container perfectly mimics object-cover for both the image and its absolute pins.
        It ensures the 1024x1800 image strictly covers the entire screen without any blank space,
        and never distorts the aspect ratio.
      */}
      <div 
        className="relative shrink-0" 
        style={{
          width: 'max(100vw, 100vh * (1024 / 1800))',
          height: 'max(100vh, 100vw * (1800 / 1024))'
        }}
      >
        <img 
          src={mapBgTall} 
          alt="옹진군 수채화 지도" 
          className="w-full h-full object-cover pointer-events-none mix-blend-multiply"
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
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBgTall from '../assets/map_bg_dadora_tall.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-hidden relative flex justify-center items-center bg-[#F3EFE6]">
      
      <button 
        onClick={() => { localStorage.removeItem('has_seen_onboarding'); window.location.reload(); }}
        className="absolute top-4 left-4 z-50 bg-white/80 text-black px-3 py-1.5 rounded-full text-xs shadow-md font-bold"
      >
        🔄 처음부터 다시보기 (테스트용)
      </button>

      {/* 
        This container perfectly fits the screen width (w-full).
        Because the image is extremely tall (1024x4000), it will overflow the screen vertically.
        The overflow-hidden on the parent perfectly crops the excess top and bottom ocean,
        leaving the center islands exactly in the middle without any horizontal cropping!
      */}
      <div className="relative w-full shrink-0 z-10">
        <img 
          src={mapBgTall} 
          alt="옹진군 프리미엄 수채화 지도" 
          className="w-full h-auto pointer-events-none"
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

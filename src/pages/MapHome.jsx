import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';
import { ISLANDS } from '../gameState';

export default function MapHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-transparent overflow-y-auto overflow-x-hidden relative scrollbar-hide">
      <div className="min-h-full w-full flex flex-col justify-center items-center py-10 px-4">
        
        {/* Container matching full width to fit original layout */}
        <div className="relative w-full">
          
          {/* Background Map Image */}
          <img 
            src={mapBg} 
            alt="옹진군 수채화 지도" 
            className="w-full h-auto object-contain pointer-events-none mix-blend-multiply"
          />

          {/* Map Pins / Labels */}
          {ISLANDS.map(island => (
            <div 
              key={island.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-10 hover:z-20 p-2"
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

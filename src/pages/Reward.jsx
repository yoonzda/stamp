import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';
import { spotImages } from './IslandDetail';

export default function Reward() {
  const navigate = useNavigate();
  const state = getGameState();

  const OFFICIAL_PHOTOS = useMemo(() => {
    const photos = [];
    let idCounter = 0;

    ISLANDS.forEach(island => {
      island.spots.forEach(spot => {
        if (spotImages[spot.code]) {
          photos.push({
            id: `official_${idCounter++}`,
            url: spotImages[spot.code],
            spot: spot,
            island: island,
            timestamp: Date.now() - idCounter * 100000,
            isUser: false,
            likes: Math.floor(Math.random() * 300) + 100,
            badges: ['공식 뷰포인트']
          });
        }
      });
    });

    return photos;
  }, []);

  return (
    <div className="w-full h-full bg-[#Fcfbf9] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header Area */}
      <div className="px-5 pt-10 pb-5 sticky top-0 bg-[#Fcfbf9]/90 backdrop-blur-md z-30 border-b border-[#e8e2d5]/50 flex flex-col items-center text-center">
        <h1 className="text-[1.8rem] text-[#3e342b] mb-2 font-extrabold tracking-tight">명소 공식 사진관</h1>
        <p className="text-[0.85rem] font-medium text-[#8a7a6b] px-4 break-keep">
          옹진군 29개 명소의 아름다운 공식 풍경을 확인하세요.
        </p>
      </div>

      {/* Feed Layout (Pinterest Style Masonry) */}
      <div className="columns-2 gap-3 px-3 py-4 mt-2">
        {OFFICIAL_PHOTOS.map((photo, idx) => (
          <div 
            key={photo.id}
            className="break-inside-avoid mb-4 group"
          >
            {/* Image Container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#e8e2d5] shadow-sm">
              <img 
                src={photo.url} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                loading="lazy" 
                alt={photo.spot.name} 
              />
              
              {/* Top Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                <span className="bg-black/40 backdrop-blur-md text-white text-[0.6rem] font-medium px-2 py-0.5 rounded-full w-max flex items-center gap-1 shadow-sm">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {photo.island.name}
                </span>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Bottom Info Area */}
            <div className="mt-1.5 px-0.5 flex justify-between items-center">
              <h3 className="text-[0.8rem] font-bold text-[#3e342b] truncate leading-tight">
                {photo.spot.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

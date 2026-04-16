import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';

export default function Gallery() {
  const navigate = useNavigate();
  const state = getGameState();
  const collectedSpots = state.collectedStamps || [];

  return (
    <div className="w-full h-full bg-[#F3EFE6] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#F3EFE6]/90 backdrop-blur-md pt-8 pb-4 px-6 border-b border-[#e0dbcd] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3e342b] font-['Nanum_Myeongjo'] tracking-wide">
            추억 갤러리
          </h1>
          <p className="text-[#8a7a6b] text-sm mt-1">인증된 장소들의 생생한 풍경</p>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="p-6 space-y-10">
        {ISLANDS.map(island => {
          // Add some mock images to spots on the fly
          const spotsWithImages = island.spots.map(spot => {
            const userAcquired = collectedSpots.find(s => s.code === spot.code);
            const mockImages = [
              `https://picsum.photos/seed/${spot.id}1/400/300`,
              `https://picsum.photos/seed/${spot.id}2/400/300`,
              `https://picsum.photos/seed/${spot.id}3/400/300`
            ];
            
            const displayImages = [...mockImages];
            if (userAcquired && userAcquired.photoUrl) {
              displayImages.unshift(userAcquired.photoUrl);
            }
            
            return {
              ...spot,
              displayImages,
              userAcquired: !!userAcquired
            };
          });

          return (
            <div key={island.id} className="space-y-4">
              <h2 className="text-xl font-bold text-[#54463a] border-b-2 border-[#d5ccbe] pb-2 inline-block font-['Nanum_Myeongjo']">
                {island.name}
              </h2>
              
              <div className="space-y-6">
                {spotsWithImages.map(spot => (
                  <div key={spot.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#e0dbcd]">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-bold text-[#3e342b] text-[1.05rem] flex-1 truncate">{spot.name}</h3>
                      {spot.userAcquired && (
                        <span className="text-[0.7rem] font-bold text-white bg-[#004790] px-2 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                          ✨ 내 사진 저장됨
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3 overflow-x-auto snap-x hide-scrollbar pb-2">
                      {spot.displayImages.map((imgUrl, idx) => (
                        <div key={idx} className="snap-center shrink-0 w-44 h-32 rounded-xl overflow-hidden shadow-sm border border-black/5 bg-gray-100 relative group cursor-pointer transition-transform active:scale-95">
                          {idx === 0 && spot.userAcquired && (
                             <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow z-10 backdrop-blur-sm">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004790" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                             </div>
                          )}
                          <img src={imgUrl} alt={`${spot.name} 사진 ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                      ))}
                    </div>
                    {/* Caption / Helper */}
                    <div className="mt-2 text-right">
                      <span className="text-[0.7rem] text-[#a39585]">밀어서 더 보기 →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
                  <div key={spot.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e0dbcd] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#3e342b] text-[1.1rem]">{spot.name}</h3>
                        {spot.userAcquired && (
                          <span className="text-[0.65rem] font-bold text-white bg-[#004790] px-2 py-0.5 rounded-full shadow-sm">
                            ✨ 내 사진 저장됨
                          </span>
                        )}
                      </div>
                      <p className="text-[#8a7a6b] text-sm line-clamp-1">{spot.desc}</p>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/gallery/${spot.code}`)} 
                      className="shrink-0 bg-[#F3EFE6] text-[#54463a] px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-[#e8decb] active:scale-95 transition-all"
                    >
                      자세히 보기
                    </button>
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

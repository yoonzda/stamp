import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';
import dumujinImg from '../assets/dumujin.png';
import sagotImg from '../assets/sagot.png';

// Map real image paths for specific known spots
const REAL_IMAGES = {
  'STAMP_B1': dumujinImg,
  'STAMP_B2': sagotImg,
};

// Map fallback scenic keywords for unsplash images
const SPOT_KEYWORDS = {
  PLUS: 'beach,calm,ocean',
  MINUS: 'mountain,forest,climb',
  MULTIPLY: 'cliff,rock,coastal',
  DIVIDE: 'sunset,sea,horizon'
};

export default function SpotGallery() {
  const { code } = useParams();
  const navigate = useNavigate();
  const state = getGameState();
  
  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);
  const userAcquired = (state.collectedStamps || []).find(s => s.code === code);
  
  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  // Determine images to display: User's photo + 3 actual/realistic photos
  const realImage = REAL_IMAGES[code] || `https://source.unsplash.com/400x300/?${SPOT_KEYWORDS[spot.category]}`;
  const images = [
    realImage,
    `https://source.unsplash.com/400x300/?korea,landscape,${code}2`,
    `https://source.unsplash.com/400x300/?sea,island,${code}3`
  ];
  
  const displayImages = [...images];
  if (userAcquired && userAcquired.photoUrl) {
    displayImages.unshift(userAcquired.photoUrl);
  }

  return (
    <div className="w-full h-full bg-[#F3EFE6] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#F3EFE6]/90 backdrop-blur-md pt-8 pb-4 px-6 border-b border-[#e0dbcd] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-[#54463a] font-bold text-xl hover:bg-gray-50"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#3e342b] font-['Nanum_Myeongjo']">
              {spot.name}
            </h1>
            <p className="text-[#8a7a6b] text-xs mt-0.5">{spot.address}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-[#54463a] font-medium leading-relaxed bg-white p-4 rounded-xl shadow-sm border border-[#e0dbcd]">
          {spot.desc}
        </p>

        <div className="flex flex-col gap-4">
          {displayImages.map((imgUrl, idx) => (
            <div key={idx} className="w-full bg-white rounded-2xl overflow-hidden shadow-md border border-[#e0dbcd]">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <span className="font-bold text-[#3e342b] text-[0.9rem]">
                  {idx === 0 && userAcquired ? '✨ 내가 방문한 순간' : `실제 풍경 ${userAcquired ? idx : idx + 1}`}
                </span>
                {idx === 0 && userAcquired && (
                  <span className="text-[0.6rem] text-gray-500">인증됨</span>
                )}
              </div>
              <img src={imgUrl} alt={`${spot.name} 사진 ${idx}`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

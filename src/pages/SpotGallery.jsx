import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';
import dumujinImg from '../assets/dumujin.png';
import sagotImg from '../assets/sagot.png';
import kongdolImg from '../assets/kongdol.png';
import okjukdongImg from '../assets/okjukdong.png';
import simnipoImg from '../assets/simnipo.png';

// 모든 장소에 대한 고해상도 실제 사진 매핑 (직접 모델링한 사진 + 고화질 사진)
const REAL_IMAGES = {
  'STAMP_B1': dumujinImg, 'STAMP_B2': sagotImg, 'STAMP_B3': kongdolImg,
  'STAMP_B4': 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=800',
  'STAMP_B5': 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=800',
  'STAMP_C1': okjukdongImg,
  'STAMP_C2': 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=800',
  'STAMP_C3': 'https://images.unsplash.com/photo-1520962880247-9605890058f2?q=80&w=800',
  'STAMP_C4': 'https://images.unsplash.com/photo-1498062069695-037cfac4a350?q=80&w=800',
  'STAMP_Y1': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
  'STAMP_Y2': 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=800',
  'STAMP_Y3': 'https://images.unsplash.com/photo-1582299863488-2ff77c08272f?q=80&w=800',
  'STAMP_Y4': 'https://images.unsplash.com/photo-1506744626753-1fa767220280?q=80&w=800',
  'STAMP_J1': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
  'STAMP_J2': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800',
  'STAMP_J3': 'https://images.unsplash.com/photo-1473496169904-658ba37448eb?q=80&w=800',
  'STAMP_J4': 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800',
  'STAMP_D1': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800',
  'STAMP_D2': 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=800',
  'STAMP_D3': 'https://images.unsplash.com/photo-1545681146-da4ffc1555df?q=80&w=800',
  'STAMP_D4': 'https://images.unsplash.com/photo-1518556557610-85f269a94439?q=80&w=800',
  'STAMP_H1': 'https://images.unsplash.com/photo-1490906935105-09a250320a02?q=80&w=800',
  'STAMP_H2': simnipoImg,
  'STAMP_H3': 'https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=800',
  'STAMP_H4': 'https://images.unsplash.com/photo-1524275039322-a9f464010ee6?q=80&w=800',
  'STAMP_N1': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800',
  'STAMP_N2': 'https://images.unsplash.com/photo-1563200742-990a42db4d31?q=80&w=800',
  'STAMP_N3': 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=800',
  'STAMP_N4': 'https://images.unsplash.com/photo-1520286047240-da85db358509?q=80&w=800',
};

export default function SpotGallery() {
  const { code } = useParams();
  const navigate = useNavigate();
  const state = getGameState();
  
  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);
  const userAcquired = (state.collectedStamps || []).find(s => s.code === code);
  
  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  const realImage = REAL_IMAGES[code] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800';
  const images = [realImage];
  
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

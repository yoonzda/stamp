import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';
import spotImagesData from '../spotImagesArrayMap.json';
import dumujinImg from '../assets/dumujin.png';
import sagotImg from '../assets/sagot.png';
import kongdolImg from '../assets/kongdol.png';
import okjukdongImg from '../assets/okjukdong.png';
import simnipoImg from '../assets/simnipo.png';

// 주요 랜드마크 고화질 사진
const REAL_IMAGES = {
  'STAMP_B1': dumujinImg, 'STAMP_B2': sagotImg, 'STAMP_B3': kongdolImg,
  'STAMP_C1': okjukdongImg, 'STAMP_H2': simnipoImg,
};

export default function SpotGallery() {
  const { code } = useParams();
  const navigate = useNavigate();
  const state = getGameState();
  
  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);
  const userAcquired = (state.collectedStamps || []).find(s => s.code === code);
  
  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  // Combine user photo + high res generated photo + up to 10 internet searched photos
  const displayImages = [];
  
  // 1. 유저 인증 사진 최우선
  if (userAcquired && userAcquired.photoUrl) {
    displayImages.push(userAcquired.photoUrl);
  }

  // 2. 고해상도 생성 이미지 (있는 경우만)
  if (REAL_IMAGES[code]) {
    displayImages.push(REAL_IMAGES[code]);
  }

  // 3. 실제 네이버 검색 인터넷 사진들 (최대 10개)
  const internetPhotos = spotImagesData[code] || [];
  internetPhotos.forEach(imgUrl => {
    if (displayImages.length < 10) {
      // Mixed Content 방지를 위해 https로 변환
      displayImages.push(imgUrl.replace(/^http:\/\//i, 'https://'));
    }
  });

  // 万一 아무것도 없으면 기본 이미지
  if (displayImages.length === 0) {
    displayImages.push('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800');
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
              <img src={imgUrl} alt={`${spot.name} 사진 ${idx}`} className="w-full aspect-[4/3] object-cover bg-[#e0dbcd]" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

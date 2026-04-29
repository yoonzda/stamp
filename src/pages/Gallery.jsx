import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';

import spotImagesData from '../spotImagesArrayMap.json';
import dumujinImg from '../assets/dumujin.png';
import sagotImg from '../assets/sagot.png';
import kongdolImg from '../assets/kongdol.png';
import okjukdongImg from '../assets/okjukdong.png';
import simnipoImg from '../assets/simnipo.png';

const REAL_IMAGES = {
  'STAMP_B1': dumujinImg, 'STAMP_B2': sagotImg, 'STAMP_B3': kongdolImg,
  'STAMP_C1': okjukdongImg, 'STAMP_H2': simnipoImg,
};

export default function Gallery() {
  const navigate = useNavigate();
  const state = getGameState();
  const collectedSpots = state.collectedStamps || [];

  const ALL_PHOTOS = useMemo(() => {
    const photos = [];
    let idCounter = 0;

    ISLANDS.forEach(island => {
      island.spots.forEach(spot => {
        const userAcquired = collectedSpots.find(s => s.code === spot.code);
        
        // 1. User photo
        if (userAcquired && userAcquired.photoUrl) {
          photos.push({
            id: `photo_${idCounter++}`,
            url: userAcquired.photoUrl,
            spot: spot,
            island: island,
            timestamp: userAcquired.timestamp || Date.now(),
            isUser: true,
            likes: Math.floor(Math.random() * 50) + 10,
            badges: ['✨ 나의 추억 기록', '방문 인증 완료', '최고의 사진']
          });
        }

        // 2. High res real image
        if (REAL_IMAGES[spot.code]) {
          photos.push({
            id: `photo_${idCounter++}`,
            url: REAL_IMAGES[spot.code],
            spot: spot,
            island: island,
            timestamp: Date.now() - Math.random() * 5000000000 - 1000000000,
            isUser: false,
            likes: Math.floor(Math.random() * 300) + 100,
            badges: ['📸 공식 선정 사진', '풍경 맛집', '인생샷']
          });
        }

        // 3. Internet photos
        const internetPhotos = spotImagesData[spot.code] || [];
        internetPhotos.slice(0, 3).forEach(imgUrl => {
          photos.push({
            id: `photo_${idCounter++}`,
            url: imgUrl.replace(/^http:\/\//i, 'https://'),
            spot: spot,
            island: island,
            timestamp: Date.now() - Math.random() * 15000000000 - 5000000000,
            isUser: false,
            likes: Math.floor(Math.random() * 100) + 20,
            badges: ['여행자 스냅', '아름다운 순간', '숨은 명소']
          });
        });
      });
    });

    return photos.sort((a, b) => b.timestamp - a.timestamp);
  }, [collectedSpots]);

  return (
    <div className="w-full h-full bg-[#F3EFE6] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header Area */}
      <div className="px-5 pt-10 pb-5 sticky top-0 bg-[#F3EFE6]/90 backdrop-blur-md z-30 border-b border-[#e8e2d5]/50">
        <h1 className="text-[1.7rem] font-extrabold text-[#3e342b] tracking-tight mb-1">
          여행의 조각들
        </h1>
        <p className="text-[#8a7a6b] text-[0.85rem] font-medium tracking-wide">
          인천의 보석 같은 섬들에서 담아온 기록
        </p>
      </div>

      {/* Feed Layout (Pinterest Style Masonry) */}
      <div className="columns-2 gap-3 px-3 py-4">
        {ALL_PHOTOS.map((photo, idx) => (
          <div 
            key={photo.id}
            onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
            className="break-inside-avoid mb-4 cursor-pointer group"
          >
            {/* Image Container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#e8e2d5] shadow-sm">
              <img 
                src={photo.url} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                loading="lazy" 
                referrerPolicy="no-referrer"
                alt={photo.spot.name} 
              />
              
              {/* Top Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                <span className="bg-black/40 backdrop-blur-md text-white text-[0.6rem] font-medium px-2 py-0.5 rounded-full w-max flex items-center gap-1 shadow-sm">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {photo.island.name}
                </span>
                {photo.isUser && (
                  <span className="bg-[#e06a4e]/90 backdrop-blur-md text-white text-[0.55rem] font-bold px-2 py-0.5 rounded-full w-max shadow-sm">
                    ✨ MY
                  </span>
                )}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Bottom Info Area */}
            <div className="mt-1.5 px-0.5">
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

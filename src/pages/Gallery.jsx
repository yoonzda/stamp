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

      {/* Masonry Gallery Content */}
      <div className="columns-2 gap-2 px-2 py-4">
        {ALL_PHOTOS.map((photo, idx) => {
          const aspectClass = idx % 4 === 0 ? "aspect-[3/4]" : idx % 4 === 1 ? "aspect-[4/3]" : idx % 4 === 2 ? "aspect-square" : "aspect-[4/5]";
          return (
            <div 
              key={photo.id} 
              className={`mb-2 w-full bg-[#e0dbcd] relative cursor-pointer active:scale-[0.98] transition-transform overflow-hidden shadow-sm ${aspectClass} inline-block`}
              onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
            >
              <img 
                src={photo.url} 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy" 
                referrerPolicy="no-referrer"
                alt={photo.spot.name} 
              />
              {photo.isUser && (
                <div className="absolute top-2 right-2 bg-[#004790]/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center justify-center border border-white/50 shadow-sm">
                  <span className="text-white text-[0.55rem] font-bold tracking-wider">✨ MY</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

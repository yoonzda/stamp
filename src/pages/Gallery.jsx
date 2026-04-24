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
      <div className="px-6 pt-10 pb-6 sticky top-0 bg-[#F3EFE6]/90 backdrop-blur-md z-30 border-b border-[#e8e2d5]">
        <h1 className="text-[1.7rem] font-extrabold text-[#3e342b] tracking-tight font-['Nanum_Myeongjo'] mb-1">
          여행의 조각들
        </h1>
        <p className="text-[#8a7a6b] text-[0.85rem] font-medium tracking-wide">
          인천의 보석 같은 섬들에서 담아온 기록
        </p>
      </div>

      {/* Feed Layout */}
      <div className="flex flex-col gap-10 px-5 py-6">
        {ALL_PHOTOS.map((photo, idx) => (
          <div 
            key={photo.id}
            className="w-full bg-[#fcfbf9] rounded-[2rem] shadow-[0_8px_30px_rgba(62,52,43,0.08)] border border-[#f0ebe1] overflow-hidden flex flex-col transition-transform"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] bg-[#e8e2d5] overflow-hidden group">
              <img 
                src={photo.url} 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy" 
                referrerPolicy="no-referrer"
                alt={photo.spot.name} 
              />
              
              {/* Top Badges */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10 pointer-events-none">
                <div className="flex flex-col gap-2">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-full w-max flex items-center gap-1 shadow-sm border border-white/30 tracking-wide">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {photo.island.name}
                  </span>
                  {photo.isUser && (
                    <span className="bg-[#e06a4e]/90 backdrop-blur-md text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full w-max shadow-sm border border-white/20 tracking-wider">
                      ✨ MY 스탬프
                    </span>
                  )}
                </div>
              </div>
              
              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2c241b]/80 via-[#2c241b]/20 to-transparent pointer-events-none" />
              
              {/* Bottom Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end z-10 pointer-events-none">
                <h3 className="text-[1.7rem] font-bold font-['Nanum_Myeongjo'] text-white tracking-wide mb-2 drop-shadow-md">
                  {photo.spot.name}
                </h3>
                <p className="text-[0.8rem] text-white/90 leading-relaxed line-clamp-2 break-keep drop-shadow-sm font-medium">
                  {photo.spot.desc}
                </p>
              </div>
            </div>

            {/* Action Area */}
            <div className="px-6 py-5 flex items-center justify-between bg-white rounded-b-[2rem]">
              <div className="flex gap-2 flex-wrap flex-1 pr-4">
                {photo.badges.slice(0, 2).map((badge, bIdx) => (
                  <span key={bIdx} className="text-[0.65rem] text-[#8a7a6b] font-bold bg-[#f3efe6] px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                    #{badge}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
                className="shrink-0 bg-[#3e342b] text-[#f3efe6] px-5 py-3 rounded-full text-[0.85rem] font-bold tracking-widest flex items-center gap-2 active:scale-95 transition-transform shadow-md hover:bg-[#2c241b]"
              >
                <span>자세히 보기</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLANDS, getGameState } from '../gameState';
import { spotImages } from './IslandDetail';
import spotImagesData from '../spotImagesArrayMap.json';

const pseudoRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};
const BASE_DATE = 1714000000000;

export default function Gallery() {
  const navigate = useNavigate();
  const state = getGameState();
  const collectedSpots = state.collectedStamps || [];

  const ALL_PHOTOS = useMemo(() => {
    const photos = [];
    let idCounter = 1; // start at 1 for deterministic seed

    ISLANDS.forEach(island => {
      island.spots.forEach(spot => {
        const userAcquired = collectedSpots.find(s => s.code === spot.code);
        
        // 1. User photo
        if (userAcquired && userAcquired.photoUrl) {
          photos.push({
            id: `photo_${idCounter}`,
            url: userAcquired.photoUrl,
            spot: spot,
            island: island,
            timestamp: userAcquired.timestamp || BASE_DATE, // Fix Date.now() to BASE_DATE for absolute determinism
            isUser: true,
            likes: Math.floor(pseudoRandom(idCounter + 50) * 50) + 10,
            badges: ['나의 추억 기록', '방문 인증 완료']
          });
          idCounter++;
        }

        // 2. High res real image from local assets (Official Photo)
        if (spotImages[spot.code]) {
          photos.push({
            id: `photo_${idCounter}`,
            url: spotImages[spot.code],
            spot: spot,
            island: island,
            timestamp: BASE_DATE - pseudoRandom(idCounter) * 31536000000,
            isUser: false,
            likes: Math.floor(pseudoRandom(idCounter + 100) * 300) + 100,
            badges: ['공식 추천', '인생샷']
          });
          idCounter++;
        }

        // 3. User Uploaded Photos (From JSON - Actual Place Photos)
        const internetPhotos = spotImagesData[spot.code] || [];
        // Use up to 8 photos per spot to make it rich
        internetPhotos.slice(0, 8).forEach((imgUrl, i) => {
          let secureUrl = imgUrl.replace(/^http:\/\//i, 'https://');
          
          // Fix Naver SSL Certificate mismatch errors by routing through their CDN
          secureUrl = secureUrl.replace('blogfiles.naver.net', 'postfiles.pstatic.net');
          secureUrl = secureUrl.replace('cafefiles.naver.net', 'cafefiles.pstatic.net');
          secureUrl = secureUrl.replace('imgnews.naver.net', 'imgnews.pstatic.net');

          photos.push({
            id: `photo_net_${spot.code}_${i}_${idCounter}`,
            url: secureUrl,
            spot: spot,
            island: island,
            timestamp: BASE_DATE - pseudoRandom(idCounter) * 31536000000,
            isUser: false,
            likes: Math.floor(pseudoRandom(idCounter + 200) * 100) + 10,
            badges: ['여행자 스냅', '아름다운 순간']
          });
          idCounter++;
        });
      });
    });

    return photos.sort((a, b) => b.timestamp - a.timestamp);
  }, [collectedSpots]);

  const renderPhotoCard = (photo, idx) => (
    <div 
      key={photo.id}
      onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
      className="cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative w-full rounded-xl overflow-hidden bg-[#e8e2d5] shadow-sm">
        <img 
          src={photo.url} 
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
          loading="lazy" 
          referrerPolicy="no-referrer"
          alt={photo.spot.name} 
          onError={(e) => {
            const container = e.target.closest('.cursor-pointer');
            if (container) container.style.display = 'none';
          }}
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
  );

  return (
    <div className="w-full h-full bg-[#Fcfbf9] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header Area */}
      <div className="px-5 pt-10 pb-5 sticky top-0 bg-[#Fcfbf9]/90 backdrop-blur-md z-30 border-b border-[#e8e2d5]/50">
        <h1 className="text-[1.7rem] font-extrabold text-[#3e342b] tracking-tight mb-1">
          여행의 조각들
        </h1>
        <p className="text-[#8a7a6b] text-[0.85rem] font-medium tracking-wide">
          인천의 보석 같은 섬들에서 담아온 기록
        </p>
      </div>

      {/* Feed Layout (Fixed Two Columns Array mapped) */}
      <div className="flex gap-3 px-3 py-4 items-start">
        {/* Left Column (Even indices) */}
        <div className="flex-1 flex flex-col gap-4">
          {ALL_PHOTOS.map((photo, idx) => idx % 2 === 0 ? renderPhotoCard(photo, idx) : null)}
        </div>
        
        {/* Right Column (Odd indices) */}
        <div className="flex-1 flex flex-col gap-4">
          {ALL_PHOTOS.map((photo, idx) => idx % 2 === 1 ? renderPhotoCard(photo, idx) : null)}
        </div>
      </div>
    </div>
  );
}

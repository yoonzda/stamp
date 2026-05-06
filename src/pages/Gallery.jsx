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
      className="w-full h-full flex-shrink-0 snap-center relative flex flex-col justify-center items-center bg-black"
    >
      {/* Image Container */}
      <div className="w-full h-full relative flex items-center justify-center">
        <img 
          src={photo.url} 
          className="w-full h-full object-contain"
          loading="lazy" 
          referrerPolicy="no-referrer"
          alt={photo.spot.name} 
          onError={(e) => {
            const container = e.target.closest('.snap-center');
            if (container) container.style.display = 'none';
          }}
        />
        
        {/* Bottom Badges */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          {photo.isUser && (
            <span className="bg-[#e06a4e] text-white text-[0.6rem] font-bold px-2 py-0.5 w-max shadow-sm rounded-sm">
              ✨ MY
            </span>
          )}
        </div>
      </div>

      {/* Top Overlay Actions */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/90 via-black/60 to-transparent pt-12 pb-24 px-5 flex flex-col gap-5 pointer-events-auto z-20">
        {/* Spot Info */}
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">
            {photo.island.name}
          </span>
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {photo.spot.name}
          </h3>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center justify-between gap-3 w-full">
          {/* Like Button */}
          <button 
            className="flex-1 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 text-white active:scale-95 transition-all border border-white/5"
            onClick={(e) => {
              e.stopPropagation();
              const icon = e.currentTarget.querySelector('svg');
              const isLiked = icon.getAttribute('fill') !== 'none';
              
              icon.style.transform = 'scale(1.4)';
              setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);

              if (!isLiked) {
                icon.setAttribute('fill', '#ff4b4b');
                icon.setAttribute('stroke', '#ff4b4b');
              } else {
                icon.setAttribute('fill', 'none');
                icon.setAttribute('stroke', 'currentColor');
              }
            }}
          >
            <svg className="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span className="text-[0.8rem] font-medium">좋아요</span>
          </button>

          {/* Details Button */}
          <button 
            className="flex-1 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 text-white active:scale-95 transition-all border border-white/5"
            onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-[0.8rem] font-medium">자세히</span>
          </button>

          {/* Directions Button */}
          <button 
            className="flex-1 h-11 bg-[#e06a4e] hover:bg-[#c2533b] rounded-xl flex items-center justify-center gap-2 text-white active:scale-95 transition-all shadow-lg"
            onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(photo.spot.name)}`, '_blank')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span className="text-[0.8rem] font-medium tracking-wide">길찾기</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[100dvh] bg-black flex overflow-x-auto snap-x snap-mandatory hide-scrollbar font-['Pretendard'] relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Full-screen Horizontal Slide Layout */}
      {ALL_PHOTOS.map((photo, idx) => renderPhotoCard(photo, idx))}
    </div>
  );
}

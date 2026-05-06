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
      className="relative w-full"
    >
      {/* Image Container */}
      <div 
        onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: idx } })}
        className="w-full aspect-[4/5] bg-[#e8e2d5] rounded-[1.5rem] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] cursor-pointer relative"
      >
        <img 
          src={photo.url} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" 
          loading="lazy" 
          referrerPolicy="no-referrer"
          alt={photo.spot.name} 
          onError={(e) => {
            const container = e.target.closest('.relative.w-full');
            if (container) container.style.display = 'none';
          }}
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          {photo.isUser && (
            <span className="bg-[#e06a4e]/90 backdrop-blur-md text-white text-[0.65rem] font-bold px-3 py-1 rounded-full w-max shadow-sm">
              ✨ MY
            </span>
          )}
        </div>
      </div>

      {/* Like Button overlapping bottom right corner */}
      <button 
        className="absolute -bottom-3 -right-3 w-[3.5rem] h-[3.5rem] bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-[#e06a4e] active:scale-95 transition-transform z-20 border border-gray-100 group"
        onClick={(e) => {
          e.stopPropagation();
          const icon = e.currentTarget.querySelector('svg');
          if (icon.getAttribute('fill') === 'none') {
            icon.setAttribute('fill', 'currentColor');
            icon.classList.add('scale-110');
          } else {
            icon.setAttribute('fill', 'none');
            icon.classList.remove('scale-110');
          }
        }}
      >
        <svg className="w-[1.4rem] h-[1.4rem] transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span className="text-[0.6rem] font-extrabold mt-0.5 text-gray-600">{photo.likes}</span>
      </button>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#Fcfbf9] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Top Padding for Feed */}
      <div className="pt-6"></div>

      {/* Feed Layout (Single Column Large Images) */}
      <div className="flex flex-col gap-10 px-6 py-6 items-center w-full">
        {ALL_PHOTOS.map((photo, idx) => renderPhotoCard(photo, idx))}
      </div>
    </div>
  );
}

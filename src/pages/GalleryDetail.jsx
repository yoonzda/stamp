import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';
import { spotImages } from './IslandDetail';

export default function GalleryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.photos || location.state.initialIndex === undefined) {
    return <Navigate to="/gallery" replace />;
  }

  const { photos: ALL_PHOTOS, initialIndex } = location.state;
  const photo = ALL_PHOTOS[initialIndex];
  
  // 현재 장소 및 섬의 다른 사진들 (관련 핀)
  const relatedPhotos = useMemo(() => {
    const spotP = ALL_PHOTOS.filter(p => p.spot.code === photo.spot.code && p.id !== photo.id);
    const islandP = ALL_PHOTOS.filter(p => p.island.id === photo.island.id && p.spot.code !== photo.spot.code);
    
    const combined = [...spotP, ...islandP];
    const unique = [];
    const ids = new Set();
    for (const p of combined) {
      if (!ids.has(p.id)) {
        unique.push(p);
        ids.add(p.id);
      }
    }
    return unique.slice(0, 10);
  }, [ALL_PHOTOS, photo]);

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#Fcfbf9] font-['Pretendard']">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Top Fixed Nav (Back Button) */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center text-[#3e342b] bg-white/80 backdrop-blur-md rounded-full shadow-sm active:scale-95 transition-transform pointer-events-auto"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>

      {/* Scrolling Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col overflow-y-auto pb-20 scrollbar-hide">

        {/* Main Image Area (Pinterest style) */}
        <div className="w-full relative shrink-0">
          <div className="w-full rounded-b-[2.5rem] overflow-hidden bg-[#e8e2d5] relative shadow-sm">
            <img 
              src={photo.url} 
              className="w-full h-auto object-cover min-h-[300px]" 
              referrerPolicy="no-referrer"
              alt={photo.spot.name}
            />
          </div>
        </div>

        {/* Detail Content Area */}
        <div className="px-5 py-6 flex flex-col z-10">
          
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#f3efe6] flex items-center justify-center text-[1.2rem] shadow-inner">
                🏝️
              </div>
              <div>
                <p className="text-[0.9rem] font-bold text-[#3e342b]">{photo.island.name}</p>
                <p className="text-[0.7rem] text-[#8a7a6b] font-medium">{photo.isUser ? '✨ MY 스탬프' : '인천 공식 추천'}</p>
              </div>
            </div>
            
            <button 
              onClick={toggleLike}
              className={`px-5 py-3 rounded-full font-bold text-[0.9rem] transition-colors active:scale-95 shadow-sm ${liked ? 'bg-[#3e342b] text-white' : 'bg-[#e06a4e] text-white'}`}
            >
              {liked ? '저장됨' : '저장'}
            </button>
          </div>

          <h2 className="text-[1.6rem] font-bold text-[#3e342b] leading-tight mb-3 break-keep">
            {photo.spot.name}
          </h2>
          <p className="text-[0.9rem] text-[#685b4f] leading-relaxed break-keep mb-6">
            {photo.spot.desc || photo.island.description}
          </p>
          
          {/* Actions row: Download, Map */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = photo.url;
                link.download = `${photo.island.name}_${photo.spot.name}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-12 h-12 shrink-0 rounded-full bg-[#f0ebe1] flex items-center justify-center text-[#3e342b] active:scale-95 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <a 
              href={`https://map.kakao.com/link/search/${encodeURIComponent(photo.spot.name)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[#f0ebe1] flex items-center justify-center font-bold text-[#3e342b] text-[0.9rem] active:scale-95 transition-transform"
            >
              지도에서 보기
            </a>
          </div>
        </div>

        {/* Recommendations Section (Masonry) */}
        {relatedPhotos.length > 0 && (
          <div className="px-3 pb-8">
            <h3 className="text-[1.1rem] font-bold text-[#3e342b] mb-4 px-2">
              유사한 핀
            </h3>
            <div className="columns-2 gap-3">
              {relatedPhotos.map((p, idx) => (
                <div 
                  key={p.id}
                  onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: ALL_PHOTOS.findIndex(x => x.id === p.id) }, replace: true })}
                  className="break-inside-avoid mb-3 cursor-pointer group relative rounded-xl overflow-hidden bg-[#e8e2d5] shadow-sm"
                >
                  <img 
                    src={p.url} 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

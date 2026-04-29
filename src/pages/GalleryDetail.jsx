import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';
import { spotImages } from './IslandDetail';

export default function GalleryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  if (!location.state || !location.state.photos || location.state.initialIndex === undefined) {
    return <Navigate to="/gallery" replace />;
  }

  const { photos: ALL_PHOTOS, initialIndex } = location.state;
  const photo = ALL_PHOTOS[initialIndex];

  // 사진이 변경될 때마다 스크롤을 맨 위로 부드럽게 올림
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [photo.id]);
  
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
      <div ref={scrollRef} className="absolute inset-0 z-10 flex flex-col overflow-y-auto pb-20 scrollbar-hide">

        {/* Main Image Area */}
        <div className="w-full relative shrink-0">
          <div className="w-full bg-[#111111] relative shadow-sm flex items-center justify-center">
            <img 
              src={photo.url} 
              className="w-full h-auto object-contain" 
              referrerPolicy="no-referrer"
              alt={photo.spot.name}
            />
          </div>
        </div>

        {/* Detail Content Area */}
        <div className="px-5 py-6 flex flex-col z-10">
          
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#f3efe6] flex items-center justify-center text-[1.2rem] shadow-inner">
                🏝️
              </div>
              <div>
                <p className="text-[0.9rem] font-bold text-[#3e342b]">{photo.island.name}</p>
                <p className="text-[0.7rem] text-[#8a7a6b] font-medium">{photo.isUser ? '✨ MY 스탬프' : '인천 추천 명소'}</p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/island/${photo.island.id}`)}
              className="px-5 py-2.5 rounded-full font-bold text-[0.85rem] bg-[#3e342b] text-white transition-colors active:scale-95 shadow-sm flex items-center gap-1.5"
            >
              <span>자세히 보기</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          <h2 className="text-[1.8rem] font-bold text-[#3e342b] leading-tight mb-2 break-keep font-['Nanum_Myeongjo']">
            {photo.spot.name}
          </h2>
          
          <div className="flex items-center gap-1.5 text-[#a39585] mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p className="text-[0.85rem] font-medium tracking-wide">
              {photo.spot.address}
            </p>
          </div>

          <p className="text-[0.95rem] text-[#54463a] font-medium leading-relaxed break-keep mb-4 border-l-[3px] border-[#d5ccbe] pl-3">
            {photo.spot.desc}
          </p>

          <div className="bg-[#f0ebe1] rounded-xl p-4 mb-6 border border-[#e8e2d5]">
            <h4 className="text-[0.75rem] font-bold text-[#8a7a6b] mb-1.5 tracking-wider">[{photo.island.name}] 소개</h4>
            <p className="text-[0.85rem] text-[#685b4f] leading-relaxed break-keep">
              {photo.island.description}
            </p>
          </div>
          
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
              className="w-12 h-12 shrink-0 rounded-full bg-[#e8e2d5] flex items-center justify-center text-[#3e342b] active:scale-95 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <a 
              href={`https://map.kakao.com/link/search/${encodeURIComponent(photo.spot.name)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[#e8e2d5] flex items-center justify-center font-bold text-[#3e342b] text-[0.9rem] active:scale-95 transition-transform"
            >
              지도에서 위치 확인
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

import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import mapBg from '../assets/map_bg_dadora.png';

export default function GalleryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.photos || location.state.initialIndex === undefined) {
    return <Navigate to="/gallery" replace />;
  }

  const { photos: ALL_PHOTOS, initialIndex } = location.state;
  const photo = ALL_PHOTOS[initialIndex];
  
  // 현재 장소의 다른 사진들
  const spotPhotos = useMemo(() => {
    return ALL_PHOTOS.filter(p => p.spot.code === photo.spot.code && p.id !== photo.id).slice(0, 5);
  }, [ALL_PHOTOS, photo]);

  // 현재 섬의 다른 장소 사진들 (현재 장소 제외)
  const islandPhotos = useMemo(() => {
    return ALL_PHOTOS.filter(p => p.island.id === photo.island.id && p.spot.code !== photo.spot.code)
      // 장소별로 한 장씩만 유니크하게 필터링
      .reduce((acc, curr) => {
        if (!acc.find(x => x.spot.code === curr.spot.code)) acc.push(curr);
        return acc;
      }, [])
      .slice(0, 5);
  }, [ALL_PHOTOS, photo]);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(photo.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#F3EFE6] flex flex-col overflow-y-auto font-['Pretendard'] pb-20 scrollbar-hide">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={mapBg} alt="background" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
      </div>

      {/* Top Fixed Nav (Back Button) */}
      <div className="sticky top-0 left-0 right-0 p-4 z-20 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center text-[#5c5042] bg-white/50 backdrop-blur-md rounded-full shadow-sm active:scale-95 transition-transform pointer-events-auto"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>

      {/* Polaroid Image Area */}
      <div className="w-full pt-4 px-8 pb-6 relative shrink-0 z-10 flex flex-col items-center">
        <div className="w-full max-w-sm aspect-square bg-[#faf8f5] p-3 pb-12 shadow-[0_20px_40px_rgba(92,80,66,0.2)] rounded-sm rotate-[-2deg] relative">
          <div className="w-full h-full overflow-hidden bg-gray-200 shadow-inner">
            <img 
              src={photo.url} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              alt={photo.spot.name}
            />
          </div>
          {/* Polaroid Tape or Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 backdrop-blur-sm shadow-sm rotate-3 border border-white/80"></div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-[#8a7a6b] font-['Nanum_Myeongjo'] text-sm font-bold tracking-widest opacity-80">
            {photo.island.name}
          </div>
        </div>
      </div>

      {/* Detail Content Area */}
      <div className="px-6 py-4 flex flex-col z-10">
        
        {/* Title & Actions Area */}
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] leading-tight font-bold text-[#3e342b] font-['Nanum_Myeongjo'] break-keep drop-shadow-sm">
            {photo.spot.name}
          </h2>
          <p className="text-[#8a7a6b] text-[0.85rem] mt-3 font-medium tracking-wide">
            {new Date(photo.timestamp).toLocaleString('ko-KR', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
            {photo.isUser && (
              <span className="ml-2 border border-[#e06a4e] text-[#e06a4e] text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm inline-block align-middle transform -rotate-2">내 사진</span>
            )}
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Minimalist Actions (Like, Share) */}
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 active:scale-95 transition-transform ${liked ? 'text-[#e06a4e]' : 'text-[#8a7a6b]'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="text-[1.1rem] font-bold">{likesCount}</span>
            </button>

            <div className="w-px h-5 bg-[#d5ccbe]"></div>

            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: photo.spot.name, text: `${photo.spot.name}의 멋진 풍경!`, url: window.location.href });
                } else {
                  alert('공유 링크가 복사되었습니다!');
                }
              }}
              className="flex items-center justify-center text-[#8a7a6b] active:scale-95 transition-transform"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <button 
            onClick={() => navigate(`/island/${photo.island.id}`)}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 bg-[#e8dfcf]/80 backdrop-blur-sm text-[#5c5042] rounded-2xl shadow-sm border border-[#d5ccbe] active:scale-[0.98] transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="text-[0.8rem] font-bold tracking-wide">섬 탐험하기</span>
          </button>
          
          <a 
            href={`https://map.kakao.com/?eName=${encodeURIComponent(photo.spot.address || (photo.island.name + ' ' + photo.spot.name))}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 bg-[#3e342b]/90 backdrop-blur-sm text-[#f4ecdf] rounded-2xl shadow-md active:scale-[0.98] transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            <span className="text-[0.8rem] font-bold tracking-wide">길찾기</span>
          </a>
        </div>

        {/* Aesthetic Hashtags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {photo.badges.map(b => {
            const cleanText = b.replace('✨ ', '').replace('📸 ', '');
            return (
              <span key={b} className="text-[0.75rem] font-bold tracking-wide text-[#8a7a6b] bg-[#e8dfcf]/50 px-3.5 py-1.5 rounded-full border border-[#d5ccbe]/50">
                #{cleanText}
              </span>
            );
          })}
        </div>

        {/* Recommendations Section */}
        {(spotPhotos.length > 0 || islandPhotos.length > 0) && (
          <div className="border-t border-[#d5ccbe] pt-8 flex flex-col gap-8">
            
            {spotPhotos.length > 0 && (
              <div>
                <h3 className="text-[0.95rem] font-bold text-[#5c5042] font-['Nanum_Myeongjo'] mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  {photo.spot.name}의 다른 풍경
                </h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
                  {spotPhotos.map(p => (
                    <div 
                      key={p.id} 
                      className="w-28 h-28 shrink-0 rounded-xl overflow-hidden cursor-pointer bg-[#e0dbcd] shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-2 border-white active:scale-[0.97] transition-transform"
                      onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: ALL_PHOTOS.findIndex(x => x.id === p.id) }, replace: true })}
                    >
                      <img src={p.url} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {islandPhotos.length > 0 && (
              <div>
                <h3 className="text-[0.95rem] font-bold text-[#5c5042] font-['Nanum_Myeongjo'] mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {photo.island.name}의 다른 추천 장소
                </h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
                  {islandPhotos.map(p => (
                    <div 
                      key={p.id} 
                      className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#e0dbcd] shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-2 border-white relative active:scale-[0.97] transition-transform group"
                      onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: ALL_PHOTOS.findIndex(x => x.id === p.id) }, replace: true })}
                    >
                      <img src={p.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                        <p className="text-white text-[0.75rem] font-bold truncate drop-shadow-md">{p.spot.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}

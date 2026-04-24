import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

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
      
      {/* Top Fixed Nav (Back Button) */}
      <div className="sticky top-0 left-0 right-0 p-4 z-10 flex justify-between items-center pointer-events-none mix-blend-difference">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center text-white/90 active:scale-95 transition-transform pointer-events-auto"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>

      {/* Top Image Area */}
      <div className="w-full aspect-[4/5] md:aspect-[3/4] max-h-[70vh] bg-black relative shrink-0 -mt-[72px]">
        <img 
          src={photo.url} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
          alt={photo.spot.name}
        />
      </div>

      {/* Detail Content Area */}
      <div className="px-5 py-6 flex flex-col">
        
        {/* Title & Actions Area */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#8a7a6b] text-sm font-bold tracking-widest">{photo.island.name}</span>
            {photo.isUser && (
              <span className="bg-[#004790] text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm">내 사진</span>
            )}
          </div>
          <h2 className="text-[1.8rem] leading-tight font-bold text-[#3e342b] font-['Nanum_Myeongjo'] break-keep">
            {photo.spot.name}
          </h2>
          <p className="text-[#a39585] text-[0.8rem] mt-2 font-medium tracking-wide">
            {new Date(photo.timestamp).toLocaleString('ko-KR', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
          </p>

          <div className="flex items-center gap-3 mt-5">
            <a 
              href={`https://map.kakao.com/?eName=${encodeURIComponent(photo.spot.address || (photo.island.name + ' ' + photo.spot.name))}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3e342b] text-[#f4ecdf] rounded-xl shadow-md active:scale-[0.98] transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              <span className="text-[0.85rem] font-bold tracking-wide">길찾기</span>
            </a>
            
            <button 
              onClick={() => navigate(`/island/${photo.island.id}`)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#e8dfcf] text-[#5c5042] rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-[#d5ccbe] active:scale-[0.98] transition-transform"
            >
              <span className="text-[0.85rem] font-bold tracking-wide">장소 둘러보기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Minimalist Actions (Like, Share) */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-1.5 active:scale-95 transition-transform ${liked ? 'text-[#e06a4e]' : 'text-[#8a7a6b]'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="text-[1rem] font-semibold">{likesCount}</span>
            </button>

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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Aesthetic Hashtags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {photo.badges.map(b => {
            const cleanText = b.replace('✨ ', '').replace('📸 ', '');
            return (
              <span key={b} className="text-[0.7rem] font-medium text-[#5c5042] bg-white/60 px-3 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#e0dbcd]/50">
                #{cleanText}
              </span>
            );
          })}
        </div>

        {/* Recommendations Section */}
        {(spotPhotos.length > 0 || islandPhotos.length > 0) && (
          <div className="border-t border-[#e0dbcd] pt-6 mt-2 flex flex-col gap-6">
            
            {spotPhotos.length > 0 && (
              <div>
                <h3 className="text-[0.85rem] font-bold text-[#3e342b] mb-3">{photo.spot.name}의 다른 풍경</h3>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
                  {spotPhotos.map(p => (
                    <div 
                      key={p.id} 
                      className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#e0dbcd] shadow-sm border border-[#e0dbcd]/50 active:scale-[0.97] transition-transform"
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
                <h3 className="text-[0.85rem] font-bold text-[#3e342b] mb-3">{photo.island.name}의 다른 추천 장소</h3>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
                  {islandPhotos.map(p => (
                    <div 
                      key={p.id} 
                      className="w-28 h-32 shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#e0dbcd] shadow-sm border border-[#e0dbcd]/50 relative active:scale-[0.97] transition-transform"
                      onClick={() => navigate('/gallery/detail', { state: { photos: ALL_PHOTOS, initialIndex: ALL_PHOTOS.findIndex(x => x.id === p.id) }, replace: true })}
                    >
                      <img src={p.url} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                        <p className="text-white text-[0.65rem] font-bold truncate">{p.spot.name}</p>
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

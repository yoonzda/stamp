import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export default function GalleryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.photos) {
    return <Navigate to="/gallery" replace />;
  }

  const { photos: ALL_PHOTOS, initialIndex } = location.state;
  const [likedPhotos, setLikedPhotos] = useState({});

  const toggleLike = (id) => {
    setLikedPhotos(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col overflow-hidden font-['Pretendard']">
      {/* Native CSS Scroll Container for Swiping */}
      <div 
        ref={(el) => {
          // 처음에만 초기 인덱스로 스크롤
          if (el && !el.dataset.scrolled) {
            el.scrollLeft = el.clientWidth * initialIndex;
            el.dataset.scrolled = "true";
          }
        }}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar relative"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        {ALL_PHOTOS.map((photo, i) => (
          <div key={photo.id} className="min-w-full h-full snap-center flex flex-col shrink-0 relative">
            
            {/* Top Image Area */}
            <div className="relative w-full aspect-[4/5] bg-black shrink-0 flex items-center justify-center">
              <img 
                src={photo.url} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                alt={photo.spot.name}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />
              
              {/* Floating Header Inside Image */}
              <div className="absolute top-0 left-0 right-0 p-5 pt-8 flex items-center justify-between z-10 pointer-events-auto">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20 active:scale-95 transition-transform"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <span className="text-white/90 text-sm font-bold tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {i + 1} / {ALL_PHOTOS.length}
                </span>
                <div className="w-10" /> {/* Spacer to center the count */}
              </div>
            </div>

            {/* Bottom Detail Area */}
            <div className="flex-1 bg-[#F3EFE6] relative z-20 flex flex-col">

              <div className="px-6 pb-6 pt-6 overflow-y-auto hide-scrollbar flex-1 flex flex-col pointer-events-auto">
                
                {/* Location & Date */}
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#a39585] text-xs font-bold tracking-widest">{photo.island.name}</span>
                      {photo.isUser && (
                        <span className="bg-[#004790] text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-sm">내 사진</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-[#3e342b] font-['Nanum_Myeongjo']">{photo.spot.name}</h2>
                    <p className="text-[#8a7a6b] text-[0.8rem] mt-1.5 font-medium tracking-wide">
                      {new Date(photo.timestamp).toLocaleString('ko-KR', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Badges / Hashtags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {photo.badges.map(b => (
                    <span key={b} className="text-[0.75rem] font-bold text-[#3e342b] bg-[#e8dfcf] px-3 py-1.5 rounded-none border border-[#d5ccbe]">
                      #{b}
                    </span>
                  ))}
                </div>

                {/* Actions (Like, Share) */}
                <div className="flex items-center gap-5 mb-8 border-y border-[#e0dbcd] py-4">
                  <button 
                    onClick={() => toggleLike(photo.id)}
                    className={`flex items-center gap-2 active:scale-95 transition-transform ${likedPhotos[photo.id] ? 'text-[#e06a4e]' : 'text-[#8a7a6b]'}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={likedPhotos[photo.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="font-bold text-[0.95rem]">{photo.likes + (likedPhotos[photo.id] ? 1 : 0)}</span>
                  </button>

                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: photo.spot.name, text: `${photo.spot.name}의 멋진 풍경!`, url: window.location.href });
                      } else {
                        alert('공유 링크가 복사되었습니다!');
                      }
                    }}
                    className="flex items-center gap-2 text-[#8a7a6b] active:scale-95 transition-transform"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span className="font-bold text-[0.95rem]">공유</span>
                  </button>
                </div>

                {/* Go to Location Button */}
                <div className="mt-auto pt-2">
                  <button 
                    onClick={() => {
                      navigate(`/island/${photo.island.id}`);
                    }}
                    className="w-full py-4 rounded-none bg-[#3e342b] text-[#f4ecdf] font-bold tracking-widest text-[0.95rem] flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                  >
                    장소 정보 바로가기
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Swiping Hint Overlay (only visible briefly or just subtle UI) */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/50 pointer-events-none drop-shadow-md z-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/50 pointer-events-none drop-shadow-md z-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </div>
  );
}

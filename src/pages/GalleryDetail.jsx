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
  const [descOpen, setDescOpen] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatDateTime = (timestamp) => {
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const h = d.getHours();
    const min = String(d.getMinutes()).padStart(2, '0');
    const ampm = h < 12 ? 'am' : 'pm';
    const hour12 = h % 12 || 12;
    return `${yyyy}.${mm}.${dd} ${ampm}${hour12}:${min}`;
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#F3EFE6] font-['Pretendard']">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* FIXED Dynamic Blurred Background using the Spot Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src={photo.url} 
          alt="background blur" 
          className="w-full h-full object-cover opacity-60 scale-125 blur-[40px] mix-blend-multiply" 
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#F3EFE6]/40"></div>
      </div>

      {/* Scrolling Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col overflow-y-auto pb-20 scrollbar-hide">

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
          
          {/* Hashtags inside Polaroid */}
          <div className="absolute bottom-3 left-0 right-0 flex flex-wrap justify-center gap-1.5 px-2">
            {photo.badges.map(b => {
              const cleanText = b.replace('✨ ', '').replace('📸 ', '');
              return (
                <span key={b} className="text-[0.65rem] font-bold text-[#8a7a6b] bg-[#e8dfcf]/60 px-2 py-0.5 rounded-full shadow-sm">
                  #{cleanText}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Content Area */}
      <div className="px-6 py-4 flex flex-col z-10">
        
        {/* Title & Actions Area */}
        <div className="mb-8 text-center">
          
          {/* Island Name with Cute Icon */}
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-1">
              {/* Sun */}
              <circle cx="18" cy="8" r="3" fill="#FFB02E" />
              {/* Back Mountain */}
              <path d="M8 16L12 8L17 16H8Z" fill="#8BB080" />
              {/* Front Island/Mountain */}
              <path d="M3 16L6.5 10L10.5 16H3Z" fill="#6A8F5D" />
              <path d="M11 16L14.5 11L19.5 16H11Z" fill="#789E6B" />
              {/* Sea/Waves */}
              <path d="M2 17.5C4 17.5 5 18.5 7.5 18.5C10 18.5 11 17.5 13.5 17.5C16 17.5 17 18.5 19.5 18.5C22 18.5 23 17.5 23 17.5" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 20.5C6 20.5 7 21.5 9.5 21.5C12 21.5 13 20.5 15.5 20.5C18 20.5 19 21.5 21.5 21.5" stroke="#7CB1EA" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#685b4f] text-[1.15rem] tracking-wider pt-1" style={{ fontFamily: "'EF_jejudoldam', sans-serif" }}>
              {photo.island.name}
            </span>
          </div>

          <h2 className="text-[2.2rem] leading-tight font-bold text-[#3e342b] font-['Nanum_Myeongjo'] break-keep drop-shadow-sm">
            {photo.spot.name}
          </h2>
          <p className="text-[#8a7a6b] text-[0.85rem] mt-3 font-medium tracking-wide flex justify-center items-center gap-2">
            <span>{formatDateTime(photo.timestamp)}</span>
            {photo.isUser && (
              <span className="border border-[#e06a4e] text-[#e06a4e] text-[0.6rem] font-bold px-1.5 py-0.5 rounded-sm inline-block transform -rotate-2">내 사진</span>
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

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-6">
          <a 
            href={`https://map.kakao.com/link/search/${encodeURIComponent(photo.island.name + ' ' + photo.spot.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#FAE100] text-[#3e342b] rounded-2xl shadow-sm active:scale-[0.98] transition-transform font-bold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.51-10 7.84 0 2.8 1.83 5.25 4.61 6.55l-1 3.65c-.1.38.3.69.65.51l4.18-2.73c.5.05 1.02.08 1.56.08 5.52 0 10-3.51 10-7.84S17.52 3 12 3z"/>
            </svg>
            <span className="text-[0.85rem] tracking-wide">카카오맵</span>
          </a>
          
          <a 
            href={`https://map.naver.com/v5/search/${encodeURIComponent(photo.island.name + ' ' + photo.spot.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#03C75A] text-white rounded-2xl shadow-sm active:scale-[0.98] transition-transform font-bold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.14 24L7.86 12.35V24H0V0h7.86L16.14 11.65V0H24v24h-7.86z"/>
            </svg>
            <span className="text-[0.85rem] tracking-wide">네이버 지도</span>
          </a>
        </div>

        {/* Island Description Accordion */}
        <div className="mb-8 border border-[#d5ccbe] rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <button 
            onClick={() => setDescOpen(!descOpen)}
            className="w-full flex items-center justify-between p-4 text-[#5c5042] font-['Nanum_Myeongjo'] font-bold text-[0.95rem] active:bg-[#e8dfcf]/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              {photo.island.name} 이야기
            </span>
            <svg 
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
              className={`transition-transform duration-300 ${descOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${descOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 pt-0 text-[0.85rem] text-[#685b4f] leading-relaxed break-keep border-t border-[#d5ccbe]/50">
              {photo.island.description}
            </div>
          </div>
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
      
      </div> {/* End Scrolling Content Container */}
    </div>
  );
}

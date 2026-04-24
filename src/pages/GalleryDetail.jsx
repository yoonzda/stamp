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
      
      {/* FIXED Dynamic Blurred Background using the Spot's Watercolor Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src={spotImages[photo.spot.code] || photo.url} 
          alt="background blur" 
          className="w-full h-full object-cover opacity-100 scale-110 blur-[30px]" 
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#F3EFE6]/50"></div>
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
          
          {/* Island Name with Elegant Icon */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#685b4f]">
              <circle cx="18" cy="6" r="3" />
              <path d="M2 18L7 9l4 5 3-4 6 8" />
              <path d="M2 22h20" strokeDasharray="4 4" />
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
            {/* Minimalist Actions (Like, Download, Share) */}
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 active:scale-95 transition-transform ${liked ? 'text-[#e06a4e]' : 'text-[#8a7a6b]'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <div className="w-px h-5 bg-[#d5ccbe]"></div>

            {/* Download Button */}
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = photo.url;
                link.download = `${photo.island.name}_${photo.spot.name}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center justify-center text-[#8a7a6b] active:scale-95 transition-transform"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>

            <div className="w-px h-5 bg-[#d5ccbe]"></div>

            {/* Share Button */}
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
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-6">
          <a 
            href={`https://map.kakao.com/?eName=${encodeURIComponent(photo.island.name + ' ' + photo.spot.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#FAE100] text-[#3e342b] rounded-2xl shadow-sm active:scale-[0.98] transition-transform font-bold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.51-10 7.84 0 2.8 1.83 5.25 4.61 6.55l-1 3.65c-.1.38.3.69.65.51l4.18-2.73c.5.05 1.02.08 1.56.08 5.52 0 10-3.51 10-7.84S17.52 3 12 3z"/>
            </svg>
            <span className="text-[0.85rem] tracking-wide">카카오맵</span>
          </a>
          
          <a 
            href={`https://map.naver.com/index.nhn?menu=route&ename=${encodeURIComponent(photo.island.name + ' ' + photo.spot.name)}&pathType=0`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#03C75A] text-white rounded-2xl shadow-sm active:scale-[0.98] transition-transform font-bold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.14 24L7.86 12.35V24H0V0h7.86L16.14 11.65V0H24v24h-7.86z"/>
            </svg>
            <span className="text-[0.85rem] tracking-wide">네이버 지도</span>
          </a>
        </div>

        {/* Island Description Text */}
        <div className="mb-10 px-2 text-[0.85rem] text-[#685b4f] leading-relaxed break-keep">
          <p className="font-bold text-[0.95rem] text-[#3e342b] mb-4 leading-tight flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            {photo.island.name} 이야기
          </p>
          <p className="mb-5">{photo.island.description}</p>
          <div className="space-y-4">
            {photo.island.spots.map(spot => (
              <div key={spot.id} className="pl-3 border-l-[3px] border-[#d5ccbe]">
                <strong className="text-[#5c5042] block mb-0.5">{spot.name}</strong>
                <span className="text-[#8a7a6b] leading-tight text-[0.8rem]">{spot.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        {(spotPhotos.length > 0 || islandPhotos.length > 0) && (
          <div className="border-t border-[#d5ccbe] pt-8 flex flex-col gap-8">
            
            {spotPhotos.length > 0 && (
              <div>
                <h3 className="text-[0.95rem] font-bold text-[#5c5042] font-['Nanum_Myeongjo'] mb-4">
                  <span className="text-[#e06a4e] font-extrabold mr-1">{photo.spot.name}</span>의 다른 풍경
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
                <h3 className="text-[0.95rem] font-bold text-[#5c5042] font-['Nanum_Myeongjo'] mb-4">
                  <span className="text-[#e06a4e] font-extrabold mr-1">{photo.island.name}</span>의 다른 추천 장소
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

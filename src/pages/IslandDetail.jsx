import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ISLANDS, SYMBOLS } from '../gameState';
import { motion, AnimatePresence } from 'framer-motion';
import SymbolIcon from '../components/SymbolIcon';

import jawolMap from '../assets/map_jawol.png';
import daecheongMap from '../assets/map_daecheong.png';
import yeonpyeongMap from '../assets/map_yeonpyeong.png';
import baengnyeongMap from '../assets/map_baengnyeong.png';
import deokjeokMap from '../assets/map_deokjeok.png';
import yeongheungMap from '../assets/map_yeongheung.png';
import jangbongMap from '../assets/map_jangbong.png';

import yeonpyeong_y1 from '../assets/yeonpyeong_y1.png';
import yeonpyeong_y2 from '../assets/yeonpyeong_y2.png';
import yeonpyeong_y3 from '../assets/yeonpyeong_y3.png';
import yeonpyeong_y4 from '../assets/yeonpyeong_y4.png';

const spotImages = {
  STAMP_Y1: yeonpyeong_y1,
  STAMP_Y2: yeonpyeong_y2,
  STAMP_Y3: yeonpyeong_y3,
  STAMP_Y4: yeonpyeong_y4,
};

export default function IslandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const island = ISLANDS.find(i => i.id === id);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [galleryCount, setGalleryCount] = useState(6);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth > 448 ? 448 : window.innerWidth);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  // 동적 애니메이션 타이밍 계산
  const nameLen = selectedSpot ? selectedSpot.spot.name.length : 0;
  const typingStartDelay = 0.8; // 글씨 시작을 좀 더 뒤에 시작되게 (0.4 -> 0.8)
  const typingSpeed = 0.22; // 천천히 타닥타닥 써지도록 속도 늦춤
  const textHoldTime = 0.7; // 다 써진 후 살짝 머무는 시간 추가
  const textFadeOutDuration = 0.3; // 텍스트가 사라지는데 걸리는 시간
  const circleDuration = 1.0; // 원 축소 속도 (체감상 더 빠르게)

  // 마지막 글자가 나타나는 정확한 시간
  const lastCharAppearsAt = nameLen > 0 ? typingStartDelay + ((nameLen - 1) * typingSpeed) : typingStartDelay;
  
  // 텍스트가 페이드아웃 되기 시작하는 시간
  const textFadeOutDelay = lastCharAppearsAt + textHoldTime;
  
  // 글씨가 완전히 사라지고(fadeOut완료) 즉각적으로 원 축소 시작 -> 글씨가 사라짐과 동시에 원 축소 시작
  const circleStartDelay = textFadeOutDelay; 
  const contentRevealDelay = circleStartDelay + circleDuration;

  useEffect(() => {
    if (selectedSpot) {
      setIsScrollLocked(true);
      // 애니메이션이 모두 끝난 후 스크롤 락 해제
      const timer = setTimeout(() => setIsScrollLocked(false), contentRevealDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedSpot, contentRevealDelay]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setContainerWidth(Math.min(window.innerWidth, 448));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const finalRadius = containerWidth * 0.30; // 60% of container width diameter
  const finalDiameter = finalRadius * 2;

  if (!island) return <div className="p-10 text-center">섬을 찾을 수 없습니다.</div>;

  let bgImg = '';
  if (id === 'jawol') bgImg = jawolMap;
  else if (id === 'daecheong') bgImg = daecheongMap;
  else if (id === 'yeonpyeong') bgImg = yeonpyeongMap;
  else if (id === 'baengnyeong') bgImg = baengnyeongMap;
  else if (id === 'deokjeok') bgImg = deokjeokMap;
  else if (id === 'yeongheung') bgImg = yeongheungMap;
  else if (id === 'jangbong') bgImg = jangbongMap;

  return (
    <div className="w-full h-full relative bg-transparent font-['Pretendard'] overflow-hidden">
      
      {/* Fixed Back Button for Island Detail Page */}
      <div className="absolute top-5 left-5 z-40">
        <button 
          onClick={() => navigate('/')}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/60 text-[#3e342b] shadow-sm backdrop-blur-md pointer-events-auto transition-transform active:scale-95 border border-white/50"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>

      <div className="w-full h-full overflow-y-auto pb-24 hide-scrollbar">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {/* Top Content: Fully Visible Thumbnail seamlessly fading into the background */}
        <div 
          className="relative w-full aspect-[4/4.5] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
          }}
        >
          {/* scale-[1.15] automatically crops out the artificial torn paper margins around the generated maps */}
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply transform scale-[1.15]" 
            style={{ backgroundImage: `url(${bgImg})` }} 
          />
        </div>

        {/* Text Area */}
        <div className="w-full pb-4 flex flex-col items-center justify-center relative -mt-10">
          <h1 className="text-4xl font-bold text-[#3e342b] font-['Nanum_Myeongjo'] mb-3 tracking-widest text-center">
            {island.name}
          </h1>
          <div className="w-12 h-[2px] bg-[#d5ccbe] rounded-full mb-4" />
          <p className="text-[#685b4f] text-center text-[0.85rem] leading-relaxed break-keep font-['Nanum_Myeongjo'] px-6">
            {island.description}
          </p>
        </div>

        {/* Spot List */}
        <div className="w-full px-5 mt-4">


          <div className="space-y-4">
            {island.spots.map(spot => {
              const sym = SYMBOLS[spot.category];
              return (
                <div 
                  key={spot.id} 
                  onClick={() => { setSelectedSpot({ spot, sym }); setGalleryCount(6); }}
                  className="bg-white/80 backdrop-blur-md p-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-white flex items-center relative overflow-hidden transition-transform active:scale-95 cursor-pointer rounded-none"
                >
                  {/* Spot Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      {/* Integrated Badge Icon */}
                      <div 
                        className="w-[1.125rem] h-[1.125rem] rounded-full flex items-center justify-center shrink-0 shadow-sm"
                        style={{ backgroundColor: sym.color }}
                      >
                        <span className="w-[0.7rem] h-[0.7rem] flex items-center justify-center text-white">
                          <SymbolIcon type={sym.id} />
                        </span>
                      </div>
                      <span className="text-[0.65rem] text-[#8a7a6b] font-medium tracking-tight truncate">{sym.desc}</span>
                    </div>
                    <h3 className="font-extrabold text-[#3e342b] text-[1.1rem] truncate font-['Nanum_Myeongjo'] mb-1">
                      {spot.name}
                    </h3>
                    <p className="text-[0.8rem] text-[#8a7a6b] leading-relaxed line-clamp-2 break-keep pr-2">
                      {spot.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spot Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-[#f3efe6] overflow-hidden"
          >
            {/* Fixed Buttons Layer inside Modal (Always stays on top of scroll) */}
            <div className="absolute inset-0 pointer-events-none z-50">
              {/* Close / Back Button (Top Left) */}
              <button 
                onClick={() => setSelectedSpot(null)}
                className="absolute top-5 left-5 w-11 h-11 rounded-full flex items-center justify-center bg-white/60 text-[#3e342b] shadow-sm backdrop-blur-md pointer-events-auto active:scale-95 transition-transform border border-white/50"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              {/* Floating Camera Button (Bottom Left) */}
              <button 
                onClick={() => navigate(`/photo-verify/${selectedSpot.spot.code}`)}
                className="absolute bottom-6 left-5 w-16 h-16 rounded-full flex items-center justify-center bg-[#e06a4e] text-white shadow-[0_4px_15px_rgba(224,106,78,0.3)] pointer-events-auto active:scale-95 transition-transform border border-white/20"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </button>
            </div>

            {/* SCROLLING CONTAINER */}
            <div className={`absolute inset-0 z-10 hide-scrollbar ${isScrollLocked ? 'overflow-hidden' : 'overflow-y-auto'}`}>
              
              {/* 100vh HERO SECTION (Image + Iris Mask + Text Overlays) */}
              <div className="relative w-full h-[100dvh] shrink-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img 
                    src={spotImages[selectedSpot.spot.code] || bgImg} 
                    alt={selectedSpot.spot.name} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  />
                </div>

                {/* Cinematic Typewriter Title */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: textFadeOutDelay, duration: 0.3 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none drop-shadow-[1px_2px_6px_rgba(0,0,0,0.8)]"
                >
                  <h1 
                    className="text-[2.5rem] text-[#f3efe6] tracking-widest flex"
                    style={{ fontFamily: "'EF_jejudoldam', sans-serif" }}
                  >
                    {Array.from(selectedSpot.spot.name).map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: typingStartDelay + (index * typingSpeed), duration: 0.01 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>

                {/* SVG Mask Overlay for Iris Wipe */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                  <defs>
                    <mask id="holeMask">
                      <rect width="100%" height="100%" fill="white" />
                      <motion.circle 
                        cx="50%" 
                        cy="50%" 
                        initial={{ r: 600 }}
                        animate={{ r: finalRadius }}
                        transition={{ duration: circleDuration, ease: "easeInOut", delay: circleStartDelay }}
                        fill="black" 
                      />
                    </mask>
                  </defs>
                  <rect width="100%" height="100%" fill="#f3efe6" mask="url(#holeMask)" />
                </svg>

                {/* Inner Shadow Overlay for Window Effect (Shrinks with the Mask) */}
                <motion.div
                  initial={{ width: 1200, height: 1200 }}
                  animate={{ width: finalDiameter, height: finalDiameter }}
                  transition={{ duration: circleDuration, ease: "easeInOut", delay: circleStartDelay }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 pointer-events-none"
                  style={{ boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.15)' }}
                />

                {/* Text Overlays (Fades in after circle finishes shrinking) */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentRevealDelay, duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 z-20 pointer-events-none flex flex-col"
                >
                  {/* TOP AREA: Title & Description */}
                  <div className="flex-1 flex flex-col items-center justify-end text-center px-8 w-full pb-4">
                    <h2 className="text-[1.8rem] font-bold text-[#3e342b] mb-2 font-['Nanum_Myeongjo'] tracking-wide break-keep">
                      {selectedSpot.spot.name}
                    </h2>
                    <div className="w-12 h-[2px] bg-[#d5ccbe] rounded-full mb-3" />
                    <p className="text-[0.95rem] font-medium text-[#685b4f] leading-relaxed break-keep">
                      {selectedSpot.spot.desc}
                    </p>
                  </div>

                  {/* Spacer jumping over the circle */}
                  <div className="shrink-0" style={{ height: finalDiameter }} />

                  {/* BOTTOM AREA: Address & Map Buttons */}
                  <div className="flex-1 flex flex-col items-center justify-start w-full pt-6 px-8 pointer-events-auto">
                    <div className="flex items-center gap-1.5 text-[#a39585] mb-6">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <p className="text-[0.8rem] font-medium tracking-wide">
                        {selectedSpot.spot.address}
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 w-full justify-center">
                      
                      {/* Kakao Map Button */}
                      <button 
                        onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURIComponent(selectedSpot.spot.name)}`, '_blank')}
                        className="flex-1 max-w-[140px] h-[3.2rem] rounded-full bg-[#fced9f] text-[#5e5318] font-bold text-[0.85rem] tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-colors hover:bg-[#fae687]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3c-5.523 0-10 3.51-10 7.846 0 2.81 1.765 5.27 4.417 6.643-.45 1.637-.62 2.302-.638 2.378-.027.118.046.126.113.082.083-.054 2.656-1.745 3.73-2.522.757.142 1.55.219 2.378.219 5.523 0 10-3.51 10-7.846C22 6.51 17.523 3 12 3z" />
                        </svg>
                        <span>카카오맵</span>
                      </button>
                      
                      {/* Naver Map Button */}
                      <button 
                        onClick={() => window.open(`https://map.naver.com/v5/directions/-/${encodeURIComponent(selectedSpot.spot.name)},-/transit?c=15,0,0,0,dh`, '_blank')}
                        className="flex-1 max-w-[140px] h-[3.2rem] rounded-full bg-[#cbebd6] text-[#1b6b37] font-bold text-[0.85rem] tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-colors hover:bg-[#b8e3c6]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.273 12.845 7.376 0H0v24h7.726V11.146L16.634 24H24V0h-7.727v12.845Z" />
                        </svg>
                        <span>네이버지도</span>
                      </button>

                    </div>
                  </div>
                </motion.div>

                {/* Scroll Down Indicator (Arrow Icon) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: contentRevealDelay, duration: 0.8 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
                >
                  <motion.div 
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="opacity-80 drop-shadow-sm"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a39585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="4" x2="12" y2="20"></line>
                      <polyline points="19 13 12 20 5 13"></polyline>
                    </svg>
                  </motion.div>
                </motion.div>

              </div>

              {/* GALLERY AREA (Scrolls naturally below the 100vh hero) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: contentRevealDelay, duration: 0.8 }}
                className="w-full px-8 pb-24 flex flex-col items-center relative z-20 pt-4"
              >
                <div className="grid grid-cols-2 gap-3 w-full">
                  {[...Array(galleryCount)].map((_, i) => (
                    <div key={i} className="aspect-square bg-[#f0ebe1] rounded-xl flex flex-col items-center justify-center border border-[#e8e2d5] shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d5ccbe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setGalleryCount(prev => prev + 6)}
                  className="mt-8 px-8 py-3.5 rounded-full border border-[#8a7a6b] text-[#8a7a6b] font-bold text-[0.85rem] tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                  <span>LOAD MORE</span>
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @font-face {
          font-family: 'EF_jejudoldam';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}

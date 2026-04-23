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

export default function IslandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const island = ISLANDS.find(i => i.id === id);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          
          {/* Floating Back Button */}
          <div className="absolute top-0 inset-x-0 p-5 z-40 flex justify-between items-start pointer-events-none">
            <button 
              onClick={() => navigate('/')}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/60 text-[#3e342b] shadow-sm backdrop-blur-md pointer-events-auto transition-transform active:scale-95 border border-white/50"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          </div>
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
          <div className="flex justify-between items-end mb-4 pr-1">
            <div className="flex items-center gap-2 pl-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a39585" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <h2 className="text-[1.05rem] font-bold text-[#54463a] tracking-wide">
                수집 장소
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {island.spots.map(spot => {
              const sym = SYMBOLS[spot.category];
              return (
                <div 
                  key={spot.id} 
                  onClick={() => setSelectedSpot({ spot, sym })}
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

      {/* Spot Detail Poetic Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[#2a241f]/95 backdrop-blur-md text-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedSpot(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="flex flex-col items-center w-full max-w-sm"
            >
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-8 border border-dashed relative z-10 shrink-0" 
                style={{ borderColor: selectedSpot.sym.color }}
              >
                <div className="absolute inset-0 opacity-20 rounded-full mix-blend-screen" style={{ backgroundColor: selectedSpot.sym.color }} />
                <span className="relative z-10 w-12 h-12 flex items-center justify-center drop-shadow-lg" style={{ color: selectedSpot.sym.color }}>
                  <SymbolIcon type={selectedSpot.sym.id} />
                </span>
              </div>

              <h2 className="text-[1.6rem] font-bold text-[#f4ecdf] mb-4 font-['Nanum_Myeongjo'] drop-shadow-sm tracking-wide break-keep">
                {selectedSpot.spot.name}
              </h2>
              
              <p className="text-[0.95rem] font-medium text-[#c4baa8] mb-6 leading-relaxed max-w-[14rem] break-keep relative">
                {selectedSpot.spot.desc}
              </p>

              <div className="w-8 h-[1px] bg-[#a39585]/40 mb-6" />

               <p className="text-[0.8rem] text-[#a39585] mb-10 font-medium tracking-wide">
                {selectedSpot.spot.address}
              </p>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => navigate(`/photo-verify/${selectedSpot.spot.code}`)}
                  className="w-full bg-[#8a7a6b] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md border-b-4 border-[#685b4f]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  사진 찍고 스탬프 받기
                </button>
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURIComponent(selectedSpot.spot.name)}`, '_blank')}
                    className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3 font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                  >
                    카카오맵 길찾기
                  </button>
                  <button 
                    onClick={() => window.open(`https://map.naver.com/v5/directions/-/${encodeURIComponent(selectedSpot.spot.name)},-/transit?c=15,0,0,0,dh`, '_blank')}
                    className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3 font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                  >
                    네이버지도 길찾기
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setSelectedSpot(null)}
                className="mt-8 text-[#a39585] text-[0.85rem] font-bold underline underline-offset-4 hover:text-[#f4ecdf] tracking-widest"
              >
                메뉴 닫기
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

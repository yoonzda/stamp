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

      {/* Spot Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-[#fcfbf9] overflow-hidden"
          >
            {/* Fixed Background Image with Iris Wipe Animation */}
            <motion.div
              initial={{ clipPath: 'circle(150% at 50% 50%)' }}
              animate={{ clipPath: 'circle(140px at 50% 50%)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <img 
                src={spotImages[selectedSpot.spot.code] || bgImg} 
                alt={selectedSpot.spot.name} 
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </motion.div>

            {/* Content Area (Fades in after image animation) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="relative z-10 px-8 flex flex-col w-full h-full pt-[calc(50vh+160px)]"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <h2 className="text-[1.8rem] font-bold text-[#3e342b] mb-3 font-['Nanum_Myeongjo'] tracking-wide break-keep">
                  {selectedSpot.spot.name}
                </h2>
                <div className="w-12 h-[2px] bg-[#d5ccbe] rounded-full mb-4" />
                <p className="text-[0.95rem] font-medium text-[#685b4f] mb-4 leading-relaxed break-keep">
                  {selectedSpot.spot.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[#a39585]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <p className="text-[0.8rem] font-medium tracking-wide">
                    {selectedSpot.spot.address}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 w-full mt-auto mb-8 justify-center">
                <button 
                  onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURIComponent(selectedSpot.spot.name)}`, '_blank')}
                  className="flex-1 max-w-[140px] bg-[#FEE500] text-[#000000] py-3.5 rounded-xl font-bold text-[0.9rem] active:scale-95 transition-transform flex justify-center items-center gap-2 shadow-sm border border-black/5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-5.523 0-10 3.5-10 7.82 0 2.76 1.83 5.17 4.6 6.5l-1.16 4.3c-.06.23.16.42.36.3l3.87-2.62c.74.2 1.53.3 2.33.3 5.523 0 10-3.5 10-7.82S17.523 3 12 3z"/></svg>
                  길찾기
                </button>
                <button 
                  onClick={() => window.open(`https://map.naver.com/v5/directions/-/${encodeURIComponent(selectedSpot.spot.name)},-/transit?c=15,0,0,0,dh`, '_blank')}
                  className="flex-1 max-w-[140px] bg-[#03C75A] text-white py-3.5 rounded-xl font-bold text-[0.9rem] active:scale-95 transition-transform flex justify-center items-center gap-2 shadow-sm border border-black/5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.8 3H21v18h-4.2l-5.4-8.1v8.1H7.2V3h4.2l5.4 8.1V3z"/></svg>
                  길찾기
                </button>
              </div>
            </motion.div>

            {/* Floating Camera Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => navigate(`/photo-verify/${selectedSpot.spot.code}`)}
              className="absolute bottom-8 left-6 w-[3.5rem] h-[3.5rem] bg-[#3e342b] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-30 border border-[#685b4f]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </motion.button>

            {/* Close / Back Button */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setSelectedSpot(null)}
              className="absolute top-6 left-6 text-[#3e342b] font-bold text-sm active:scale-95 transition-transform z-30 flex items-center gap-1 drop-shadow-sm bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              뒤로가기
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

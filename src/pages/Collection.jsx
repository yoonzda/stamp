import React, { useState } from 'react';
import { getGameState, SYMBOLS, ISLANDS, getAvailableCoupons } from '../gameState';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SymbolIcon from '../components/SymbolIcon';

export default function Collection() {
  const state = getGameState();
  const stamps = state.collectedStamps || [];
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const couponsAvailable = getAvailableCoupons(state);

  const getMissingSymbols = () => {
    const counts = { PLUS: 0, MINUS: 0, MULTIPLY: 0, DIVIDE: 0 };
    stamps.forEach(s => {
      const spot = ISLANDS.flatMap(i => i.spots).find(spot => spot.code === s.code);
      if (spot) counts[spot.category]++;
    });
    const currentCompleted = Math.min(counts.PLUS, counts.MINUS, counts.MULTIPLY, counts.DIVIDE);
    const needed = [];
    if (counts.PLUS <= currentCompleted) needed.push('더하기');
    if (counts.MINUS <= currentCompleted) needed.push('빼기');
    if (counts.MULTIPLY <= currentCompleted) needed.push('곱하기');
    if (counts.DIVIDE <= currentCompleted) needed.push('나누기');
    return needed;
  };

  const missingSymbols = getMissingSymbols();

  const handleShare = (spot) => {
    if (navigator.share) {
      navigator.share({
        title: '옹진 명소 수집',
        text: `제가 아름다운 옹진군의 [${spot.name}]에 방문해서 특별한 스탬프를 얻었어요! 함께 구경해볼까요?`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`[공유 복사됨] 아름다운 옹진군의 [${spot.name}]에 방문해서 특별한 스탬프를 획득했습니다!`);
    }
  };

  const renderBoardingPass = (spot, island, isDone, sym, idx) => {
    const destCode = spot.code.split('_')[1]; // e.g. B1
    const origCode = 'ONG'; // Ongjin

    return (
      <motion.button 
        key={spot.code}
        onClick={() => setSelectedSpot({ spot, isDone, sym })}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        whileTap={{ scale: 0.97 }}
        transition={{ delay: (idx % 4) * 0.05, type: 'spring' }}
        className="w-full h-[8.5rem] bg-white rounded-[0.8rem] shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex flex-row relative overflow-hidden text-left border border-[#e8dfcf]"
      >
        {/* LEFT SECTION - Info */}
        <div className="flex-1 px-4 py-3.5 flex flex-col justify-between relative">
          {/* Header */}
          <div className="flex justify-between items-center opacity-60">
            <span className="text-[0.6rem] font-bold tracking-widest text-[#3e342b]">STAMP TICKET</span>
            <span className="text-[0.6rem] font-bold tracking-widest text-[#3e342b]">ONGJIN</span>
          </div>

          {/* Route: ONG -> B1 with Symbol */}
          <div className="flex items-center justify-between w-full pr-1 my-1">
            <div className="flex flex-col">
              <span className="text-[2.2rem] leading-none font-black text-[#a39585] tracking-tighter">{origCode}</span>
              <span className="text-[0.55rem] text-[#a39585] mt-1 font-medium">Ongjin, Korea</span>
            </div>
            
            <div className="flex items-center justify-center pb-[0.35rem]">
              <span className="text-[1.75rem] font-black" style={{ color: sym.color }}>{sym.icon}</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[2.2rem] leading-none font-black text-[#3e342b] tracking-tighter">{destCode}</span>
              <span className="text-[0.55rem] text-[#3e342b] mt-1 font-bold">{island.name}</span>
            </div>
          </div>

          {/* Spot Name & Barcode */}
          <div className="flex flex-col mt-auto">
            <div className="flex justify-between items-end pr-1 mb-1.5">
               <span className="text-[0.65rem] font-bold text-[#a39585]">Destination</span>
               <span className="text-[0.8rem] font-extrabold text-[#3e342b] truncate max-w-[8rem] text-right">{spot.name}</span>
            </div>
            
            <div className="h-[0.85rem] flex items-center opacity-[0.4] w-full">
              {/* Fake Barcode lines */}
              <div className="w-1 h-full bg-black mr-[3px]"></div>
              <div className="w-[2px] h-full bg-black mr-[3px]"></div>
              <div className="w-1.5 h-full bg-black mr-[2px]"></div>
              <div className="w-[1px] h-full bg-black mr-[4px]"></div>
              <div className="w-1 h-full bg-black mr-[2px]"></div>
              <div className="w-2 h-full bg-black mr-[3px]"></div>
              <div className="w-[2px] h-full bg-black mr-[2px]"></div>
              <div className="w-1 h-full bg-black mr-[1px]"></div>
              <div className="w-[2px] h-full bg-black mr-[4px]"></div>
              <div className="w-1.5 h-full bg-black mr-[2px]"></div>
              <div className="w-1 h-full bg-black mr-[3px]"></div>
              <div className="w-[1px] h-full bg-black mr-[2px]"></div>
              <div className="w-2 h-full bg-black mr-[2px]"></div>
              <div className="w-1 h-full bg-black mr-[1px]"></div>
              <div className="w-[2px] h-full bg-black mr-[3px]"></div>
              <div className="w-1 h-full bg-black mr-[1px]"></div>
              <div className="w-1.5 h-full bg-black mr-[2px]"></div>
              <div className="w-1 h-full bg-black mr-[2px]"></div>
              <div className="w-[2px] h-full bg-black mr-[3px]"></div>
              <div className="w-[1px] h-full bg-black mr-[2px]"></div>
              <div className="w-1 h-full bg-black"></div>
            </div>
          </div>
        </div>

        {/* PERFORATED LINE & CUTOUTS */}
        <div className="relative w-0 flex flex-col justify-between items-center z-10 h-[8.5rem]">
          <div className="w-5 h-5 bg-[#f2ede4] rounded-full absolute -top-2.5 -translate-x-1/2 border-b border-[#e8dfcf]"></div>
          <div className="h-full border-l-[1.5px] border-dashed border-[#d5ccbe] opacity-50"></div>
          <div className="w-5 h-5 bg-[#f2ede4] rounded-full absolute -bottom-2.5 -translate-x-1/2 border-t border-[#e8dfcf]"></div>
        </div>

        {/* RIGHT SECTION - Badge */}
        <div className="w-[6.8rem] bg-[#faf8f5] flex flex-col items-center justify-start pt-3 pb-2 px-1 relative">
          <span className="text-[0.45rem] font-bold text-[#8a7f72] tracking-widest text-center leading-tight mb-2">
            {island.name}<br/>{spot.name}
          </span>

          {/* Airplane Window Badge Render */}
          <div className={`relative w-[4.4rem] h-[5.6rem] rounded-[1.8rem] rounded-b-[2rem] border-[2px] flex items-center justify-center overflow-hidden transition-all shadow-sm ${isDone ? 'border-[#e0d6c8] bg-white' : 'border-[#d5ccbe]/40 bg-[#f4ecdf]/30'}`}>
            {isDone ? (
              <>
                <img 
                  src={`/images/spots/${spot.code}.jpg`}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${spot.code}landscape/200/200` }}
                  className="w-full h-full object-cover filter saturate-[1.1] p-[2px] rounded-[1.6rem] rounded-b-[1.8rem]" 
                  alt="stamp" 
                />
                {/* Thin inner gold rim like a pin badge */}
                <div className="absolute inset-[2px] border border-[#d5ccbe]/60 rounded-[1.6rem] rounded-b-[1.8rem] pointer-events-none" />
              </>
            ) : null}
            {/* Glossy Reflection for Window */}
            {isDone && <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/50 pointer-events-none" />}
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className="w-full h-full bg-[#f2ede4] overflow-y-auto hide-scrollbar font-['Pretendard'] relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* TICKET LIST */}
      <div className="px-4 pb-8 flex flex-col items-center pt-10">
        {ISLANDS.map((island) => (
          <div key={island.id} className="mb-6 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3 px-1 opacity-80">
              <h3 className="text-[#3e342b] font-bold text-[0.95rem] tracking-widest">{island.name}</h3>
            </div>
            
            <div className="flex flex-col gap-3.5">
              {island.spots.map((spot, idx) => {
                 const isDone = stamps.some(st => st.code === spot.code);
                 const sym = SYMBOLS[spot.category];
                 return renderBoardingPass(spot, island, isDone, sym, idx);
              })}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM REWARD BUTTON */}
      <div className="px-4 pb-16 w-full max-w-sm mx-auto">
          <button 
            onClick={() => navigate('/reward')}
            className={`w-full py-4 rounded-xl font-bold text-[0.95rem] transition-all shadow-sm flex items-center justify-center gap-2 border
              ${couponsAvailable > 0 
                ? 'bg-[#d32f2f] text-white border-[#d32f2f] animate-pulse' 
                : 'bg-white/50 text-[#a39889] border-[#d5ccbe]'
              }`}
          >
            {couponsAvailable > 0 ? `🎉 ${couponsAvailable}개의 보상 혜택 고르기` : '보상 확인하러 가기'}
          </button>
      </div>

      {/* Spot Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[#2a241f]/90 backdrop-blur-md text-center"
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
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-8 border border-dashed relative z-10 shrink-0
                  ${!selectedSpot.isDone && 'opacity-40 grayscale'} `} 
                style={{ borderColor: selectedSpot.sym.color }}
              >
                <div className="absolute inset-0 opacity-20 rounded-full mix-blend-screen" style={{ backgroundColor: selectedSpot.sym.color }} />
                <span className="relative z-10 w-12 h-12 flex items-center justify-center drop-shadow-lg" style={{ color: selectedSpot.sym.color }}>
                  {selectedSpot.isDone ? <SymbolIcon type={selectedSpot.sym.id} /> : '?'}
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
                {selectedSpot.isDone ? (
                  <>
                    <p className="text-[0.8rem] font-bold text-[#d5ccbe] mb-4 tracking-widest">
                      획득 일자 : {new Date(stamps.find(s => s.code === selectedSpot.spot.code)?.timestamp || Date.now()).toLocaleDateString('ko-KR')}
                    </p>
                    <button 
                      onClick={() => handleShare(selectedSpot.spot)}
                      className="w-full text-[#3e342b] bg-[#e8dfcf] font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform text-[0.95rem] tracking-widest mt-2 hover:bg-white"
                    >
                      기록 공유하기
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 w-full mb-2">
                      <button 
                        onClick={() => {
                          window.open(`https://map.kakao.com/link/search/${encodeURIComponent(selectedSpot.spot.name)}`, '_blank');
                        }}
                        className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3.5 rounded-xl font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                      >
                        카카오맵 길찾기
                      </button>
                      <button 
                        onClick={() => {
                          window.open(`https://map.naver.com/v5/directions/-/${encodeURIComponent(selectedSpot.spot.name)},-/transit?c=15,0,0,0,dh`, '_blank');
                        }}
                        className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3.5 rounded-xl font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                      >
                        네이버지도 길찾기
                      </button>
                    </div>
                    <button 
                      onClick={() => navigate(`/photo-verify/${selectedSpot.spot.code}`)}
                      className="w-full text-[#3e342b] bg-[#e8dfcf] font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform text-[0.95rem] tracking-widest hover:bg-white flex items-center justify-center gap-2"
                    >
                      <span>📸 카메라로 사진 찍고 인증하기</span>
                    </button>
                  </>
                )}
              </div>

              <button 
                onClick={() => setSelectedSpot(null)}
                className="mt-8 text-[#a39585] text-[0.85rem] font-bold underline underline-offset-4 hover:text-[#f4ecdf] tracking-widest"
              >
                닫기
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

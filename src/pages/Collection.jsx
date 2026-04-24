import React, { useMemo, useState } from 'react';
import { getGameState, SYMBOLS, ISLANDS, getAvailableCoupons } from '../gameState';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SymbolIcon from '../components/SymbolIcon';

export default function Collection() {
  const state = getGameState();
  const stamps = state.collectedStamps || [];
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Grouping is now natively handled by mapping over ISLANDS object directly.

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

  const openMap = (spot) => {
    window.open(`https://map.kakao.com/link/search/${spot.address || spot.name}`, '_blank');
  };

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden font-['Pretendard']">
      
      <div className="relative z-10 w-full h-full p-4 pt-12 overflow-y-auto hide-scrollbar flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[1.75rem] text-[#3e342b] mb-2 font-bold font-['Nanum_Myeongjo'] drop-shadow-sm border-b-[1.5px] border-[#d5ccbe] pb-2 px-8 inline-block">
            나의 수집첩
          </h1>
          <p className="text-[0.8rem] font-medium opacity-80 text-[#6b5a4d] px-4 break-keep">
            옹진군의 모든 명소가 한자리에 모였습니다.<br/>4가지 고유한 기호를 모두 모으면 보상으로 교환할 수 있어요!
          </p>
        </div>

        {/* Circular Badge Stamp Groups by Island */}
        <div className="w-full max-w-[24rem] px-2 mb-10 flex flex-col gap-8">
          {ISLANDS.map(island => (
            <div key={island.id} className="w-full bg-white/70 backdrop-blur-md rounded-[1.5rem] p-6 shadow-sm border border-[#e8dfcf] flex flex-col items-center">
              
              {/* Island Title */}
              <div className="mb-6 flex flex-col items-center w-full">
                <h3 className="text-[#3e342b] text-[1.15rem] font-bold font-['Nanum_Myeongjo'] pb-1.5 border-b-[1.5px] border-[#3e342b]/80 px-8 tracking-widest">{island.name}</h3>
              </div>
              
              {/* Circular Badge Grid */}
              <div className="flex flex-wrap items-center justify-center gap-5">
                {island.spots.map((spot, idx) => {
                  const isDone = stamps.some(st => st.code === spot.code);
                  const sym = SYMBOLS[spot.category];
                  
                  return (
                    <motion.button 
                      onClick={() => setSelectedSpot({ spot, isDone, sym })}
                      key={spot.code}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: idx * 0.05 + 0.1, type: 'spring' }}
                      className="relative flex flex-col items-center justify-center font-['Pretendard'] group focus:outline-none"
                    >
                      {isDone ? (
                        /* Collected Badge (Unique location art representation) */
                        <div className="w-[4.8rem] h-[4.8rem] rounded-full border-[2.5px] border-[#2c3e50] shadow-[0_4px_10px_rgba(0,0,0,0.15)] overflow-hidden relative bg-[#2c3e50] transition-transform group-hover:-translate-y-0.5">
                          {/* We use specific spot art if available, otherwise fallback */}
                          <img 
                            src={`/images/spots/${spot.code}.jpg`}
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${spot.code}landscape/200/200` }}
                            className="absolute inset-0 w-full h-full object-cover filter saturate-[1.2] contrast-[1.1] opacity-90" 
                            alt="stamp" 
                          />
                          {/* Curved Text Overlay for pure scout badge aesthetic */}
                          <div className="absolute inset-0 pointer-events-none drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)] z-20">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                               {/* Top Curve (Left to Right) */}
                               <path id={`topCurve_${spot.code}`} d="M 12 52 a 38 38 0 1 1 76 0" fill="transparent" />
                               {/* Bottom Curve (Right to Left) */}
                               <path id={`bottomCurve_${spot.code}`} d="M 88 48 a 38 38 0 0 1 -76 0" fill="transparent" />
                               
                               <text className="text-[12px] font-black tracking-widest" fill="#f4ecdf" dominantBaseline="middle">
                                 <textPath href={`#topCurve_${spot.code}`} startOffset="50%" textAnchor="middle">
                                   {spot.name}
                                 </textPath>
                               </text>
                               <text className="text-[9px] font-bold tracking-[0.2em] opacity-80" fill="#f4ecdf" dominantBaseline="middle">
                                 <textPath href={`#bottomCurve_${spot.code}`} startOffset="50%" textAnchor="middle">
                                   ONGJIN
                                 </textPath>
                               </text>
                            </svg>
                          </div>
                          {/* Inner gold ring */}
                          <div className="absolute inset-[3px] border-[1px] border-[#e8c37d]/60 rounded-full z-10 pointer-events-none" />
                        </div>
                      ) : (
                        /* Empty Slot Envelope/Circle */
                        <div className="w-[4.8rem] h-[4.8rem] rounded-full border-[1.5px] border-dashed border-[#a39585]/60 flex flex-col items-center justify-center bg-[#f4ecdf]/40 transition-colors group-hover:bg-[#f4ecdf]/70 shadow-inner">
                          <div className="w-9 h-9 rounded-full border border-[#a39585]/20 flex items-center justify-center bg-white/50">
                            <span className="text-[#a39585]/40 text-lg font-bold font-['Nanum_Myeongjo']">?</span>
                          </div>
                          <span className="text-[#a39585]/60 text-[0.45rem] mt-1 tracking-widest">{spot.name}</span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Simple Call to Action logic */}
        <div className="w-full max-w-sm px-4 mt-auto pb-12 text-center">
          <div className="border-t border-dashed border-[#d5ccbe] pt-6 mb-4">
            <span className="text-[0.95rem] text-[#54463a] font-bold font-['Nanum_Myeongjo']">
              현재 모은 스탬프: <span className="text-[#b85b40] text-[1.4rem] font-['Gowun_Batang'] mx-1">{stamps.length}</span>개
            </span>
          </div>

          <button 
            onClick={() => navigate('/reward')}
            disabled={couponsAvailable <= 0}
            className={`w-full py-4 rounded-xl font-bold tracking-wider text-[0.85rem] transition-all flex flex-col items-center justify-center gap-1 leading-snug
              ${couponsAvailable > 0 
                ? 'bg-[#3e342b] text-[#f4ecdf] shadow-md animate-pulse' 
                : 'bg-transparent border border-[#d5ccbe] text-[#a39889] opacity-60'
              }`}
          >
            {couponsAvailable > 0 ? (
              <span className="text-[0.95rem]">{couponsAvailable}개의 보상 혜택 고르기</span>
            ) : (
              <>
                <span>진행중인 세트 부족 기호:</span>
                <span>{missingSymbols.join(', ')}</span>
              </>
            )}
          </button>
        </div>
        
      </div>

      {/* Spot Detail Box-less Poetic Modal */}
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
                      className="w-full text-[#3e342b] bg-[#e8dfcf] font-bold py-4 rounded-none shadow-md active:scale-95 transition-transform text-[0.95rem] tracking-widest mt-2 hover:bg-white"
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
                        className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3.5 font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                      >
                        카카오맵 길찾기
                      </button>
                      <button 
                        onClick={() => {
                          window.open(`https://map.naver.com/v5/directions/-/${encodeURIComponent(selectedSpot.spot.name)},-/transit?c=15,0,0,0,dh`, '_blank');
                        }}
                        className="flex-1 text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-3.5 font-bold text-[0.85rem] active:scale-95 transition-transform tracking-widest hover:text-white"
                      >
                        네이버지도 길찾기
                      </button>
                    </div>
                    <button 
                      onClick={() => navigate(`/photo-verify/${selectedSpot.spot.code}`)}
                      className="w-full text-[#3e342b] bg-[#e8dfcf] font-bold py-4 rounded-none shadow-md active:scale-95 transition-transform text-[0.95rem] tracking-widest hover:bg-white flex items-center justify-center gap-2"
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

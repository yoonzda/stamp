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

  const couponsAvailable = getAvailableCoupons(state);

  // Generate deterministic positions for the 28 spots to scatter them over a tall map
  const ALL_SPOTS = useMemo(() => {
    return ISLANDS.flatMap((island, iIdx) => 
      island.spots.map((spot, sIdx) => {
        const index = iIdx * 4 + sIdx;
        const top = 6 + (index * 3.2); // Spread from 6% down to ~95%
        const isLeft = index % 2 === 0;
        const baseLeft = isLeft ? 25 : 75;
        const left = baseLeft + (Math.sin(index * 2.1) * 12); // add some organic wave scatter
        return { ...spot, islandName: island.name, pos: { top: `${top}%`, left: `${left}%` }, index };
      })
    );
  }, []);

  // Prepare points for the SVG dotted path connecting the spots
  const pathPoints = ALL_SPOTS.map(s => `${parseFloat(s.pos.left)},${parseFloat(s.pos.top)}`).join(' ');

  const getMissingSymbols = () => {
    const counts = { PLUS: 0, MINUS: 0, MULTIPLY: 0, DIVIDE: 0 };
    stamps.forEach(s => {
      const spot = ALL_SPOTS.find(spot => spot.code === s.code);
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

  return (
    <div className="w-full h-full bg-[#fcf9f2] overflow-y-auto hide-scrollbar font-['Pretendard'] relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Floating Header UI */}
      <div className="sticky top-0 left-0 w-full z-40 px-4 pt-10 pb-4 bg-gradient-to-b from-[#fcf9f2] via-[#fcf9f2]/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto bg-white/80 backdrop-blur-md border border-[#d5ccbe] rounded-[1.5rem] p-4 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-[1.2rem] text-[#3e342b] font-bold font-['Nanum_Myeongjo']">옹진 명소 탐험지도</h1>
            <p className="text-[0.7rem] text-[#b85b40] font-bold mt-0.5">수집한 스탬프 {stamps.length}개 / 전체 28개</p>
          </div>
          <button 
            onClick={() => navigate('/reward')}
            className={`px-4 py-2.5 rounded-xl font-bold text-[0.75rem] transition-all shadow-sm
              ${couponsAvailable > 0 
                ? 'bg-[#b85b40] text-white animate-pulse' 
                : 'bg-[#f4ecdf] text-[#a39889] border border-[#d5ccbe]'
              }`}
          >
            {couponsAvailable > 0 ? `${couponsAvailable}개 보상받기` : '보상 확인'}
          </button>
        </div>
      </div>

      {/* MAP CANVAS (Tall container for scrolling adventure) */}
      <div className="absolute top-0 left-0 w-full h-[2800px] z-0">
        {/* Background Map Image */}
        <div 
          className="absolute inset-0 w-full h-full opacity-70"
          style={{ 
            backgroundImage: "url('/images/map_bg.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center top' 
          }}
        />
        
        {/* SVG Path connecting the spots */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <polyline 
            points={pathPoints} 
            fill="none" 
            stroke="#b85b40" 
            strokeWidth="3" 
            strokeDasharray="6,8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-50 drop-shadow-sm"
          />
        </svg>

        {/* Map Nodes */}
        {ALL_SPOTS.map((spot, idx) => {
          const isDone = stamps.some(st => st.code === spot.code);
          const sym = SYMBOLS[spot.category];
          
          return (
            <div 
              key={spot.code}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group"
              style={{ top: spot.pos.top, left: spot.pos.left }}
            >
              <motion.button 
                onClick={() => setSelectedSpot({ spot, isDone, sym })}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ delay: idx * 0.03, type: 'spring' }}
                className="relative flex flex-col items-center justify-center focus:outline-none"
              >
                {/* Pin Bubble Shape */}
                <div className="relative drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-transform group-hover:-translate-y-1">
                  <div className={`w-[4.5rem] h-[4.5rem] rounded-full border-[3px] flex items-center justify-center bg-white overflow-hidden ${isDone ? 'border-[#b85b40]' : 'border-[#d5ccbe]'}`}>
                    {isDone ? (
                      <img 
                        src={`/images/spots/${spot.code}.jpg`}
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${spot.code}landscape/200/200` }}
                        className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]" 
                        alt="stamp" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#f4ecdf]/40">
                        <span className="text-[#a39585]/40 text-2xl font-bold font-['Nanum_Myeongjo']">?</span>
                      </div>
                    )}
                  </div>
                  {/* Pin Tail pointing to the map */}
                  <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent ${isDone ? 'border-t-[#b85b40]' : 'border-t-[#d5ccbe]'}`} />
                </div>
                
                {/* Text Label Below */}
                <div className="mt-4 flex flex-col items-center bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#d5ccbe]/50 shadow-sm">
                  <span className="text-[#b85b40] text-[0.55rem] font-bold tracking-widest leading-none mb-1">{spot.islandName}</span>
                  <span className="text-[#3e342b] text-[0.75rem] font-extrabold leading-none">{spot.name}</span>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Spacer to allow scrolling to the bottom of the map */}
      <div className="w-full h-[2850px] pointer-events-none" />

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

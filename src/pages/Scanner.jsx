import React, { useState } from 'react';
import { getGameState, saveGameState, ISLANDS, SYMBOLS, getAvailableCoupons } from '../gameState';
import { useNavigate } from 'react-router-dom';
import SymbolIcon from '../components/SymbolIcon';
import { motion, AnimatePresence } from 'framer-motion';

// Use Baengnyeong map as a soft, glowing watercolor watermark on the dark canvas
import decorativeDrawing from '../assets/map_baengnyeong.png';

export default function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [stampResult, setStampResult] = useState(null);
  const navigate = useNavigate();

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const randomIsland = ISLANDS[Math.floor(Math.random() * ISLANDS.length)];
      const randomSpot = randomIsland.spots[Math.floor(Math.random() * randomIsland.spots.length)];
      
      const state = getGameState();
      let newStamps = [...(state.collectedStamps || [])];
      
      const alreadyHasExactSpot = newStamps.some(s => s.code === randomSpot.code);
      if (alreadyHasExactSpot) {
        alert('이 장소의 스탬프는 이미 찍으셨습니다! 다른 명소를 찾아보세요.');
        return;
      }

      newStamps.push({
        id: randomSpot.id,
        code: randomSpot.code,
        category: randomSpot.category,
        name: randomSpot.name,
        timestamp: Date.now()
      });

      const oldCoupons = getAvailableCoupons(state);
      const newState = {
        ...state,
        collectedStamps: newStamps
      };
      
      const newCoupons = getAvailableCoupons(newState);
      const setJustCompleted = newCoupons > oldCoupons;

      saveGameState(newState);

      setStampResult({
        spot: randomSpot,
        setJustCompleted
      });

    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col relative text-white items-center overflow-hidden font-['Pretendard'] bg-transparent">
      
      {/* Dark Pigment Soaked into Master Paper Canvas */}
      <div className="absolute inset-0 bg-[#2a241f] mix-blend-multiply pointer-events-none" />

      {/* Header - No gradient box */}
      <div className="relative top-0 inset-x-0 p-8 pt-12 text-center z-10 pointer-events-none mt-4">
        <h1 className="text-[1.35rem] font-bold font-['Nanum_Myeongjo'] text-[#e8dfcf] tracking-[0.2em] ml-1 drop-shadow-md">스탬프 기록</h1>
        <p className="text-[0.85rem] text-[#bdae9c] mt-4 font-medium tracking-wide drop-shadow-sm">수집 명소에 비치된 QR 코드를 비춰주세요</p>
      </div>

      {/* Viewfinder - No box, just subtle borders */}
      <div className="flex-1 flex items-center justify-center relative w-full mt-4 z-10">
        <div className="w-64 h-64 border border-[#a39585]/20 flex items-center justify-center relative">
          {/* Corner accents directly on paper */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-[3px] border-l-[3px] border-[#d5ccbe]" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[3px] border-r-[3px] border-[#d5ccbe]" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-[3px] border-l-[3px] border-[#d5ccbe]" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-[3px] border-r-[3px] border-[#d5ccbe]" />

          {scanning ? (
            <div className="absolute top-0 w-full h-[2px] bg-[#e8dfcf] shadow-[0_0_20px_rgba(232,223,207,1)]" style={{ animation: 'scanLine 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
          ) : (
            <span className="text-[#a39585] text-sm animate-pulse tracking-widest font-light">렌즈 초점 맞추는 중</span>
          )}
        </div>
      </div>

      {/* Footer / Dev Button - Minimalist text on paper */}
      <div className="relative bottom-0 inset-x-0 p-8 pb-32 flex justify-center z-10 w-full">
        <button 
          onClick={simulateScan}
          disabled={scanning}
          className="w-full max-w-[16rem] text-[#d5ccbe] border border-dashed border-[#a39585]/50 py-4 font-bold text-[0.95rem] active:scale-95 transition-all disabled:opacity-50 tracking-wider hover:text-white"
        >
          {scanning ? '탐색 중...' : '테스트용 시뮬레이션 버튼'}
        </button>
      </div>

      {/* Floating Modal - No Box, purely floating text directly on blurred paper */}
      <AnimatePresence>
        {stampResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#3e342b]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
              className="flex flex-col items-center w-full max-w-sm"
            >
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-8 border border-dashed relative z-10 shrink-0" 
                style={{ borderColor: SYMBOLS[stampResult.spot.category].color }}
              >
                <div className="absolute inset-0 opacity-20 rounded-full mix-blend-screen" style={{ backgroundColor: SYMBOLS[stampResult.spot.category].color }} />
                <span className="relative z-10 w-12 h-12 flex items-center justify-center drop-shadow-lg" style={{ color: SYMBOLS[stampResult.spot.category].color }}>
                  <SymbolIcon type={stampResult.spot.category} />
                </span>
              </div>

              <h2 className="text-[1.5rem] font-bold text-[#f4ecdf] mb-3 font-['Nanum_Myeongjo'] relative z-10 drop-shadow-sm tracking-wide">
                기록이 담겼습니다
              </h2>
              <p className="text-[1rem] font-medium text-[#c4baa8] mb-8 relative z-10">
                {stampResult.spot.name}
              </p>

              <div 
                className="border-b-2 px-2 pb-1 text-[0.85rem] font-bold tracking-widest mb-10 relative z-10"
                style={{ borderColor: SYMBOLS[stampResult.spot.category].color, color: SYMBOLS[stampResult.spot.category].color }}
              >
                {SYMBOLS[stampResult.spot.category].label} 상징 획득
              </div>
              
              {stampResult.setJustCompleted && (
                <div className="w-full border-t border-dashed border-[#a39585]/50 pt-8 mb-10 relative z-10 text-center">
                  <div className="flex items-center justify-center flex-col gap-3 mb-4">
                    <span className="text-3xl relative animate-bounce">✨</span>
                    <p className="font-bold text-[#e8dfcf] text-[1.15rem] font-['Nanum_Myeongjo']">온전한 형태가 완성되었습니다</p>
                  </div>
                  <p className="text-[0.85rem] text-[#bdae9c] leading-relaxed break-keep px-2">
                    네 개의 상징을 모두 찾았습니다. 보상 교환소에서 지역민이 준비한 작은 선물을 받아가세요.
                  </p>
                </div>
              )}

              <button 
                className="w-full text-[#3e342b] bg-[#e8dfcf] font-bold py-4 rounded-none shadow-md active:scale-95 transition-transform relative z-10 text-[0.95rem] tracking-widest mt-4"
                onClick={() => {
                  setStampResult(null);
                  navigate(stampResult.setJustCompleted ? '/reward' : '/collection');
                }}
              >
                {stampResult.setJustCompleted ? '보상 교환소로 가기' : '나의 수집첩 닫기'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(0px) scaleY(1); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(256px) scaleY(1.5); }
          90% { opacity: 1; }
          100% { transform: translateY(256px) scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

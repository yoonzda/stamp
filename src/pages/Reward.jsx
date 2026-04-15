import React from 'react';
import { getGameState, saveGameState, getAvailableCoupons } from '../gameState';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reward() {
  const state = getGameState();
  const navigate = useNavigate();
  const availableCoupons = getAvailableCoupons(state);

  const handleRedeem = () => {
    if (availableCoupons > 0) {
      saveGameState({
        ...state,
        couponsRedeemed: (state.couponsRedeemed || 0) + 1
      });
      alert('보상이 성공적으로 교환되었습니다. 아날로그 보관함에서 확인하세요.');
      navigate('/reward', { replace: true });
    }
  };

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden font-['Pretendard']">
      
      <div className="relative z-10 w-full h-full p-6 pt-16 overflow-y-auto pb-32 hide-scrollbar">
        <div className="text-center mb-12 flex flex-col items-center">
          <h1 className="text-[1.75rem] text-[#3e342b] mb-4 font-bold font-['Nanum_Myeongjo'] drop-shadow-sm border-b-[1.5px] border-[#d5ccbe] pb-2 px-8 inline-block">보상 교환소</h1>
          <p className="text-[0.85rem] font-medium opacity-80 text-[#6b5a4d] px-4 break-keep leading-relaxed max-w-sm">
            사분면의 상징들을 모아 빚어낸 세트,<br/>그 가치있는 노력을 지역 혜택으로 바꾸어 보세요.
          </p>
        </div>

        {/* Elegant Ticket Area (No Box) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="mb-14 relative flex flex-col items-center justify-center mx-auto max-w-sm"
        >
          <p className="text-[#a39585] font-bold text-[0.7rem] mb-3 tracking-[0.2em] relative z-10">사용 가능한 교환권</p>
          
          <div className="flex items-end gap-2 relative z-10">
            <span className="text-6xl font-['Gowun_Batang'] font-bold text-[#b85b40] drop-shadow-sm">{availableCoupons}</span>
            <span className="text-[1.1rem] text-[#8a7a6b] font-medium mb-1 drop-shadow-sm">장</span>
          </div>
        </motion.div>

        <h2 className="text-[1.1rem] font-bold text-[#54463a] mb-8 pl-4 font-['Nanum_Myeongjo'] tracking-wide">
          빛나는 지역 혜택들
        </h2>
        
        <motion.div 
          className="space-y-8 max-w-sm mx-auto px-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {[
            { id: 1, title: '옹진 특산물 상회 5,000원권', cost: 1, desc: '지정된 지역 전통시장에서 현금처럼 사용하세요' },
            { id: 2, title: '인천항 여객선 운임 10% 우대', cost: 1, desc: '대부도 및 인천 터미널 당일 현장발권 혜택' },
            { id: 3, title: '바다마을 다방 아메리카노 1잔', cost: 1, desc: '숨겨진 보석 같은 섬마을 감성 카페에서 사용' }
          ].map(item => (
            <motion.div 
              key={item.id} 
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
              }}
              className="relative flex flex-col gap-3 group border-b border-dashed border-[#d1c8b4] pb-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-['Nanum_Myeongjo'] font-bold text-[#3e342b] text-[1.1rem] leading-tight mb-2 drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-[0.75rem] text-[#6b5a4d] leading-relaxed break-keep font-medium mix-blend-multiply">
                    {item.desc}
                  </p>
                </div>
                
                <button 
                  onClick={handleRedeem}
                  disabled={availableCoupons < item.cost}
                  className={`px-5 py-2 whitespace-nowrap rounded font-bold text-[0.8rem] transition-all
                    ${availableCoupons >= item.cost 
                      ? 'bg-transparent text-[#b85b40] hover:bg-[#b85b40]/10 border border-[#b85b40]' 
                      : 'bg-transparent text-[#a39585] opacity-60 border border-[#d1c8b4] cursor-not-allowed'
                    }`}
                >
                  {item.cost}장 교환
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

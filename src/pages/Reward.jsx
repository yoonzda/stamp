import React from 'react';
import { getGameState, saveGameState, getAvailableCoupons } from '../gameState';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { spotImages } from './IslandDetail';

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

  const rewards = [
    { id: 1, title: '옹진 특산물 상회 5,000원권', cost: 1, desc: '지역 전통시장에서 현금처럼 사용하세요', img: spotImages.STAMP_B1 },
    { id: 2, title: '인천항 여객선 운임 10% 우대', cost: 1, desc: '대부도 및 터미널 당일 현장발권 혜택', img: spotImages.STAMP_C1 },
    { id: 3, title: '바다마을 다방 아메리카노 1잔', cost: 1, desc: '섬마을 감성 카페에서 시원하게 한 잔', img: spotImages.STAMP_Y1 },
    { id: 4, title: '자월도 해변 펜션 1박 할인권', cost: 2, desc: '달빛이 아름다운 자월도에서의 낭만적인 하루', img: spotImages.STAMP_J1 },
    { id: 5, title: '덕적도 서포리 자전거 대여권', cost: 1, desc: '수백 년 소나무 숲길을 달리는 상쾌함', img: spotImages.STAMP_D1 }
  ];

  return (
    <div className="w-full h-full relative bg-[#Fcfbf9] overflow-hidden font-['Pretendard']">
      
      <div className="relative z-10 w-full h-full p-5 pt-12 overflow-y-auto pb-32 hide-scrollbar">
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-[1.8rem] text-[#3e342b] mb-3 font-extrabold tracking-tight">쿠폰 교환소</h1>
          <p className="text-[0.85rem] font-medium text-[#8a7a6b] px-4 break-keep leading-relaxed max-w-sm">
            옹진군의 섬들을 탐험하며 모은 스탬프로<br/>특별한 지역 혜택을 누려보세요.
          </p>
        </div>

        {/* Elegant Ticket Area */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="mb-8 relative flex flex-col items-center justify-center mx-auto max-w-sm bg-[#e8e2d5] py-4 rounded-2xl shadow-inner border border-[#d5ccbe]"
        >
          <p className="text-[#685b4f] font-bold text-[0.75rem] mb-1">보유한 쿠폰 교환권</p>
          <div className="flex items-end gap-1.5 relative z-10">
            <span className="text-4xl font-extrabold text-[#e06a4e] drop-shadow-sm">{availableCoupons}</span>
            <span className="text-[1rem] text-[#8a7a6b] font-bold mb-1">장</span>
          </div>
        </motion.div>

        <h2 className="text-[1.15rem] font-bold text-[#3e342b] mb-5 pl-2">
          교환 가능한 혜택
        </h2>
        
        <motion.div 
          className="space-y-4 max-w-sm mx-auto"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {rewards.map(item => (
            <motion.div 
              key={item.id} 
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
              }}
              className="relative rounded-2xl overflow-hidden shadow-sm group bg-black"
            >
              {/* Background Image */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col h-full min-h-[140px] justify-end">
                <div className="flex justify-between items-end gap-2">
                  <div className="flex-1 pr-2">
                    <span className="inline-block bg-[#e06a4e] text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-sm mb-2 shadow-sm">
                      {item.cost}장 소모
                    </span>
                    <h3 className="font-bold text-white text-[1.1rem] leading-tight mb-1.5 drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-[0.75rem] text-white/80 leading-snug break-keep font-medium drop-shadow-sm line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleRedeem}
                    disabled={availableCoupons < item.cost}
                    className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-[0.85rem] transition-all backdrop-blur-md active:scale-95 shadow-md
                      ${availableCoupons >= item.cost 
                        ? 'bg-white/90 text-[#e06a4e] hover:bg-white' 
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                      }`}
                  >
                    교환하기
                  </button>
                </div>
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

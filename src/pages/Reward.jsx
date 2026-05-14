import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGameState, saveGameState, ISLANDS } from '../gameState';
import { Ticket, Coffee, Utensils, Home, Navigation, Map as MapIcon, List } from 'lucide-react';
import mapBg from '../assets/map_bg_dadora.png';

const COUPONS = [
  { id: 'c1', type: 'food', title: '백령도 사곶냉면 5,000원 할인권', desc: '옹진군 백령면 사곶냉면 본점', mapPos: { top: '16%', left: '17%' }, icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'c2', type: 'cafe', title: '연평도 바다뷰 카페 아메리카노 1잔', desc: '옹진군 연평면 연평바다로', mapPos: { top: '23%', left: '62%' }, icon: Coffee, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'c3', type: 'stay', title: '덕적도 서포리 펜션 10% 할인권', desc: '옹진군 덕적면 서포리 일대 제휴 펜션', mapPos: { top: '83%', left: '66%' }, icon: Home, color: 'bg-blue-100 text-blue-600' },
  { id: 'c4', type: 'ticket', title: '영흥도 갯벌체험 무료 입장권', desc: '옹진군 영흥면 선재리 갯벌체험장', mapPos: { top: '83%', left: '86%' }, icon: Ticket, color: 'bg-green-100 text-green-600' },
  { id: 'c5', type: 'food', title: '자월도 해물칼국수 2인 세트', desc: '옹진군 자월면 해안도로 맛집 골목', mapPos: { top: '71%', left: '83%' }, icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'c6', type: 'ticket', title: '대청도 서풍받이 생태투어 할인권', desc: '옹진군 대청면 서풍받이 생태투어', mapPos: { top: '31%', left: '26%' }, icon: Navigation, color: 'bg-purple-100 text-purple-600' },
];

const getDist = (pos1, pos2) => {
  const t1 = parseFloat(pos1.top);
  const l1 = parseFloat(pos1.left);
  const t2 = parseFloat(pos2.top);
  const l2 = parseFloat(pos2.left);
  return Math.sqrt(Math.pow(t1 - t2, 2) + Math.pow(l1 - l2, 2));
};

export default function Reward() {
  const navigate = useNavigate();
  const [state, setState] = useState(getGameState());
  const [showToast, setShowToast] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Stamps completed with 4 tasks
  const completedStamps = useMemo(() => {
    return (state.collectedStamps || []).filter(s => s.tasksCompleted);
  }, [state]);

  const unusedCouponsCount = completedStamps.length - (state.couponsRedeemed || 0);

  // Map stamp codes to map locations
  const stampLocations = useMemo(() => {
    return completedStamps.map(stamp => {
      const island = ISLANDS.find(i => i.spots.some(s => s.code === stamp.code));
      return {
        id: stamp.code,
        mapPos: island ? island.mapPos : { top: '50%', left: '50%' }
      };
    });
  }, [completedStamps]);

  // Sort coupons by closest distance to ANY completed stamp
  const sortedCoupons = useMemo(() => {
    if (stampLocations.length === 0) return COUPONS;
    
    return [...COUPONS].sort((a, b) => {
      const minDistA = Math.min(...stampLocations.map(sl => getDist(a.mapPos, sl.mapPos)));
      const minDistB = Math.min(...stampLocations.map(sl => getDist(b.mapPos, sl.mapPos)));
      return minDistA - minDistB;
    });
  }, [stampLocations]);

  const handleExchange = (coupon) => {
    if (unusedCouponsCount > 0) {
      const newState = { ...state, couponsRedeemed: (state.couponsRedeemed || 0) + 1 };
      saveGameState(newState);
      setState(newState);
      
      setShowToast(`'${coupon.title}' 쿠폰으로 교환되었습니다!`);
      setTimeout(() => setShowToast(''), 3000);
    } else {
      setShowToast(`사용 가능한 완료된 스탬프가 없습니다.`);
      setTimeout(() => setShowToast(''), 3000);
    }
  };

  return (
    <div className="w-full h-full bg-[#Fcfbf9] overflow-y-auto pb-32 relative hide-scrollbar font-['Pretendard']">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translate(-50%, 10px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>

      {/* Header Area */}
      <div className="px-5 pt-10 pb-4 sticky top-0 bg-[#Fcfbf9]/90 backdrop-blur-md z-30 border-b border-[#e8e2d5]/50 flex flex-col text-center">
        <h1 className="text-[1.8rem] text-[#3e342b] mb-2 font-extrabold tracking-tight">쿠폰 교환소</h1>
        <p className="text-[0.85rem] font-medium text-[#8a7a6b] px-4 break-keep mb-4">
          미션을 완료한 스탬프 1개당 쿠폰 1개로 교환할 수 있습니다. 획득한 스탬프와 가까운 곳부터 추천해 드립니다.
        </p>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e2d5] flex justify-between items-center max-w-sm mx-auto w-full mb-4">
          <span className="text-[#3e342b] font-bold">교환 가능 쿠폰 수</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-[#f05746]">{Math.max(0, unusedCouponsCount)}</span>
            <span className="text-[#8a7a6b] font-medium mt-1">장</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-[#e8e2d5] p-1 rounded-xl">
           <button 
             onClick={() => setViewMode('list')}
             className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg font-bold text-sm transition-colors ${viewMode === 'list' ? 'bg-white text-[#3e342b] shadow-sm' : 'text-[#8a7a6b]'}`}
           >
             <List size={18} /> 리스트 보기
           </button>
           <button 
             onClick={() => setViewMode('map')}
             className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg font-bold text-sm transition-colors ${viewMode === 'map' ? 'bg-white text-[#3e342b] shadow-sm' : 'text-[#8a7a6b]'}`}
           >
             <MapIcon size={18} /> 지도 보기
           </button>
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === 'map' && (
        <div className="relative w-full overflow-hidden bg-[#F3EFE6] min-h-[400px]">
          <img src={mapBg} alt="쿠폰/스탬프 지도" className="w-full h-auto object-cover" />
          
          {/* Stamp Pins */}
          {stampLocations.map((loc, idx) => (
             <div key={`stamp_${idx}`} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: loc.mapPos.top, left: loc.mapPos.left }}>
               <div className="w-5 h-5 bg-[#f05746] rounded-full border-2 border-white shadow-md flex items-center justify-center animate-bounce">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
             </div>
          ))}

          {/* Coupon Pins */}
          {sortedCoupons.map((coupon, idx) => (
             <div key={`coupon_${idx}`} className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer" style={{ top: coupon.mapPos.top, left: coupon.mapPos.left }}>
               <div className={`p-1.5 rounded-full border-2 border-white shadow-lg ${coupon.color.split(' ')[0]} ${coupon.color.split(' ')[1]}`}>
                 <coupon.icon size={16} />
               </div>
             </div>
          ))}

          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-md flex gap-4 text-[0.75rem] font-bold text-[#3e342b] justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#f05746] rounded-full border border-white shadow-sm"></div>내 스탬프</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded-full flex items-center justify-center text-[0.5rem]">🎫</div>쿠폰 혜택</div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="px-5 py-4 flex flex-col gap-4">
          {sortedCoupons.map((coupon, idx) => {
            const isClosest = idx === 0 && stampLocations.length > 0;
            return (
              <div key={coupon.id} className={`bg-white rounded-2xl p-4 shadow-sm border ${isClosest ? 'border-[#004790] ring-1 ring-[#004790]' : 'border-[#e8e2d5]'} flex flex-col gap-3 relative overflow-hidden`}>
                
                {isClosest && (
                  <div className="absolute top-0 right-0 bg-[#004790] text-white text-[0.65rem] font-bold px-3 py-1 rounded-bl-xl z-10">
                    인증 장소와 가장 가까워요!
                  </div>
                )}

                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${coupon.color}`}>
                    <coupon.icon size={24} />
                  </div>
                  <div className="flex-1 pt-1 text-left">
                    <h3 className="font-bold text-[#3e342b] leading-tight mb-1">{coupon.title}</h3>
                    <p className="text-[0.75rem] text-[#8a7a6b] mb-3">{coupon.desc}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleExchange(coupon)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-colors mt-1 ${
                    unusedCouponsCount > 0 
                      ? 'bg-[#3e342b] text-white hover:bg-[#2a231d]' 
                      : 'bg-[#e8e2d5] text-[#a39585] cursor-not-allowed'
                  }`}
                >
                  {unusedCouponsCount > 0 ? '쿠폰 1개로 교환하기' : '미션 완료 스탬프 부족'}
                </button>
                
                {/* Cutout decoration */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#Fcfbf9] rounded-full border-r border-[#e8e2d5] -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#Fcfbf9] rounded-full border-l border-[#e8e2d5] -translate-y-1/2"></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap z-50 shadow-lg animate-fade-in-up">
          {showToast}
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { getGameState, SYMBOLS, ISLANDS, getAvailableCoupons } from '../gameState';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SymbolIcon from '../components/SymbolIcon';
import islandSticker from '../assets/island_sticker.png';

export default function Collection() {
  const state = getGameState();
  const stampRef = useRef(null);
  
  const islandLongDescriptions = {
    baengnyeong: '대한민국 최서북단에 위치한 백령도는 천혜의 자연경관을 간직한 신비의 섬입니다. 수억 년의 세월이 조각한 웅장한 기암괴석과 끝없이 펼쳐진 천연 비행장 사곶해변은 대자연의 벅찬 경이로움을 선사합니다. 파도에 동글동글 깎인 콩돌해안을 거닐며 맑은 물소리에 귀를 기울여 보세요.',
    daecheong: '푸른 바다와 고운 모래가 빚어낸 한국의 사하라, 대청도는 신비롭고 이국적인 풍경으로 가득합니다. 거대한 옥죽동 해안사구와 웅장한 수직 절벽 서풍받이는 잊지 못할 감동을 안겨줍니다. 수백 년 된 소나무 숲길을 따라 천천히 거닐며 일상의 무거운 짐을 잠시 내려놓는 시간을 가져보세요.',
    yeonpyeong: '한때 조기 파시로 온 섬이 들썩였던 연평도는 이제 평화를 염원하는 고요하고 아름다운 섬이 되었습니다. 북녘땅이 손에 잡힐 듯 보이는 망향전망대에서 특별한 의미를 되새겨 봅니다. 인적 드문 청정 해변과 소박한 마을 길을 거닐며 섬마을 특유의 깊은 정취에 흠뻑 빠져보세요.',
    jawol: '초여름이면 붉은 해당화가 지천으로 피어나는 자월도는 밤하늘의 달빛이 유독 아름다운 낭만의 섬입니다. 완벽한 반달 모양의 해수욕장에서 부드러운 바닷바람을 맞으며 산책을 즐기기에 더없이 좋습니다. 복잡한 도시를 떠나 조용한 숲길과 아늑한 해변에서 잔잔하고 달콤한 여유를 누려보세요.',
    deokjeok: '수백 년 된 노송 숲과 맑은 파도가 어우러진 덕적도는 그야말로 진정한 힐링을 위한 맞춤형 휴양지입니다. 은빛 모래밭을 감싸 안은 소나무 군락이 뿜어내는 피톤치드를 마시며 걷기만 해도 마음이 상쾌해집니다. 호박돌 사이로 밀려드는 파도 소리를 들으며 대자연의 고요한 위로를 경험해 보세요.',
    yeongheung: '육지와 다리로 연결되어 더욱 가까워진 영흥도는 넓은 갯벌과 바다가 어우러져 다채로운 매력을 뽐냅니다. 하루 두 번 열리는 신비로운 모래길을 건너 목섬에 닿거나, 국내 유일의 소사나무 군락지에서 짙은 그늘을 즐겨보세요. 서해안의 붉은 낙조를 바라보며 황홀한 하루를 마무리하기에 완벽한 곳입니다.',
    jangbong: '어부와 인어의 아름다운 전설이 살아 숨 쉬는 장봉도는 굽이굽이 이어지는 낭만적인 해안선이 매력적인 섬입니다. 고운 백사장 뒤로 길게 뻗은 해송 숲에서 상쾌한 바닷바람을 맞으며 걷기 좋은 다채로운 숲길이 조성되어 있습니다. 탁 트인 절경을 감상하며 가슴속까지 뻥 뚫리는 시원함을 느껴보세요.'
  };

  // (Mocking) 백령도 두무진만 미방문 처리, 나머지는 방문 완료
  const mockStamps = ISLANDS.flatMap(island => 
    island.spots.map(spot => {
      if (spot.name === '두무진') return null; // 두무진은 미방문
      return {
        code: spot.code,
        timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      };
    }).filter(Boolean)
  );
  
  const stamps = mockStamps;
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const couponsAvailable = getAvailableCoupons({ ...state, collectedStamps: stamps });

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

  const renderStampArtwork = (spot, islandName, isDone, image, timestamp, size = 'small') => {
    let dateStr = '미방문';
    if (isDone && timestamp) {
      const d = new Date(timestamp);
      dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    const isSmall = size === 'small';
    const paperColor = isDone ? '#ffffff' : '#e6dfd3';
    
    // Scale text and paddings based on size
    const titleSize = isSmall ? 'text-[1.3rem]' : 'text-[2.4rem]';
    const dateSize = isSmall ? 'text-[0.45rem]' : 'text-[0.8rem]';
    const islandSize = isSmall ? 'text-[0.6rem]' : 'text-[1rem]';
    const contentInset = isSmall ? '8px' : '14px';
    const innerBorderInset = isSmall ? '4px' : '8px';
    const padding = isSmall ? 'p-2.5' : 'p-6';

    return (
      <div 
        className={`relative w-full aspect-[14/17] shrink-0 ${isSmall ? 'mx-auto' : ''}`}
        style={!isSmall ? { filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))' } : {}}
      >
        {/* Perforated paper background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: paperColor,
            WebkitMaskImage: 'radial-gradient(circle, transparent 3px, black 3.5px)',
            WebkitMaskSize: '10px 10px',
            WebkitMaskPosition: '-5px -5px',
            WebkitMaskRepeat: 'round',
            maskImage: 'radial-gradient(circle, transparent 3px, black 3.5px)',
            maskSize: '10px 10px',
            maskPosition: '-5px -5px',
            maskRepeat: 'round'
          }}
        />
        {/* Solid center patch to hide background mask holes */}
        <div 
          className="absolute inset-[5px] rounded-[1px]"
          style={{ backgroundColor: paperColor }}
        />
        
        {/* Inner printed content (Image directly on paper) */}
        <div 
          className="absolute overflow-hidden rounded-[1px] bg-[#2a241f]"
          style={{ top: contentInset, right: contentInset, bottom: contentInset, left: contentInset }}
        >
          <img 
            src={image}
            onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${spot.code}nature/400/500` }}
            className={`w-full h-full object-cover transition-all duration-500 ${!isDone ? 'grayscale sepia-[0.3] opacity-60' : 'opacity-100'}`} 
            alt={spot.name} 
          />
          
          {/* Inner thin border overlay */}
          <div 
            className="absolute border border-white/70 pointer-events-none z-10"
            style={{ top: innerBorderInset, right: innerBorderInset, bottom: innerBorderInset, left: innerBorderInset }}
          ></div>
          
          {/* Text Overlays */}
          <div className={`absolute inset-0 ${padding} flex flex-col justify-between pointer-events-none z-20`}>
            
            {/* Top Right: Date & Island (Vertical) */}
            <div className="flex justify-end w-full">
              <div 
                className="flex items-center gap-2 text-[#fdfcf9] font-medium font-['Gowun_Batang']"
                style={{ 
                  writingMode: 'vertical-rl', 
                  textOrientation: 'mixed', // Changed from sideways to mixed to prevent hyphen wrapping issues
                  whiteSpace: 'nowrap', // Force no wrapping
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                }}
              >
                <span className={`${dateSize} tracking-[0.15em] opacity-90 leading-none`}>
                  {isDone ? dateStr : ''}
                </span>
                <span className={`${islandSize} tracking-[0.2em] leading-none`}>{islandName}</span>
              </div>
            </div>

            {/* Bottom Left: Spot Name */}
            <div className="flex flex-col items-start w-full">
              <span 
                className={`text-[#fdfcf9] ${titleSize} font-medium leading-none tracking-normal font-['Gowun_Batang']`}
                style={{ textShadow: '0 1px 5px rgba(0,0,0,0.7)' }}
              >
                {spot.name}
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderPostageStamp = (spot, island, isDone, sym, idx) => {
    const stampRecord = stamps.find(st => st.code === spot.code);
    
    // 수채화 이미지 에셋 동적 로드
    const getSpotImage = () => {
      try { return new URL(`../assets/${island.id}_${spot.id}.png`, import.meta.url).href; } 
      catch (e) { return `https://picsum.photos/seed/${spot.code}nature/400/500`; }
    };

    return (
      <motion.button 
        key={spot.code}
        onClick={() => setSelectedSpot({ spot, isDone, sym, image: getSpotImage(), islandName: island.name, timestamp: stampRecord?.timestamp })}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ delay: (idx % 4) * 0.05, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        whileTap={{ scale: 0.95 }}
        className="w-full text-left"
      >
        {renderStampArtwork(spot, island.name, isDone, getSpotImage(), stampRecord?.timestamp, 'small')}
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
      <div className="w-full pb-12 flex flex-col items-center pt-8">
        {ISLANDS.map((island) => (
          <div key={island.id} className="relative w-full mb-16 mt-6 bg-[#e6dbca] border-y border-[#d4c5af] shadow-[0_4px_12px_rgba(0,0,0,0.06)] pb-10">
            <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 rotate-2 w-28 h-7 bg-[#c2b29d] opacity-80 mix-blend-multiply z-20" 
                 style={{ clipPath: 'polygon(2% 4%, 98% 0%, 99% 96%, 1% 98%)' }}></div>
                 
            <div className="flex flex-col w-full mb-10 mt-8 px-6">
              <div className="flex flex-row justify-start items-start w-full mb-1">
                <div className="relative inline-block mt-2">
                  <div className="absolute bottom-[2px] left-[-8%] -rotate-1 w-[116%] h-[14px] bg-[#fde047] opacity-60 mix-blend-multiply z-0 rounded-[2px]"></div>
                  <h3 className="text-[#2a241f] text-[2.4rem] leading-none mb-1 z-10 font-['Gowun_Batang'] font-medium relative">
                    {island.name}
                  </h3>
                </div>
              </div>

              <div className="mt-3 w-full opacity-85 px-1 pb-2">
                <p 
                  className="text-[#594d40] text-[0.85rem] font-['Pretendard'] font-medium break-keep m-0 p-0"
                  style={{ 
                    lineHeight: '26px',
                    backgroundImage: 'linear-gradient(transparent 25px, #d6cbb5 25px, #d6cbb5 26px)',
                    backgroundSize: '100% 26px',
                  }}
                >
                  {islandLongDescriptions[island.id]}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-3 px-5 justify-items-stretch w-full">
              {island.spots.map((spot, idx) => {
                 const isDone = stamps.some(st => st.code === spot.code);
                 const sym = SYMBOLS[spot.category];
                 return renderPostageStamp(spot, island, isDone, sym, idx);
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Spot Detail Modal */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#1a1714]/85 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedSpot(null);
            }}
          >
            <button 
              className="absolute top-4 right-4 text-white text-4xl font-light p-2 active:scale-90 opacity-60 hover:opacity-100 z-[60]"
              onClick={() => setSelectedSpot(null)}
            >
              ×
            </button>

            {/* 거대한 우표 (모달 메인) */}
            <motion.div 
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex flex-col items-center w-[90vw] max-w-[23rem] shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={stampRef} className="w-full bg-[#f2ede4]">
                {renderStampArtwork(selectedSpot.spot, selectedSpot.islandName, selectedSpot.isDone, selectedSpot.image, selectedSpot.timestamp, 'large')}
              </div>
            </motion.div>

            {/* 하단 플로팅 버튼 영역 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col w-full max-w-[23rem] mt-6 gap-3 px-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedSpot.isDone ? (
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={async () => {
                      if (!stampRef.current) return;
                      try {
                        // FIX: Remove CSS masks during export so html-to-image doesn't render a black screen
                        const dataUrl = await toPng(stampRef.current, { 
                          cacheBust: true, 
                          pixelRatio: 2, 
                          backgroundColor: '#ffffff',
                          style: { filter: 'none' }, // Strip drop-shadow to prevent clipping
                          filter: (node) => {
                            // Strip masks inline to force rendering
                            if (node.style) {
                              node.style.maskImage = 'none';
                              node.style.WebkitMaskImage = 'none';
                            }
                            return true;
                          }
                        });
                        const a = document.createElement('a');
                        a.href = dataUrl;
                        a.download = `${selectedSpot.spot.name}_기념우표.png`;
                        a.click();
                      } catch (e) {
                        console.error('Failed to save stamp image', e);
                        alert('이미지 저장에 실패했습니다. 다시 시도해 주세요.');
                      }
                    }}
                    className="flex-1 text-[#2a241f] bg-[#fdfcf9] font-bold py-4 rounded-full active:scale-95 transition-all duration-300 text-[0.9rem] tracking-[0.1em] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
                  >
                    저장하기
                  </button>
                  <button 
                    onClick={async () => {
                      if (!stampRef.current) return;
                      try {
                        const dataUrl = await toPng(stampRef.current, { 
                          cacheBust: true, 
                          pixelRatio: 2, 
                          backgroundColor: '#ffffff',
                          style: { filter: 'none' },
                          filter: (node) => {
                            if (node.style) {
                              node.style.maskImage = 'none';
                              node.style.WebkitMaskImage = 'none';
                            }
                            return true;
                          }
                        });
                        const blob = await (await fetch(dataUrl)).blob();
                        const file = new File([blob], `${selectedSpot.spot.name}_기념우표.png`, { type: 'image/png' });
                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                          await navigator.share({
                            title: '내 기념 우표',
                            text: `${selectedSpot.spot.name}에서 예쁜 우표를 획득했어요!`,
                            files: [file],
                          });
                        } else {
                          alert('이 기기에서는 이미지 직접 공유를 지원하지 않습니다. 저장하기를 이용해주세요.');
                        }
                      } catch (e) {
                        console.error('Share failed', e);
                      }
                    }}
                    className="flex-1 text-[#2a241f] bg-[#fdfcf9] font-bold py-4 rounded-full active:scale-95 transition-all duration-300 text-[0.9rem] tracking-[0.1em] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
                  >
                    공유하기
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 w-full mt-1">
                  <button 
                    onClick={() => { window.open(`https://map.kakao.com/link/to/${encodeURIComponent(selectedSpot.spot.name)},${selectedSpot.spot.lat},${selectedSpot.spot.lng}`, '_blank'); }}
                    className="flex-1 text-[#2a241f] bg-[#fdfcf9] font-bold py-4 rounded-full active:scale-95 transition-all duration-300 text-[0.85rem] tracking-[0.1em] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
                  >
                    카카오맵 길찾기
                  </button>
                  <button 
                    onClick={() => { window.open(`https://map.naver.com/p/directions/-/${selectedSpot.spot.lng},${selectedSpot.spot.lat},${encodeURIComponent(selectedSpot.spot.name)}/-/transit?c=15,0,0,0,dh`, '_blank'); }}
                    className="flex-1 text-[#2a241f] bg-[#fdfcf9] font-bold py-4 rounded-full active:scale-95 transition-all duration-300 text-[0.85rem] tracking-[0.1em] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
                  >
                    네이버지도 길찾기
                  </button>
                </div>
              )}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

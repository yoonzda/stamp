import React, { useState, useRef, useEffect } from 'react';
import intro1Trad from '../assets/intro1_trad.png';

const ONBOARDING_STEPS = [
  {
    title: '옹진군 스탬프 투어,\n여행 주머니',
    description: '옹진군의 눈부신 명소들을 여행하며 특별한 스탬프 투어를 즐겨보세요! 발길이 닿는 곳마다 여행 주머니에 스탬프가 하나둘씩 쌓여갑니다.'
  },
  {
    title: '미션을 달성하고\n숨겨진 보상을 획득하세요',
    description: '명소에 도착해 스탬프를 획득하며 여행 주머니 스크랩을 완성하세요. 미션을 달성할 때마다 캐릭터를 꾸밀 수 있는 귀여운 아바타 아이템과 보상이 주어집니다.'
  },
  {
    title: '아름다운 섬들을 향해\n지금 출발하세요',
    description: '기암괴석과 은빛 파도가 눈부신 절경을 이루는 옹진군 대자연이 여러분을 기다립니다. 지도를 펴고 투어의 첫 번째 목적지를 향해 발걸음을 내디뎌 보세요!'
  }
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) {
      // Swiped Left -> Next
      if (step < ONBOARDING_STEPS.length - 1) setStep(step + 1);
    } else if (distance < -swipeThreshold) {
      // Swiped Right -> Prev
      if (step > 0) setStep(step - 1);
    }
    touchStartX.current = null;
  };

  const startTour = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    onFinish();
  };

  const skip = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    onFinish();
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && step < ONBOARDING_STEPS.length - 1) {
        setStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && step > 0) {
        setStep((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  return (
    <div 
      className="absolute inset-0 z-40 flex flex-col font-['Nanum_Myeongjo'] overflow-hidden bg-[#e9e3d3] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* ONE STATIC 100% Opaque Full Screen Background for continuity */}
      <img 
         src={intro1Trad} 
         alt="온보딩 수묵화 배경" 
         className="absolute inset-0 w-full h-full object-cover -z-10 animate-fade-in scale-[1.15]" 
      />

      {/* Content wrapper - Centered */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md mx-auto z-10 select-none">
        
        {/* Centered Rectangle Card, solid white, edge-to-edge */}
        <div className="flex flex-col bg-white w-full pt-10 pb-8 px-8 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 relative">
          
          {/* Top Torn Edge */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180 -translate-y-[98%] z-[-1]">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block w-full h-[18px] fill-white" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.06))' }}>
              <path d="M0,0V40L15,20L30,32L45,15L60,25L75,12L90,30L105,15L120,32L135,18L150,35L165,15L180,32L195,18L210,28L225,15L240,30L255,20L270,32L285,15L300,34L315,22L330,32L345,18L360,28L375,20L390,35L405,15L420,30L435,15L450,32L465,22L480,34L495,15L510,32L525,18L540,28L555,22L570,34L585,15L600,32L615,18L630,30L645,20L660,35L675,15L690,32L705,15L720,30L735,22L750,34L765,15L780,30L795,18L810,32L825,22L840,30L855,15L870,28L885,15L900,35L915,22L930,32L945,18L960,28L975,22L990,35L1000,30L1020,18L1035,32L1050,15L1065,34L1080,20L1095,28L1110,18L1125,35L1140,15L1155,30L1170,18L1185,32L1200,20V0Z" />
            </svg>
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block w-full h-[18px] fill-white absolute top-[2px] opacity-60">
              <path d="M0,0V40L15,18L30,38L45,20L60,21L75,14L90,26L105,10L120,36L135,11L150,31L165,18L180,35L195,12L210,30L225,18L240,28L255,25L270,30L285,12L300,38L315,20L330,36L345,15L360,30L375,18L390,32L405,10L420,33L435,12L450,28L465,24L480,36L495,12L510,30L525,16L540,24L555,20L570,32L585,12L600,30L615,15L630,33L645,18L660,31L675,12L690,30L705,10L720,28L735,24L750,38L765,12L780,26L795,15L810,30L825,25L840,28L855,10L870,26L885,12L900,32L915,20L930,30L945,16L960,30L975,25L990,32L1000,28L1020,15L1035,30L1050,11L1065,36L1080,22L1095,25L1110,16L1125,32L1140,11L1155,28L1170,14L1185,34L1200,18V0Z" />
            </svg>
          </div>

          {/* Bottom Torn Edge */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[98%] z-[-2]">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block w-full h-[18px] fill-white" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.06))' }}>
              <path d="M0,0V40L15,22L30,35L45,10L60,20L75,5L90,28L105,18L120,32L135,12L150,24L165,15L180,30L195,18L210,32L225,20L240,28L255,18L270,35L285,25L300,32L315,15L330,30L345,12L360,24L375,25L390,30L405,18L420,32L435,22L450,30L465,15L480,28L495,25L510,35L525,22L540,32L555,18L570,28L585,22L600,35L615,30L630,20L645,32L660,25L675,35L690,22L705,30L720,15L735,32L750,28L765,35L780,25L795,32L810,18L825,28L840,15L855,30L870,20L885,32L900,25L915,34L930,22L945,32L960,18L975,28L990,20L1005,35L1020,25L1035,30L1050,15L1065,32L1080,22L1095,34L1110,25L1125,32L1140,18L1155,28L1170,22L1185,34L1200,25V0Z" />
            </svg>
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block w-full h-[18px] fill-white absolute top-[2px] opacity-60">
              <path d="M0,0V40L15,18L30,38L45,20L60,21L75,14L90,26L105,10L120,36L135,11L150,31L165,18L180,35L195,12L210,30L225,18L240,28L255,25L270,30L285,12L300,38L315,20L330,36L345,15L360,30L375,18L390,32L405,10L420,33L435,12L450,28L465,24L480,36L495,12L510,30L525,16L540,24L555,20L570,32L585,12L600,30L615,15L630,33L645,18L660,31L675,12L690,30L705,10L720,28L735,24L750,38L765,12L780,26L795,15L810,30L825,25L840,28L855,10L870,26L885,12L900,32L915,20L930,30L945,16L960,30L975,25L990,32L1000,28L1020,15L1035,30L1050,11L1065,36L1080,22L1095,25L1110,16L1125,32L1140,11L1155,28L1170,14L1185,34L1200,18V0Z" />
            </svg>
          </div>

          
          {/* Animated Text Area reflecting current Step - Left Aligned */}
          <div key={step} className="animate-fade-in text-left flex flex-col justify-center mb-4">
            <h2 className="text-[1.7rem] font-extrabold text-gray-900 mb-5 leading-[1.3] tracking-tight whitespace-pre-line break-keep">
              {ONBOARDING_STEPS[step].title}
            </h2>
            <p className="text-gray-600 text-[1.05rem] break-keep leading-[1.7] font-medium pr-2">
              {ONBOARDING_STEPS[step].description}
            </p>
          </div>
          
          {/* Controls Area */}
          <div className="flex flex-col w-full mt-6">
            
            {step === ONBOARDING_STEPS.length - 1 ? (
              <div className="flex flex-col gap-8 w-full">
                {/* Dots */}
                <div className="flex justify-center gap-2">
                  {ONBOARDING_STEPS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        i === step ? 'w-8 bg-[#0f172a]' : 'w-2 bg-gray-200'
                      }`} 
                    />
                  ))}
                </div>
                
                {/* Start & Prev Buttons */}
                <div className="flex items-center gap-3">
                  {/* Previous Button */}
                  <button 
                    onClick={() => step > 0 && setStep(step - 1)} 
                    className="w-[3.5rem] h-[3.5rem] shrink-0 flex items-center justify-center bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {/* Start Button */}
                  <button 
                    onClick={startTour}
                    className="group relative flex-1 h-[3.5rem] bg-[#0f172a] text-white rounded-2xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all outline-none overflow-hidden"
                  >
                    <span className="relative flex items-center justify-center gap-2 text-[1.1rem] tracking-wide">
                      투어 시작하기
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                 {/* Navigation Action Left (Previous or Skip) */}
                 {step > 0 ? (
                   <button 
                     onClick={() => setStep(step - 1)} 
                     className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 active:scale-95 transition-all"
                   >
                     <svg className="w-6 h-6 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                   </button>
                 ) : (
                   <div className="w-14 h-14 flex items-center justify-center">
                     <button 
                       onClick={skip}
                       className="text-gray-400 text-[0.95rem] font-bold hover:text-gray-600 transition-colors tracking-wide"
                     >
                       건너뛰기
                     </button>
                   </div>
                 )}

                 {/* Dots Centered */}
                 <div className="flex items-center gap-2">
                   {ONBOARDING_STEPS.map((_, i) => (
                     <div 
                       key={i} 
                       className={`h-2 rounded-full transition-all duration-500 ease-out ${
                         i === step ? 'w-8 bg-[#0f172a]' : 'w-2 bg-gray-200'
                       }`} 
                     />
                   ))}
                 </div>
                 
                 {/* Navigation Action Right (Next) */}
                 <button 
                   onClick={() => step < ONBOARDING_STEPS.length - 1 && setStep(step + 1)} 
                   className="w-14 h-14 flex items-center justify-center bg-[#0f172a] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_rgba(15,23,42,0.4)]"
                 >
                   <svg className="w-7 h-7 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

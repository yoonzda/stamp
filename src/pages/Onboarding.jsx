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
          
          {/* Top Torn Edge - Organic Curve Tear */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180 -translate-y-[98%] z-[-1]">
            <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="block w-full h-[14px] fill-white" style={{ filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.08))' }}>
              <path d="M0,30 L0,15 Q12,25 25,12 T50,20 T75,10 T100,22 T125,5 T150,18 T175,25 T200,8 T225,20 T250,5 T275,15 T300,25 T325,10 T350,18 T375,5 T400,22 T425,12 T450,20 T475,8 T500,25 T525,15 T550,5 T575,18 T600,22 T625,10 T650,20 T675,5 T700,15 T725,25 T750,10 T775,18 T800,22 T825,8 T850,20 T875,12 T900,25 T925,5 T950,18 T975,10 T1000,15 L1000,30 Z" />
            </svg>
            <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="block w-full h-[14px] fill-white absolute top-[2px] -left-[5px] opacity-40">
              <path d="M0,30 L0,15 Q12,25 25,12 T50,20 T75,10 T100,22 T125,5 T150,18 T175,25 T200,8 T225,20 T250,5 T275,15 T300,25 T325,10 T350,18 T375,5 T400,22 T425,12 T450,20 T475,8 T500,25 T525,15 T550,5 T575,18 T600,22 T625,10 T650,20 T675,5 T700,15 T725,25 T750,10 T775,18 T800,22 T825,8 T850,20 T875,12 T900,25 T925,5 T950,18 T975,10 T1000,15 L1000,30 Z" />
            </svg>
          </div>

          {/* Bottom Torn Edge - Organic Curve Tear */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[98%] z-[-2]">
            <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="block w-full h-[14px] fill-white" style={{ filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.08))' }}>
              <path d="M0,0 L0,15 Q12,5 25,18 T50,10 T75,20 T100,8 T125,25 T150,12 T175,5 T200,22 T225,10 T250,25 T275,15 T300,5 T325,20 T350,12 T375,25 T400,8 T425,18 T450,10 T475,22 T500,5 T525,15 T550,25 T575,12 T600,8 T625,20 T650,10 T675,25 T700,15 T725,5 T750,20 T775,12 T800,8 T825,22 T850,10 T875,18 T900,5 T925,25 T950,12 T975,20 T1000,15 L1000,0 Z" />
            </svg>
            <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="block w-full h-[14px] fill-white absolute top-[2px] left-[5px] opacity-40">
              <path d="M0,0 L0,15 Q12,5 25,18 T50,10 T75,20 T100,8 T125,25 T150,12 T175,5 T200,22 T225,10 T250,25 T275,15 T300,5 T325,20 T350,12 T375,25 T400,8 T425,18 T450,10 T475,22 T500,5 T525,15 T550,25 T575,12 T600,8 T625,20 T650,10 T675,25 T700,15 T725,5 T750,20 T775,12 T800,8 T825,22 T850,10 T875,18 T900,5 T925,25 T950,12 T975,20 T1000,15 L1000,0 Z" />
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
                    onClick={() => setStep(step - 1)} 
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
              <div className="flex w-full items-center justify-between pl-1">
                 {/* Navigation Action Left (Previous Arrow) */}
                 {step > 0 ? (
                   <button 
                     onClick={() => setStep(step - 1)} 
                     className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 active:scale-95 transition-all"
                   >
                     <svg className="w-6 h-6 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                   </button>
                 ) : (
                   <div className="w-14 h-14" /> /* Empty Placeholder for Layout Balance */
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
                   onClick={() => setStep(step + 1)} 
                   className="w-14 h-14 flex items-center justify-center bg-[#0f172a] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_rgba(15,23,42,0.4)]"
                 >
                   <svg className="w-7 h-7 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Separated Skip Button at the very bottom */}
      {step === 0 && (
        <div className="absolute bottom-[8vh] left-0 w-full flex justify-center z-20 animate-fade-in-up">
           <button 
             onClick={skip}
             className="text-white/90 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full text-[0.95rem] font-bold hover:bg-black/60 shadow-lg border border-white/20 transition-all tracking-wide active:scale-95"
           >
             설명 건너뛰기
           </button>
        </div>
      )}
    </div>
  );
}

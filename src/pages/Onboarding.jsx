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
      <div className="flex-1 flex flex-col justify-center items-center w-full mx-auto z-10 select-none px-6">
        
        {/* Paper Memo Card Container */}
        <div className="flex flex-col w-full max-w-[22rem] pt-12 pb-10 px-8 relative transition-all duration-300">
          
          {/* Crooked Paper Background */}
          <div className="absolute inset-0 bg-[#fefdfa] shadow-[0_12px_40px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.06)] rounded-[2px] -rotate-1 z-[-1] border border-gray-200/60" />
          
          {/* Masking Tape Design */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-[1.8rem] bg-[#eceade]/80 backdrop-blur-md shadow-[0_2px_4px_rgba(0,0,0,0.1)] rotate-2 z-[-1] rounded-[1px] border-t border-b border-white/40" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, transparent 10%, transparent 90%, rgba(255,255,255,0.4) 100%)' }} />

          
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
      {step < ONBOARDING_STEPS.length - 1 && (
        <div className="absolute bottom-[6vh] left-0 w-full flex justify-center z-20 animate-fade-in">
           <button 
             onClick={skip}
             className="text-white/60 hover:text-white/90 text-[0.95rem] font-medium border-b border-transparent hover:border-white/50 transition-all pb-0.5 tracking-wide"
           >
             건너뛰기
           </button>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import intro1Trad from '../assets/intro1_trad.png';

const ONBOARDING_STEPS = [
  {
    title: <>당신을 위한<br/><b>여행 주머니</b></>,
    description: <>발길이 닿는 곳마다 옹진군의 눈부신 풍경을 담아보세요.<br/>가벼운 마음으로 떠난 이 섬 투어가<br/>당신의 일상에 잊지 못할 소중한 추억을 가득 더해줄 것입니다.</>
  },
  {
    title: <><b>여행 주머니</b>와<br/>함께라면</>,
    description: <>아름다운 자연 속에서 명소를 탐험하고 스탬프를 모아보세요.<br/>그동안 켜켜이 쌓인 스트레스는 모두 빼버리고,<br/>미션을 완성해 나갈수록 여행의 행복은 배로 늘어납니다.</>
  },
  {
    title: <>옹진군의 아름다운<br/><b>섬들을 소개합니다</b></>,
    description: <>은빛 파도와 신비로운 기암괴석이 절경을 이루는 대자연.<br/>아름다운 섬에서 얻은 벅찬 감동과 즐거움을<br/>사랑하는 사람들과 함께 지금 바로 나눠보세요!</>
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

      {/* Subtle White Gradient at the bottom to ensure text readability */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-white via-white/85 to-transparent z-0 pointer-events-none" />

      {/* Content wrapper - Anchored to bottom */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-8 pb-[8vh] max-w-md mx-auto select-none">
        
        {/* Step Indicator (Dots) */}
        <div className="flex items-center gap-2 mb-6 ml-1">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.15)] ${
                i === step ? 'w-6 bg-[#0f172a]' : 'w-2 bg-gray-400'
              }`} 
            />
          ))}
        </div>

        {/* Text Area */}
        <div key={step} className="animate-fade-in-up text-left mb-6 h-[12.5rem]">
          <h2 className="text-[1.9rem] font-extrabold text-gray-900 mb-3.5 leading-[1.3] tracking-tight whitespace-pre-line break-keep drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {ONBOARDING_STEPS[step].title}
          </h2>
          <p className="text-gray-700 text-[1.1rem] break-keep leading-[1.65] font-medium pr-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
             {ONBOARDING_STEPS[step].description}
          </p>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex w-full items-center justify-between">
          <button 
            onClick={step > 0 ? () => setStep(step - 1) : skip}
            className="text-gray-500 hover:text-gray-800 font-medium px-2 py-2 transition-colors tracking-wide text-[1.05rem]"
          >
            {step > 0 ? '이전' : '건너뛰기'}
          </button>
          
          <button 
            onClick={step === ONBOARDING_STEPS.length - 1 ? startTour : () => setStep(step + 1)}
            className="group flex items-center justify-center gap-2 h-[3.5rem] px-8 bg-[#0f172a] text-white rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all outline-none"
          >
            <span className="text-[1.1rem] tracking-wide">
              {step === ONBOARDING_STEPS.length - 1 ? '시작하기' : '다음'}
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

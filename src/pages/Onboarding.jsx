import React, { useState, useRef, useEffect } from 'react';
import intro1Trad from '../assets/intro1_trad.png';

const ONBOARDING_STEPS = [
  {
    title: <>단 하나뿐인,<br/><span className="text-[#ea580c] drop-shadow-sm">당신을 위한 여행 주머니</span></>,
    description: '옹진군의 눈부신 명소들을 거닐며 특별한 스탬프 투어를 즐겨보세요! 발길이 닿는 곳마다 당신의 여행 주머니에 소중하고 예쁜 추억들이 차곡차곡 쌓여갑니다.'
  },
  {
    title: <><span className="text-[#0284c7] drop-shadow-sm">여행 주머니와 함께라면</span><br/>더욱 즐거워지는 탐험</>,
    description: '명소 곳곳에 숨겨진 미션을 달성하고 스탬프를 획득해 보세요. 스크랩을 완성해 나갈 때마다 여행을 한층 더 다채롭게 만들어줄 특별한 아바타 아이템과 보상이 기다리고 있습니다.'
  },
  {
    title: <>지금 바로 옹진군의<br/><span className="text-[#16a34a] drop-shadow-sm">아름다운 섬들을 소개합니다!</span></>,
    description: '기암괴석과 은빛 파도가 환상적인 절경을 이루는 옹진군의 대자연이 여러분을 초대합니다. 자, 이제 지도를 활짝 펴고 투어의 첫 번째 목적지를 향해 힘차게 출발해 볼까요?'
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

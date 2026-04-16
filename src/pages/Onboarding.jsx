import React, { useState, useRef, useEffect } from 'react';
import intro1Trad from '../assets/intro1_trad.png';

const ONBOARDING_STEPS = [
  {
    title: '바다 위 보석, 옹진군',
    description: '번잡한 도시의 소음과 일상의 피로를 잠시 내려놓으세요. 당신의 발길을 기다리는 100여 개의 아름다운 섬들이 눈부신 바다 위에 고즈넉하게 흩어져 있습니다.'
  },
  {
    title: '발길 닿는 곳이 곧 예술',
    description: '잔잔한 은빛 모래사장과 세월을 견뎌낸 웅장한 기암괴석들까지. 옹진군의 모든 순간은 한 폭의 고운 수묵화처럼 당신의 마음에 선명하고 깊게 새겨질 것입니다.'
  },
  {
    title: '당신만의 특별한 섬 여행기',
    description: '경이로운 명소 앞을 거닐며 아름다운 추억을 카메라에 담아보세요. 앱을 통해 스탬프를 찍고 특별한 여행의 찰나를 영원한 디지털 인장으로 남길 수 있습니다.'
  },
  {
    title: '걸음걸음 채워가는 성취감',
    description: '옹진군 28곳의 해안 절경들이 당신을 기다립니다. 낯선 섬을 탐험하며 차곡차곡 쌓여가는 여행 인증 스탬프는 훗날 아주 소중한 나만의 보물이 될 것입니다.'
  },
  {
    title: '이제, 출발할 시간입니다',
    description: '맑은 바닷바람이 부드럽게 뺨을 스치고 있습니다. 지도를 펼치고 첫 번째 목적지로 향하여 자연이 허락한 온전한 쉼표를 즐기실 준비가 되셨나요?'
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

      {/* Content wrapper centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center z-10 animate-fade-in-up">
        
        {/* ONE BIG GLASS BOX perfectly centered */}
        <div className="flex flex-col bg-white/20 backdrop-blur-xl px-8 pt-10 pb-8 rounded-[2.5rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] w-full max-w-sm transition-all duration-300">
          
          {/* Animated Text Area reflecting current Step */}
          <div key={step} className="mb-10 animate-fade-in">
            <h2 className="text-[1.8rem] font-bold text-gray-900 mb-4 leading-[1.3] tracking-tight drop-shadow-sm">
              {ONBOARDING_STEPS[step].title}
            </h2>
            <p className="text-gray-800 text-[1.05rem] break-keep leading-[1.8] font-medium drop-shadow-sm px-1">
              {ONBOARDING_STEPS[step].description}
            </p>
          </div>
          
          {/* Controls Area */}
          <div className="flex flex-col items-center w-full min-h-[4rem] justify-end">
            {/* Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {ONBOARDING_STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    i === step ? 'w-10 bg-gray-800 shadow-sm' : 'w-2 bg-gray-400/50'
                  }`} 
                />
              ))}
            </div>
            
            {/* Start Button shows ONLY on last step with Premium Special CSS styling */}
            {step === ONBOARDING_STEPS.length - 1 ? (
              <button 
                onClick={startTour}
                className="group relative w-full py-4 bg-gradient-to-r from-gray-900 via-[#3a352d] to-gray-900 text-white rounded-[1.5rem] font-bold shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] active:scale-95 transition-all outline-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2 text-[1.1rem] tracking-widest">
                  기행 시작하기
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            ) : (
              <div className="flex w-full items-center justify-between mt-1 px-4">
                 <button 
                   onClick={() => step > 0 && setStep(step - 1)} 
                   className={`p-2 transition-all ${step === 0 ? 'opacity-0 cursor-default' : 'opacity-50 hover:opacity-100 hover:scale-110 text-gray-800'}`}
                   disabled={step === 0}
                 >
                   <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 
                 <button 
                   onClick={skip}
                   className="text-gray-600 text-[0.85rem] font-bold hover:text-gray-900 tracking-[0.2em] underline underline-offset-8 decoration-black/20 hover:decoration-black/40 transition-colors"
                 >
                   건너뛰기
                 </button>

                 <button 
                   onClick={() => step < ONBOARDING_STEPS.length - 1 && setStep(step + 1)} 
                   className="p-2 opacity-50 hover:opacity-100 hover:scale-110 text-gray-800 transition-all"
                 >
                   <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

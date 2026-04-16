import React, { useState } from 'react';
import intro1Trad from '../assets/intro1_trad.png';
import intro2Trad from '../assets/intro2_trad.png';

const ONBOARDING_STEPS = [
  {
    title: '바다 위 보석, 옹진군',
    description: '일상의 번잡함에서 벗어나, 고즈넉한 수묵화처럼 펼쳐진 전통 옹진군의 섬들을 거닐어 보세요. 발길 닿는 구석구석마다 새로운 위안이 당신을 기다리고 있습니다.',
    img: intro1Trad
  },
  {
    title: '찰나를 영원한 풍경으로',
    description: '발걸음을 멈추게 하는 경이로운 명소 앞에서는 카메라를 들어주세요. 섬이 건네는 다정한 이야기를 기록하는 순간, 특별한 인장과 함께 당신만의 우아한 여행기가 완성됩니다.',
    img: intro2Trad
  }
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('has_seen_onboarding', 'true');
      onFinish();
    }
  };

  const skip = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    onFinish();
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col font-['Nanum_Myeongjo'] overflow-hidden bg-[#e9e3d3]">
      
      {/* 100% Opaque Full Screen Background - Scaled to crop white paper borders */}
      <img 
         key={step}
         src={ONBOARDING_STEPS[step].img} 
         alt="온보딩 전통 수묵화" 
         className="absolute inset-0 w-full h-full object-cover -z-10 animate-fade-in scale-[1.15]" 
      />

      {/* Content wrapper centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center z-10 animate-fade-in-up">
        
        {/* ONE BIG GLASS BOX perfectly centered */}
        <div className="flex flex-col bg-white/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] w-full max-w-sm">
          
          {/* Text Area */}
          <div className="mb-10 mt-2">
            <h2 className="text-[1.9rem] font-bold text-gray-900 mb-4 leading-[1.3] tracking-tight drop-shadow-sm">
              {ONBOARDING_STEPS[step].title}
            </h2>
            <p className="text-gray-800 text-[1.1rem] break-keep leading-[1.8] font-medium drop-shadow-sm px-2">
              {ONBOARDING_STEPS[step].description}
            </p>
          </div>
          
          {/* Buttons Area */}
          <div className="flex flex-col gap-6 items-center w-full">
            {/* Dots */}
            <div className="flex justify-center gap-2.5 mb-1">
              {ONBOARDING_STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    i === step ? 'w-10 bg-gray-800 shadow-sm' : 'w-3 bg-gray-400/50'
                  }`} 
                />
              ))}
            </div>
            
            <button 
              onClick={nextStep}
              className="w-full py-4 bg-gray-900/90 text-white rounded-[1.25rem] font-bold shadow-lg hover:bg-gray-900 active:scale-95 transition-all text-lg tracking-wider"
            >
              {step === ONBOARDING_STEPS.length - 1 ? '기행 시작하기' : '다음 풍경'}
            </button>
            
            {step < ONBOARDING_STEPS.length - 1 && (
              <button 
                onClick={skip}
                className="w-full py-1 text-gray-700 font-bold hover:text-gray-900 transition-colors tracking-wide underline underline-offset-4 decoration-black/20"
              >
                건너뛰기
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

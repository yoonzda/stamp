import React, { useState } from 'react';
import wcIntro1 from '../assets/wc_intro1.png';
import wcIntro2 from '../assets/wc_intro2.png';

const ONBOARDING_STEPS = [
  {
    title: '바다 위 보석, 옹진군',
    description: '일상의 번잡함에서 잠시 벗어나, 투명한 바다와 고즈넉한 바람이 반겨주는 옹진군의 섬들을 거닐어 보세요. 발길 닿는 구석구석마다 새로운 위안과 평화로움이 당신을 기다리고 있습니다.',
    img: wcIntro1
  },
  {
    title: '찰나를 영원한 추억으로',
    description: '발걸음을 멈추게 하는 경이로운 명소 앞에서는 꼭 사진을 남겨주세요. 섬이 건네는 고요하고 다정한 이야기를 사진으로 기록하는 순간, 특별한 스탬프와 함께 당신만의 아름다운 여행기가 완성됩니다.',
    img: wcIntro2
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
    <div className="absolute inset-0 z-40 bg-[#F3EFE6] flex flex-col font-['Pretendard']">
      
      {/* Massive Edge-to-Edge Image Header */}
      <div className="relative w-full h-[55%] rounded-b-[3rem] overflow-hidden shadow-sm bg-[#e8decb]">
        <img 
           key={step}
           src={ONBOARDING_STEPS[step].img} 
           alt="온보딩 수채화 안내" 
           className="absolute inset-0 w-full h-full object-cover animate-fade-in transform transition-transform duration-[2000ms] hover:scale-105" 
        />
        {/* Soft bottom gradient to blend with the text area */}
        <div className="absolute w-full h-40 bg-gradient-to-t from-[#F3EFE6] to-transparent bottom-0"></div>
      </div>

      {/* Text Content - Left Aligned */}
      <div className="flex-1 flex flex-col justify-start items-start px-8 pt-8 pb-4 text-left animate-fade-in-up transition-all duration-300">
        <h2 className="text-[1.8rem] font-['Nanum_Myeongjo'] font-bold text-[#3e342b] mb-4 leading-tight tracking-tight drop-shadow-sm">
          {ONBOARDING_STEPS[step].title}
        </h2>
        <p className="text-[#685b4f] text-[1.05rem] break-keep leading-relaxed opacity-95">
          {ONBOARDING_STEPS[step].description}
        </p>
      </div>
      
      {/* Footer Controls */}
      <div className="px-8 pb-12 flex flex-col gap-6 bg-[#F3EFE6]">
        <div className="flex justify-start gap-2.5 mb-2">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                i === step ? 'w-10 bg-[#004790]' : 'w-3 bg-[#d5ccbe]'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={nextStep}
          className="w-full py-4 bg-[#004790] text-white rounded-2xl font-bold shadow-md hover:bg-opacity-90 active:scale-95 transition-all text-lg tracking-wide"
        >
          {step === ONBOARDING_STEPS.length - 1 ? '여행 시작하기' : '다음 이야기'}
        </button>
        
        {step < ONBOARDING_STEPS.length - 1 && (
          <button 
            onClick={skip}
            className="w-full py-2 text-[#8a7a6b] font-medium hover:text-[#3e342b] transition-colors tracking-wide underline underline-offset-4 decoration-black/20"
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  );
}

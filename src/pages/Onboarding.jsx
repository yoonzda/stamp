import React, { useState } from 'react';

const ONBOARDING_STEPS = [
  {
    title: '옹진군 섬 여행',
    description: '아름다운 옹진군의 선재도, 영흥도 등 청정 섬들을 탐험하며 숨겨진 매력을 발견하세요.',
    icon: '🏝️'
  },
  {
    title: '스탬프를 모아보세요',
    description: '명소의 아름다운 풍경을 사진으로 찍어 인증하고 스탬프를 획득하세요.',
    icon: '📸'
  },
  {
    title: '나만의 캐릭터 꾸미기',
    description: '스탬프를 모아 다양한 아이템을 획득하고 나만의 서포터즈 캐릭터를 멋지게 꾸며보세요!',
    icon: '🐾'
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
    <div className="absolute inset-0 z-40 bg-[#F3EFE6] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-8 text-center animate-fade-in-up transition-all duration-300">
        <div className="text-[120px] mb-8 leading-none drop-shadow-md select-none">
          {ONBOARDING_STEPS[step].icon}
        </div>
        <h2 className="text-3xl font-['Nanum_Myeongjo'] font-bold text-[#0B4F9A] mb-4">
          {ONBOARDING_STEPS[step].title}
        </h2>
        <p className="text-[#555] text-lg break-keep leading-relaxed px-4">
          {ONBOARDING_STEPS[step].description}
        </p>
      </div>
      
      <div className="p-8 flex flex-col gap-4 bg-white/30 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex justify-center gap-2 mb-6">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-[#0B4F9A]' : 'w-2.5 bg-gray-300'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={nextStep}
          className="w-full py-4 bg-[#0B4F9A] text-white rounded-xl font-bold shadow-md hover:bg-opacity-90 active:scale-95 transition-all text-lg"
        >
          {step === ONBOARDING_STEPS.length - 1 ? '시작하기' : '다음으로'}
        </button>
        
        {step < ONBOARDING_STEPS.length - 1 && (
          <button 
            onClick={skip}
            className="w-full py-3 text-gray-500 font-medium hover:text-[#333] transition-colors"
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  );
}

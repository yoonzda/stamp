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
    <div className="absolute inset-0 z-40 flex flex-col font-['Nanum_Myeongjo'] overflow-hidden bg-white">
      
      {/* FULL SCREEN BACKGROUND - 100% Opaque for full feeling */}
      <img 
         key={step}
         src={ONBOARDING_STEPS[step].img} 
         alt="온보딩 전통 수묵화" 
         className="absolute inset-0 w-full h-full object-cover -z-10 animate-fade-in scale-100 hover:scale-105 transition-transform duration-[3000ms]" 
      />

      {/* Fade the extremely bottom portion cleanly so the text is fully readable */}
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-white via-white/80 to-transparent -z-10"></div>

      {/* Text Content - Floating over bottom */}
      <div className="flex-1 flex flex-col justify-end px-6 pb-10 text-left z-10 animate-fade-in-up">
        
        <div className="bg-white/95 backdrop-blur-md p-7 rounded-[2rem] border border-[#d5ccbe]/60 shadow-xl">
          <h2 className="text-[1.8rem] font-bold text-[#2e2620] mb-4 leading-tight tracking-tight">
            {ONBOARDING_STEPS[step].title}
          </h2>
          <p className="text-[#4a3f35] text-[1.05rem] break-keep leading-[1.8] font-medium">
            {ONBOARDING_STEPS[step].description}
          </p>
        </div>

      </div>
      
      {/* Footer Controls */}
      <div className="px-6 pb-12 flex flex-col gap-6 z-10">
        <div className="flex justify-start gap-2.5 mb-2 ml-4">
          {ONBOARDING_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                i === step ? 'w-10 bg-[#3e342b]' : 'w-3 bg-[#d5ccbe]'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={nextStep}
          className="w-full py-4.5 bg-[#2b241e] text-[#f4ecdf] rounded-2xl font-bold shadow-xl hover:bg-opacity-90 active:scale-95 transition-all text-lg tracking-wide border border-[#1a1511]"
        >
          {step === ONBOARDING_STEPS.length - 1 ? '기행 시작하기' : '다음 페이지'}
        </button>
        
        {step < ONBOARDING_STEPS.length - 1 && (
          <button 
            onClick={skip}
            className="w-full py-2 text-[#736456] font-semibold hover:text-[#2b241e] transition-colors tracking-wide underline underline-offset-4 decoration-black/20"
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  );
}

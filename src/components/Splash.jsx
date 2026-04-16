import React, { useEffect } from 'react';
import wcSplash from '../assets/wc_splash.png';

export default function Splash({ onFinish }) {
  useEffect(() => {
    // Show splash for slightly longer to appreciate the art
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F3EFE6] transition-opacity duration-500 overflow-hidden">
      {/* Background large splash */}
      <div className="absolute inset-x-0 top-0 h-[65%] shadow-md opacity-95 transition-transform duration-[4000ms] scale-105 origin-top rounded-b-[4rem] overflow-hidden">
         <img src={wcSplash} alt="스플래시 수채화 배경" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFE6] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="animate-fade-in-up flex flex-col items-center z-10 mt-[45vh]">
        <h1 className="text-[2.2rem] font-['Nanum_Myeongjo'] font-bold text-[#3e342b] mb-3 tracking-tight drop-shadow-sm">
          스탬프 투어
        </h1>
        <p className="text-[#6b5d4f] font-medium mb-10 tracking-widest bg-white/40 px-4 py-1 rounded-full">
          옹진군의 숨은 매력을 찾아서
        </p>
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-[#004790] border-t-transparent rounded-full animate-spin opacity-80"></div>
      </div>
    </div>
  );
}

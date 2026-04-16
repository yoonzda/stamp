import React, { useEffect } from 'react';
import splashTrad from '../assets/splash_trad.png';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden font-['Nanum_Myeongjo'] bg-[#e9e3d3]">
      <img src={splashTrad} alt="전통 수묵화 배경" className="absolute inset-0 w-full h-full object-cover scale-[1.15] -z-10" />
      
      {/* Unified Text Single Box for Splash Centered */}
      <div className="relative z-10 animate-fade-in-up flex flex-col items-center text-center bg-white/20 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] w-[85%] max-w-sm mx-auto">
        
        <h1 className="text-[2.7rem] font-black text-gray-900 mb-5 tracking-tight drop-shadow-md leading-tight">
          옹진군<br/>스탬프 투어
        </h1>
        <p className="text-gray-800 font-bold text-[1.15rem] tracking-[0.2em] mb-2">
          자연이 허락한 쉼표
        </p>

        {/* Spinner moved inside the glass box */}
        <div className="mt-8">
          <div className="w-10 h-10 border-[4px] border-gray-400/30 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

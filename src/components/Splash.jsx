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
        <p className="text-gray-800 font-bold text-[1.15rem] tracking-[0.2em] mb-4">
          자연이 허락한 쉼표
        </p>

        {/* Trendy Modern Geometric Loader */}
        <div className="mt-8 mb-2 flex flex-col items-center">
           <div className="w-8 h-8 border-[2.5px] border-gray-800 animate-[spin_5s_linear_infinite] flex items-center justify-center p-1.5 rotate-45">
              <div className="w-full h-full bg-gray-800/80 animate-pulse"></div>
           </div>
           <span className="mt-6 text-gray-800 font-bold text-[0.7rem] tracking-[0.4em] uppercase opacity-80">
             Preparing
           </span>
        </div>
      </div>
    </div>
  );
}

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
      
      {/* Unified Text Single Box for Splash */}
      <div className="relative z-10 animate-fade-in-up flex flex-col items-center text-center mt-auto mb-32 bg-white/20 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-2xl">
        <h1 className="text-[2.8rem] font-black text-gray-900 mb-4 tracking-[-2px] drop-shadow-md">
          옹진군 스탬프 투어
        </h1>
        <p className="text-gray-800 font-bold text-lg tracking-[0.2em]">
          자연이 허락한 쉼표
        </p>
      </div>

      <div className="absolute bottom-12 z-10">
        <div className="w-12 h-12 border-[4px] border-white/40 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

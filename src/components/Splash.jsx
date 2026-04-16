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
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden font-['Nanum_Myeongjo']">
      <div className="absolute inset-0 bg-[#e9e3d3] -z-20"></div>
      <img src={splashTrad} alt="전통 수묵화 배경" className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[4000ms] -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/90 to-transparent -z-10"></div>

      <div className="relative z-10 animate-fade-in-up flex flex-col items-center text-center -mt-20">
        <h1 className="text-[2.8rem] font-black text-[#2b241e] mb-4 tracking-[-2px] drop-shadow-sm">
          옹진군 스탬프 투어
        </h1>
        <p className="text-[#4a3f35] font-bold text-lg tracking-[0.2em] bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-[#d5ccbe]/50 shadow-sm">
          자연이 허락한 쉼표
        </p>
      </div>

      <div className="absolute bottom-20 z-10">
        <div className="w-12 h-12 border-[4px] border-[#3e342b]/20 border-t-[#3e342b] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

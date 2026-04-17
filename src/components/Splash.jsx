import React, { useEffect } from 'react';
import splashTrad from '../assets/splash_bg_new.png';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background Image */}
      <img 
        src={splashTrad} 
        alt="옹진군 수채화 배경" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90 z-0" 
      />
      {/* Dark overlay for rich contrast with white text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 z-0" />
      
      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col items-center px-8 w-full animate-fade-in-up">
        {/* Map Pin / Location Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-10 h-10 text-white mb-6 drop-shadow-md opacity-90" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="1.2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>

        <h2 className="text-white/80 font-sans text-xs font-light tracking-[0.4em] mb-3 uppercase">
          Ongjin-Gun
        </h2>
        <h1 className="text-white font-serif text-5xl md:text-6xl font-extrabold tracking-widest leading-tight text-center drop-shadow-lg mb-6">
          옹진<br/>스탬프투어
        </h1>
        <div className="w-10 h-[1px] bg-white/50 mb-6"></div>
        <p className="text-white font-serif text-lg tracking-[0.25em] font-medium drop-shadow-md">
          자연이 허락한 쉼표
        </p>
      </div>

      {/* Minimal Absolute Bottom Loader */}
      <div className="absolute bottom-16 w-full flex flex-col items-center z-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <p className="text-white/70 font-sans text-[0.65rem] tracking-[0.3em] uppercase mb-4">
          여정 준비 중 ...
        </p>
        {/* Swipe Loading Line */}
        <div className="w-32 h-[2px] bg-white/20 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full" style={{ animation: 'progressSlide 1.5s infinite ease-in-out' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes progressSlide {
          0% { transform: translateX(-150%); width: 20%; }
          50% { transform: translateX(100%); width: 60%; box-shadow: 0 0 8px rgba(255,255,255,0.8); }
          100% { transform: translateX(450%); width: 20%; }
        }
      `}</style>
    </div>
  );
}

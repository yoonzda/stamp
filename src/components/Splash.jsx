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
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#eef2f5]">
      {/* Background Image Cover */}
      <img 
        src={splashTrad} 
        alt="옹진군 수채화 배경" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0" 
      />
      
      {/* 
        Subtle Gradients: 
        Top: Soft white gradient so dark text pops perfectly on the sky.
        Bottom: Soft dark gradient so white loader pops perfectly on the sea. 
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-black/40 z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between items-center pt-[15%] pb-[10%]">
        
        {/* Top Typography Section */}
        <div className="flex flex-col items-center px-6 w-full animate-fade-in-down">
          
          {/* Subtle English Title with Lines */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-[1px] bg-[#1e293b]"></div>
            <span className="text-[#1e293b] font-sans text-xs font-bold tracking-[0.4em] uppercase">
              Ongjin Tour
            </span>
            <div className="w-10 h-[1px] bg-[#1e293b]"></div>
          </div>
          
          {/* Main Title (using Nanum Myeongjo for classic elegance) */}
          <h1 className="text-[#0f172a] font-serif text-[3.5rem] font-black tracking-tighter leading-[1.1] text-center mb-6 drop-shadow-sm">
            옹진<br/>
            스탬프투어
          </h1>
          
          {/* Subtitle (using cursive Kyobo_Hand if available, fallback to Sans) */}
          <p className="text-[#334155] font-['Kyobo_Hand',_sans-serif] text-[1.4rem] tracking-wider font-medium">
            자연이 허락한 쉼표
          </p>

        </div>

        {/* Bottom Loading Indicator (White over darker sea bottom) */}
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="relative w-14 h-14 mb-4">
            {/* Spinning Dashed Ring */}
            <svg className="w-full h-full text-white/90" style={{ animation: 'spin 8s linear infinite' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 8" />
            </svg>
            {/* Center Paper Plane Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white transform -rotate-45 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
          <p className="text-white/80 font-sans text-[0.6rem] font-bold tracking-[0.4em] uppercase">
            Loading
          </p>
        </div>

      </div>

      {/* Inject custom keyframe just for safety */}
      <style>{`
        .animate-fade-in-down {
          animation: fadeDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

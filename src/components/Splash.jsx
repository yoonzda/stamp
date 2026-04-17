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
        alt="옹진군 여행주머니 배경" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0" 
      />
      
      {/* 
        Subtle Gradients: 
        Top: Soft white gradient so dark text pops perfectly.
        Bottom: Soft dark gradient so white loader pops perfectly. 
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-black/40 z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between items-center pt-[18%] pb-[12%]">
        
        {/* Top Typography Section */}
        <div className="flex flex-col items-center px-6 w-full animate-fade-in-down">
          
          {/* Title 1: 옹진군 (Gowun Batang or standard serif, non-italic, clean) */}
          <h2 className="text-[#273248] font-['Gowun_Batang',_serif] text-[2rem] font-bold tracking-[0.15em] mb-3 drop-shadow-sm">
            옹진군
          </h2>
          
          {/* Title 2: 여행 주머니 (Nanum Myeongjo or serif, Italic, elegant curve) */}
          <h1 className="text-[#0f172a] font-serif italic text-[4rem] font-extrabold tracking-tight leading-[1.1] text-center mb-6 drop-shadow-sm" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}>
            여행 주머니
          </h1>
          
          {/* Short English Travel Phrase */}
          <div className="flex items-center gap-3">
             <div className="w-8 h-[1px] bg-[#64748b]"></div>
             <p className="text-[#475569] font-sans text-xs tracking-[0.4em] font-medium uppercase">
               Unfold Your Journey
             </p>
             <div className="w-8 h-[1px] bg-[#64748b]"></div>
          </div>

        </div>

        {/* Bottom Loading Indicator (Large & Sophisticated) */}
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          
          {/* Luxurious Dual-Orbit Spinner */}
          <div className="relative w-24 h-24 mb-6">
            {/* Outer Static Thin Ring */}
            <svg className="absolute inset-0 w-full h-full text-white/30" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            
            {/* Outer Slow Rotating Dashed Tracker */}
            <svg className="absolute inset-0 w-full h-full text-white/50" style={{ animation: 'spinOuter 12s linear infinite' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 15" />
            </svg>

            {/* Inner Bold Dynamic Rotating Arc */}
            <svg className="absolute inset-0 w-full h-full text-white" style={{ animation: 'spinInner 2s cubic-bezier(0.4, 0.1, 0.6, 0.9) infinite' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="180" strokeDashoffset="90" strokeLinecap="round" />
            </svg>

            {/* Centered Minimal Compass/Star Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
              </svg>
            </div>
          </div>
          
          <p className="text-white/90 font-sans text-[0.65rem] font-bold tracking-[0.5em] uppercase drop-shadow-md">
            Loading
          </p>
        </div>

      </div>

      <style>{`
        .animate-fade-in-down {
          animation: fadeDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinInner {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

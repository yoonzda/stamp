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
    <div className="absolute inset-0 z-50 flex flex-col justify-center items-center overflow-hidden bg-[#eef2f5] font-['EF_jejudoldam',_sans-serif]">
      {/* Background Image */}
      <img 
        src={splashTrad} 
        alt="옹진군 여행주머니 배경" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0" 
      />
      
      {/* Invisible Soft Glow for Text Readability */}
      <div className="absolute w-[350px] h-[350px] bg-white/70 blur-[50px] rounded-full z-0 pointer-events-none" />

      {/* Main Content Group */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up w-full px-6">
        
        {/* Custom Pouch Loader (Fireworks/Popcorn Animation) */}
        <div className="relative flex justify-center items-end w-32 h-32 mb-2">
          
          {/* Popping Math Symbols (Behind the pouch) */}
          <div className="absolute inset-x-0 bottom-[45px] top-0 pointer-events-none z-0">
             <span className="symbol-item sym-1">＋</span>
             <span className="symbol-item sym-2">－</span>
             <span className="symbol-item sym-3">×</span>
             <span className="symbol-item sym-4">÷</span>
             <span className="symbol-item sym-5">＋</span>
             <span className="symbol-item sym-6">÷</span>
          </div>

          {/* Dumpling Shaped Pouch (만두 모양 주머니) */}
          <svg viewBox="0 0 100 100" fill="#f8fafc" stroke="#334155" strokeWidth="4" className="w-[4.5rem] h-[4.5rem] relative z-10 drop-shadow-md">
            {/* Top Frills */}
            <path d="M 35 38 C 25 25, 45 25, 45 30 C 50 25, 55 30, 55 30 C 55 25, 75 25, 65 38" fill="#f8fafc" strokeLinejoin="round"/>
            {/* Round Dumpling Body */}
            <path d="M 35 38 C 10 45, 15 95, 50 95 C 85 95, 90 45, 65 38 Z" fill="#f8fafc" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Tie String */}
            <path d="M 32 38 Q 50 43, 68 38" fill="none" strokeLinecap="round"/>
            {/* Hanging String Ends */}
            <path d="M 50 40 Q 45 50, 48 60 M 50 40 Q 55 50, 52 60" fill="none" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Text 1: 옹진군 */}
        <h2 className="text-[#334155] text-[1.4rem] tracking-[0.1em] mb-1 drop-shadow-sm mt-3">
          옹진군
        </h2>
        
        {/* Text 2: 여행 주머니 (Jeju Doldam) */}
        <h1 className="text-[#0f172a] text-[3.2rem] leading-[1.1] text-center mb-5 drop-shadow-md" style={{ textShadow: "1px 2px 5px rgba(255,255,255,0.9)" }}>
          여행 주머니
        </h1>
        
        {/* Short English Line */}
        <div className="flex items-center gap-3">
           <div className="w-5 h-[2px] bg-[#64748b] rounded-full"></div>
           <p className="text-[#475569] font-sans text-[0.65rem] tracking-[0.3em] font-bold uppercase drop-shadow-sm">
             Unfold Your Journey
           </p>
           <div className="w-5 h-[2px] bg-[#64748b] rounded-full"></div>
        </div>

      </div>

      <style>{`
        /* Import Jeju Doldam Font */
        @font-face {
          font-family: 'EF_jejudoldam';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/EF_jejudoldam.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }

        .animate-fade-in-up {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* -------------------------------------
           Fireworks/Popcorn Bouncing Animations
           ------------------------------------- */
        .symbol-item {
          position: absolute;
          bottom: 25px; /* Hidden behind pouch knot */
          left: 50%;
          transform-origin: center;
          opacity: 0;
          font-family: 'EF_jejudoldam', sans-serif;
          animation: popOut 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        
        /* Each symbol shoots in a unique direction and height */
        .sym-1 { --px: -30px; --rot: -45deg; animation-delay: 0.0s; font-size: 1.5rem; color: #f43f5e; text-shadow: 1px 1px 2px #fff;}
        .sym-2 { --px:  25px; --rot:  30deg; animation-delay: 0.3s; font-size: 1.8rem; color: #0ea5e9; text-shadow: 1px 1px 2px #fff;}
        .sym-3 { --px: -15px; --rot: -20deg; animation-delay: 0.6s; font-size: 1.4rem; color: #10b981; text-shadow: 1px 1px 2px #fff;}
        .sym-4 { --px:  35px; --rot:  45deg; animation-delay: 0.9s; font-size: 1.9rem; color: #8b5cf6; text-shadow: 1px 1px 2px #fff;}
        .sym-5 { --px: -40px; --rot: -60deg; animation-delay: 1.2s; font-size: 1.3rem; color: #f59e0b; text-shadow: 1px 1px 2px #fff;}
        .sym-6 { --px:  10px; --rot:  15deg; animation-delay: 1.5s; font-size: 1.7rem; color: #ec4899; text-shadow: 1px 1px 2px #fff;}
        
        @keyframes popOut {
          0% { transform: translate(-50%, 10px) scale(0) rotate(0deg); opacity: 0; }
          10% { transform: translate(calc(-50% + var(--px) * 0.3), -30px) scale(1.3) rotate(calc(var(--rot) * 0.5)); opacity: 1; }
          40% { transform: translate(calc(-50% + var(--px) * 0.8), -65px) scale(1) rotate(var(--rot)); opacity: 1; }
          75% { transform: translate(calc(-50% + var(--px) * 1.1), -25px) scale(0.9) rotate(calc(var(--rot) * 1.5)); opacity: 0.8; }
          100% { transform: translate(calc(-50% + var(--px) * 1.3), 10px) scale(0.5) rotate(calc(var(--rot) * 2)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

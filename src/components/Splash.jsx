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
    <div className="absolute inset-0 z-50 flex flex-col justify-center items-center overflow-hidden bg-[#eef2f5]">
      {/* Background Image */}
      <img 
        src={splashTrad} 
        alt="옹진군 여행주머니 배경" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0" 
      />
      
      {/* Invisible Soft Glow to perfectly isolate dark text over any background part */}
      <div className="absolute w-[350px] h-[350px] bg-white/60 blur-[60px] rounded-full z-0 pointer-events-none" />

      {/* Centered Main Content Group */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up w-full px-6">
        
        {/* Custom Custom Math Pocket Loader */}
        <div className="relative flex justify-center items-end w-28 h-24 mb-3">
          
          {/* Floating Math Symbols */}
          <div className="absolute inset-0 flex justify-center items-end" style={{ paddingBottom: '10px' }}>
            <span className="absolute font-serif font-black text-[#1e293b] float-symbol math-plus">＋</span>
            <span className="absolute font-serif font-black text-[#334155] float-symbol math-minus">－</span>
            <span className="absolute font-sans font-black text-[#0f172a] float-symbol math-multiply">×</span>
            <span className="absolute font-mono font-black text-[#475569] float-symbol math-divide">÷</span>
          </div>

          {/* Delicate Sleek Pocket SVG */}
          <svg viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.85)" stroke="#1e293b" strokeWidth="1.2" className="w-16 h-16 z-10 drop-shadow-md">
            <path d="M5 4h14v8c0 4-3 8-7 8s-7-4-7-8V4z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 8h14" strokeLinecap="round" strokeDasharray="1.5 2" />
            <path d="M11 4v4a1 1 0 002 0V4" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Text 1: 옹진군 */}
        <h2 className="text-[#1e293b] font-['Gowun_Batang',_serif] text-[1.65rem] font-bold tracking-[0.2em] mb-2 drop-shadow-sm">
          옹진군
        </h2>
        
        {/* Text 2: 여행 주머니 (Italic) */}
        <h1 className="text-[#0f172a] font-serif italic text-[3.8rem] md:text-[4.5rem] font-extrabold tracking-tight leading-[1] text-center mb-6 drop-shadow-sm" style={{ textShadow: "1px 2px 8px rgba(255,255,255,0.8)" }}>
          여행 주머니
        </h1>
        
        {/* Short English Line */}
        <div className="flex items-center gap-3">
           <div className="w-6 h-[1px] bg-[#64748b]"></div>
           <p className="text-[#334155] font-sans text-[0.65rem] tracking-[0.4em] font-bold uppercase drop-shadow-sm">
             Unfold Your Journey
           </p>
           <div className="w-6 h-[1px] bg-[#64748b]"></div>
        </div>

      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Floating Math Symbol Animations */
        .float-symbol {
          opacity: 0;
          bottom: 25px; /* start deep inside pocket */
          animation: floatOut 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        
        /* Staggered delays and starting positions */
        .math-plus { animation-delay: 0s; left: 25%; font-size: 1.8rem; --drift: -18px; --rot: -25deg; }
        .math-minus { animation-delay: 0.7s; left: 55%; font-size: 2.2rem; --drift: 15px; --rot: 20deg; }
        .math-multiply { animation-delay: 1.4s; left: 60%; font-size: 1.9rem; --drift: -8px; --rot: -15deg; }
        .math-divide { animation-delay: 2.1s; left: 35%; font-size: 2rem; --drift: 12px; --rot: 18deg; }
        
        @keyframes floatOut {
          0% { transform: translateY(10px) scale(0.5) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          70% { opacity: 0.8; }
          100% { transform: translateY(-45px) scale(1.1) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

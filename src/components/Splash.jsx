import React, { useEffect } from 'react';
import splashTrad from '../assets/splash_bg_new.png';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
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
      
      {/* Invisible Soft Glow for Legibility */}
      <div className="absolute w-[350px] h-[350px] bg-white/70 blur-[50px] rounded-full z-0 pointer-events-none" />

      {/* Main Content Group - Optically centered by lifting it up (-mt-12) */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up w-full px-6 -mt-12">
        


        {/* Text 1: 옹진군 - GUARANTEED Jeju Doldam via inline style */}
        <h2 className="text-[#334155] text-[1.5rem] tracking-[0.1em] mb-2 drop-shadow-sm" style={{ fontFamily: "'EF_jejudoldam', sans-serif" }}>
          옹진군
        </h2>
        
        {/* Text 2: 여행 [아이콘] 주머니 - Pulling gap to tight fit */}
        <div className="flex items-center justify-center gap-[2px] mb-6">
          <h1 className="text-[#0f172a] text-[3.25rem] leading-[1.1]" style={{ fontFamily: "'EF_jejudoldam', sans-serif", textShadow: "1px 2px 4px rgba(255,255,255,0.9)" }}>
            여행
          </h1>
          
          {/* Rugged, Fat, Clunky Bokjumeoni perfectly matching Jeju Doldam 
              (Slightly scaled down to 3.35rem to balance perfectly with the 3.25rem text) */}
          <div className="animate-float-gentle">
            <svg viewBox="0 0 100 100" className="w-[3.35rem] h-[3.35rem] text-[#0f172a]" fill="rgba(255,255,255,0.95)" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(1px 2px 3px rgba(255,255,255,0.8))" }}>
              
              {/* Clunky, asymmetrical bumpy top (라운드지고 울퉁불퉁한 상단) */}
              <path d="M 35 38 
                       C 28 25, 20 20, 24 14 
                       C 30 8, 40 18, 50 12 
                       C 60 6, 75 12, 78 16 
                       C 82 22, 72 28, 65 38 Z" />

              {/* Smooth, elegant, plump bottom curve (유려하고 부드럽게 이어지는 하단 선) */}
              <path d="M 35 38 
                       C 10 45, 0 75, 15 88 
                       C 30 100, 70 100, 85 88 
                       C 100 75, 90 45, 65 38 Z" />

              {/* Thick clunky neck string */}
              <path d="M 26 38 Q 48 45, 74 38" fill="none" />

              {/* Rugged Knot (slightly off-center for natural rough feel) */}
              <circle cx="48" cy="42" r="5.5" fill="currentColor" stroke="none" />

              {/* Heavy, rough thick tassels hanging irregularly */}
              <path d="M 46 45 C 42 55, 40 65, 45 75 M 52 45 C 56 55, 60 65, 55 70" fill="none" />

            </svg>
          </div>

          <h1 className="text-[#0f172a] text-[3.25rem] leading-[1.1]" style={{ fontFamily: "'EF_jejudoldam', sans-serif", textShadow: "1px 2px 4px rgba(255,255,255,0.9)" }}>
            주머니
          </h1>
        </div>
        
        {/* Long, Meaningful English Phrase */}
        <div className="flex flex-col items-center max-w-[280px]">
           <div className="w-8 h-[2px] bg-[#64748b] rounded-full mb-3"></div>
           <p className="text-[#475569] font-sans text-[0.65rem] tracking-[0.2em] font-bold uppercase drop-shadow-sm text-center leading-[1.6]">
             Every step you take is a memory.<br/> 
             Unpack the beautiful stories<br/>
             of your journey.
           </p>
           <div className="w-8 h-[2px] bg-[#64748b] rounded-full mt-3 mb-6"></div>
           
           {/* Custom Loading Progress Bar to emphasize the 'Loading' feel */}
           <div className="w-32 h-[3px] bg-[#cbd5e1] rounded-full overflow-hidden relative">
             <div className="absolute top-0 left-0 h-full bg-[#1e293b] rounded-full animate-loader-draw"></div>
           </div>
           {/* Loading Text */}
           <p className="text-[#64748b] font-sans text-[0.55rem] tracking-[0.3em] font-bold uppercase mt-2 animate-pulse">
             Loading...
           </p>
        </div>

      </div>

      <style>{`
        /* Import Jeju Doldam Font */
        @font-face {
          font-family: 'EF_jejudoldam';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2') format('woff2');
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
        @keyframes spinAccelerate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-gentle {
          animation: floatGentle 3s ease-in-out infinite;
        }
        @keyframes loaderDraw {
          0% { width: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        .animate-loader-draw {
          animation: loaderDraw 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

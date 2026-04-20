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
        
        {/* Compact, Modern Travel Loader (Flight + Fresh Minimalist Globe) */}
        <div className="relative w-28 h-28 mb-3 flex items-center justify-center drop-shadow-md">
          
          {/* New Polished Globe Image (Smaller & Cleaner) */}
          <svg className="absolute w-[4.5rem] h-[4.5rem] drop-shadow-sm z-0" viewBox="0 0 100 100">
            {/* Base halo to separate from background */}
            <circle cx="50" cy="50" r="48" fill="#f8fafc" opacity="0.9" />

            <defs>
              <radialGradient id="earthGlow" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0"/>
                <stop offset="100%" stopColor="#020617" stopOpacity="0.15"/>
              </radialGradient>
              <clipPath id="new-globe-clip">
                <circle cx="50" cy="50" r="44" />
              </clipPath>
            </defs>

            {/* Earth Ocean Base */}
            <circle cx="50" cy="50" r="44" fill="#7dd3fc" />
            
            {/* New Continents (Smooth, abstract vectors with vibrant colors) */}
            <g clipPath="url(#new-globe-clip)">
              {/* Top left continent */}
              <path d="M 0 5 
                       C 30 -10, 45 20, 35 40 
                       C 25 55, 5 45, 0 35 Z" fill="#86efac" />
              
              {/* Right giant shape */}
              <path d="M 60 5 
                       C 95 10, 105 50, 85 75 
                       C 60 95, 50 45, 60 5 Z" fill="#86efac" />
                       
              {/* Bottom left islands */}
              <path d="M 12 70 
                       C 25 60, 35 85, 20 95 
                       C 5 100, -5 75, 12 70 Z" fill="#86efac" />
              <circle cx="45" cy="78" r="4" fill="#86efac" />
              
              {/* Subtle contour lines for islands */}
              <path d="M 0 5 C 30 -10, 45 20, 35 40 C 25 55, 5 45, 0 35 Z" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.3" />
              <path d="M 60 5 C 95 10, 105 50, 85 75 C 60 95, 50 45, 60 5 Z" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.3" />
              <path d="M 12 70 C 25 60, 35 85, 20 95 C 5 100, -5 75, 12 70 Z" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.3" />
            </g>

            {/* Inner Glow / Spherical Shadow applied on top */}
            <circle cx="50" cy="50" r="44" fill="url(#earthGlow)" className="mix-blend-multiply" />
            
            {/* Outline to keep it crisp */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.5" />
          </svg>
          
          {/* Rotating Airplane & Adjusted Smooth Fluffy Contrail */}
          <div className="absolute inset-0 w-full h-full z-10" style={{ animation: "spinAccelerate 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite" }}>
            
            {/* Fading Fluffy Cloud Trail fitted to w-28 container orbit */}
            <svg className="absolute inset-0 w-full h-full text-white pointer-events-none drop-shadow-sm blur-[1px]" viewBox="0 0 100 100">
               {[...Array(40)].map((_, i) => (
                 <circle 
                   key={i} 
                   cx="50" cy="15" /* Tighter orbit for new w-28 scale */
                   r={3 - i * 0.07} /* Beautiful tapering */
                   fill="currentColor" 
                   opacity={Math.max((1 - i/40), 0) * 0.85}
                   style={{ transformOrigin: "50px 50px", transform: `rotate(${-i * 2}deg)` }} 
                 />
               ))}
            </svg>

            {/* Airplane Icon */}
            <svg className="absolute top-[6px] left-1/2 -ml-[12px] w-6 h-6 text-[#334155] transform rotate-[90deg] drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
        </div>

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
          <svg viewBox="0 0 100 100" className="w-[3.35rem] h-[3.35rem] text-[#0f172a] transform -translate-y-[4px]" fill="rgba(255,255,255,0.95)" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(1px 2px 3px rgba(255,255,255,0.8))" }}>
            
            {/* Clunky, asymmetrical bumpy top (라운드지고 울퉁불퉁한 상단) */}
            <path d="M 35 38 
                     C 28 25, 20 20, 24 14 
                     C 30 8, 40 18, 50 12 
                     C 60 6, 75 12, 78 16 
                     C 82 22, 72 28, 65 38 Z" />

            {/* Extremely wide, heavy, bulging & bumpy bottom (하단은 더 빵빵하게 울퉁불퉁 항아리) */}
            <path d="M 35 38 
                     C 15 45, 2 65, 8 85 
                     C 15 100, 40 98, 50 95 
                     C 60 100, 85 98, 92 82 
                     C 95 65, 85 45, 65 38 Z" />

            {/* Thick clunky neck string */}
            <path d="M 26 38 Q 48 45, 74 38" fill="none" />

            {/* Rugged Knot (slightly off-center for natural rough feel) */}
            <circle cx="48" cy="42" r="5.5" fill="currentColor" stroke="none" />

            {/* Heavy, rough thick tassels hanging irregularly */}
            <path d="M 46 45 C 42 55, 40 65, 45 75 M 52 45 C 56 55, 60 65, 55 70" fill="none" />

          </svg>

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
           <div className="w-8 h-[2px] bg-[#64748b] rounded-full mt-3"></div>
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
      `}</style>
    </div>
  );
}

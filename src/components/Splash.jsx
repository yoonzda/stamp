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
        
        {/* Large, Beautiful Standard Travel Loader (Flight + 2D Sticker Globe) */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center drop-shadow-lg">
          
          {/* Authentic Doodle Torn-Paper Sticker Globe */}
          <svg className="absolute w-[5.5rem] h-[5.5rem] drop-shadow-md z-0" viewBox="0 0 100 100">
            
            {/* 1. Ultra-Wide Jagged Torn/Cut Paper Sticker Background (Hand-cut scissor feel) */}
            <path d="M 50 1 
                     L 58 4 L 63 +1 L 70 3 L 78 1 L 84 8 L 90 5 L 94 13 L 90 20 
                     L 96 28 L 94 36 L 98 42 L 95 50 L 99 58 L 95 66 L 97 75 L 91 80 
                     L 94 88 L 86 90 L 83 95 L 75 92 L 67 98 L 60 92 L 53 97 L 45 95 
                     L 38 98 L 32 94 L 23 97 L 18 90 L 10 93 L 8 85 L 3 78 L 5 70 
                     L 2 63 L 6 56 L 3 48 L 7 40 L 4 33 L 9 27 L 6 18 L 12 12 L 8 5 
                     L 18 6 L 25 2 L 35 5 L 43 1 Z" 
                  fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" strokeLinejoin="miter" />
            
            {/* 2. Clipping Mask for the globe's inner boundaries */}
            <clipPath id="globe-clip">
              <circle cx="50" cy="50" r="36" />
            </clipPath>

            {/* 3. The intricately doodled EARTH content (Clipped safely into the smaller globe) */}
            <g clipPath="url(#globe-clip)">
               {/* Base Ocean (Muted, desaturated vintage teal/blue to reduce harshness) */}
               <circle cx="50" cy="50" r="36" fill="#a5c7c9" />

               {/* Hand-drawn Earth-Mapped Continents (Muted soft sage green) */}
               
               {/* North America */}
               <path d="M 12 25 C 18 10, 35 5, 45 15 C 40 25, 30 25, 30 35 C 28 40, 35 48, 25 55 C 22 50, 18 45, 12 40 C 5 35, 8 30, 12 25 Z" 
                     fill="#c5d6b4" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />

               {/* South America (Drip shaped hanging below NA) */}
               <path d="M 28 58 C 38 58, 48 65, 40 85 C 38 95, 25 80, 22 70 C 20 65, 22 60, 28 58 Z" 
                     fill="#c5d6b4" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />
               
               {/* Eurasia (Huge right sweeping landmass) */}
               <path d="M 52 12 C 65 5, 85 10, 95 25 C 100 35, 85 40, 80 35 C 75 30, 65 35, 60 28 C 55 35, 48 20, 52 12 Z" 
                     fill="#c5d6b4" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />

               {/* Africa (Tucked perfectly below Europe) */}
               <path d="M 50 35 C 60 30, 75 35, 75 50 C 75 65, 65 80, 55 80 C 50 75, 45 60, 42 50 C 40 40, 45 35, 50 35 Z" 
                     fill="#c5d6b4" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />
                     
               {/* Greenland & Small cute islands for earth-realism */}
               <path d="M 40 5 C 45 2, 50 8, 45 12 C 40 10, 38 5, 40 5 Z" 
                     fill="#c5d6b4" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />
            </g>

            {/* 4. The Super Thick Mastering Globe Border (Fusing everything safely) */}
            <circle cx="50" cy="50" r="36" fill="none" stroke="#1e293b" strokeWidth="4.5" />
          </svg>
          
          {/* Rotating Airplane & Smooth Fluffy Contrail Group */}
          <div className="absolute inset-0 w-full h-full z-10" style={{ animation: "spinAccelerate 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite" }}>
            
            {/* Fading Fluffy Cloud Trail (Dense overlapping array to simulate a solid dissipating gas trail) */}
            <svg className="absolute inset-0 w-full h-full text-white pointer-events-none drop-shadow-sm blur-[1px]" viewBox="0 0 100 100">
               {[...Array(40)].map((_, i) => (
                 <circle 
                   key={i} 
                   cx="50" cy="12" /* Center orbit at r=38 */
                   r={3.5 - i * 0.08} /* Starts thick and naturally tapers to a fine point */
                   fill="currentColor" 
                   opacity={Math.max((1 - i/40), 0) * 0.85}
                   style={{ transformOrigin: "50px 50px", transform: `rotate(${-i * 2}deg)` }} 
                 />
               ))}
            </svg>

            {/* Airplane Icon tracking the orbit (Restored to the ultra-simple, classic, reliable flat flight icon!) */}
            <svg className="absolute top-[3px] left-1/2 -ml-[14px] w-7 h-7 text-[#334155] transform rotate-[90deg] drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
        @keyframes spinAccelerate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

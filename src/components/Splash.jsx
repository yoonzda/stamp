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
    <div className="absolute inset-0 z-50 flex flex-col justify-center items-center overflow-hidden bg-[#eef2f5]">
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
        
        {/* Large, Beautiful Standard Travel Loader (Airplane + Globe) */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center drop-shadow-lg">
          
          {/* Static Earth / Globe Icon inside */}
          <svg className="absolute w-[4.5rem] h-[4.5rem] text-[#3b82f6] opacity-30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          
          {/* Rotating Airplane & Smooth Fluffy Contrail Group */}
          <div className="absolute inset-0 w-full h-full" style={{ animation: "spinAccelerate 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite" }}>
            
            {/* The dotted path is REMOVED! Only the natural cloud trail remains. */}

            {/* Fading Fluffy Cloud Trail (Dense overlapping array to simulate a solid dissipating gas trail) */}
            <svg className="absolute inset-0 w-full h-full text-white pointer-events-none drop-shadow-sm blur-[0.5px]" viewBox="0 0 100 100">
               {[...Array(40)].map((_, i) => (
                 <circle 
                   key={i} 
                   cx="50" cy="12" /* Center orbit at r=38 */
                   r={3.5 - i * 0.08} /* Starts thick and naturally tapers to a fine point */
                   fill="currentColor" 
                   opacity={Math.max((1 - i/40), 0) * 0.8}
                   style={{ transformOrigin: "50px 50px", transform: `rotate(${-i * 2}deg)` }} 
                 />
               ))}
            </svg>

            {/* Airplane Icon tracking the orbit */}
            <svg className="absolute top-[3px] left-1/2 -ml-[14px] w-7 h-7 text-[#1e293b] transform rotate-[90deg] drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
        </div>

        {/* Text 1: 옹진군 - GUARANTEED Jeju Doldam via inline style */}
        <h2 className="text-[#334155] text-[1.5rem] tracking-[0.1em] mb-2 drop-shadow-sm" style={{ fontFamily: "'EF_jejudoldam', sans-serif" }}>
          옹진군
        </h2>
        
        {/* Text 2: 여행 [아이콘] 주머니 - Flex & Jeju Doldam matched SVG */}
        <div className="flex items-center justify-center gap-[2px] mb-6">
          <h1 className="text-[#0f172a] text-[3.25rem] leading-[1.1]" style={{ fontFamily: "'EF_jejudoldam', sans-serif", textShadow: "1px 2px 4px rgba(255,255,255,0.9)" }}>
            여행
          </h1>
          
          {/* Authentic, Highly Dynamic Korean Bokjumeoni (Fan Top, Pinched Neck, Squishy Fat Bottom) */}
          <svg viewBox="0 0 100 100" className="w-[3.7rem] h-[3.7rem] text-[#0f172a] transform -translate-y-[2px]" fill="rgba(255,255,255,0.9)" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(1px 2px 3px rgba(255,255,255,0.8))" }}>
            {/* Fan-like top spreading out widely */}
            <path d="M 36 32 C 30 20, 20 12, 17 12 C 40 8, 60 8, 83 12 C 80 12, 70 20, 64 32 Z" fill="rgba(255,255,255,0.9)" strokeWidth="4.5" />
            {/* Super fat wide perfectly round belly spreading out from visibly pinched neck */}
            <path d="M 36 32 C -5 50, -5 95, 50 95 C 105 95, 105 50, 64 32 Z" fill="rgba(255,255,255,0.9)" />
            {/* Ribbon tie tightly cinching the neck */}
            <path d="M 28 34 Q 50 42, 72 34" fill="none" strokeWidth="6" />
            {/* Distinct Center knot */}
            <circle cx="50" cy="38" r="4.5" fill="currentColor" stroke="none" />
            {/* Tiny cute bouncy Tassels */}
            <path d="M 50 42 C 40 55, 45 65, 43 75 M 50 42 C 60 55, 55 65, 57 75" fill="none" strokeWidth="4.5" />
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

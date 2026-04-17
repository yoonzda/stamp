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

      {/* Global SVG Gradients for Animations and Custom Icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Beautiful Sunset to Sky Travel Gradient for Airplane */}
          <linearGradient id="gradientPlane" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#f43f5e" /> {/* Hot Rose */}
             <stop offset="50%" stopColor="#a855f7" /> {/* Violet */}
             <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky Blue */}
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content Group - Optically centered by lifting it up (-mt-12) */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up w-full px-6 -mt-12">
        
        {/* Large, Beautiful Standard Travel Loader (Airplane + Custom Detailed Globe) */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center drop-shadow-lg">
          
          {/* Custom Detailed Tech/Wireframe Globe Icon */}
          <svg className="absolute w-[4.5rem] h-[4.5rem] opacity-30 drop-shadow-sm" viewBox="0 0 100 100">
            {/* Globe Outer Border */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="#2563eb" strokeWidth="4" />
            {/* Longitude Arcs */}
            <path d="M 50 2 C 15 20, 15 80, 50 98 C 85 80, 85 20, 50 2 Z" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 50 2 C 35 20, 35 80, 50 98 C 65 80, 65 20, 50 2 Z" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="4 4" />
            {/* Latitude Arcs */}
            <path d="M 2 50 C 20 68, 80 68, 98 50 C 80 32, 20 32, 2 50 Z" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 12 25 C 30 38, 70 38, 88 25 M 12 75 C 30 62, 70 62, 88 75" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 4" />
          </svg>
          
          {/* Rotating Airplane & Smooth Fluffy Contrail Group */}
          <div className="absolute inset-0 w-full h-full" style={{ animation: "spinAccelerate 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite" }}>
            
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

            {/* Custom Side-view Airplane (Very soft, rounded pill shape naturally fitting the design) */}
            <svg className="absolute w-[2rem] h-[2rem] text-[#4b5563] drop-shadow-md" style={{ top: "0px", left: "50%", transform: "translateX(-50%)" }} viewBox="0 0 100 100" fill="currentColor">
              {/* Back tiny stabilizer fin */}
              <path d="M 22 55 L 2 59 C -2 60, 2 68, 8 64 L 20 58 Z" />
              {/* Top Tail Fin */}
              <path d="M 28 42 L 18 18 C 16 12, 25 10, 32 18 L 42 42 Z" />
              {/* Main Fuselage (Round nose facing right) */}
              <path d="M 15 42 L 80 42 C 95 42, 98 57, 80 57 L 15 57 C 5 57, 5 42, 15 42 Z" />
              {/* Downward Wing */}
              <path d="M 45 52 L 25 80 C 20 88, 32 92, 40 80 L 58 52 Z" />
              {/* Three small cute windows */}
              <circle cx="53" cy="49" r="2.5" fill="#eef2f5" />
              <circle cx="63" cy="49" r="2.5" fill="#eef2f5" />
              <circle cx="73" cy="49" r="2.5" fill="#eef2f5" />
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

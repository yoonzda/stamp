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
    <div className="absolute inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#fafafa]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={splashTrad} 
          alt="옹진군 수채화 배경" 
          className="w-full h-full object-cover object-center" 
        />
        {/* Top/Bottom Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90" />
      </div>
      
      {/* Top Text Section */}
      <div className="relative z-10 flex flex-col items-center pt-28 px-6 animate-fade-in-up">
        <h2 className="text-[#4a5568] font-sans text-sm font-semibold tracking-[0.3em] mb-4">
          자연이 허락한 쉼표
        </h2>
        <h1 className="text-[#1a202c] font-serif text-[2.75rem] font-bold tracking-tight leading-[1.2] text-center drop-shadow-sm">
          옹진군<br/>스탬프 투어
        </h1>
      </div>

      {/* Bottom Loading Section */}
      <div className="relative z-10 flex flex-col items-center pb-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        {/* Airplane Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-8 h-8 text-[#2d3748] animate-bounce mb-6 transform -rotate-45" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
        </svg>

        {/* Minimal Animated Dots */}
        <div className="flex gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2d3748] animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#4a5568] animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#718096] animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
        
        <p className="text-[#4a5568] font-sans text-[0.75rem] font-bold tracking-[0.2em] uppercase">
          설레는 여정을 준비하고 있습니다
        </p>
      </div>
    </div>
  );
}

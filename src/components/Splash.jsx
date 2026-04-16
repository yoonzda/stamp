import React, { useEffect } from 'react';
import introWc from '../assets/intro_wc.png';

export default function Splash({ onFinish }) {
  useEffect(() => {
    // Show splash for 2.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F3EFE6] transition-opacity duration-500">
      <div className="animate-fade-in-up flex flex-col items-center">
        {/* Title / Logo with Watercolor Image */}
        <div className="w-40 h-40 mb-6 rounded-3xl overflow-hidden shadow-lg border-2 border-[#d5ccbe]">
          <img src={introWc} alt="인트로 수채화" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-['Nanum_Myeongjo'] font-bold text-[#3e342b] mb-2 tracking-tight">
          스탬프 투어
        </h1>
        <p className="text-[#6b5d4f] font-medium mb-12 tracking-wider">
          옹진군의 숨은 매력을 찾아서
        </p>
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-[#0B4F9A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

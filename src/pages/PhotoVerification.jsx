import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGameState, saveGameState, ISLANDS } from '../gameState';

export default function PhotoVerification() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);

  const handleCapture = () => {
    if (!agreed) {
      alert("사진 수집 및 이용에 동의해주세요.");
      return;
    }
    setCapturing(true);
    setTimeout(() => {
      // Mock acquire stamp
      const state = getGameState();
      if (!state.collectedStamps) state.collectedStamps = [];
      const alreadyHas = state.collectedStamps.find(s => s.code === code);
      if (!alreadyHas) {
        state.collectedStamps.push({
          code: code,
          acquiredAt: new Date().toISOString(),
          // Use an image to represent the taken photo
          photoUrl: `https://picsum.photos/seed/${code}_user/400/300`
        });
        saveGameState(state);
      }
      navigate('/collection', { state: { justAcquired: spot?.name || '새로운 장소' } });
    }, 2000);
  };

  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col relative text-white">
      {/* Mock Camera Viewfinder */}
      <div className="flex-1 relative flex flex-col justify-end p-6 bg-black overflow-hidden">
        {/* The simulated live camera feed */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-110 motion-safe:animate-pulse" 
          style={{ backgroundImage: `url(https://picsum.photos/seed/${code}1/400/800)` }} 
        />
        
        {/* Viewfinder Frame */}
        <div className="absolute inset-8 border-2 border-white/20 rounded-3xl pointer-events-none z-10 flex flex-col justify-between p-4">
          <div className="flex justify-between w-full h-8">
            <div className="w-8 h-full border-t-4 border-l-4 border-white opacity-80 rounded-tl-xl"></div>
            <div className="w-8 h-full border-t-4 border-r-4 border-white opacity-80 rounded-tr-xl"></div>
          </div>
          <div className="w-full h-[1px] bg-white/20 my-auto"></div>
          <div className="h-full absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 transform -translate-x-1/2"></div>
          <div className="flex justify-between w-full h-8">
            <div className="w-8 h-full border-b-4 border-l-4 border-white opacity-80 rounded-bl-xl"></div>
            <div className="w-8 h-full border-b-4 border-r-4 border-white opacity-80 rounded-br-xl"></div>
          </div>
        </div>

        {/* GPS Indication */}
        <div className="absolute top-12 left-0 right-0 flex justify-center z-20">
          <div className="bg-green-500/90 backdrop-blur text-white px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce">
            📍 {spot.name} 위치 확인 완료
          </div>
        </div>

        <div className="relative z-10 w-full mb-10 pb-20"></div>
      </div>

      {/* Bottom Panel */}
      <div className="bg-[#F3EFE6] text-[#3e342b] p-6 rounded-t-3xl absolute bottom-0 left-0 right-0 pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] z-30">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 right-5 w-8 h-8 flex items-center justify-center bg-black/10 rounded-full text-black/60 hover:bg-black/20"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold font-['Nanum_Myeongjo'] mb-2 flex items-center gap-2 text-[#004790]">
          {spot.name} 사진 인증
        </h2>
        
        <p className="text-[#685b4f] mb-6 break-keep text-[0.95rem] leading-relaxed">
          스탬프 발급을 위해 현재 장소의 멋진 풍경을 촬영해주세요. 촬영된 사진은 추억 갤러리에 추가됩니다.
        </p>

        <label className="flex items-start gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border border-[#d5ccbe] cursor-pointer active:bg-gray-50 transition-colors">
          <input 
            type="checkbox" 
            className="mt-1 w-5 h-5 accent-[#004790] shrink-0" 
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
          />
          <span className="text-[0.85rem] font-medium text-[#54463a] leading-tight break-keep">
            (필수) 장소 인증을 위한 임시 카메라 접근 및 위성(GPS) 위치 정보 수집, 그리고 촬영된 사진의 갤러리 활용에 동의합니다.
          </span>
        </label>

        <button 
          onClick={handleCapture}
          disabled={capturing}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all ${
            agreed && !capturing 
              ? 'bg-[#004790] text-white active:scale-95' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {capturing ? '사진 분석 및 인증 중...' : '📸 사진 촬영 및 스탬프 획득'}
        </button>
      </div>
    </div>
  );
}

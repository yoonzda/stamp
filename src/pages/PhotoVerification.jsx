import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGameState, saveGameState, ISLANDS } from '../gameState';

export default function PhotoVerification() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [gpsStatus, setGpsStatus] = useState({ state: 'checking', coords: null, error: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [step, setStep] = useState('CAMERA'); // CAMERA, PREVIEW, ANALYSIS, LOADING, SUCCESS

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsStatus({ 
            state: 'success', 
            coords: { lat: position.coords.latitude, lng: position.coords.longitude },
            error: null 
          });
        },
        (error) => {
          console.warn("GPS Access Denied/Error", error);
          setGpsStatus({ state: 'error', coords: null, error: 'GPS 위치 접근 허용이 필요합니다.' });
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setGpsStatus({ state: 'error', coords: null, error: 'GPS를 지원하지 않는 브라우저입니다.' });
    }
  }, []);

  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (gpsStatus.state !== 'success') {
      alert("GPS 위치 확인이 완료되지 않았습니다.");
      return;
    }
    
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
    setStep('PREVIEW'); // Transition to PREVIEW state to ask Retake/Confirm
  };

  const handleVerifyAndGetStamp = () => {
    setStep('LOADING');
    setTimeout(() => {
      setStep('SUCCESS');
      
      // Save stamp after showing success for a brief moment
      setTimeout(() => {
        const state = getGameState();
        if (!state.collectedStamps) state.collectedStamps = [];
        const alreadyHas = state.collectedStamps.find(s => s.code === code);
        if (!alreadyHas) {
          state.collectedStamps.push({
            code: code,
            acquiredAt: new Date().toISOString(),
            photoUrl: photoPreview,
            coords: gpsStatus.coords
          });
          saveGameState(state);
        }
        navigate('/collection', { state: { justAcquired: spot?.name || '새로운 장소' } });
      }, 1500);
    }, 2500); // Simulate AI Verification taking 2.5 seconds
  };

  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  return (
    <div className="w-full h-[100dvh] bg-black flex flex-col relative text-white overflow-hidden font-['Pretendard']">
      
      {/* BACKGROUND / VIEWFINDER */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`w-full h-full bg-cover bg-center transition-all duration-500 ${photoPreview ? 'opacity-100 scale-100' : 'opacity-70 scale-105 motion-safe:animate-pulse'}`}
          style={{ backgroundImage: `url(${photoPreview || `https://picsum.photos/seed/${code}1/400/800`})` }} 
        />
        {(step === 'ANALYSIS' || step === 'LOADING' || step === 'SUCCESS') && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500" />
        )}
      </div>

      {/* TOP BAR (Hidden in some steps for immersion) */}
      {step === 'CAMERA' && (
        <div className="absolute top-0 left-0 right-0 z-20 pt-6 pb-12 px-5 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full active:scale-95 transition-transform border border-white/20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="flex flex-col items-center mt-1 drop-shadow-md">
            <span className="text-[0.75rem] font-bold text-white/80 tracking-widest mb-1">PHOTO VERIFY</span>
            <h2 className="text-xl font-bold font-['Nanum_Myeongjo'] text-white">
              {spot.name}
            </h2>
          </div>
          
          <div className="w-10 h-10"></div> {/* Spacer */}
        </div>
      )}

      {/* CENTER: Viewfinder Frame (Only in CAMERA mode) */}
      {step === 'CAMERA' && (
        <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 aspect-[3/4] border border-white/30 rounded-2xl pointer-events-none z-10 flex flex-col justify-between p-6">
          <div className="flex justify-between w-full h-10">
            <div className="w-10 h-full border-t-[3px] border-l-[3px] border-white drop-shadow-md rounded-tl-xl"></div>
            <div className="w-10 h-full border-t-[3px] border-r-[3px] border-white drop-shadow-md rounded-tr-xl"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-40">
             <div className="w-4 h-[1px] bg-white absolute"></div>
             <div className="w-[1px] h-4 bg-white absolute"></div>
          </div>
          <div className="flex justify-between w-full h-10">
            <div className="w-10 h-full border-b-[3px] border-l-[3px] border-white drop-shadow-md rounded-bl-xl"></div>
            <div className="w-10 h-full border-b-[3px] border-r-[3px] border-white drop-shadow-md rounded-br-xl"></div>
          </div>
        </div>
      )}

      {/* BOTTOM UI STATES */}
      
      {/* 1. CAMERA STEP */}
      {step === 'CAMERA' && (
        <div className="absolute bottom-0 left-0 right-0 z-30 pt-24 pb-12 flex flex-col items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="mb-6 h-8 flex items-center">
            {gpsStatus.state === 'checking' && (
               <div className="bg-black/40 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[0.8rem] font-medium border border-white/20 flex items-center gap-2">
                 <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                 위치 확인 중...
               </div>
            )}
            {gpsStatus.state === 'error' && (
               <div className="bg-red-500/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[0.8rem] font-medium shadow-lg flex items-center gap-1.5">
                 ⚠️ {gpsStatus.error}
               </div>
            )}
            {gpsStatus.state === 'success' && (
               <div className="bg-green-500/20 backdrop-blur-md text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-[0.8rem] font-medium flex items-center gap-1.5">
                 📍 현위치 확인 완료
               </div>
            )}
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-[5.5rem] h-[5.5rem] flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full border-[3px] transition-colors duration-300 ${gpsStatus.state === 'success' ? 'border-white' : 'border-white/30'}`}></div>
              <div className={`w-[4.2rem] h-[4.2rem] rounded-full transition-all duration-300 ${gpsStatus.state === 'success' ? 'bg-white active:scale-90 active:bg-gray-200' : 'bg-white/30'}`}></div>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={handleCapture}
                disabled={gpsStatus.state !== 'success'}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
            <span className="text-[0.65rem] text-white/50 mt-5 font-medium tracking-wide">
              사진 촬영 시 갤러리 등록 및 위치 수집에 동의됩니다.
            </span>
          </div>
        </div>
      )}

      {/* 2. PREVIEW STEP (Retake or Confirm) */}
      {step === 'PREVIEW' && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 pb-12 bg-gradient-to-t from-black via-black/80 to-transparent flex gap-4">
          <button 
            onClick={() => { setStep('CAMERA'); setPhotoPreview(null); }}
            className="flex-1 py-4 rounded-xl bg-white/20 backdrop-blur-md text-white font-bold text-[0.95rem] active:scale-95 transition-transform"
          >
            다시 찍기
          </button>
          <button 
            onClick={() => setStep('ANALYSIS')}
            className="flex-1 py-4 rounded-xl bg-[#e06a4e] text-white font-bold text-[0.95rem] active:scale-95 transition-transform shadow-lg"
          >
            확인
          </button>
        </div>
      )}

      {/* 3, 4, 5. ANALYSIS / LOADING / SUCCESS STEPS (Bottom Sheet style) */}
      {(step === 'ANALYSIS' || step === 'LOADING' || step === 'SUCCESS') && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#f3efe6] text-[#3e342b] rounded-t-3xl p-6 pb-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-500">
          
          <div className="w-12 h-1.5 bg-[#d5ccbe] rounded-full mx-auto mb-6"></div>

          {step === 'ANALYSIS' && (
            <div className="flex flex-col items-center animate-fadeIn">
              <h3 className="text-xl font-bold font-['Nanum_Myeongjo'] mb-2">사진 위치 확인</h3>
              <p className="text-[#685b4f] text-[0.9rem] mb-6 text-center">촬영하신 사진의 GPS 메타데이터를 분석했습니다.</p>
              
              <div className="w-full bg-white rounded-xl p-4 mb-6 border border-[#e8e2d5] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fced9f]/30 rounded-full flex items-center justify-center text-xl shrink-0">📍</div>
                <div className="flex flex-col">
                  <span className="text-[0.75rem] text-[#8a7a6b] font-bold tracking-widest mb-0.5">인식된 장소</span>
                  <span className="text-[1.1rem] font-bold text-[#004790] leading-tight">{spot.name}</span>
                </div>
              </div>

              <button 
                onClick={handleVerifyAndGetStamp}
                className="w-full py-4 rounded-xl bg-[#004790] text-white font-bold text-[1.05rem] active:scale-95 transition-transform shadow-md"
              >
                스탬프 받기 (검증하기)
              </button>
            </div>
          )}

          {step === 'LOADING' && (
            <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
               <div className="relative w-16 h-16 mb-6">
                 <div className="absolute inset-0 border-4 border-[#004790]/20 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-[#004790] rounded-full border-t-transparent animate-spin"></div>
               </div>
               <h3 className="text-lg font-bold text-[#004790] mb-2">위치 정보 검증 중...</h3>
               <p className="text-[#8a7a6b] text-[0.85rem]">인공지능이 사진과 GPS 좌표를 대조하고 있습니다.</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 animate-bounce shadow-lg shadow-green-500/30">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
               <h3 className="text-xl font-bold text-green-600 mb-2 font-['Nanum_Myeongjo']">검증 완료!</h3>
               <p className="text-[#685b4f] text-[0.95rem]">정상적으로 확인되었습니다. 스탬프를 발급합니다.</p>
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

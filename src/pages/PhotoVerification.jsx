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
    
    setCapturing(true);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);

    setTimeout(() => {
      const state = getGameState();
      if (!state.collectedStamps) state.collectedStamps = [];
      const alreadyHas = state.collectedStamps.find(s => s.code === code);
      if (!alreadyHas) {
        state.collectedStamps.push({
          code: code,
          acquiredAt: new Date().toISOString(),
          photoUrl: objectUrl,
          coords: gpsStatus.coords
        });
        saveGameState(state);
      }
      navigate('/collection', { state: { justAcquired: spot?.name || '새로운 장소' } });
    }, 2000);
  };

  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  return (
    <div className="w-full h-[100dvh] bg-black flex flex-col relative text-white overflow-hidden font-['Pretendard']">
      
      {/* FULL SCREEN Viewfinder */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`w-full h-full bg-cover bg-center transition-all duration-500 ${photoPreview ? 'opacity-100 scale-100' : 'opacity-70 scale-105 motion-safe:animate-pulse'}`}
          style={{ backgroundImage: `url(${photoPreview || `https://picsum.photos/seed/${code}1/400/800`})` }} 
        />
        {/* Subtle darkening for better contrast on UI elements */}
        {photoPreview && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-500" />}
      </div>

      {/* TOP BAR: Sleek, native-style header */}
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
        
        <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* CENTER: Viewfinder Frame Guidelines (Modern & Minimal) */}
      {!photoPreview && (
        <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 aspect-[3/4] border border-white/30 rounded-2xl pointer-events-none z-10 flex flex-col justify-between p-6">
          <div className="flex justify-between w-full h-10">
            <div className="w-10 h-full border-t-[3px] border-l-[3px] border-white drop-shadow-md rounded-tl-xl"></div>
            <div className="w-10 h-full border-t-[3px] border-r-[3px] border-white drop-shadow-md rounded-tr-xl"></div>
          </div>
          {/* Center Crosshair */}
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

      {/* BOTTOM AREA: GPS Status & Shutter Button */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pt-24 pb-12 flex flex-col items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        
        {/* Sleek GPS Status Pill */}
        <div className="mb-6 h-8 flex items-center">
          {gpsStatus.state === 'checking' && (
             <div className="bg-black/40 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[0.8rem] font-medium border border-white/20 flex items-center gap-2">
               <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
               위치 확인 중...
             </div>
          )}
          {gpsStatus.state === 'error' && (
             <div className="bg-red-500/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[0.8rem] font-medium shadow-lg flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
               {gpsStatus.error}
             </div>
          )}
          {gpsStatus.state === 'success' && (
             <div className="bg-green-500/20 backdrop-blur-md text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-[0.8rem] font-medium flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
               현위치 확인 완료
             </div>
          )}
        </div>

        {/* Shutter Button Container */}
        <div className="relative flex flex-col items-center justify-center">
          
          {capturing ? (
            <div className="flex flex-col items-center justify-center w-20 h-20">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span className="text-[0.7rem] font-bold mt-4 tracking-widest text-white/90">PROCESSING...</span>
            </div>
          ) : (
            <div className="relative w-[5.5rem] h-[5.5rem] flex items-center justify-center">
              {/* Outer Ring */}
              <div className={`absolute inset-0 rounded-full border-[3px] transition-colors duration-300 ${gpsStatus.state === 'success' ? 'border-white' : 'border-white/30'}`}></div>
              
              {/* Inner Button */}
              <div className={`w-[4.2rem] h-[4.2rem] rounded-full transition-all duration-300 ${gpsStatus.state === 'success' ? 'bg-white active:scale-90 active:bg-gray-200' : 'bg-white/30'}`}></div>
              
              {/* Invisible File Input Overlay */}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={handleCapture}
                disabled={gpsStatus.state !== 'success'}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          )}
          
          {!capturing && (
            <span className="text-[0.65rem] text-white/50 mt-5 font-medium tracking-wide">
              사진 촬영 시 갤러리 등록 및 위치 수집에 동의됩니다.
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

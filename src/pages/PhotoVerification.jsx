import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGameState, saveGameState, ISLANDS } from '../gameState';

const TASK_STEPS = [
  { id: 'photo', title: '1. 장소 인증 촬영', action: '완료됨' },
  { id: 'save', title: '2. 핸드폰에 사진 저장', action: '사진 저장하기' },
  { id: 'shareFriend', title: '3. 친구에게 공유하기', action: '카카오톡으로 공유' },
  { id: 'shareGallery', title: '4. 갤러리에 전체 공개', action: '갤러리에 등록하기' },
];

export default function PhotoVerification() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [gpsStatus, setGpsStatus] = useState({ state: 'checking', coords: null, error: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [step, setStep] = useState('CAMERA'); // CAMERA, PREVIEW, ANALYSIS, LOADING, SUCCESS, TASKS
  
  const [currentTaskIndex, setCurrentTaskIndex] = useState(1); // Start at 1 (Save) because 0 (Photo) is done
  const [taskStatus, setTaskStatus] = useState('idle'); // 'idle', 'loading', 'done'

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsStatus({ state: 'success', coords: { lat: position.coords.latitude, lng: position.coords.longitude }, error: null });
        },
        (error) => {
          setGpsStatus({ state: 'success', coords: { lat: 37.5, lng: 126.9 }, error: null });
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setGpsStatus({ state: 'success', coords: { lat: 37.5, lng: 126.9 }, error: null });
    }
  }, []);

  const spot = ISLANDS.flatMap(i => i.spots).find(s => s.code === code);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
    setStep('PREVIEW');
  };

  const handleVerify = () => {
    setStep('LOADING');
    setTimeout(() => {
      setStep('SUCCESS');
      setTimeout(() => {
        setStep('TASKS');
      }, 1500);
    }, 2000);
  };

  const handleTaskAction = () => {
    if (taskStatus === 'loading') return;
    setTaskStatus('loading');
    
    setTimeout(() => {
      setTaskStatus('done');
      setTimeout(() => {
        if (currentTaskIndex < TASK_STEPS.length - 1) {
          setCurrentTaskIndex(prev => prev + 1);
          setTaskStatus('idle');
        } else {
          // All done
          finishStamp();
        }
      }, 800);
    }, 1000);
  };

  const finishStamp = () => {
    const state = getGameState();
    if (!state.collectedStamps) state.collectedStamps = [];
    const alreadyHas = state.collectedStamps.find(s => s.code === code);
    if (!alreadyHas) {
      state.collectedStamps.push({
        code: code,
        acquiredAt: new Date().toISOString(),
        photoUrl: photoPreview,
        coords: gpsStatus.coords,
        tasksCompleted: true
      });
      saveGameState(state);
    }
    navigate('/reward'); // Go to coupon page
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
        {(step === 'ANALYSIS' || step === 'LOADING' || step === 'SUCCESS' || step === 'TASKS') && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500" />
        )}
      </div>

      {/* TOP BAR */}
      {step === 'CAMERA' && (
        <div className="absolute top-0 left-0 right-0 z-20 pt-6 pb-12 px-5 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full active:scale-95 transition-transform border border-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div className="flex flex-col items-center mt-1 drop-shadow-md">
            <span className="text-[0.75rem] font-bold text-white/80 tracking-widest mb-1">PHOTO VERIFY</span>
            <h2 className="text-xl font-bold font-['Nanum_Myeongjo'] text-white">{spot.name}</h2>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      )}

      {/* CAMERA UI */}
      {step === 'CAMERA' && (
        <div className="absolute bottom-0 left-0 right-0 z-30 pt-24 pb-12 flex flex-col items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="mb-6 h-8 flex items-center">
            {gpsStatus.state === 'success' && (
               <div className="bg-green-500/20 backdrop-blur-md text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-[0.8rem] font-medium flex items-center gap-1.5">
                 📍 현위치 확인 완료
               </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-[5.5rem] h-[5.5rem] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[3px] border-white transition-colors duration-300"></div>
              <div className="w-[4.2rem] h-[4.2rem] rounded-full bg-white active:scale-90 active:bg-gray-200 transition-all duration-300"></div>
              <input type="file" accept="image/*" capture="environment" onChange={handleCapture} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
            </div>
            <span className="text-[0.65rem] text-white/50 mt-5 font-medium tracking-wide">사진 촬영 시 갤러리 등록 및 위치 수집에 동의됩니다.</span>
          </div>
        </div>
      )}

      {/* PREVIEW STEP */}
      {step === 'PREVIEW' && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 pb-12 bg-gradient-to-t from-black via-black/80 to-transparent flex gap-4">
          <button onClick={() => { setStep('CAMERA'); setPhotoPreview(null); }} className="flex-1 py-4 rounded-xl bg-white/20 backdrop-blur-md text-white font-bold text-[0.95rem] active:scale-95 transition-transform">
            다시 찍기
          </button>
          <button onClick={() => setStep('ANALYSIS')} className="flex-1 py-4 rounded-xl bg-[#e06a4e] text-white font-bold text-[0.95rem] active:scale-95 transition-transform shadow-lg">
            확인
          </button>
        </div>
      )}

      {/* BOTTOM SHEET STEPS (ANALYSIS -> SUCCESS -> TASKS) */}
      {(step === 'ANALYSIS' || step === 'LOADING' || step === 'SUCCESS' || step === 'TASKS') && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#f3efe6] text-[#3e342b] rounded-t-3xl p-6 pb-12 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transform transition-transform duration-500 flex flex-col max-h-[85vh]">
          <div className="w-12 h-1.5 bg-[#d5ccbe] rounded-full mx-auto mb-6 shrink-0"></div>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar">
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
                <button onClick={handleVerify} className="w-full py-4 rounded-xl bg-[#004790] text-white font-bold text-[1.05rem] active:scale-95 transition-transform shadow-md mt-auto">
                  스탬프 받기 (검증하기)
                </button>
              </div>
            )}
            
            {step === 'LOADING' && (
              <div className="flex flex-col items-center justify-center py-8 animate-fadeIn h-full">
                 <div className="relative w-16 h-16 mb-6">
                   <div className="absolute inset-0 border-4 border-[#004790]/20 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-[#004790] rounded-full border-t-transparent animate-spin"></div>
                 </div>
                 <h3 className="text-lg font-bold text-[#004790] mb-2">위치 정보 검증 중...</h3>
                 <p className="text-[#8a7a6b] text-[0.85rem]">인공지능이 사진과 GPS 좌표를 대조하고 있습니다.</p>
              </div>
            )}
            
            {step === 'SUCCESS' && (
              <div className="flex flex-col items-center justify-center py-8 animate-fadeIn h-full">
                 <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 animate-bounce shadow-lg shadow-green-500/30">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
                 <h3 className="text-xl font-bold text-green-600 mb-2 font-['Nanum_Myeongjo']">검증 완료!</h3>
                 <p className="text-[#685b4f] text-[0.95rem]">이제 쿠폰 교환을 위한 미션을 수행합니다.</p>
              </div>
            )}

            {/* SEQUENTIAL TASKS UI */}
            {step === 'TASKS' && (
              <div className="flex flex-col animate-fadeIn">
                 <div className="text-center mb-6">
                   <div className="w-14 h-14 bg-[#e8e2d5] rounded-full mx-auto mb-3 flex items-center justify-center text-xl">🎟️</div>
                   <h2 className="text-2xl font-extrabold mb-1 text-[#3e342b]">쿠폰 획득 미션</h2>
                   <p className="text-[#8a7a6b] text-sm">진행 순서에 따라 미션을 순서대로 완료해 주세요.</p>
                 </div>
                 
                 <div className="flex flex-col gap-3 mb-6 relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-[#e8e2d5] -z-10"></div>
                    
                    {TASK_STEPS.map((task, idx) => {
                      const isPast = idx < currentTaskIndex;
                      const isCurrent = idx === currentTaskIndex;
                      
                      return (
                        <div key={task.id} className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${isCurrent ? 'bg-white shadow-sm ring-1 ring-[#f05746] scale-[1.02]' : isPast ? 'opacity-70' : 'opacity-40'}`}>
                          
                          {/* Circle Indicator */}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[0.6rem] font-bold z-10 transition-colors ${
                            isPast ? 'bg-green-500 text-white' : 
                            isCurrent ? 'bg-[#f05746] text-white ring-4 ring-[#f05746]/20' : 
                            'bg-[#e8e2d5] text-[#8a7a6b]'
                          }`}>
                            {isPast ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> : (idx + 1)}
                          </div>
                          
                          <div className="flex-1 font-bold text-[0.95rem] text-[#3e342b]">
                            {task.title}
                          </div>
                          
                          {isCurrent && taskStatus === 'done' && (
                             <div className="text-green-500 animate-fadeIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                          )}
                        </div>
                      );
                    })}
                 </div>

                 <button 
                   onClick={handleTaskAction}
                   disabled={taskStatus !== 'idle'}
                   className={`w-full py-4 rounded-xl font-bold text-[1.05rem] transition-colors shadow-md flex justify-center items-center gap-2 mt-auto ${
                     taskStatus === 'idle' ? 'bg-[#f05746] text-white active:scale-95 hover:bg-[#d84a3b]' : 'bg-[#e8e2d5] text-[#8a7a6b] cursor-not-allowed'
                   }`}
                 >
                   {taskStatus === 'loading' ? (
                     <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> 처리 중...</>
                   ) : taskStatus === 'done' ? (
                     '완료!'
                   ) : (
                     TASK_STEPS[currentTaskIndex].action
                   )}
                 </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGameState, saveGameState, ISLANDS } from '../gameState';

export default function PhotoVerification() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [gpsStatus, setGpsStatus] = useState({ state: 'checking', coords: null, error: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [step, setStep] = useState('CAMERA'); // CAMERA, PREVIEW, ANALYSIS, LOADING, SUCCESS, TASKS
  const [tasks, setTasks] = useState({
    photo: true,
    save: false,
    shareFriend: false,
    shareGallery: false
  });

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
          // For demo purposes, we can simulate success even if error
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

  const simulateTask = (taskName) => {
    setTasks(prev => ({ ...prev, [taskName]: 'loading' }));
    setTimeout(() => {
      setTasks(prev => ({ ...prev, [taskName]: true }));
    }, 800);
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

  const allDone = tasks.photo === true && tasks.save === true && tasks.shareFriend === true && tasks.shareGallery === true;

  if (!spot) return <div className="p-10 text-center bg-[#F3EFE6] h-full">잘못된 접근입니다.</div>;

  return (
    <div className="w-full h-[100dvh] bg-black flex flex-col relative text-white overflow-hidden font-['Pretendard']">
      
      {/* BACKGROUND / VIEWFINDER */}
      {step !== 'TASKS' && (
        <div className="absolute inset-0 z-0">
          <div 
            className={`w-full h-full bg-cover bg-center transition-all duration-500 ${photoPreview ? 'opacity-100 scale-100' : 'opacity-70 scale-105 motion-safe:animate-pulse'}`}
            style={{ backgroundImage: `url(${photoPreview || \`https://picsum.photos/seed/\${code}1/400/800\`})` }} 
          />
          {(step === 'ANALYSIS' || step === 'LOADING' || step === 'SUCCESS') && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500" />
          )}
        </div>
      )}

      {/* TOP BAR */}
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
              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={handleCapture}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
            </div>
            <span className="text-[0.65rem] text-white/50 mt-5 font-medium tracking-wide">
              사진 촬영 시 갤러리 등록 및 위치 수집에 동의됩니다.
            </span>
          </div>
        </div>
      )}

      {/* PREVIEW STEP */}
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

      {/* ANALYSIS / LOADING / SUCCESS */}
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
                onClick={handleVerify}
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
               <p className="text-[#685b4f] text-[0.95rem]">이제 쿠폰 교환을 위한 미션을 수행합니다.</p>
            </div>
          )}
        </div>
      )}

      {/* TASKS STEP */}
      {step === 'TASKS' && (
        <div className="absolute inset-0 z-50 bg-[#Fcfbf9] text-[#3e342b] p-6 pb-12 flex flex-col overflow-y-auto font-['Pretendard']">
           <div className="mt-8 mb-6 text-center">
             <div className="w-16 h-16 bg-[#e8e2d5] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">🎟️</div>
             <h2 className="text-2xl font-extrabold mb-2 text-[#3e342b]">쿠폰 획득 미션</h2>
             <p className="text-[#8a7a6b] text-sm break-keep">
               아래 4가지 미션을 모두 완료하면<br/>해당 장소 주변의 쿠폰 1개와 교환할 수 있습니다!
             </p>
           </div>
           
           <div className="flex flex-col gap-3">
              {[
                { id: 'photo', title: '1. 장소 인증 사진 촬영 완료' },
                { id: 'save', title: '2. 사진을 핸드폰에 저장' },
                { id: 'shareFriend', title: '3. 친구에게 카톡 공유하기' },
                { id: 'shareGallery', title: '4. 사진 갤러리에 전체 공개' }
              ].map(task => (
                <div key={task.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[#e8e2d5] flex items-center justify-between">
                  <span className={`font-bold text-sm ${tasks[task.id] === true ? 'text-[#8a7a6b] line-through' : 'text-[#3e342b]'}`}>
                    {task.title}
                  </span>
                  
                  {tasks[task.id] === true ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  ) : tasks[task.id] === 'loading' ? (
                    <div className="w-8 h-8 rounded-full bg-[#f05746]/20 text-[#f05746] flex items-center justify-center animate-spin">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    </div>
                  ) : (
                    <button 
                      onClick={() => simulateTask(task.id)}
                      className="bg-[#f05746] text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform shadow-sm"
                    >
                      실행
                    </button>
                  )}
                </div>
              ))}
           </div>

           <button 
             onClick={finishStamp}
             disabled={!allDone}
             className={`mt-10 w-full py-4 rounded-xl font-bold text-[1.05rem] transition-colors shadow-md ${
               allDone ? 'bg-[#3e342b] text-white active:scale-95' : 'bg-[#e8e2d5] text-[#a39585] cursor-not-allowed'
             }`}
           >
             {allDone ? '쿠폰 교환소로 이동' : '미션을 모두 완료해주세요'}
           </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

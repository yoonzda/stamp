import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, BellOff, Moon, Sun, Globe, Shield, HelpCircle, 
  Trash2, ChevronRight, Info, Mail, Megaphone,
  Compass, Ship, Map, Landmark, X
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Flat list of settings items
  const allItems = [
    { 
      id: 'noti', icon: notifications ? <Bell size={44} strokeWidth={1} /> : <BellOff size={44} strokeWidth={1} />, label: "푸시 알림", 
      action: () => {
        setNotifications(!notifications);
        showToast(!notifications ? "푸시 알림이 켜졌습니다." : "푸시 알림이 꺼졌습니다.");
      },
      isActive: notifications,
      hasToggle: true
    },
    { 
      id: 'theme', icon: darkMode ? <Moon size={44} strokeWidth={1} /> : <Sun size={44} strokeWidth={1} />, label: "다크 모드", 
      action: () => {
        setDarkMode(!darkMode);
        showToast(!darkMode ? "다크 모드가 켜졌습니다." : "다크 모드가 꺼졌습니다.");
      },
      isActive: darkMode,
      hasToggle: true
    },
    { id: 'lang', icon: <Globe size={44} strokeWidth={1} />, label: "언어 설정", action: () => alert("언어 설정 팝업이 뜹니다.") },
    { id: 'notice', icon: <Megaphone size={44} strokeWidth={1} />, label: "공지사항", action: () => alert("공지사항 페이지로 이동합니다.") },
    { id: 'faq', icon: <HelpCircle size={44} strokeWidth={1} />, label: "자주 묻는 질문", action: () => alert("FAQ 페이지로 이동합니다.") },
    { id: 'contact', icon: <Mail size={44} strokeWidth={1} />, label: "문의하기", action: () => alert("문의하기 창이 열립니다.") },
    { id: 'privacy', icon: <Shield size={44} strokeWidth={1} />, label: "개인정보 처리방침", action: () => alert("약관 페이지로 이동합니다.") },
    { id: 'link_tour', icon: <Compass size={44} strokeWidth={1} />, label: "옹진군 문화관광", action: () => window.open('https://www.ongjin.go.kr/open_content/tour/', '_blank') },
    { id: 'link_ferry', icon: <Ship size={44} strokeWidth={1} />, label: "여객선 예매", action: () => window.open('https://island.haewoon.co.kr', '_blank') },
    { id: 'link_incheon', icon: <Map size={44} strokeWidth={1} />, label: "인천투어", action: () => window.open('https://itour.incheon.go.kr', '_blank') },
    { id: 'link_gov', icon: <Landmark size={44} strokeWidth={1} />, label: "옹진군청", action: () => window.open('https://www.ongjin.go.kr', '_blank') },
    { 
      id: 'reset', icon: <Trash2 size={44} strokeWidth={1} />, label: "데이터 초기화", 
      isDanger: true,
      action: () => {
        if(window.confirm("모든 스탬프 기록과 데이터가 삭제됩니다. 계속하시겠습니까?")) {
          localStorage.clear();
          alert("초기화가 완료되었습니다.");
          window.location.reload();
        }
      } 
    }
  ];

  return (
    <div className="w-full h-full bg-[#F3EFE6] relative overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col justify-center pb-24">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Help Button */}
      <button 
        onClick={() => setShowHelp(true)}
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-[#8a7a6b] bg-white/60 backdrop-blur-md rounded-full shadow-sm active:scale-95 transition-transform"
      >
        <Info size={24} strokeWidth={1.5} />
      </button>

      {/* Settings List */}
      <div className="px-5 z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-y-5 gap-x-2.5"
        >
          {allItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div 
                onClick={item.action}
                className={`relative flex items-center justify-center w-full aspect-square rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer
                  ${item.isDanger ? 'bg-[#f5e6e4] text-[#b84a3b]' : 
                    item.hasToggle && item.isActive ? 'bg-[#8a7a6b] text-white shadow-md' : 
                    'bg-white text-[#685b4f]'}
                `}
              >
                {item.icon}
                
                {/* 둥근 상태 표시점 (선택적) */}
                {item.hasToggle && (
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${item.isActive ? 'bg-white/80' : 'bg-[#d5ccbe]'}`} />
                )}
              </div>
              <span className={`text-[0.75rem] font-bold text-center break-keep leading-tight px-0.5 ${item.isDanger ? "text-[#b84a3b]" : "text-[#3e342b]"}`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-[#F3EFE6] rounded-[2rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#3e342b]">설정 메뉴 안내</h3>
                  <button onClick={() => setShowHelp(false)} className="text-[#8a7a6b] p-2 bg-white/50 rounded-full active:scale-95 transition-transform">
                    <X size={20} strokeWidth={2} />
                  </button>
                </div>
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto hide-scrollbar pb-4">
                  {allItems.map(item => (
                    <div key={item.id} className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white/40">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm ${item.isDanger ? 'text-[#b84a3b]' : 'text-[#685b4f]'}`}>
                          {React.cloneElement(item.icon, { size: 28, strokeWidth: 1.5 })}
                        </div>
                        <span className={`text-[1.05rem] font-bold ${item.isDanger ? 'text-[#b84a3b]' : 'text-[#3e342b]'}`}>{item.label}</span>
                      </div>
                      <div className="flex flex-col w-full">
                        <span className="text-[0.8rem] text-[#685b4f] break-keep leading-relaxed">
                          {item.id === 'noti' ? '새로운 스탬프 명소 안내나 여행 정보를 앱 푸시 알림으로 받아보실 수 있습니다.' :
                           item.id === 'theme' ? '눈이 편안한 어두운 화면으로 변경합니다. 주변이 어두울 때 사용해 보세요.' :
                           item.id === 'lang' ? '한국어, 영어, 중국어, 일본어 등 다양한 언어로 앱을 이용할 수 있습니다.' :
                           item.id === 'notice' ? '앱의 업데이트 소식이나 옹진군 스탬프 투어 관련 중요 공지를 확인합니다.' :
                           item.id === 'faq' ? '스탬프 획득 방법, 오류 해결 등 사용자들이 주로 묻는 질문에 대한 답변입니다.' :
                           item.id === 'contact' ? '서비스 이용 중 불편한 점이나 건의사항이 있다면 언제든지 문의를 남겨주세요.' :
                           item.id === 'privacy' ? '소중한 개인정보가 어떻게 보호되고 관리되는지 상세한 방침을 확인합니다.' :
                           item.id === 'link_tour' ? '옹진군의 아름다운 관광 명소와 여행 코스 정보를 공식 포털에서 만나보세요.' :
                           item.id === 'link_ferry' ? '섬 여행에 꼭 필요한 여객선 운항 시간표를 확인하고 승차권을 예매할 수 있습니다.' :
                           item.id === 'link_incheon' ? '인천광역시 전체의 다채로운 관광 정보와 혜택을 제공하는 포털로 이동합니다.' :
                           item.id === 'link_gov' ? '옹진군청의 새소식과 군정 소식 등 공식 행정 안내를 확인할 수 있습니다.' :
                           item.id === 'reset' ? '기기에 저장된 스탬프 기록과 설정 등 모든 앱 데이터를 삭제하고 처음 상태로 되돌립니다.' : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Message Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-[15%] left-1/2 z-50 px-5 py-2.5 bg-[#3e342b]/90 text-white text-[0.85rem] font-bold rounded-full shadow-lg whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

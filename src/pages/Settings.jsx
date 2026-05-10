import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Moon, Globe, Shield, HelpCircle, 
  Trash2, ChevronRight, Info, Mail,
  Compass, Ship, Map, ExternalLink
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Grouped settings list
  const settingsSections = [
    {
      title: "환경 설정",
      items: [
        { 
          id: 'noti', icon: <Bell size={20} />, label: "푸시 알림", 
          rightContent: (
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-[#8a7a6b]' : 'bg-[#d5ccbe]'}`}
              onClick={() => setNotifications(!notifications)}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          )
        },
        { 
          id: 'theme', icon: <Moon size={20} />, label: "다크 모드", 
          rightContent: (
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${darkMode ? 'bg-[#8a7a6b]' : 'bg-[#d5ccbe]'}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          )
        },
        { id: 'lang', icon: <Globe size={20} />, label: "언어 설정 (Language)", action: () => alert("언어 설정 팝업이 뜹니다.") }
      ]
    },
    {
      title: "정보 및 지원",
      items: [
        { id: 'notice', icon: <Bell size={20} />, label: "공지사항", action: () => alert("공지사항 페이지로 이동합니다.") },
        { id: 'faq', icon: <HelpCircle size={20} />, label: "자주 묻는 질문 (FAQ)", action: () => alert("FAQ 페이지로 이동합니다.") },
        { id: 'contact', icon: <Mail size={20} />, label: "1:1 문의하기", action: () => alert("문의하기 창이 열립니다.") },
        { id: 'privacy', icon: <Shield size={20} />, label: "개인정보 처리방침", action: () => alert("약관 페이지로 이동합니다.") },
        { id: 'version', icon: <Info size={20} />, label: "앱 버전", rightContent: <span className="text-[#a39585] text-sm">v1.0.3 (최신)</span> }
      ]
    },
    {
      title: "옹진군 더 알아보기",
      items: [
        { id: 'link_tour', icon: <Compass size={20} />, label: "옹진군 문화관광 포털", action: () => window.open('https://www.ongjin.go.kr/open_content/tour/', '_blank') },
        { id: 'link_ferry', icon: <Ship size={20} />, label: "여객선 예매", action: () => window.open('https://island.haewoon.co.kr', '_blank') },
        { id: 'link_incheon', icon: <Map size={20} />, label: "인천투어", action: () => window.open('https://itour.incheon.go.kr', '_blank') },
        { id: 'link_gov', icon: <ExternalLink size={20} />, label: "옹진군청 공식 홈페이지", action: () => window.open('https://www.ongjin.go.kr', '_blank') }
      ]
    },
    {
      title: "데이터 관리",
      items: [
        { 
          id: 'reset', icon: <Trash2 size={20} />, label: "앱 데이터 초기화", 
          isDanger: true,
          action: () => {
            if(window.confirm("모든 스탬프 기록과 데이터가 삭제됩니다. 계속하시겠습니까?")) {
              localStorage.clear();
              alert("초기화가 완료되었습니다.");
              window.location.reload();
            }
          } 
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-[#F3EFE6] relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-24">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* Header (스크롤 시 같이 올라가도록 고정 해제) */}
      <div className="w-full pt-16 pb-6 px-6 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#3e342b] text-[2.8rem] font-black tracking-tighter"
          style={{ fontFamily: "'Pretendard', sans-serif" }}
        >
          설정
        </motion.h1>
      </div>

      {/* Settings List */}
      <div className="px-4 z-10 mt-4">
        
        {/* Dynamic Sections */}
        {settingsSections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.05) }}
            className="mb-8"
          >
            <h3 className="text-[#8a7a6b] text-sm font-bold tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="flex flex-col">
              {section.items.map((item, i) => (
                <div 
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center justify-between py-4 px-2 transition-opacity active:opacity-50
                    ${i !== section.items.length - 1 ? 'border-b border-[#e8dfcf]' : ''}
                    ${item.action || item.rightContent ? 'cursor-pointer' : ''}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={item.isDanger ? "text-[#b84a3b]" : "text-[#685b4f]"}>
                      {item.icon}
                    </span>
                    <span className={`text-[1.05rem] font-medium ${item.isDanger ? "text-[#b84a3b]" : "text-[#2a241f]"}`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {item.rightContent ? (
                    <div onClick={(e) => e.stopPropagation()}>{item.rightContent}</div>
                  ) : item.action ? (
                    <ChevronRight size={18} className="text-[#a39585]" />
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

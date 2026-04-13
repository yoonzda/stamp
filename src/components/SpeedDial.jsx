import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map as MapIcon, QrCode, BookOpen } from 'lucide-react';

export default function SpeedDial() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { name: '스캐너', icon: <QrCode size={24} color="var(--color-cyan)" />, path: '/scanner', delay: '0.05s' },
    { name: '내 도장장', icon: <BookOpen size={24} color="var(--color-crimson)" />, path: '/collection', delay: '0.1s' },
    { name: '스탬프 지도', icon: <MapIcon size={24} color="var(--color-yellowgreen)" />, path: '/', delay: '0.15s' }
  ];

  const handleNavigate = (path) => {
    setOpen(false);
    setTimeout(() => navigate(path), 300); // 닫히는 애니메이션 대기
  };

  return (
    <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 9999 }}>
      
      {/* 얇고 세련된 블러 백그라운드 (메뉴에 집중되도록) */}
      <div 
        style={{
          position: 'absolute', bottom: '-30px', right: '-30px', width: '100vw', height: '100vh',
          backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'all 0.4s ease', zIndex: -1
        }}
        onClick={() => setOpen(false)}
      />

      {/* Speed Dial Actions */}
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        {actions.map((action, index) => {
          const translateY = open ? `-${(index + 1) * 72}px` : '0px';
          const scale = open ? 1 : 0.4;
          return (
            <div 
              key={action.name}
              onClick={() => handleNavigate(action.path)}
              style={{
                position: 'absolute', top: '4px', left: '4px', width: '56px', height: '56px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.8)', cursor: 'pointer',
                transform: `translateY(${translateY}) scale(${scale})`,
                transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${action.delay}`,
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none'
              }}
            >
              {action.icon}
              
              {/* 프리미엄 툴팁 (말풍선) */}
              <div style={{
                position: 'absolute', right: '70px',
                backgroundColor: 'rgba(28, 28, 30, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                color: '#fff', padding: '10px 16px', borderRadius: '14px',
                fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.5px',
                whiteSpace: 'nowrap', opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(10px)',
                transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${parseFloat(action.delay) + 0.1}s`,
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {action.name}
              </div>
            </div>
          );
        })}

        {/* Main Floating Button */}
        <button 
          onClick={() => setOpen(!open)}
          style={{
            position: 'absolute', top: 0, left: 0, width: '64px', height: '64px',
            background: open ? '#ff3b30' : '#1c1c1e',
            color: '#fff', borderRadius: '32px', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: open ? '0 8px 24px rgba(255, 59, 48, 0.4)' : '0 8px 24px rgba(0,0,0,0.25)',
            transform: `rotate(${open ? '135deg' : '0deg'}) scale(${open ? 0.95 : 1})`,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer', outline: 'none'
          }}
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}

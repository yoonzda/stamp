import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map as MapIcon, QrCode, BookOpen, X } from 'lucide-react';

export default function PremiumMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setOpen(false);
    setTimeout(() => navigate(path), 400); // 닫히는 애니메이션 대기
  };

  return (
    <>
      {/* 프리미엄 글래스모피즘(Glassmorphism) 오버레이 배경 */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          zIndex: 9998,
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={() => setOpen(false)}
      >
        <div style={{ 
          padding: '0 24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' 
        }}>
          
          <MenuCard 
            title="스캐너 열기" 
            desc="QR 코드를 스캔해 스탬프를 획득하세요"
            icon={<QrCode size={28} color="#fff" />} 
            gradient="linear-gradient(135deg, var(--color-cyan) 0%, #0072ff 100%)"
            open={open} delay="0.05s"
            onClick={() => handleNavigate('/scanner')}
          />
          
          <MenuCard 
            title="내 도장장" 
            desc="지금까지 모은 스탬프 컬렉션 보기"
            icon={<BookOpen size={28} color="#fff" />} 
            gradient="linear-gradient(135deg, var(--color-yellow) 0%, var(--color-crimson) 100%)"
            open={open} delay="0.1s"
            onClick={() => handleNavigate('/collection')}
          />
          
          <MenuCard 
            title="스탬프 지도" 
            desc="내 주변의 남은 스탬프 위치 찾기"
            icon={<MapIcon size={28} color="#fff" />} 
            gradient="linear-gradient(135deg, var(--color-yellowgreen) 0%, #11998e 100%)"
            open={open} delay="0.15s"
            onClick={() => handleNavigate('/')}
          />
          
        </div>
      </div>

      {/* 동적 플로팅 액션 버튼 (Dynamic FAB) */}
      <button 
        onClick={() => setOpen(!open)}
        style={{
          position: 'absolute', bottom: '30px', right: '30px', width: '68px', height: '68px',
          background: open ? 'var(--color-crimson)' : 'linear-gradient(135deg, #1c1c1e 0%, #434343 100%)',
          color: '#fff', borderRadius: '34px', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 12px 24px rgba(255, 59, 48, 0.4)' : '0 12px 24px rgba(0,0,0,0.25)',
          transform: open ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 9999, cursor: 'pointer'
        }}
      >
        {open ? <X size={34} /> : <Plus size={34} />}
      </button>
    </>
  );
}

function MenuCard({ title, desc, icon, gradient, open, delay, onClick }) {
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        width: '100%', padding: '24px', borderRadius: '28px',
        background: gradient, color: '#fff',
        display: 'flex', alignItems: 'center', gap: '20px',
        boxShadow: '0 16px 32px rgba(0,0,0,0.15)', cursor: 'pointer',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(120px) scale(0.8)',
        opacity: open ? 1 : 0,
        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}`
      }}
    >
      <div style={{
        width: '60px', height: '60px', borderRadius: '20px',
        backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.95, margin: '6px 0 0 0', lineHeight: 1.3 }}>{desc}</p>
      </div>
    </div>
  );
}

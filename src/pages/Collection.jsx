import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';

const STAMP_DATA = [
  { id: 'STAMP_CYAN', symbol: '+', name: '청록 더하기', color: 'var(--color-cyan)', message: '발견의 기쁨이 더해졌습니다!' },
  { id: 'STAMP_CRIMSON', symbol: '-', name: '다홍 빼기', color: 'var(--color-crimson)', message: '복잡한 마음을 비워냈습니다.' },
  { id: 'STAMP_YELLOWGREEN', symbol: '×', name: '연두 곱하기', color: 'var(--color-yellowgreen)', message: '행복이 두 배로 커졌습니다!' },
  { id: 'STAMP_YELLOW', symbol: '÷', name: '노랑 나누기', color: 'var(--color-yellow)', message: '아름다운 추억을 간직하세요.' }
];

export default function Collection() {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('captured_stamps') || '[]');
    setCaptured(saved);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
          <ChevronLeft size={28} />
        </button>
        <h1 style={{ fontSize: '1.3rem', fontWeight: '800', marginLeft: '12px', flex: 1 }}>내 도장장</h1>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <p style={{ marginBottom: '20px', color: '#666', fontSize: '0.95rem' }}>
          수집한 스탬프: <strong style={{ color: '#000' }}>{captured.length} / 4</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {STAMP_DATA.map((stamp) => {
            const isCaptured = captured.includes(stamp.id);

            return (
              <div key={stamp.id} style={{
                backgroundColor: '#fff', borderRadius: '20px', padding: '24px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                boxShadow: isCaptured ? `0 8px 16px ${stamp.color}33` : '0 4px 8px rgba(0,0,0,0.05)',
                border: isCaptured ? `2px solid ${stamp.color}` : '2px dashed #ddd',
                opacity: isCaptured ? 1 : 0.6,
                transform: isCaptured ? 'translateY(-2px)' : 'none',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  backgroundColor: isCaptured ? stamp.color : '#eee',
                  color: isCaptured ? '#fff' : '#aaa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px'
                }}>
                  {stamp.symbol}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  {stamp.name}
                </h3>
                {isCaptured ? (
                  <p style={{ fontSize: '0.8rem', color: '#777', textAlign: 'center', lineHeight: '1.4' }}>
                    {stamp.message}
                  </p>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: '#ccc' }}>미발견</p>
                )}
              </div>
            );
          })}
        </div>

        {captured.length === 4 && (
          <div style={{
            marginTop: '40px', padding: '40px 20px', 
            background: 'linear-gradient(135deg, #1c1c1e 0%, #2c3e50 100%)',
            borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
            boxShadow: '0 16px 40px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
            animation: 'fadeUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '900', marginBottom: '8px', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              MASTER STAMP
            </h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '24px' }}>4가지 원소를 통달한 자</p>
            
            {/* The Combined Emblem */}
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
              padding: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(245, 87, 108, 0.6), 0 0 60px rgba(240, 147, 251, 0.4)',
              animation: 'spin 10s linear infinite'
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                backgroundColor: '#1c1c1e', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '15%', left: '15%', color: 'var(--color-cyan)', fontSize: '1.8rem', fontWeight: 'bold' }}>+</div>
                <div style={{ position: 'absolute', top: '15%', right: '15%', color: 'var(--color-crimson)', fontSize: '1.8rem', fontWeight: 'bold' }}>-</div>
                <div style={{ position: 'absolute', bottom: '15%', left: '15%', color: 'var(--color-yellowgreen)', fontSize: '1.8rem', fontWeight: 'bold' }}>×</div>
                <div style={{ position: 'absolute', bottom: '15%', right: '15%', color: 'var(--color-yellow)', fontSize: '1.8rem', fontWeight: 'bold' }}>÷</div>
                <Award size={48} color="#fff" style={{ zIndex: 2, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
              </div>
            </div>

            <p style={{ color: '#fff', fontSize: '1rem', marginTop: '24px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.5' }}>
              축하합니다!<br/>모든 기운이 조화롭게 완성되었습니다.
            </p>
            
            <style>{`
              @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}

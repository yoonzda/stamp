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
            marginTop: '30px', padding: '20px', backgroundColor: '#1c1c1e', color: '#fff',
            borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px',
            animation: 'fadeUp 0.5s ease-out'
          }}>
            <Award size={40} color="var(--color-yellow)" />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>모든 스탬프 수집 완료!</h4>
              <p style={{ fontSize: '0.85rem', color: '#aaa' }}>축하합니다. 투어를 모두 마쳤습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

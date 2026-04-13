import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Map as MapIcon } from 'lucide-react';

const slides = [
  {
    symbol: '+',
    color: 'var(--color-cyan)',
    title: '새로운 발견을 더하다',
    desc: '여행 속에서 잊고 있던 가치를 더해보세요.'
  },
  {
    symbol: '-',
    color: 'var(--color-crimson)',
    title: '일상의 스트레스를 빼다',
    desc: '복잡한 생각은 빼고 가벼운 발걸음으로 출발하세요.'
  },
  {
    symbol: '×',
    color: 'var(--color-yellowgreen)',
    title: '우리의 기쁨을 곱하다',
    desc: '함께하는 순간, 기쁨은 기하급수적으로 커집니다.'
  },
  {
    symbol: '÷',
    color: 'var(--color-yellow)',
    title: '아름다운 기억을 나누다',
    desc: '이 곳의 추억을 사랑하는 사람들과 함께 나누세요.'
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('hasOnboarded', 'true');
      navigate('/');
    }
  };

  const current = slides[step];

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      backgroundColor: '#fff', padding: '40px 20px', transition: 'background-color 0.5s ease'
    }}>
      
      {/* Progress Dots */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: 'auto' }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === step ? '24px' : '8px', 
            height: '8px', 
            borderRadius: '4px',
            backgroundColor: i === step ? current.color : '#e0e0e0',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
        <div style={{
          fontSize: '6rem', 
          fontWeight: '300', 
          color: current.color,
          marginBottom: '30px',
          transition: 'color 0.6s ease'
        }}>
          {current.symbol}
        </div>
        
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>
          {current.title}
        </h2>
        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>
          {current.desc}
        </p>
      </div>

      {/* Button */}
      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={handleNext}
          style={{
            width: '100%', padding: '18px', backgroundColor: current.color,
            color: '#fff', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 'bold',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
            transition: 'background-color 0.6s ease'
          }}
        >
          {step === slides.length - 1 ? '시작하기' : '다음'}
          {step === slides.length - 1 ? <MapIcon size={20}/> : <ChevronRight size={20} />}
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

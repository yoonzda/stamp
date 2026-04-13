import React, { useState } from 'react';
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Scanner() {
  const navigate = useNavigate();
  const [result, setResult] = useState('');

  const handleScan = (text) => {
    if (text && !result) {
      setResult(text);
      alert('스탬프를 획득했습니다!\n내용: ' + text);
      navigate('/');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#000', color: '#fff' }}>
      
      {/* Header */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={28} />
          <span style={{ fontSize: '1.1rem', marginLeft: '4px' }}>뒤로</span>
        </button>
      </div>

      {/* Scanner Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '10%', left: 0, width: '100%', textAlign: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>스탬프용 QR 스캔</h2>
          <p style={{ marginTop: '10px', color: '#ccc', fontSize: '0.9rem' }}>사각형 안에 QR 코드를 맞춰주세요.</p>
        </div>

        <div style={{ margin: '0 auto', width: '100%', maxWidth: '400px', overflow: 'hidden', borderRadius: '24px' }}>
          <QrScanner
            onScan={(result) => handleScan(result[0].rawValue)}
            onError={(error) => console.log(error?.message)}
            components={{
                audio: false,
                finder: false
            }}
          />
        </div>
        
        {/* Finder Overlay (Custom) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '250px', height: '250px', border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '24px', pointerEvents: 'none', zIndex: 10
        }}>
          {/* Corner highlights */}
          <div style={{ position:'absolute', top:'-2px', left:'-2px', width:'30px', height:'30px', borderTop:'4px solid var(--color-cyan)', borderLeft:'4px solid var(--color-cyan)', borderTopLeftRadius:'24px' }} />
          <div style={{ position:'absolute', top:'-2px', right:'-2px', width:'30px', height:'30px', borderTop:'4px solid var(--color-cyan)', borderRight:'4px solid var(--color-cyan)', borderTopRightRadius:'24px' }} />
          <div style={{ position:'absolute', bottom:'-2px', left:'-2px', width:'30px', height:'30px', borderBottom:'4px solid var(--color-cyan)', borderLeft:'4px solid var(--color-cyan)', borderBottomLeftRadius:'24px' }} />
          <div style={{ position:'absolute', bottom:'-2px', right:'-2px', width:'30px', height:'30px', borderBottom:'4px solid var(--color-cyan)', borderRight:'4px solid var(--color-cyan)', borderBottomRightRadius:'24px' }} />
        </div>
      </div>
    </div>
  );
}

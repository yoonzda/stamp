import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map as MapIcon, QrCode, BookOpen } from 'lucide-react';

export default function SpeedDial() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { name: '스캐너', icon: <QrCode size={20} />, path: '/scanner', delay: '0.1s' },
    { name: '내 도장장', icon: <BookOpen size={20} />, path: '/collection', delay: '0.2s' },
    { name: '스탬프 지도', icon: <MapIcon size={20} />, path: '/', delay: '0.3s' }
  ];

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 999 }}>
      
      {/* Dimmed Background Overlay */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)', zIndex: -1,
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
        onClick={() => setOpen(false)}
      />

      {/* Speed Dial Actions */}
      <div style={{ position: 'relative', width: '60px', height: '60px' }}>
        {actions.map((action, index) => {
          const translateY = open ? `-${(index + 1) * 70}px` : '0px';
          const scale = open ? 1 : 0;
          return (
            <div 
              key={action.name}
              onClick={() => handleNavigate(action.path)}
              style={{
                position: 'absolute', top: 0, left: 0, width: '50px', height: '50px',
                marginLeft: '5px',
                backgroundColor: '#fff', color: '#333', borderRadius: '25px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)', cursor: 'pointer',
                transform: `translateY(${translateY}) scale(${scale})`,
                transition: `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${action.delay}, opacity 0.3s`,
                opacity: open ? 1 : 0
              }}
            >
              {action.icon}
              
              {/* Tooltip visible only when open */}
              <div style={{
                position: 'absolute', right: '60px', backgroundColor: '#333', color: '#fff',
                padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem',
                whiteSpace: 'nowrap', opacity: open ? 1 : 0, transition: 'opacity 0.3s 0.2s',
                pointerEvents: 'none'
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
            position: 'absolute', top: 0, left: 0, width: '60px', height: '60px',
            backgroundColor: '#1c1c1e', color: '#fff', borderRadius: '30px', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)', pointerEvents: 'auto',
            transform: `rotate(${open ? '45deg' : '0deg'})`,
            transition: 'transform 0.3s ease-in-out',
            zIndex: 10
          }}
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}

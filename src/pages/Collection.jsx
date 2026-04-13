import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ANIMALS, ITEMS, getGameState, saveGameState } from '../gameState';
import AvatarDisplay from '../components/Avatars';

export default function Collection() {
  const navigate = useNavigate();
  const [state, setState] = useState(getGameState());

  const handleSelectQuest = (itemId) => {
    const newState = { ...state, activeQuest: itemId, inventory: [] };
    saveGameState(newState);
    setState(newState);
  };

  const animal = ANIMALS.find(a => a.id === state.character) || ANIMALS[0];
  const activeItem = state.activeQuest ? ITEMS.find(i => i.id === state.activeQuest) : null;

  return (
    <div style={{ width: '100%', minHeight: '100%', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', color: '#333', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={28} />
        </button>
        <h1 style={{ fontSize: '1.3rem', fontWeight: '800', marginLeft: '12px', flex: 1 }}>
          {animal?.name}의 옷장
        </h1>
      </div>

      <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
        
        {/* Avatar Area */}
        <div style={{ 
          backgroundColor: '#fff', borderRadius: '30px', padding: '30px 20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px'
        }}>
          <AvatarDisplay animalId={state.character} unlockedItems={state.unlockedItems} />
        </div>

        {/* Current Quest Area */}
        {activeItem ? (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px' }}>현재 제작 중...</h2>
            <div style={{ 
              backgroundColor: '#1c1c1e', color: '#fff', padding: '24px', borderRadius: '24px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 8px 0', color: '#fff' }}>{activeItem.name}</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0 0 20px 0' }}>지도에서 남은 스탬프를 찾으세요!</p>
              
              {/* Progress Slots */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                {['STAMP_CYAN', 'STAMP_CRIMSON', 'STAMP_YELLOWGREEN', 'STAMP_YELLOW'].map((code) => {
                  const hasIt = state.inventory.includes(code);
                  let symbol = '+';
                  let color = 'var(--color-cyan)';
                  if(code === 'STAMP_CRIMSON') { symbol = '-'; color = 'var(--color-crimson)'; }
                  if(code === 'STAMP_YELLOWGREEN') { symbol = '×'; color = 'var(--color-yellowgreen)'; }
                  if(code === 'STAMP_YELLOW') { symbol = '÷'; color = 'var(--color-yellow)'; }

                  return (
                    <div key={code} style={{
                      width: '50px', height: '50px', borderRadius: '14px',
                      backgroundColor: hasIt ? color : '#333',
                      color: hasIt ? '#fff' : '#666',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', fontWeight: 'bold', border: hasIt ? 'none' : '2px dashed #555'
                    }}>
                      {symbol}
                    </div>
                  );
                })}
              </div>
            </div>
            <button 
              onClick={() => handleSelectQuest(null)}
              style={{ width: '100%', padding: '14px', marginTop: '12px', background: 'none', border: '1px solid #ccc', borderRadius: '16px', color: '#666', fontWeight: 'bold' }}>
              제작 취소하기
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px' }}>제작할 아이템 선택</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {ITEMS.map((item) => {
                const isUnlocked = state.unlockedItems.includes(item.id);
                return (
                  <div key={item.id} style={{
                    backgroundColor: '#fff', padding: '20px', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', opacity: isUnlocked ? 0.6 : 1
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 6px 0', textDecoration: isUnlocked ? 'line-through' : 'none' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
                        {isUnlocked ? '이미 보유 중입니다' : item.desc}
                      </p>
                    </div>
                    {!isUnlocked && (
                      <button 
                        onClick={() => handleSelectQuest(item.id)}
                        style={{
                          backgroundColor: 'var(--color-cyan)', color: '#fff', padding: '10px 16px',
                          borderRadius: '12px', border: 'none', fontWeight: 'bold'
                        }}>
                        제작 시작
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

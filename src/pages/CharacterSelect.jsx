import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ANIMALS, getGameState, saveGameState } from '../gameState';
import AvatarDisplay from '../components/Avatars';

export default function CharacterSelect() {
  const navigate = useNavigate();

  const handleSelect = (animalId) => {
    const state = getGameState();
    state.character = animalId;
    saveGameState(state);
    navigate('/');
  };

  return (
    <div style={{ padding: '30px 20px', minHeight: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '10px' }}>함께 여행할<br/>동물을 선택하세요</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>나중에 스탬프를 모아 예쁜 옷을 입혀줄 수 있어요!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {ANIMALS.map(animal => (
          <div 
            key={animal.id}
            onClick={() => handleSelect(animal.id)}
            style={{
              backgroundColor: '#f9f9f9', border: '2px solid #eee', borderRadius: '24px', padding: '20px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s'
            }}
          >
            <div style={{ transform: 'scale(0.8)', marginBottom: '-20px', marginTop: '-20px' }}>
              <AvatarDisplay animalId={animal.id} unlockedItems={[]} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{animal.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ANIMALS = [
  { id: 'bear', name: '반달가슴곰', color: '#6d4c41' },
  { id: 'rabbit', name: '흰 토끼', color: '#f5f5f5' },
  { id: 'snake', name: '초록 뱀', color: '#4caf50' },
  { id: 'parrot', name: '앵무새', color: '#ff5252' }
];

export const ITEMS = [
  { id: 'hat_red', name: '빨간 캡모자', desc: '+ - × ÷ 1세트 필요' },
  { id: 'hat_crown', name: '황금 왕관', desc: '+ - × ÷ 1세트 필요' },
  { id: 'bag_blue', name: '파란색 백팩', desc: '+ - × ÷ 1세트 필요' },
  { id: 'glasses_sun', name: '멋쟁이 선글라스', desc: '+ - × ÷ 1세트 필요' }
];

export const getGameState = () => {
  const defaultState = { character: null, activeQuest: null, inventory: [], unlockedItems: [] };
  try {
    return JSON.parse(localStorage.getItem('stamp_game_state')) || defaultState;
  } catch (e) {
    return defaultState;
  }
};

export const saveGameState = (state) => {
  localStorage.setItem('stamp_game_state', JSON.stringify(state));
};

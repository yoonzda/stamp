export const ISLANDS = [
  {
    id: 'baengnyeong', name: '백령도', description: '대한민국 최서북단, 천혜의 자연경관을 품은 신비의 섬', mapPos: { top: '15%', left: '15%' },
    spots: [
      { id: 'b1', name: '두무진', category: 'PLUS', desc: '경이로운 기암괴석 사이로 활력을 더하는 두무진', address: '백령면 연화리 255-1', code: 'STAMP_B1' },
      { id: 'b2', name: '사곶해변', category: 'MINUS', desc: '천연비행장이었던 광활한 해변을 걸으며 스트레스를 빼는 시간', address: '백령면 진촌리 2005-1', code: 'STAMP_B2' },
      { id: 'b3', name: '콩돌해안', category: 'MULTIPLY', desc: '파도와 둥근 자갈이 부딪히는 소리로 평온함이 배가 되는 곳', address: '백령면 남포리 콩돌해안', code: 'STAMP_B3' },
      { id: 'b4', name: '심청각', category: 'DIVIDE', desc: '인당수가 보이는 곳에서 효녀 심청의 전설과 마음을 나누는 공간', address: '백령면 진촌리 심청각', code: 'STAMP_B4' },
      { id: 'b5', name: '끝섬전망대', category: 'PLUS', desc: '대한민국 최서단 바다를 내려다보며 새로운 다짐을 더하는 전망대', address: '백령면 가을리', code: 'STAMP_B5' }
    ]
  },
  {
    id: 'daecheong', name: '대청도', description: '푸른 바다와 고운 모래가 빚어낸 한국의 사하라', mapPos: { top: '30%', left: '28%' },
    spots: [
      { id: 'c1', name: '옥죽동 해안사구', category: 'MULTIPLY', desc: '이국적인 모래사막 풍경에서 감동이 배가 되는 한국의 사하라', address: '대청면 대청리 692-2', code: 'STAMP_C1' },
      { id: 'c2', name: '서풍받이', category: 'DIVIDE', desc: '웅장한 절벽에서 불어오는 바람, 대자연과 교감 본능을 나누는 곳', address: '대청면 대청리 서풍받이', code: 'STAMP_C2' },
      { id: 'c3', name: '농여해변', category: 'PLUS', desc: '신비로운 나이목 바위와 풀등이 자연의 경이로움을 더해주는 해변', address: '대청면 대청리 농여해변', code: 'STAMP_C3' },
      { id: 'c4', name: '모래울해변', category: 'MINUS', desc: '빽빽한 적송림 사이를 걸으며 일상의 무거운 짐을 잠시 빼두는 쉼터', address: '대청면 모래울동', code: 'STAMP_C4' }
    ]
  },
  {
    id: 'yeonpyeong', name: '연평도', description: '평화의 염원을 담은 황금빛 조기의 고향', mapPos: { top: '22%', left: '60%' },
    spots: [
      { id: 'y1', name: '망향전망대', category: 'PLUS', desc: '탁 트인 북녘땅 전망을 보며 평화의 의미를 더하는 곳', address: '연평면 연평리 망향전망대', code: 'STAMP_Y1' },
      { id: 'y2', name: '구리동해변', category: 'MINUS', desc: '기묘한 자갈밭의 파도소리를 들으며 피로를 비우는 힐링 해변', address: '연평면 연평리 구리동', code: 'STAMP_Y2' },
      { id: 'y3', name: '조기역사관', category: 'MULTIPLY', desc: '황금빛 조기 파시의 영광스러운 옛 안목을 두 배로 느끼는 곳', address: '연평면 연평리 조기역사관', code: 'STAMP_Y3' },
      { id: 'y4', name: '평화공원', category: 'DIVIDE', desc: '바다를 향해 놓인 조각들을 보며 애뜻함과 기억을 나누는 공원', address: '연평면 평화공원', code: 'STAMP_Y4' }
    ]
  },
  {
    id: 'jawol', name: '자월도', description: '붉은 해당화와 밤하늘의 달빛이 아름다운 낭만의 섬', mapPos: { top: '72%', left: '81%' },
    spots: [
      { id: 'j1', name: '장골해수욕장', category: 'MULTIPLY', desc: '반달 해변과 붉은 해당화가 만나 추억을 곱하는 피서지', address: '자월면 자월리 장골', code: 'STAMP_J1' },
      { id: 'j2', name: '하늬바람길', category: 'DIVIDE', desc: '바닷바람을 맞으며 연인, 가족과 달콤한 대화를 나누는 산책로', address: '자월면 해안도로', code: 'STAMP_J2' },
      { id: 'j3', name: '큰말해변', category: 'PLUS', desc: '푸른 바다와 고은 모래알이 잔잔한 행복을 더해주는 곳', address: '자월면 큰말해변', code: 'STAMP_J3' },
      { id: 'j4', name: '국사봉', category: 'MINUS', desc: '자월도의 비경을 한눈에 담으며 복잡한 생각을 비워내는 전망대', address: '자월면 국사봉 정상', code: 'STAMP_J4' }
    ]
  },
  {
    id: 'deokjeok', name: '덕적도', description: '수백 년 노송 숲과 맑은 파도가 어우러진 힐링의 섬', mapPos: { top: '82%', left: '68%' },
    spots: [
      { id: 'd1', name: '서포리 해수욕장', category: 'PLUS', desc: '수백 년 노송 숲 피톤치드로 몸과 마음에 건강을 더하는 명품 해변', address: '덕적면 서포리', code: 'STAMP_D1' },
      { id: 'd2', name: '비조봉', category: 'MINUS', desc: '정상에서 360도 덕적군도를 조망하며 걱정을 빼는 등산길', address: '덕적면 진리', code: 'STAMP_D2' },
      { id: 'd3', name: '밧지름해변', category: 'MULTIPLY', desc: '아름다운 소나무가 바다를 감싸안아 감동을 곱해주는 숨은 명소', address: '덕적면 밧지름', code: 'STAMP_D3' },
      { id: 'd4', name: '능동자갈마당', category: 'DIVIDE', desc: '호박돌에 부딪히는 맑은 파도 소리를 조용히 귀로 나누는 마당', address: '덕적면 북리', code: 'STAMP_D4' }
    ]
  },
  {
    id: 'yeongheung', name: '영흥도', description: '신비로운 목섬과 다채로운 매력이 돋보이는 곳', mapPos: { top: '82%', left: '88%' },
    spots: [
      { id: 'h1', name: '목섬', category: 'MULTIPLY', desc: '하루 두 번 바닷길이 열리는 신비로움, 두 배의 낭만이 있는 목섬', address: '영흥면 선재리 목섬', code: 'STAMP_H1' },
      { id: 'h2', name: '십리포 해수욕장', category: 'DIVIDE', desc: '국내 유일 소사나무 군락지에서 친구들과 여유를 나누는 휴식처', address: '영흥면 내리 십리포', code: 'STAMP_H2' },
      { id: 'h3', name: '장경리 해수욕장', category: 'PLUS', desc: '넓은 갯벌과 붉은 해넘이가 잊지 못할 저녁의 낭만을 더해주는 곳', address: '영흥면 내리 장경리', code: 'STAMP_H3' },
      { id: 'h4', name: '해군전적비', category: 'MINUS', desc: '인천상륙작전의 핵심지에서 숭고한 정신을 기리며 마음을 숙연히 비우는 곳', address: '영흥면 영흥로', code: 'STAMP_H4' }
    ]
  },
  {
    id: 'jangbong', name: '장봉도', description: '아름다운 절경과 인어의 전설이 살아 숨쉬는 섬', mapPos: { top: '51%', left: '87%' },
    spots: [
      { id: 'n1', name: '옹암해수욕장', category: 'PLUS', desc: '해송 숲에서 바닷바람과 함께 상쾌한 기분을 가득 더하는 곳', address: '북도면 옹암해변', code: 'STAMP_N1' },
      { id: 'n2', name: '장봉도 인어상', category: 'MINUS', desc: '어부의 무사귀환을 비는 인어상 앞에서 걱정을 빼고 위안을 얻는 시간', address: '북도면 옹암 선착장', code: 'STAMP_N2' },
      { id: 'n3', name: '가막머리 전망대', category: 'MULTIPLY', desc: '서해안 절경과 황홀한 낙조를 감상하며 감동을 배로 느끼는 뷰포인트', address: '북도면 산 261', code: 'STAMP_N3' },
      { id: 'n4', name: '진촌해변', category: 'DIVIDE', desc: '고운 백사장에서 조개잡이를 하며 가족들과 웃음을 나누는 해변', address: '북도면 진촌', code: 'STAMP_N4' }
    ]
  }
];

export const SYMBOLS = {
  PLUS: { id: 'PLUS', label: '더하기', icon: '+', desc: '활력을 더하는 곳', color: '#1aa4b8' },
  MINUS: { id: 'MINUS', label: '빼기', icon: '-', desc: '스트레스를 비우는 곳', color: '#94bb3f' },
  MULTIPLY: { id: 'MULTIPLY', label: '곱하기', icon: '×', desc: '가치가 배가 되는 곳', color: '#f05746' },
  DIVIDE: { id: 'DIVIDE', label: '나누기', icon: '÷', desc: '추억을 나누는 곳', color: '#fbcb34' }
};

export const getGameState = () => {
  const defaultState = { collectedStamps: [], couponsRedeemed: 0 };
  try {
    return JSON.parse(localStorage.getItem('ongjin_traditional_state')) || defaultState;
  } catch (e) {
    return defaultState;
  }
};

export const saveGameState = (state) => {
  localStorage.setItem('ongjin_traditional_state', JSON.stringify(state));
};

export const clearGameState = () => {
  localStorage.removeItem('ongjin_traditional_state');
};

export const getAvailableCoupons = (state) => {
  const stamps = state.collectedStamps || [];
  const counts = { PLUS: 0, MINUS: 0, MULTIPLY: 0, DIVIDE: 0 };
  
  stamps.forEach(s => {
    // Find the category of the spot
    const spot = ISLANDS.flatMap(i => i.spots).find(spot => spot.code === s.code);
    if (spot && counts[spot.category] !== undefined) {
      counts[spot.category]++;
    }
  });

  const totalSets = Math.min(counts.PLUS, counts.MINUS, counts.MULTIPLY, counts.DIVIDE);
  return Math.max(0, totalSets - (state.couponsRedeemed || 0));
};

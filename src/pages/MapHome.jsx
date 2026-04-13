import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Navigation, MapPin } from 'lucide-react';

const STAMPS = [
  { id: 1, name: '더하기 스탬프 (+)', symbol: '+', color: 'var(--color-cyan)', latOffset: 0.002, lngOffset: 0.002 },
  { id: 2, name: '빼기 스탬프 (-)', symbol: '-', color: 'var(--color-crimson)', latOffset: -0.0015, lngOffset: 0.0025 },
  { id: 3, name: '곱하기 스탬프 (×)', symbol: '×', color: 'var(--color-yellowgreen)', latOffset: 0.0025, lngOffset: -0.001 },
  { id: 4, name: '나누기 스탬프 (÷)', symbol: '÷', color: 'var(--color-yellow)', latOffset: -0.003, lngOffset: -0.002 },
];

export default function MapHome() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  
  const [currentPos, setCurrentPos] = useState(null);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [stampsData, setStampsData] = useState([]);
  
  // Initialize Kakao Map
  useEffect(() => {
    const initMap = (latitude, longitude) => {
      if (!window.kakao || !window.kakao.maps) {
        // Fallback UI rendering implicitly by keeping mapContainer empty but showing markers/sheet would fail.
        return;
      }
      
      const calculatedStamps = STAMPS.map(stamp => ({
        ...stamp,
        lat: latitude + stamp.latOffset,
        lng: longitude + stamp.lngOffset
      }));
      setStampsData(calculatedStamps);

      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 4
        };
        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        mapRef.current = map;

          // My Location Marker
          const myLocContent = `<div style="width:16px;height:16px;background-color:#000;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`;
          const myLocOverlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(latitude, longitude),
            content: myLocContent,
            zIndex: 1
          });
          myLocOverlay.setMap(map);

          // Stamp Markers
          calculatedStamps.forEach(stamp => {
            const content = document.createElement('div');
            content.style.width = '36px';
            content.style.height = '36px';
            content.style.backgroundColor = '#fff';
            content.style.border = `3px solid ${stamp.color}`;
            content.style.borderRadius = '50%';
            content.style.display = 'flex';
            content.style.alignItems = 'center';
            content.style.justifyContent = 'center';
            content.style.fontSize = '20px';
            content.style.fontWeight = 'bold';
            content.style.color = stamp.color;
            content.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            content.style.cursor = 'pointer';
            content.innerText = stamp.symbol;

            content.onclick = () => {
              setSelectedStamp(stamp);
              map.panTo(new window.kakao.maps.LatLng(stamp.lat, stamp.lng));
            };

            const overlay = new window.kakao.maps.CustomOverlay({
              position: new window.kakao.maps.LatLng(stamp.lat, stamp.lng),
              content: content,
              zIndex: 0
            });
            overlay.setMap(map);
          });
        });
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        initMap(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        // Fallback to City Hall
        const fallbackLat = 37.5665;
        const fallbackLng = 126.9780;
        setCurrentPos({ lat: fallbackLat, lng: fallbackLng });
        initMap(fallbackLat, fallbackLng);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  const openAppDeeplink = (appType) => {
    if (!selectedStamp || !currentPos) return;
    const { lat, lng, name } = selectedStamp;
    
    if (appType === 'naver') {
      // 네이버 지도 앱 길찾기 (도보)
      const url = `nmap://route/walk?slat=${currentPos.lat}&slng=${currentPos.lng}&sname=내위치&dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=com.example.stampapp`;
      // 모바일 웹 예외처리 (앱 미설치시 갈 수 있는 경로 안내)
      window.location.href = url;
    } else {
      // 카카오맵 앱 길찾기 (도보)
      const url = `kakaomap://route?sp=${currentPos.lat},${currentPos.lng}&ep=${lat},${lng}&by=FOOT`;
      window.location.href = url;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%',
        padding: '24px 20px', zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>현재 위치와 주변 스탬프</h1>
        <p style={{ margin: 0, color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>지도에서 스탬프를 선택하세요</p>
      </div>

      {/* Map Container */}
      <div id="map" ref={mapContainer} style={{ width: '100%', flex: 1, backgroundColor: '#eef', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!window.kakao?.maps && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            <MapPin size={48} color="#ccc" style={{ marginBottom: '16px' }} />
            <p>지도를 불러오는 중이거나 권한이 필요합니다.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>(카카오맵 도메인 등록 필요)</p>
          </div>
        )}
      </div>

      {/* Selected Stamp Bottom Sheet */}
      <div style={{ 
        position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 30, pointerEvents: 'none',
        display: selectedStamp ? 'block' : 'none'
      }}>
        {/* Backdrop dimmer */}
        <div 
          onClick={() => setSelectedStamp(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)', pointerEvents: selectedStamp ? 'auto' : 'none',
            opacity: selectedStamp ? 1 : 0, transition: 'opacity 0.3s'
          }}
        />
        
        {/* Sheet Content */}
        <div style={{
          position: 'relative', width: '100%',
          backgroundColor: '#fff', borderRadius: '28px 28px 0 0', padding: '30px 24px 40px 24px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.15)', pointerEvents: 'auto',
          transform: selectedStamp ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}>
          {selectedStamp && (
            <>
              {/* Drag Handle (Visual only) */}
              <div style={{ 
                width: '40px', height: '5px', backgroundColor: '#e0e0e0', borderRadius: '3px',
                margin: '0 auto 20px auto' 
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  backgroundColor: `${selectedStamp.color}15`, border: `2px solid ${selectedStamp.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 'bold', color: selectedStamp.color, marginBottom: '12px'
                }}>
                  {selectedStamp.symbol}
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#222' }}>
                  {selectedStamp.name}
                </h2>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: '8px 0 0 0' }}>
                  해당 스탬프 위치로 길안내를 시작하시겠습니까?
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <button 
                  onClick={() => openAppDeeplink('kakao')}
                  style={{
                    width: '100%', padding: '16px', backgroundColor: '#FEE500', color: '#191919',
                    borderRadius: '16px', fontWeight: 'bold', fontSize: '1.05rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none'
                  }}
                >
                  <Navigation size={20} /> 카카오맵으로 안내 시작
                </button>
                <button 
                  onClick={() => openAppDeeplink('naver')}
                  style={{
                    width: '100%', padding: '16px', backgroundColor: '#03C75A', color: '#fff',
                    borderRadius: '16px', fontWeight: 'bold', fontSize: '1.05rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none'
                  }}
                >
                  <MapPin size={20} /> 네이버 지도 열기
                </button>
                <button 
                  onClick={() => setSelectedStamp(null)}
                  style={{
                    width: '100%', padding: '14px', marginTop: '4px', backgroundColor: '#f5f5f5',
                    color: '#666', borderRadius: '16px', fontWeight: 'bold', fontSize: '1rem', border: 'none'
                  }}
                >
                  닫기
                </button>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

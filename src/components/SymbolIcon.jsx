import React from 'react';

export default function SymbolIcon({ type, className = "w-full h-full", color = "currentColor" }) {
  if (type === 'PLUS') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 4v16M4 12h16" />
      </svg>
    );
  }
  if (type === 'MINUS') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 12h16" />
      </svg>
    );
  }
  if (type === 'MULTIPLY') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M5.5 5.5l13 13M5.5 18.5l13-13" />
      </svg>
    );
  }
  if (type === 'DIVIDE') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 12h16" />
        <circle cx="12" cy="5" r="1.3" fill={color} stroke="none" />
        <circle cx="12" cy="19" r="1.3" fill={color} stroke="none" />
      </svg>
    );
  }
  return null;
}

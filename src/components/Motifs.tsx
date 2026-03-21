import React from 'react';

export const ScrollMotif = ({ className = "" }: { className?: string }) => (
  <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 20C10 20 25 5 50 20C75 35 90 20 90 20" stroke="currentColor" strokeWidth="0.8" />
    <path d="M10 20C10 20 25 35 50 20C75 5 90 20 90 20" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="50" cy="20" r="2" fill="currentColor" />
  </svg>
);

export const DomeIllustration = ({ gradientClass, sportName }: { gradientClass: string, sportName: string }) => (
  <div className={`card-media ${gradientClass} rounded-[14px] h-40 overflow-hidden relative`}>
    <svg viewBox="0 0 300 160" className="absolute bottom-0 left-0 w-full h-full">
      <ellipse cx="80" cy="180" rx="90" ry="80" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="150" cy="180" rx="110" ry="95" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="230" cy="180" rx="85" ry="75" fill="rgba(255,255,255,0.15)"/>
      <path d="M150 85 L154 60 L150 52 L146 60 Z" fill="rgba(255,255,255,0.5)"/>
      <circle cx="150" cy="58" r="18" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
      <circle cx="150" cy="58" r="12" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
      <circle cx="150" cy="58" r="6"  fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
      <circle cx="150" cy="58" r="2"  fill="rgba(255,255,255,0.5)"/>
    </svg>
    <div className="absolute bottom-3 left-3.5 font-sans text-sm font-semibold text-white">{sportName}</div>
  </div>
);

export const LotusBlob = ({ gradientClass, size = 80 }: { gradientClass: string, size?: number }) => (
  <div className={`${gradientClass} rounded-full flex items-center justify-center relative overflow-hidden`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
      <path d="M50 10 C60 30 90 40 50 90 C10 40 40 30 50 10" fill="white" />
      <path d="M10 50 C30 40 40 10 90 50 C40 90 30 60 10 50" fill="white" />
    </svg>
  </div>
);

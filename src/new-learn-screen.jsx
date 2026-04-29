import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode } from 'lucide-react';

// ─── Figma Asset URLs (card backgrounds from Figma) ───
const IMG_CARD_THERMO    = "https://www.figma.com/api/mcp/asset/3feff389-78c8-45b5-8e33-dff426b38def";
const IMG_CARD_NEWTON    = "https://www.figma.com/api/mcp/asset/90880033-83ce-4e52-a3c7-d7a650f18af6";
const IMG_CARD_PROJECTILE = "https://www.figma.com/api/mcp/asset/d2701d4d-4004-4418-8324-407350ad0942";
const IMG_FOOTBALL        = "https://www.figma.com/api/mcp/asset/1f7b29f2-9355-44a1-96dc-fd573b7cbe3c";

export function NewLearnScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Physics', 'Chemistry', 'Maths', 'Biology'];

  const modules = [
    {
      id: 'thermodynamics',
      sport: 'RUNNING & ATHLETICS',
      title: 'Laws of\nThermodynamics',
      contentsCount: '04',
      bgImage: IMG_CARD_THERMO,
      sportColor: '#EA580C',
      overlay: 'rgba(255,255,255,0)',
      onClick: () => navigate('/learn/football'),
    },
    {
      id: 'newton',
      sport: 'SWIMMING',
      title: "Newton's First\nLaw of Motion",
      contentsCount: '03',
      bgImage: IMG_CARD_NEWTON,
      sportColor: '#0369A1',
      overlay: 'rgba(255,255,255,0)',
      onClick: () => navigate('/learn/football'),
    },
    {
      id: 'projectile',
      sport: 'FOOTBALL',
      title: "Projectile Motion\n& It's Physics",
      contentsCount: '01',
      bgImage: IMG_CARD_PROJECTILE,
      sportColor: '#1D4ED8',
      img: IMG_FOOTBALL,
      onClick: () => navigate('/learn/football/science'),
    },
  ];

  return (
    <div className="min-h-screen font-sans overflow-hidden pb-32 relative" style={{ background: '#F2F2F7' }}>

      {/* Background glow */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 280,
          background: `
            radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
            radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
            radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
            #F2F2F7
          `,
        }}
      />

      <div className="relative z-10 px-4 pt-14">
        <h1 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 24, color: '#0F0F12', lineHeight: 1.2, marginBottom: 16 }}>
          Choose what<br />to learn today?
        </h1>

        {/* Search */}
        <div className="relative mb-5 flex items-center bg-white rounded-full border" style={{ borderColor: '#D1D1D8', height: 38 }}>
          <Search size={14} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none bg-transparent pl-8 pr-4 placeholder-gray-400"
            style={{ fontSize: 13 }}
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flexShrink: 0,
                  padding: '5px 14px',
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'Inter, sans-serif',
                  border: isActive ? '0.5px solid #4338CA' : '0.5px solid #D1D1D8',
                  background: isActive ? '#EEF2FF' : '#fff',
                  color: isActive ? '#4338CA' : '#6B6B7B',
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Module cards — interlocking stack */}
        <div className="mt-3 flex flex-col items-center px-1">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              onClick={mod.onClick}
              className="relative w-full cursor-pointer"
              style={{
                height: 190,
                marginTop: i === 0 ? 0 : -18,
                zIndex: 10 + i,
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              {/* Card background image */}
              <img
                src={mod.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ objectFit: 'fill', borderRadius: 14 }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col" style={{ padding: '20px 20px 16px' }}>
                {/* Top row */}
                <div className="flex justify-between items-start">
                  <span style={{ fontSize: 9, fontWeight: 600, color: mod.sportColor, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                    {mod.sport}
                  </span>
                  <QrCode size={20} style={{ color: '#0F0F12', opacity: 0.6 }} />
                </div>

                {/* Bottom row: title + count */}
                <div className="mt-auto flex justify-between items-end">
                  <h3 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 20, color: 'rgba(0,0,0,0.65)', lineHeight: 1.2, whiteSpace: 'pre-line', flex: 1 }}>
                    {mod.title}
                  </h3>
                  <div className="flex flex-col items-center ml-3">
                    <span style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 18, color: 'rgba(0,0,0,0.65)', lineHeight: 1 }}>
                      {mod.contentsCount}
                    </span>
                    <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>Contents</span>
                  </div>
                </div>
              </div>

              {/* Sport image (football) */}
              {mod.img && (
                <img
                  src={mod.img}
                  alt=""
                  className="absolute pointer-events-none"
                  style={{ width: 120, height: 120, objectFit: 'contain', bottom: -10, right: -10, opacity: 0.85, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

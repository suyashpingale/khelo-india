import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

// ─── Figma Asset URLs ───
const IMG_AVANI    = "https://www.figma.com/api/mcp/asset/ffe502d1-015e-46f8-98dd-e5b582c1253f";
const IMG_SUMIT    = "https://www.figma.com/api/mcp/asset/302d00cc-6d6d-4cac-9662-d2116b645bb3";
const IMG_PRAMOD   = "https://www.figma.com/api/mcp/asset/5d6491c5-b3c0-4b3b-8bd1-04168d18a871";
const IMG_TOPS_ICON = "https://www.figma.com/api/mcp/asset/a1fdc4ad-76df-4f31-aca2-c53501bb57fc";

// ─── Scalloped badge icon (matches Figma star/medal shape) ───
function ScallopBadge({ children, color }) {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 1 L27.5 8.5 L36 6 L35 15 L43 19 L38.5 27 L43 35 L35 39 L36 48 L27.5 45.5 L23 53 L18.5 45.5 L10 48 L11 39 L3 35 L7.5 27 L3 19 L11 15 L10 6 L18.5 8.5 Z"
        fill={color}
        opacity="0.18"
        transform="scale(0.87) translate(1.5, -3)"
      />
      <path
        d="M23 1 L27.5 8.5 L36 6 L35 15 L43 19 L38.5 27 L43 35 L35 39 L36 48 L27.5 45.5 L23 53 L18.5 45.5 L10 48 L11 39 L3 35 L7.5 27 L3 19 L11 15 L10 6 L18.5 8.5 Z"
        fill={color}
        opacity="0.22"
        transform="scale(0.87) translate(1.5, -3) rotate(20, 23, 25)"
      />
      <text x="23" y="27" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="Segoe UI, sans-serif" fontWeight="700" fontSize="13">
        {children}
      </text>
    </svg>
  );
}

export function ParaAthletesScreen() {
  const navigate = useNavigate();

  const stats = [
    { label: 'PARA ATHLETES',      value: '401', color: '#9333ea' },
    { label: 'PARALYMPIC\nMEDALS', value: '111', color: '#22c55e' },
    { label: 'PARA SPORTS',        value: '18',  color: '#f97316' },
    { label: 'ACCESSIBLE\nFACILITIES', value: '236', color: '#f59e0b' },
  ];

  const sports = [
    { name: 'Archery',   gradient: 'linear-gradient(135deg,#FED7AA,#F97316,#EA580C)' },
    { name: 'Swimming',  gradient: 'linear-gradient(135deg,#FECACA,#F87171,#DC2626)' },
    { name: 'Athletics', gradient: 'linear-gradient(135deg,#BBF7D0,#4ADE80,#16A34A)' },
    { name: 'Kabaddi',   gradient: 'linear-gradient(135deg,#E9D5FF,#A855F7,#7E22CE)', sub: 'Contact sport' },
  ];

  const champions = [
    { name: 'AVANI LEKHARA',  sport: 'Shooting',          img: IMG_AVANI  },
    { name: 'SUMIT ANTIL',    sport: 'Athletics - Javelin', img: IMG_SUMIT  },
    { name: 'PRAMOD BHAGAT',  sport: 'Badminton',          img: IMG_PRAMOD },
  ];

  const events = [
    { date: '22', month: 'MAY 2026', title: 'NATIONAL PARA ATHLETICS CHAMPIONSHIP',   location: 'New Delhi', sport: 'ATHLETICS' },
    { date: '27', month: 'MAY 2026', title: 'PARA TABLE TENNIS CHAMPIONSHIP',          location: 'Gurugram',  sport: 'ATHLETICS' },
  ];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden pb-28" style={{ background: '#F2F2F7' }}>

      {/* ── Orange radial header glow ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 200,
          background: `
            radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
            radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
            radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
            #F2F2F7
          `,
        }}
      />

      <div className="relative z-10 pt-14 px-5">

        {/* Title */}
        <h1 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 26, color: '#0F0F12', margin: '0 0 6px', lineHeight: 1.1 }}>
          Limitless <span style={{ color: '#F97316' }}>Champions</span>
        </h1>
        <p style={{ fontSize: 12, color: '#6B6B7B', margin: '0 0 20px', maxWidth: 280, lineHeight: 1.5 }}>
          Celebrating India's para athletes and connecting them to accessible sports infrastructure across the nation
        </p>

        {/* Stats row */}
        <div className="flex gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
              <div className="relative flex items-center justify-center mb-2" style={{ width: 46, height: 46 }}>
                <ScallopBadge color={s.color}>{s.value}</ScallopBadge>
              </div>
              <span style={{ fontSize: 7.5, fontWeight: 600, color: '#9090A0', textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 flex items-center bg-white rounded-full border" style={{ borderColor: '#D1D1D8', height: 38 }}>
          <Search size={14} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Find Accessible Facilities"
            className="w-full outline-none bg-transparent pl-8 pr-4 text-sm placeholder-gray-400"
            style={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }}
          />
        </div>

        {/* Browse by Sports */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span>🇮🇳</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9090A0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Browse by Sports</span>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ paddingBottom: 4 }}>
            {sports.map((s, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl overflow-hidden shrink-0"
                style={{ minWidth: 94, paddingTop: 4, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, border: '0.5px solid rgba(0,0,0,0.06)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.gradient }} />
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: '#0F0F12', marginTop: 8, marginBottom: s.sub ? 2 : 0 }}>{s.name}</p>
                {s.sub && <p style={{ fontSize: 9, color: '#6B6B7B', margin: 0 }}>{s.sub}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Featured Champions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span>🇮🇳</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9090A0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Featured Champions</span>
          </div>
          <div className="flex gap-3 overflow-x-auto" style={{ paddingBottom: 4 }}>
            {champions.map((c, i) => (
              <div key={i} className="shrink-0" style={{ width: 90 }}>
                <div className="rounded-xl overflow-hidden bg-gray-100" style={{ height: 110, marginBottom: 6 }}>
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#F97316', textTransform: 'uppercase', marginBottom: 1 }}>{c.name}</p>
                <p style={{ fontSize: 8, color: '#9090A0', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{c.sport}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TOPS Scheme */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl flex items-start gap-3 p-4" style={{ border: '0.5px solid rgba(0,0,0,0.06)' }}>
            <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, background: '#F97316' }}>
              <img
                src={IMG_TOPS_ICON}
                alt=""
                style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#0F0F12', marginBottom: 4 }}>TOPS - Para Scheme 2025</p>
              <p style={{ fontSize: 10, color: 'rgba(107,107,123,0.8)', lineHeight: 1.5 }}>
                Monthly stipend, coaching, equipment,&amp; international exposure for eligible para athletes under Target Olympic Podium Scheme
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-4">
          <p style={{ fontSize: 12, fontWeight: 500, color: '#9090A0', marginBottom: 12 }}>Upcoming Para Events</p>
          <div className="flex gap-3 overflow-x-auto" style={{ paddingBottom: 4 }}>
            {events.map((ev, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shrink-0 flex flex-col"
                style={{ minWidth: 180, padding: '12px 10px 10px', border: '0.25px solid #F97316', position: 'relative' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#F97316', lineHeight: 1 }}>{ev.date}</span>
                    <span style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)' }}>{ev.month}</span>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#228AE3', letterSpacing: '0.05em' }}>{ev.sport}</span>
                </div>
                <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(0,0,0,0.6)', marginBottom: 4, lineHeight: 1.4 }}>{ev.title}</p>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={10} className="text-gray-400" />
                  <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.6)' }}>{ev.location}</span>
                </div>
                <button
                  className="w-full rounded-full py-2 text-center"
                  style={{ background: '#EEF2FF', color: '#4338CA', fontSize: 11, fontWeight: 500, border: '0.5px solid #C7D2FE' }}
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

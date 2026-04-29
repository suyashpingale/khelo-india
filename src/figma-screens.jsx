import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, BadgePill, Card, SectionLabel, BtnPrimary, BtnSecondary } from './screens';

// ─────────────────────────────────────────────
// Figma Tab Bar
// ─────────────────────────────────────────────
export function FigmaTabBar({ activePath }) {
  const navigate = useNavigate();

  // Hide on onboarding routes
  if (activePath.startsWith('/onboarding') || activePath === '/') return null;

  const tabs = [
    { id: 'home', path: '/home', icon: '/img/icon-home.svg', label: 'Home' },
    { id: 'explore', path: '/explore', icon: '/img/icon-explore.svg', label: 'Explore' },
    { id: 'learn', path: '/learn', icon: '/img/icon-learn.svg', label: 'Learn' },
    { id: 'profile', path: '/profile', icon: '/img/icon-profile.svg', label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '0',
      right: '0',
      margin: '0 auto',
      width: '320px',
      height: '56px',
      background: '#0F0F12',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    }}>
      {tabs.map(tab => {
        const isActive = activePath === tab.path || activePath.startsWith(tab.path + '/');
        // If we don't have SVG files yet, we'll use emojis as fallbacks until the SVGs load
        const fallbackEmojis = { home: '🏠', explore: '🧭', learn: '📚', profile: '👤' };

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: isActive ? '#F97316' : '#9090A0',
              padding: '6px 0',
            }}
          >
            <div style={{ position: 'relative', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Note: since icon color changes by active state, if we use raw SVG img tags they won't change color.
                   A quick CSS mask trick solves this for standard black SVGs. */}
               <div style={{
                  width: '100%', height: '100%',
                  background: isActive ? '#F97316' : '#9090A0',
                  maskImage: `url(${tab.icon})`, WebkitMaskImage: `url(${tab.icon})`,
                  maskSize: 'contain', WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center', WebkitMaskPosition: 'center'
               }}>
                  {/* Fallback to emoji if mask fails / svg missing */}
                  <div style={{ visibility: 'hidden' }}>{fallbackEmojis[tab.id]}</div>
               </div>
            </div>
            <span style={{ fontSize: '10px', fontFamily: T.fontSans, fontWeight: 500 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// 1. WelcomeScreen (/onboarding/welcome)
// ─────────────────────────────────────────────
export function WelcomeScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('English');
  const [age, setAge] = useState('13-17');
  const [role, setRole] = useState('Athlete');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2F2F7',
      display: 'flex',
      flexDirection: 'column',
      padding: '60px 24px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Gradient Glow */}
      <div style={{ position: 'absolute', top: -50, left: -50, right: -50, height: 200, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, #F97316 0%, #FB923C 20%, transparent 60%)', opacity: 0.8, pointerEvents: 'none', zIndex: 0 }} />

      <h1 style={{ fontFamily: T.fontSans, fontSize: '32px', fontWeight: 600, color: '#0F0F12', marginBottom: '8px', zIndex: 1, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        Welcome to<br/>Khelo India
      </h1>
      <p style={{ fontFamily: T.fontSans, fontSize: '15px', color: '#6B6B7B', marginBottom: '32px', zIndex: 1 }}>
        Let's setup your profile
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1, paddingBottom: '120px' }}>
        {/* Languages */}
        <div>
          <p style={{ fontFamily: T.fontSans, fontSize: '11px', fontWeight: 600, color: '#9090A0', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>Choose Language</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['English', 'हिन्दी', 'தமிழ்', 'తెలుగు'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? 'linear-gradient(135deg, #F97316, #EA580C)' : '#FFF',
                color: lang === l ? '#FFF' : '#9090A0',
                border: lang === l ? 'none' : '1px solid #E5E5EA',
                borderRadius: '9999px',
                padding: '12px 24px',
                fontFamily: T.fontSans,
                fontSize: '15px',
                fontWeight: lang === l ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: lang === l ? '0 4px 12px rgba(249, 115, 22, 0.2)' : 'none'
              }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div>
          <p style={{ fontFamily: T.fontSans, fontSize: '11px', fontWeight: 600, color: '#9090A0', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>Your Age Group</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['13-17', '18-22', '23-28', '28+'].map(a => (
              <button key={a} onClick={() => setAge(a)} style={{
                background: age === a ? '#F97316' : '#FFF',
                color: age === a ? '#FFF' : '#9090A0',
                border: age === a ? 'none' : '1px solid #E5E5EA',
                borderRadius: '9999px',
                padding: '10px 18px',
                fontFamily: T.fontSans,
                fontSize: '14px',
                fontWeight: age === a ? 600 : 500,
                cursor: 'pointer',
                boxShadow: age === a ? '0 2px 8px rgba(249, 115, 22, 0.2)' : 'none'
              }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Role */}
        <div>
          <p style={{ fontFamily: T.fontSans, fontSize: '11px', fontWeight: 600, color: '#9090A0', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>I Am A</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Athlete', 'Fitness user', 'Para athlete', 'Coach', 'Parent'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                background: role === r ? '#F97316' : '#FFF',
                color: role === r ? '#FFF' : '#9090A0',
                border: role === r ? 'none' : '1px solid #E5E5EA',
                borderRadius: '9999px',
                padding: '10px 18px',
                fontFamily: T.fontSans,
                fontSize: '14px',
                fontWeight: role === r ? 600 : 500,
                cursor: 'pointer',
                boxShadow: role === r ? '0 2px 8px rgba(249, 115, 22, 0.2)' : 'none'
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <img src="/img/mascot.png" alt="Mascot" style={{ position: 'fixed', bottom: 10, right: -15, width: '200px', objectFit: 'contain', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ position: 'fixed', bottom: 24, left: 0, right: 0, zIndex: 3, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/onboarding/sports-selection')}
          style={{
            background: '#0F0F12',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            padding: '18px 24px',
            fontFamily: T.fontSans,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'calc(100% - 48px)',
            maxWidth: '320px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }}
        >
          <span>Let's Continue</span>
          <div style={{ display: 'flex', gap: '4px' }}>
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
          </div>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. SportsSelectionScreen (/onboarding/sports-selection)
// ─────────────────────────────────────────────
// ─── Figma Sport Image URLs ───
const SPORT_IMGS = {
  cricket:     "https://www.figma.com/api/mcp/asset/b6ffe163-5816-418b-929e-dee72c437c62",  // cricket bat + ball
  badminton:   "https://www.figma.com/api/mcp/asset/bc2551db-1ecc-43d6-87fb-fa2b1ee36ee6",  // badminton racket
  rugby:       "https://www.figma.com/api/mcp/asset/cd7e97be-fb5d-4ed0-95a4-4925391aa9e1",  // rugby ball
  football:    "https://www.figma.com/api/mcp/asset/8db07a06-8869-44af-9fb3-891bd2e211c1",  // football
  hockey:      "https://www.figma.com/api/mcp/asset/5a15b1a3-0e6c-44e6-b049-77da8ecc1abc",  // hockey stick
  tennis:      "https://www.figma.com/api/mcp/asset/0444af5d-0275-40ab-ab81-21b3133cfb26",  // tennis racket
  basketball:  "https://www.figma.com/api/mcp/asset/a1e6f3e5-50bd-45c6-b8c7-e76211a68591",  // basketball
  tabletennis: "https://www.figma.com/api/mcp/asset/e2138bb1-7850-4d76-8a1b-572b3d0e375e",  // table tennis paddle
  mallakhamb:  "https://www.figma.com/api/mcp/asset/b5f1394a-f1a5-4fda-b4ef-9042ab22848b",  // mallakhamb
  // kabaddi: no illustration in Figma (white tile + text only)
};

export function SportsSelectionScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(['cricket', 'badminton', 'football']);

  const sports = [
    { id: 'cricket',     name: 'Cricket',      img: SPORT_IMGS.cricket,     colSpan: 1, rowSpan: 1, titleColor: '#EA580C' },
    { id: 'badminton',   name: 'Badminton',    img: SPORT_IMGS.badminton,   colSpan: 1, rowSpan: 1, titleColor: '#EA580C' },
    { id: 'rugby',       name: 'Rugby',        img: SPORT_IMGS.rugby,       colSpan: 1, rowSpan: 1 },
    { id: 'football',    name: 'Football',     img: SPORT_IMGS.football,    colSpan: 2, rowSpan: 2, titleColor: '#EA580C' },
    { id: 'hockey',      name: 'Hockey',       img: SPORT_IMGS.hockey,      colSpan: 1, rowSpan: 1 },
    { id: 'basketball',  name: 'Basket Ball',  img: SPORT_IMGS.basketball,  colSpan: 1, rowSpan: 1 },
    { id: 'tabletennis', name: 'Table Tennis', img: SPORT_IMGS.tabletennis, colSpan: 1, rowSpan: 1 },
    { id: 'tennis',      name: 'Tennis',       img: SPORT_IMGS.tennis,      colSpan: 1, rowSpan: 1 },
    { id: 'mallakhamb',  name: 'Mallakhamb',   img: SPORT_IMGS.mallakhamb,  colSpan: 1, rowSpan: 1 },
    { id: 'kabaddi',     name: 'Kabaddi',      colSpan: 2, rowSpan: 1, titleColor: '#EA580C' },
  ];

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -50, left: -50, right: -50, height: 200, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, #F97316 0%, #FB923C 20%, transparent 60%)', opacity: 0.8, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ padding: '60px 24px 20px', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.fontSans, fontSize: '28px', fontWeight: 600, color: '#0F0F12', marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Select your<br/>sports of interest
        </h1>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>⌕</span>
          <input type="text" placeholder="Search sports..." style={{ width: '100%', height: '52px', borderRadius: '9999px', border: '1px solid #E5E5EA', padding: '0 16px 0 44px', fontFamily: T.fontSans, fontSize: '15px', color: '#0F0F12', background: '#fff', outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto', zIndex: 1, paddingBottom: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '130px', gap: '10px', gridAutoFlow: 'dense' }}>
          {sports.map(s => {
            const isSelected = selected.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggle(s.id)}
                style={{
                  gridColumn: `span ${s.colSpan}`,
                  gridRow: `span ${s.rowSpan}`,
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <span style={{ fontFamily: T.fontSans, fontSize: s.colSpan === 2 ? '24px' : '13px', fontWeight: 700, color: s.titleColor || '#6B6B7B', zIndex: 2 }}>
                  {s.name}
                </span>
                <img
                  src={s.img}
                  alt={s.name}
                  style={{
                    position: 'absolute',
                    bottom: s.colSpan === 2 ? '-16px' : '-4px',
                    right: s.colSpan === 2 ? '-16px' : '-8px',
                    width: s.colSpan === 2 ? '200px' : '80px',
                    height: s.colSpan === 2 ? '200px' : '80px',
                    objectFit: 'contain',
                    zIndex: 1,
                    transform: s.colSpan === 1 ? 'rotate(-12deg)' : 'none',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                  }}
                  onError={(e) => { e.target.style.display='none'; }}
                />
                
                {isSelected && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', width: '22px', height: '22px', background: '#F97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', zIndex: 3, paddingBottom: '2px', border: '2px solid #fff' }}>
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(242,242,247,1) 60%, rgba(242,242,247,0))', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: '#0F0F12',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            padding: '18px 24px',
            width: '100%',
            maxWidth: '320px',
            fontFamily: T.fontSans,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }}
        >
          <span>Get Started</span>
          <div style={{ display: 'flex', gap: '4px' }}>
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
             <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
          </div>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. HomeScreen (/home)
// ─────────────────────────────────────────────
export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column', paddingBottom: '100px' }}>
      
      {/* Premium Header */}
      <div style={{ padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg, #fff 0%, #F2F2F7 100%)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: '26px', fontWeight: 500, color: '#0F0F12', margin: '0 0 4px 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Khelo India <span style={{ fontSize: '20px' }}>🇮🇳</span>
          </h1>
          <p style={{ fontFamily: T.fontSans, fontSize: '13px', color: '#6B6B7B', margin: 0 }}>Welcome back, Arjun 👋</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', fontSize: '22px', color: '#0F0F12', cursor: 'pointer' }}>
            🔔
            <div style={{ position: 'absolute', top: '2px', right: '0px', width: '10px', height: '10px', background: '#DC2626', borderRadius: '50%', border: '2px solid #F2F2F7' }} />
          </div>
          <div onClick={() => navigate('/profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: T.fontSans, fontWeight: 600, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)' }}>
            AR
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 24px' }}>
        
        {/* Dynamic Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 60%, #C2410C 100%)', borderRadius: '24px', height: '180px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.2)' }}>
          <div style={{ position: 'absolute', top: -30, left: -30, right: -30, bottom: -30, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, width: '65%' }}>
            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '4px 10px', borderRadius: '9999px', fontFamily: T.fontSans, fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Explore</span>
            <h2 style={{ fontFamily: T.fontSerif, fontSize: '26px', color: '#fff', margin: '0 0 8px 0', lineHeight: 1.1 }}>India's Sports Network</h2>
            <p style={{ fontFamily: T.fontSans, fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>400+ Facilities · 12+ Sports</p>
          </div>
          <img src="/img/mascot.png" alt="Mascot" style={{ position: 'absolute', right: '0px', bottom: '-10px', width: '130px', objectFit: 'contain', zIndex: 1 }} />
        </div>

        {/* Quick Access */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: T.fontSans, fontSize: '16px', fontWeight: 600, color: '#0F0F12', margin: 0 }}>Quick Access</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <QuickIconCard icon="🧭" label="Explore" onClick={() => navigate('/explore')} />
            <QuickIconCard icon="📚" label="Learn" onClick={() => navigate('/learn')} />
            <QuickIconCard icon="📍" label="Play" onClick={() => navigate('/play')} />
            <QuickIconCard icon="💪" label="Fit Test" onClick={() => navigate('/getfit')} />
          </div>
        </div>

        {/* Science Behind Sport Highlight */}
        <div>
          <h3 style={{ fontFamily: T.fontSans, fontSize: '16px', fontWeight: 600, color: '#0F0F12', margin: '0 0 16px 0' }}>Science Behind Sport</h3>
          <div 
            onClick={() => navigate('/learn/football/science/projectile-motion')}
            style={{ background: '#FFF7ED', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #FFEDD5', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.05)' }}
          >
            <div style={{ flex: 1, paddingRight: '16px' }}>
              <span style={{ color: '#EA580C', fontFamily: T.fontSans, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Physics</span>
              <h3 style={{ fontFamily: T.fontSerif, fontSize: '20px', color: '#9A3412', margin: '6px 0 8px 0', lineHeight: 1.2 }}>Projectile Motion in Football</h3>
              <p style={{ fontFamily: T.fontSans, fontSize: '13px', color: '#C2410C', margin: '0 0 16px 0' }}>How physics shapes the perfect kick</p>
              <span style={{ background: '#FFF', color: '#EA580C', padding: '8px 16px', borderRadius: '9999px', fontFamily: T.fontSans, fontSize: '13px', fontWeight: 600, display: 'inline-block' }}>Start Module →</span>
            </div>
            <div style={{ width: '90px', height: '90px', flexShrink: 0, position: 'relative' }}>
               <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #FED7AA 0%, transparent 70%)', transform: 'scale(1.5)' }} />
               <img src="/img/ball-football.png" alt="Football" style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.15))' }} onError={(e) => { e.target.style.display='none'; }}/>
            </div>
          </div>
        </div>

        {/* Latest News */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: T.fontSans, fontSize: '16px', fontWeight: 600, color: '#0F0F12', margin: 0 }}>Latest News</h3>
            <span style={{ fontFamily: T.fontSans, fontSize: '13px', color: '#4338CA', fontWeight: 600 }}>See All →</span>
          </div>
          <div style={{ position: 'relative', height: '180px', borderRadius: '24px', overflow: 'hidden', background: '#0F0F12', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
             {/* Using a solid color fallback with gradient if image doesn't load */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }} />
            <img src="/img/news-t20.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, position: 'absolute', inset: 0 }} alt="News" />
            
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', borderRadius: '9999px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 2 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', boxShadow: '0 0 0 2px rgba(22, 163, 74, 0.2)' }}></div>
              <span style={{ fontFamily: T.fontSans, fontSize: '11px', fontWeight: 700, color: '#16A34A', letterSpacing: '0.05em' }}>LIVE</span>
            </div>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2 }}>
               <span style={{ fontFamily: T.fontSans, fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px', display: 'block' }}>Cricket · 2h ago</span>
               <h3 style={{ fontFamily: T.fontSerif, fontSize: '18px', color: '#fff', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.3 }}>India wins T20 series against Australia in a thriller</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function QuickIconCard({ icon, label, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <div style={{ width: '100%', aspectRatio: '1/1', background: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #E5E5EA', transition: 'transform 0.15s ease' }}>
        {icon}
      </div>
      <span style={{ fontFamily: T.fontSans, fontSize: '13px', fontWeight: 500, color: '#0F0F12' }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. ExploreScreen (/explore)
// ─────────────────────────────────────────────
export function ExploreScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div style={{ padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg, #fff 0%, #F2F2F7 100%)', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontFamily: T.fontSerif, fontSize: '26px', fontWeight: 500, color: '#0F0F12', margin: 0, letterSpacing: '-0.02em' }}>Explore</h1>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
           <span style={{ fontSize: '18px' }}>🔍</span>
        </div>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>⌕</span>
          <input type="text" placeholder="Search sports, athletes..." style={{ width: '100%', height: '52px', borderRadius: '9999px', border: '1px solid #D1D1D8', padding: '0 16px 0 44px', fontFamily: T.fontSans, fontSize: '15px', color: '#0F0F12', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', outline: 'none', transition: 'border-color 0.2s' }} />
        </div>

        {/* Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <CategoryCard title="Para Athletes" sub="111 athletes" icon="♿" bg="linear-gradient(135deg, #6366F1, #4338CA)" onClick={() => navigate('/explore/para-athletes')} />
          <CategoryCard title="Indigenous Sports" sub="12 sports" icon="🪘" bg="linear-gradient(135deg, #F97316, #EA580C)" onClick={() => navigate('/explore/indigenous-sports')} />
          <CategoryCard title="Challenges" sub="Join & compete" icon="🏆" bg="linear-gradient(135deg, #10B981, #059669)" onClick={() => navigate('/challenges')} />
          <CategoryCard title="Facility Finder" sub="400+ venues" icon="📍" bg="linear-gradient(135deg, #0EA5E9, #0284C7)" onClick={() => navigate('/play')} />
        </div>

        {/* Featured Sports */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: T.fontSans, fontSize: '16px', fontWeight: 600, color: '#0F0F12', margin: 0 }}>Featured Sports</h3>
            <span style={{ fontFamily: T.fontSans, fontSize: '13px', color: '#F97316', fontWeight: 600 }}>View All →</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px', margin: '0 -24px', padding: '0 24px 12px' }}>
            <FeaturedSport img="/img/sport-cricket.png" label="Cricket" onClick={() => navigate('/learn/cricket')} />
            <FeaturedSport img="/img/sport-football-big.png" label="Football" onClick={() => navigate('/learn/football')} />
            <FeaturedSport img="/img/sport-kabaddi.png" label="Kabaddi" onClick={() => navigate('/learn/kabaddi')} />
            <FeaturedSport img="/img/sport-mallakhamb.png" label="Mallakhamb" onClick={() => navigate('/learn/mallakhamb')} />
          </div>
        </div>

      </div>
    </div>
  );
}

function CategoryCard({ title, sub, icon, bg, onClick }) {
  return (
    <div onClick={onClick} style={{ height: '150px', background: bg, borderRadius: '24px', padding: '20px', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
      {/* Decorative background element overlay */}
      <div style={{ position: 'absolute', top: -10, right: -10, bottom: -10, left: -10, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ fontSize: '36px', marginBottom: 'auto', zIndex: 1 }}>{icon}</div>
      <div style={{ zIndex: 1 }}>
        <h3 style={{ fontFamily: T.fontSans, fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0', letterSpacing: '0.01em' }}>{title}</h3>
        <p style={{ fontFamily: T.fontSans, fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{sub}</p>
      </div>
    </div>
  );
}

function FeaturedSport({ img, label, onClick }) {
  return (
    <div onClick={onClick} style={{ width: '90px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <div style={{ width: '90px', height: '90px', background: '#fff', borderRadius: '24px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #E5E5EA' }}>
        <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; }}/>
      </div>
      <span style={{ fontFamily: T.fontSans, fontSize: '12px', fontWeight: 600, color: '#0F0F12', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. ParaAthletesScreen (/explore/para-athletes)
// ─────────────────────────────────────────────
export function ParaAthletesScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: '80px' }}>
      
      {/* Hero */}
      <div style={{ background: '#0F0F12', height: '200px', padding: '40px 20px 24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', marginBottom: 'auto' }}>←</button>
        <div>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: '28px', color: '#fff', margin: '0 0 4px 0' }}>Para Athletes</h1>
          <p style={{ fontFamily: T.fontSans, fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>India's champions</p>
        </div>
      </div>

      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Champion Carousel */}
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -16px', padding: '0 16px 8px' }}>
          <ChampionCard name="Avani Lekhara" sport="Shooting 🥇" bg="#4F46E5" />
          <ChampionCard name="Sumit Antil" sport="Athletics 🥇" bg="#EA580C" />
          <ChampionCard name="Pramod Bhagat" sport="Badminton 🥇" bg="#059669" />
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', background: '#fff', borderRadius: '18px', padding: '16px' }}>
          {[
            ['401', 'Athletes'],
            ['111', 'Gold Medals'],
            ['18', 'Sports'],
            ['236', 'Events']
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: T.fontSans, fontSize: '16px', fontWeight: 700, color: '#0F0F12' }}>{val}</div>
              <div style={{ fontFamily: T.fontSans, fontSize: '10px', color: '#6B6B7B', marginTop: '2px', lineHeight: 1.1 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', margin: '0 -16px', padding: '0 16px 4px' }}>
          <span style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '9999px', background: '#FFF7ED', color: '#F97316', border: '1px solid #F97316', fontFamily: T.fontSans, fontSize: '13px', fontWeight: 600 }}>Archery</span>
          {['Swimming', 'Athletics', 'Kabaddi'].map(f => (
            <span key={f} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '9999px', background: '#fff', color: '#6B6B7B', border: '1px solid #E5E5EA', fontFamily: T.fontSans, fontSize: '13px', fontWeight: 500 }}>{f}</span>
          ))}
        </div>

        {/* Upcoming Events */}
        <div>
          <SectionLabel style={{ marginBottom: '12px' }}>Upcoming Events</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <EventCard title="National Para Athletics Championship" date="May 22" />
            <EventCard title="Para Table Tennis Championship" date="May 27" />
          </div>
        </div>

        {/* TOPS Scheme */}
        <div style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: '20px', padding: '24px', color: '#fff' }}>
          <h3 style={{ fontFamily: T.fontSerif, fontSize: '20px', margin: '0 0 8px 0' }}>TOPS Scheme</h3>
          <p style={{ fontFamily: T.fontSans, fontSize: '14px', margin: '0 0 16px 0', opacity: 0.9, lineHeight: 1.5 }}>
            Target Olympic Podium Scheme — support for elite para athletes to reach the top.
          </p>
          <span style={{ fontFamily: T.fontSans, fontSize: '13px', fontWeight: 600 }}>Learn More →</span>
        </div>

      </div>
    </div>
  );
}

function ChampionCard({ name, sport, bg }) {
  return (
    <div style={{ width: '160px', flexShrink: 0, background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ height: '180px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '40px', opacity: 0.5 }}>📸</span>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontFamily: T.fontSans, fontSize: '15px', fontWeight: 700, color: '#0F0F12', margin: '0 0 4px 0' }}>{name}</h3>
        <p style={{ fontFamily: T.fontSans, fontSize: '13px', color: '#6B6B7B', margin: 0 }}>{sport}</p>
      </div>
    </div>
  );
}

function EventCard({ title, date }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <div style={{ background: '#FFF7ED', color: '#EA580C', padding: '8px 12px', borderRadius: '12px', textAlign: 'center', minWidth: '60px' }}>
        <div style={{ fontFamily: T.fontSans, fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{date.split(' ')[0]}</div>
        <div style={{ fontFamily: T.fontSerif, fontSize: '18px', fontWeight: 600 }}>{date.split(' ')[1]}</div>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontFamily: T.fontSans, fontSize: '14px', fontWeight: 600, color: '#0F0F12', margin: '0 0 8px 0', lineHeight: 1.3 }}>{title}</h4>
        <span style={{ fontFamily: T.fontSans, fontSize: '12px', color: '#F97316', fontWeight: 600 }}>Register →</span>
      </div>
    </div>
  );
}

// ─── Figma Asset URLs ───
const IMG_MALLAKHAMB_BG  = "https://www.figma.com/api/mcp/asset/05246c0c-246a-4d10-97e6-df794af15177";
const IMG_MALLAKHAMB     = "https://www.figma.com/api/mcp/asset/9a7eaebc-e013-48fe-a030-e5e6749e3d90";
const IMG_KHOKHO         = "https://www.figma.com/api/mcp/asset/fd1438a9-8eb2-426a-99f4-0a2f0a7d888b";
const IMG_KABADDI        = "https://www.figma.com/api/mcp/asset/e3f24c5d-0c4f-4cdf-8b47-c7a5733a2827";
const IMG_GILLI_DANDA    = "https://www.figma.com/api/mcp/asset/21d2c917-75b7-4d72-a39f-77c08bd89f71";
const IMG_KUSHTI         = "https://www.figma.com/api/mcp/asset/18b92a3e-6849-49b4-8cf7-24168f29a9ae";

// ─────────────────────────────────────────────
// 6. IndigenousSportsScreen (/explore/indigenous-sports)
// ─────────────────────────────────────────────
export function IndigenousSportsScreen() {
  const navigate = useNavigate();

  const sportGrid = [
    { name: 'Kho-Kho',     hindi: 'खो-खो',      img: IMG_KHOKHO,      contents: '03' },
    { name: 'Gilli Danda', hindi: 'गिल्ली-डंडा', img: IMG_GILLI_DANDA, contents: '04' },
    { name: 'Kabaddi',     hindi: 'कबड्डी',      img: IMG_KABADDI,     contents: '05' },
    { name: 'Kushti',      hindi: 'कुश्ती',      img: IMG_KUSHTI,      contents: '03' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', fontFamily: 'Inter, sans-serif', paddingBottom: 100 }}>

      {/* ── Orange radial glow header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 200, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
          radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          #F2F2F7
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '56px 20px 0' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 9999, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: '#6B6B7B' }}
          >
            ←
          </button>
          <h1 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 22, color: '#0F0F12', margin: 0 }}>
            Indigenous Sports
          </h1>
        </div>

        {/* "Sports born from this very soil" card */}
        <div style={{ background: IMG_MALLAKHAMB_BG ? undefined : 'linear-gradient(135deg,#F97316,#EA580C)', borderRadius: 16, overflow: 'hidden', marginBottom: 16, position: 'relative', minHeight: 100 }}>
          <img src={IMG_MALLAKHAMB_BG} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '16px 20px' }}>
            <h2 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 16, color: '#0F0F12', margin: '0 0 10px', maxWidth: '55%', lineHeight: 1.3 }}>
              Sports born from this very soil
            </h2>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['12','Sports'],['36','Modules'],['6','Subjects']].map(([v,l]) => (
                <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 16, color: '#0F0F12', lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.6)', marginTop: 2 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured: Mallakhamb */}
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginBottom: 8, fontWeight: 500 }}>Featured sport</p>
        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16, position: 'relative', height: 90 }}>
          <img src={IMG_MALLAKHAMB} alt="Mallakhamb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; }} />
          {/* overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', left: 16, bottom: 10, zIndex: 1 }}>
            <p style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', margin: 0 }}>Mallakhamb</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', margin: '2px 0 0' }}>मल्लखंभ · pole gymnastics</p>
          </div>
          <button
            style={{ position: 'absolute', right: 12, bottom: 12, background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
          >
            Explore
          </button>
        </div>

        {/* Other Indigenous Sports */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 500, margin: 0 }}>Other indigenous Sports</p>
          <span style={{ fontSize: 10, color: '#F97316', fontWeight: 600 }}>Explore All</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {sportGrid.map((s) => (
            <div key={s.name} style={{ borderRadius: 10, overflow: 'hidden', background: '#61C8FF', position: 'relative' }}>
              <div style={{ height: 75, overflow: 'hidden' }}>
                <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; }} />
              </div>
              <div style={{ background: '#fff', padding: '6px 8px 8px', position: 'relative' }}>
                <p style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 11, color: '#0F0F12', margin: 0 }}>{s.name}</p>
                <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', margin: '1px 0 0' }}>{s.hindi}</p>
                <span style={{ position: 'absolute', right: 8, top: 6, fontSize: 9, color: 'rgba(0,0,0,0.6)' }}>
                  {s.contents}<br /><span style={{ fontSize: 8, color: 'rgba(0,0,0,0.4)' }}>Contents</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. ProfileScreen (/profile)
// ─────────────────────────────────────────────

function FigmaBadge({ title, earned, color, icon }) {
  // Star/snowflake badge shape matching Figma
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 52, height: 52 }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26 2 L30.8 10.4 L40.4 8 L39.2 18 L48 22.5 L43.2 30.9 L48 39.3 L39.2 43.8 L40.4 53.8 L30.8 51.4 L26 59.8 L21.2 51.4 L11.6 53.8 L12.8 43.8 L4 39.3 L8.8 30.9 L4 22.5 L12.8 18 L11.6 8 L21.2 10.4 Z"
            fill={earned ? color : '#E5E7EB'}
            opacity={earned ? 1 : 0.6}
            transform="scale(0.82) translate(3, -4)"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: earned ? 18 : 14 }}>
          {earned ? icon : '🔒'}
        </div>
      </div>
      <span style={{ fontSize: 9, fontWeight: 600, color: earned ? '#0F0F12' : '#9090A0', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>
        {title}
      </span>
    </div>
  );
}

export function ProfileScreen() {
  const navigate = useNavigate();
  const [savedTab, setSavedTab] = useState('Sports');

  const badges = [
    { title: 'FIRST TEST',       earned: true,  color: '#F97316', icon: '⭐' },
    { title: 'SPRINT STAR',      earned: true,  color: '#818CF8', icon: '⚡' },
    { title: '3-SPORT EXPLORER', earned: true,  color: '#A855F7', icon: '🌟' },
    { title: 'LOCAL CHAMPION',   earned: false, color: '#E5E7EB', icon: '🏆' },
    { title: 'TEAM PLAYER',      earned: false, color: '#E5E7EB', icon: '🤝' },
    { title: 'IRON WILL',        earned: false, color: '#E5E7EB', icon: '💪' },
  ];

  const savedSports = ['Badminton', 'Athletics', 'Kho-Kho'];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', fontFamily: 'Inter, sans-serif', paddingBottom: 100 }}>

      {/* ── Orange radial glow header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 180, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
          radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          #F2F2F7
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '52px 20px 0' }}>

        {/* Page Title */}
        <h1 style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, fontSize: 22, color: '#0F0F12', margin: '0 0 16px' }}>My Space</h1>

        {/* Profile Card */}
        <div style={{ background: '#fff', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', marginBottom: 12, border: '0.5px solid rgba(0,0,0,0.06)' }}>
          {/* Avatar */}
          <div style={{ width: 42, height: 42, borderRadius: 9999, background: 'linear-gradient(160deg, #C7D2FE 0%, #818CF8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>
            AR
          </div>
          {/* Info */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#0F0F12', margin: '0 0 1px' }}>Arjun Rao</p>
            <p style={{ fontSize: 10, color: '#6B6B7B', margin: '0 0 3px' }}>18 · Pune, MH · Badminton</p>
            <span style={{ display: 'inline-block', background: '#EEF2FF', border: '0.5px solid #C7D2FE', borderRadius: 9999, padding: '2px 10px', fontSize: 10, color: '#4338CA', fontWeight: 500 }}>Intermediate</span>
          </div>
          <button style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 11, color: '#4338CA', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Edit profile →
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[['7','BADGES'],['12','SPORTS'],['3','TESTS']].map(([v, l], i) => (
            <div key={l} style={{ background: '#fff', border: '0.5px solid #C7D2FE', borderRadius: 14, padding: '10px 6px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, color: '#0F0F12', margin: '0 0 2px', fontWeight: 400 }}>{v}</p>
              <p style={{ fontSize: 8.5, fontWeight: 500, color: '#9090A0', letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Training Streak row */}
        <div
          onClick={() => navigate('/myspace/streak')}
          style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}
        >
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#0F0F12', margin: '0 0 2px' }}>Training streak</p>
            <p style={{ fontSize: 10, color: '#9090A0', margin: 0 }}>
              <span style={{ fontWeight: 500, color: '#0F0F12' }}>4 day</span> current streak · 12 day best
            </p>
          </div>
          <span style={{ fontSize: 11, color: '#4338CA' }}>View →</span>
        </div>

        {/* Badges section */}
        <p style={{ fontSize: 9, fontWeight: 500, color: '#0F0F12', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>BADGES</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {badges.map((b, i) => (
            <FigmaBadge key={i} title={b.title} earned={b.earned} color={b.color} icon={b.icon} />
          ))}
        </div>

        {/* Saved section */}
        <p style={{ fontSize: 9, fontWeight: 500, color: '#0F0F12', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 10px' }}>SAVED</p>

        {/* Toggle pill */}
        <div style={{ background: '#fff', border: '0.5px solid #D1D1D8', borderRadius: 9999, padding: 3, display: 'flex', marginBottom: 12 }}>
          {['Sports', 'Facilities'].map(tab => (
            <button
              key={tab}
              onClick={() => setSavedTab(tab)}
              style={{
                flex: 1, padding: '7px 0', borderRadius: 9999, border: 'none',
                background: savedTab === tab ? '#0F0F12' : 'transparent',
                color: savedTab === tab ? '#fff' : '#6B6B7B',
                fontSize: 11, fontWeight: savedTab === tab ? 600 : 400,
                fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Saved sports list */}
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
          {savedSports.map((sport, i) => (
            <div
              key={sport}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', borderBottom: i < savedSports.length - 1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none' }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#0F0F12' }}>{sport}</span>
              <span style={{ fontSize: 11, color: '#4338CA' }}>View →</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

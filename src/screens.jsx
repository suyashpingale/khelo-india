/**
 * Khelo India — Screen Components
 * Design Language: Sarvam.ai (light, serif, orange-lavender gradient)
 *
 * Drop these into your /src/screens/ or /src/pages/ folder.
 * Each screen is a self-contained React functional component.
 * Fonts: Add to your index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
export const T = {
  // Colors
  bgPage:       '#F2F2F7',
  bgCard:       '#FFFFFF',
  textPrimary:  '#0F0F12',
  textSecond:   '#6B6B7B',
  textTertiary: '#9090A0',
  borderLight:  'rgba(0,0,0,0.06)',
  borderMed:    '#D1D1D8',
  accentIndigo: '#E85D24',
  accentGreen:  '#16A34A',
  pillBg:       '#FEF0E7',
  pillBorder:   '#F5C4AA',
  pillText:     '#E85D24',

  // Illustration gradients
  illusBlue:   'linear-gradient(160deg, #F5C4AA 0%, #E85D24 100%)',
  illusOrange: 'linear-gradient(135deg, #FED7AA 0%, #F97316 60%, #EA580C 100%)',
  illusGreen:  'linear-gradient(135deg, #BBF7D0 0%, #4ADE80 50%, #16A34A 100%)',
  illusViolet: 'linear-gradient(135deg, #E9D5FF 0%, #A855F7 60%, #7E22CE 100%)',
  illusRed:    'linear-gradient(135deg, #FECACA 0%, #F87171 50%, #DC2626 100%)',

  // Hero gradient (applied to screen top)
  heroGradient: `
    radial-gradient(ellipse 60% 55% at 50% -5%, #F97316 0%, #FB923C 25%, transparent 65%),
    radial-gradient(ellipse 45% 55% at -5% 50%, #F5C4AA 0%, transparent 60%),
    radial-gradient(ellipse 45% 55% at 105% 50%, #F5C4AA 0%, transparent 60%)
  `,

  // Typography
  fontSerif: "'Lora', Georgia, serif",
  fontSans:  "'Inter', system-ui, sans-serif",
};

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────

/** The orange-lavender hero gradient strip */
export const HeroStrip = ({ height = 200, children, style = {} }) => (
  <div style={{
    position: 'relative',
    height,
    background: `${T.heroGradient}, ${T.bgPage}`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
    ...style,
  }}>
    {children}
  </div>
);

/** Ornamental scroll SVG motif (Type A) */
export const ScrollMotif = ({ size = 90, color = '#0F0F12', opacity = 0.85 }) => (
  <svg width={size} height={size * 0.44} viewBox="0 0 160 70" fill="none" style={{ opacity }}>
    {/* Left curl */}
    <path d="M80 35 Q68 14 54 20 Q42 26 45 38 Q48 50 60 44 Q70 38 67 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    {/* Right curl */}
    <path d="M80 35 Q92 14 106 20 Q118 26 115 38 Q112 50 100 44 Q90 38 93 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    {/* Left line */}
    <line x1="22" y1="35" x2="52" y2="35" stroke={color} strokeWidth="0.9"/>
    {/* Right line */}
    <line x1="108" y1="35" x2="138" y2="35" stroke={color} strokeWidth="0.9"/>
    {/* Center dot */}
    <circle cx="80" cy="35" r="2.5" fill={color}/>
    {/* Small decorative dots on lines */}
    <circle cx="36" cy="35" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="124" cy="35" r="1.5" fill={color} opacity="0.5"/>
  </svg>
);

/** Dome/temple SVG illustration (Type B) — for gradient cards */
export const DomeIllustration = ({ color = 'rgba(255,255,255,0.22)' }) => (
  <svg viewBox="0 0 300 160" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    {/* Three domes */}
    <ellipse cx="60"  cy="185" rx="80"  ry="85" fill={color}/>
    <ellipse cx="150" cy="190" rx="100" ry="100" fill={color} opacity="0.85"/>
    <ellipse cx="245" cy="185" rx="75"  ry="80" fill={color} opacity="0.9"/>
    {/* Center spire */}
    <path d="M150 88 L154 64 L150 56 L146 64 Z" fill="rgba(255,255,255,0.55)"/>
    {/* Mandala rings */}
    <circle cx="150" cy="62" r="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
    <circle cx="150" cy="62" r="13" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
    <circle cx="150" cy="62" r="7"  fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
    <circle cx="150" cy="62" r="2.5" fill="rgba(255,255,255,0.55)"/>
    {/* Radial spokes */}
    {[0,45,90,135].map(a => {
      const rad = a * Math.PI / 180;
      return <line key={a} x1={150 + Math.cos(rad)*7} y1={62 + Math.sin(rad)*7}
        x2={150 + Math.cos(rad)*20} y2={62 + Math.sin(rad)*20}
        stroke="rgba(255,255,255,0.3)" strokeWidth="0.6"/>;
    })}
  </svg>
);

/** Lotus blob SVG (Type C) — for badges and sport category markers */
export const LotusBlob = ({ gradient, size = 72 }) => (
  <div style={{ width: size, height: size, background: gradient, borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
      <circle cx="20" cy="20" r="8"  stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
      <circle cx="20" cy="20" r="3"  fill="rgba(255,255,255,0.6)"/>
    </svg>
  </div>
);

/** Dark pill primary button */
export const BtnPrimary = ({ children, onClick, disabled = false, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? '#D1D1D8' : '#0F0F12',
    color: disabled ? '#9090A0' : '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    padding: '14px 28px',
    width: '100%',
    fontFamily: T.fontSans,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'opacity .15s',
    ...style,
  }}>{children}</button>
);

/** Secondary outline pill button */
export const BtnSecondary = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    background: '#FFFFFF',
    color: '#0F0F12',
    border: `1px solid ${T.borderMed}`,
    borderRadius: 12,
    padding: '14px 28px',
    width: '100%',
    fontFamily: T.fontSans,
    fontSize: 16,
    fontWeight: 400,
    cursor: 'pointer',
    ...style,
  }}>{children}</button>
);

/** Badge/label pill */
export const BadgePill = ({ children }) => (
  <span style={{
    background: T.pillBg,
    color: T.pillText,
    border: `1px solid ${T.pillBorder}`,
    borderRadius: 9999,
    padding: '5px 14px',
    fontFamily: T.fontSans,
    fontSize: 12,
    fontWeight: 500,
  }}>{children}</span>
);

export const SectionLabel = ({ children, style = {} }) => (
  <p style={{ fontFamily: T.fontSans, fontSize: 10, fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#888888', ...style }}>{children}</p>
);

/** White card */
export const Card = ({ children, style = {}, onClick = undefined, ...props }) => (
  <div onClick={onClick} style={{ background: T.bgCard, borderRadius: 18, border: `0.5px solid ${T.borderLight}`, padding: 18, ...style }} {...props}>{children}</div>
);

/** Progress bar — indigo gradient */
export const ProgressBar = ({ value = 0 }) => (
  <div style={{ height: 4, background: '#E5E5EA', borderRadius: 2, overflow: 'hidden' }}>
    <div style={{ height: 4, width: `${value}%`, background: 'linear-gradient(90deg, #818CF8, #6366F1)', borderRadius: 2, transition: 'width .3s ease' }}/>
  </div>
);

// ─────────────────────────────────────────────
// SCREEN 1: Language Select
// ─────────────────────────────────────────────
export function LanguageSelectScreen({ onContinue }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top section */}
      <div style={{ padding: '60px 24px 20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontFamily: T.fontSans, fontSize: 22, fontWeight: 400, margin: 0, color: '#111' }}>
          Welcome to<br/>
          <span style={{ color: '#E85D24' }}>Khelo India</span>
        </h1>
        <p style={{ fontFamily: T.fontSans, fontSize: 12, color: '#666', marginTop: 12, marginBottom: 32 }}>
          Let's set up your profile in 3 steps
        </p>

        {/* Step progress bar */}
        <div style={{ display: 'flex', gap: 6, width: '100%' }}>
          <div style={{ height: 3, flex: 1, background: '#E85D24', borderRadius: 2 }}/>
          <div style={{ height: 3, flex: 1, background: '#EEEEEE', borderRadius: 2 }}/>
          <div style={{ height: 3, flex: 1, background: '#EEEEEE', borderRadius: 2 }}/>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div style={{ padding: '0 24px 40px', flexShrink: 0 }}>
        <button onClick={onContinue} style={{
          background: '#E85D24',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 12,
          padding: '13px',
          width: '100%',
          fontFamily: T.fontSans,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 2: Profile Setup
// ─────────────────────────────────────────────
export function ProfileSetupScreen({ onContinue }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [selectedSports, setSelectedSports] = useState([]);
  const [skill, setSkill] = useState(null);

  const sports = ['Athletics','Football','Cricket','Kabaddi','Wrestling','Badminton','Hockey','Boxing','Volleyball','Kho-Kho','Mallakhamb','Archery','Swimming','Weightlifting','Cycling','Shooting'];
  const skills = ['Beginner','Intermediate','Competitive'];

  const toggleSport = s => setSelectedSports(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);
  const isValid = name.trim() && selectedSports.length > 0 && skill;

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={120} style={{ flexShrink: 0 }}>
        {/* Step dots */}
        <div style={{ position: 'absolute', top: 68, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===2 ? 24 : 8, background: i===2 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
        <SectionLabel style={{ color: 'rgba(15,15,18,0.6)' }}>02 / Profile</SectionLabel>
      </HeroStrip>

      <div style={{ flex: 1, padding: '20px 16px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h1 style={{ fontFamily: T.fontSerif, fontSize: 24, fontWeight: 400, color: T.textPrimary, letterSpacing: '-0.02em' }}>
          Tell us about yourself
        </h1>

        {/* Name */}
        <div>
          <SectionLabel style={{ marginBottom: 8 }}>Name</SectionLabel>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{ width: '100%', background: T.bgCard, border: `1px solid ${T.borderMed}`, borderRadius: 12, height: 50, padding: '0 16px', fontFamily: T.fontSans, fontSize: 15, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' }}/>
        </div>

        {/* Age stepper */}
        <div>
          <SectionLabel style={{ marginBottom: 8 }}>Age</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={()=>setAge(a=>Math.max(10,a-1))} style={{ width: 40, height: 40, borderRadius: 9999, border: `1px solid ${T.borderMed}`, background: T.bgCard, fontSize: 20, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
            <span style={{ fontFamily: T.fontSerif, fontSize: 28, fontWeight: 400, color: T.textPrimary, minWidth: 48, textAlign: 'center' }}>{age}</span>
            <button onClick={()=>setAge(a=>Math.min(35,a+1))} style={{ width: 40, height: 40, borderRadius: 9999, border: `1px solid ${T.borderMed}`, background: T.bgCard, fontSize: 20, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
          </div>
        </div>

        {/* Sport interests */}
        <div>
          <SectionLabel style={{ marginBottom: 8 }}>Sport interests</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sports.map(s => {
              const active = selectedSports.includes(s);
              return (
                <button key={s} onClick={()=>toggleSport(s)} style={{ background: active ? T.pillBg : T.bgCard, color: active ? T.accentIndigo : T.textPrimary, border: `${active?'1.5px':'1px'} solid ${active ? T.accentIndigo : T.borderMed}`, borderRadius: 10, padding: '8px 14px', fontFamily: T.fontSans, fontSize: 13, fontWeight: active?600:400, cursor: 'pointer', transition: 'all .15s' }}>{s}</button>
              );
            })}
          </div>
        </div>

        {/* Skill level */}
        <div style={{ paddingBottom: 24 }}>
          <SectionLabel style={{ marginBottom: 8 }}>Skill level</SectionLabel>
          <div style={{ display: 'flex', background: T.bgCard, border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: 3, gap: 2 }}>
            {skills.map(s => (
              <button key={s} onClick={()=>setSkill(s)} style={{ flex: 1, padding: '9px 0', borderRadius: 9999, border: 'none', background: skill===s ? '#0F0F12' : 'transparent', color: skill===s ? '#FFFFFF' : T.textSecond, fontFamily: T.fontSans, fontSize: 13, fontWeight: skill===s?600:400, cursor: 'pointer', transition: 'all .2s' }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 40px', flexShrink: 0 }}>
        <BtnPrimary disabled={!isValid} onClick={onContinue}>Continue →</BtnPrimary>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 3: Learn — Sports List
// ─────────────────────────────────────────────
export function LearnScreen({ onSelectSport }) {
  const [search, setSearch] = useState('');
  const explored = 6;

  const heritage = [
    { name: 'Kho-Kho',     tag: 'Tag game', gradient: T.illusOrange },
    { name: 'Mallakhamb',  tag: 'Pole gymnastics', gradient: T.illusRed },
    { name: 'Gilli-Danda', tag: 'Stick sport', gradient: T.illusGreen },
    { name: 'Kabaddi',     tag: 'Contact sport', gradient: T.illusViolet },
  ];

  const allSports = [
    { name: 'Athletics',    gradient: T.illusOrange, visited: true },
    { name: 'Football',     gradient: T.illusGreen,  visited: true },
    { name: 'Cricket',      gradient: T.illusBlue,   visited: false },
    { name: 'Wrestling',    gradient: T.illusRed,    visited: false },
    { name: 'Badminton',    gradient: T.illusViolet, visited: true },
    { name: 'Hockey',       gradient: T.illusGreen,  visited: false },
    { name: 'Boxing',       gradient: T.illusRed,    visited: false },
    { name: 'Swimming',     gradient: T.illusBlue,   visited: true },
    { name: 'Archery',      gradient: T.illusViolet, visited: false },
    { name: 'Weightlifting',gradient: T.illusOrange, visited: false },
    { name: 'Cycling',      gradient: T.illusBlue,   visited: true },
    { name: 'Shooting',     gradient: T.illusGreen,  visited: true },
  ].filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <HeroStrip height={160} style={{ flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 58, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ScrollMotif size={72}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 26, fontWeight: 400, color: T.textPrimary, letterSpacing: '-0.02em' }}>Learn</h1>
          <BadgePill>{explored} of 18 explored</BadgePill>
        </div>
      </HeroStrip>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.textTertiary }}>⌕</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sports..." style={{ width: '100%', background: T.bgCard, border: `1px solid ${T.borderMed}`, borderRadius: 9999, height: 48, padding: '0 16px 0 40px', fontFamily: T.fontSans, fontSize: 15, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' }}/>
        </div>

        {/* Progress */}
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, color: T.textPrimary }}>{explored} of 18 sports explored</span>
            <span style={{ fontFamily: T.fontSans, fontSize: 12, color: T.accentIndigo, fontWeight: 500 }}>{Math.round(explored/18*100)}%</span>
          </div>
          <ProgressBar value={explored/18*100}/>
        </Card>

        {/* Heritage shelf */}
        <div>
          <SectionLabel style={{ marginBottom: 10 }}>🇮🇳 Rooted in Bharat</SectionLabel>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {heritage.map(s => (
              <div key={s.name} onClick={() => onSelectSport?.(s.name)} style={{ flexShrink: 0, width: 140, background: T.bgCard, borderRadius: 14, border: `0.5px solid ${T.borderLight}`, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 3, background: s.gradient }}/>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.textSecond }}>{s.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All sports grid */}
        <div>
          <SectionLabel style={{ marginBottom: 10 }}>All sports</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {allSports.map(s => (
              <div key={s.name} onClick={() => onSelectSport?.(s.name)} style={{ background: T.bgCard, borderRadius: 16, border: `0.5px solid ${T.borderLight}`, overflow: 'hidden', cursor: 'pointer' }}>
                {/* Gradient media area */}
                <div style={{ height: 110, background: s.gradient, position: 'relative', overflow: 'hidden' }}>
                  <DomeIllustration color="rgba(255,255,255,0.2)"/>
                  {s.visited && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', borderRadius: 9999, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                  )}
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{s.name}</span>
                  <span style={{ fontFamily: T.fontSans, fontSize: 11, color: T.textTertiary }}>Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 4: Play — Facility List
// ─────────────────────────────────────────────
export function FacilityListScreen({ sport = 'Badminton', onSelectFacility }) {
  const [activeFilter, setActiveFilter] = useState('Nearest');
  const [saved, setSaved] = useState([]);
  const filters = ['Nearest','Open now','Indoor','Outdoor'];

  const facilities = [
    { id:1, name: 'Balewadi Sports Complex', sport, distance: '1.2 km', open: true,  address: 'Balewadi, Pune 411045', amenities: ['Coaching','Parking','Changing rooms'] },
    { id:2, name: 'Shree Shiv Chhatrapati', sport, distance: '2.4 km', open: true,  address: 'Mahalunge, Pune 411057', amenities: ['Changing rooms'] },
    { id:3, name: 'Municipal Sports Ground', sport, distance: '3.8 km', open: false, address: 'Kothrud, Pune 411038', amenities: ['Parking'] },
    { id:4, name: 'Deccan Gymkhana',          sport, distance: '4.1 km', open: true,  address: 'Deccan, Pune 411004', amenities: ['Coaching','Parking','Changing rooms','Canteen'] },
  ];

  const toggleSave = id => setSaved(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero */}
      <HeroStrip height={130} style={{ flexShrink: 0 }}>
        <div style={{ width: '100%', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>←</button>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 20, fontWeight: 400, color: T.textPrimary, letterSpacing: '-0.015em' }}>{sport} facilities near you</h1>
        </div>
      </HeroStrip>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, background: activeFilter===f ? T.pillBg : T.bgCard, color: activeFilter===f ? T.accentIndigo : T.textSecond, border: `${activeFilter===f?'1.5px':'1px'} solid ${activeFilter===f ? T.accentIndigo : T.borderMed}`, borderRadius: 9999, padding: '7px 14px', fontFamily: T.fontSans, fontSize: 12, fontWeight: activeFilter===f?600:400, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>{f}</button>
          ))}
        </div>

        {/* Facility cards */}
        {facilities.map(f => (
          <Card key={f.id} style={{ cursor: 'pointer', padding: '16px 18px' }} onClick={() => onSelectFacility?.(f)}>
            {/* Row 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, color: T.textPrimary, flex: 1, paddingRight: 12 }}>{f.name}</span>
              <button onClick={e=>{e.stopPropagation();toggleSave(f.id)}} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: saved.includes(f.id) ? T.accentIndigo : T.textTertiary, flexShrink: 0, padding: 0 }}>
                {saved.includes(f.id) ? '🔖' : '🔖'}
              </button>
            </div>

            {/* Row 2 — chips */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ background: T.pillBg, color: T.accentIndigo, border: `1px solid ${T.pillBorder}`, borderRadius: 4, padding: '2px 8px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{f.sport}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: T.fontSans, fontSize: 11, fontWeight: 600, color: f.open ? T.accentGreen : T.textTertiary, letterSpacing: '0.04em' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: f.open ? T.accentGreen : T.textTertiary, display: 'inline-block' }}/>
                {f.open ? 'OPEN' : 'CLOSED'}
              </span>
            </div>

            {/* Row 3 — address + distance */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 12, color: T.textSecond, flex: 1 }}>{f.address}</span>
              <span style={{ background: T.bgPage, border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: '3px 10px', fontFamily: T.fontSans, fontSize: 11, color: T.textSecond, flexShrink: 0, marginLeft: 8 }}>{f.distance}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 5: Get Fit — Intro
// ─────────────────────────────────────────────
export function GetFitIntroScreen({ onStandard, onPara }) {
  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column' }}>
      {/* Full-height hero illustration */}
      <div style={{ position: 'relative', height: 320, background: T.illusOrange, overflow: 'hidden', flexShrink: 0 }}>
        <DomeIllustration color="rgba(255,255,255,0.18)"/>
        {/* Mandala centered */}
        <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {[36,28,20,12,5].map(r => <circle key={r} cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>)}
            {[0,45,90,135].map(a => {
              const rad = a*Math.PI/180;
              return <line key={a} x1={40+Math.cos(rad)*5} y1={40+Math.sin(rad)*5} x2={40+Math.cos(rad)*36} y2={40+Math.sin(rad)*36} stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>;
            })}
            <circle cx="40" cy="40" r="3.5" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </div>
        {/* Badge */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ background: 'rgba(255,255,255,0.92)', color: T.accentIndigo, border: `1px solid ${T.pillBorder}`, borderRadius: 9999, padding: '5px 16px', fontFamily: T.fontSans, fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>FITNESS ASSESSMENT</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 30, fontWeight: 400, color: T.textPrimary, letterSpacing: '-0.025em', marginBottom: 10, lineHeight: 1.2 }}>
            Discover your sport
          </h1>
          <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textSecond, lineHeight: 1.7 }}>
            8 quick fitness tests. About 15 minutes. We match you to the sport your body is built for.
          </p>
        </div>

        {/* Privacy callout */}
        <div style={{ background: T.bgCard, borderRadius: 14, border: `0.5px solid ${T.borderLight}`, borderLeft: `3px solid ${T.accentIndigo}`, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>
          <div>
            <p style={{ fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, color: T.textPrimary, marginBottom: 2 }}>Stored locally only</p>
            <p style={{ fontFamily: T.fontSans, fontSize: 12, color: T.textSecond }}>Your fitness data is used only for sport matching. DPDPA 2023 compliant.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BtnPrimary onClick={onStandard}>Standard tests →</BtnPrimary>
          <BtnSecondary onClick={onPara}>♿  Para athlete tests →</BtnSecondary>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 6: Facility Detail
// ─────────────────────────────────────────────
export function FacilityDetailScreen({ facility, onBack, onDirections, onSave }) {
  const f = facility || {
    name: 'Balewadi Sports Complex',
    sport: 'Badminton',
    distance: '1.2 km',
    open: true,
    address: 'Mahalunge Rd, Balewadi, Pune 411045',
    timings: '6:00 AM – 10:00 PM, Mon–Sat',
    entry: 'Free',
    amenities: ['Coaching', 'Parking', 'Changing rooms', 'Canteen'],
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 220, background: T.illusBlue, overflow: 'hidden', flexShrink: 0 }}>
        <DomeIllustration color="rgba(255,255,255,0.2)"/>
        <button onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
        <div style={{ position: 'absolute', bottom: 20, left: 18 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 22, fontWeight: 400, color: '#fff', letterSpacing: '-0.015em', marginBottom: 6 }}>{f.name}</h1>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 9999, padding: '3px 10px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500 }}>{f.sport}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 9999, padding: '3px 10px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500 }}>{f.distance}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 9999, padding: '3px 10px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: f.open ? '#4ADE80' : '#ccc', display:'inline-block' }}/>{f.open ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Info rows */}
        {[
          { icon: '🕐', label: 'TIMINGS',  value: f.timings },
          { icon: '📍', label: 'ADDRESS',  value: f.address },
          { icon: '₹',  label: 'ENTRY',    value: f.entry   },
        ].map(r => (
          <Card key={r.label} style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
            <div>
              <SectionLabel style={{ marginBottom: 3 }}>{r.label}</SectionLabel>
              <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textPrimary }}>{r.value}</p>
            </div>
          </Card>
        ))}

        {/* Amenities */}
        <Card style={{ padding: '14px 16px' }}>
          <SectionLabel style={{ marginBottom: 10 }}>Amenities</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {f.amenities.map(a => (
              <span key={a} style={{ background: T.bgPage, border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: '5px 12px', fontFamily: T.fontSans, fontSize: 12, color: T.textSecond }}>{a}</span>
            ))}
          </div>
        </Card>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
          <BtnPrimary onClick={onDirections}>Get directions →</BtnPrimary>
          <BtnSecondary onClick={onSave}>Save facility</BtnSecondary>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 7: My Space
// ─────────────────────────────────────────────
export function MySpaceScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Sports');

  const badges = [
    { name: 'First test',     emoji: '🏃', earned: true,  gradient: T.illusOrange },
    { name: 'Sprint star',    emoji: '⚡', earned: true,  gradient: T.illusBlue },
    { name: '3-sport explorer',emoji: '🌟',earned: true,  gradient: T.illusViolet },
    { name: 'Local champion', emoji: '🏆', earned: false, gradient: T.illusGreen },
    { name: 'Team player',    emoji: '🤝', earned: false, gradient: T.illusRed },
    { name: 'Iron will',      emoji: '💪', earned: false, gradient: T.illusOrange },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <HeroStrip height={170} style={{ flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 58, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ScrollMotif size={72}/>
        </div>
        <h1 style={{ fontFamily: T.fontSerif, fontSize: 26, fontWeight: 400, color: T.textPrimary, letterSpacing: '-0.02em' }}>My Space</h1>
      </HeroStrip>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Profile card */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: T.illusBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, color: '#fff', flexShrink: 0 }}>AR</div>
              <div>
                <p style={{ fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, color: T.textPrimary }}>Arjun Rao</p>
                <p style={{ fontFamily: T.fontSans, fontSize: 13, color: T.textSecond }}>18 · Pune, MH · Badminton</p>
              </div>
            </div>
            <BadgePill>Intermediate</BadgePill>
          </div>
          <p style={{ fontFamily: T.fontSans, fontSize: 12, color: T.accentIndigo, marginTop: 12, textAlign: 'right' }}>Edit profile →</p>
        </Card>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[['BADGES','7'],['SPORTS','12'],['TESTS','3']].map(([label, val]) => (
            <Card key={label} style={{ padding: '14px 16px', textAlign: 'center' }}>
              <SectionLabel style={{ marginBottom: 6 }}>{label}</SectionLabel>
              <span style={{ fontFamily: T.fontSerif, fontSize: 30, fontWeight: 400, color: T.textPrimary }}>{val}</span>
            </Card>
          ))}
        </div>

        {/* Streak link row */}
        <div
          onClick={() => navigate('/myspace/streak')}
          style={{ display:'flex', justifyContent:'space-between', padding:'14px 0', borderBottom:`0.5px solid rgba(0,0,0,0.06)`, cursor:'pointer' }}
        >
          <div>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:500, color:'#0F0F12' }}>Training streak</p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:'#9090A0', marginTop:2 }}>4 day current streak · 12 day best</p>
          </div>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:'#4338CA' }}>View →</span>
        </div>

        {/* Badges wall */}
        <div>
          <SectionLabel style={{ marginBottom: 12 }}>Badges</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {badges.map(b => (
              <div key={b.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {b.earned
                  ? <LotusBlob gradient={b.gradient} size={64}/>
                  : <div style={{ width: 64, height: 64, borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%', background: '#E5E5EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: T.textTertiary }}>🔒</div>
                }
                <span style={{ fontFamily: T.fontSans, fontSize: 10, fontWeight: 500, color: b.earned ? T.textPrimary : T.textTertiary, textAlign: 'center', letterSpacing: '0.03em' }}>{b.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved items */}
        <div>
          <SectionLabel style={{ marginBottom: 10 }}>Saved</SectionLabel>
          <div style={{ display: 'flex', background: T.bgCard, border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: 3, gap: 2, marginBottom: 12 }}>
            {['Sports','Facilities'].map(t => (
              <button key={t} onClick={()=>setActiveTab(t)} style={{ flex: 1, padding: '8px 0', borderRadius: 9999, border: 'none', background: activeTab===t ? '#0F0F12' : 'transparent', color: activeTab===t ? '#fff' : T.textSecond, fontFamily: T.fontSans, fontSize: 13, fontWeight: activeTab===t?600:400, cursor: 'pointer', transition: 'all .2s' }}>{t}</button>
            ))}
          </div>
          {activeTab === 'Sports' && ['Badminton','Athletics','Kho-Kho'].map(s => (
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: `0.5px solid ${T.borderLight}` }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, color: T.textPrimary }}>{s}</span>
              <span style={{ fontFamily: T.fontSans, fontSize: 12, color: T.accentIndigo }}>View →</span>
            </div>
          ))}
          {activeTab === 'Facilities' && [['Balewadi Sports Complex','1.2 km'],['Deccan Gymkhana','4.1 km']].map(([n,d]) => (
            <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: `0.5px solid ${T.borderLight}`, alignItems: 'center' }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, color: T.textPrimary }}>{n}</span>
              <span style={{ fontFamily: T.fontSans, fontSize: 12, color: T.textSecond }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

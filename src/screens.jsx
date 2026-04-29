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
  accentIndigo: '#4338CA',
  accentGreen:  '#16A34A',
  pillBg:       '#EEF2FF',
  pillBorder:   '#C7D2FE',
  pillText:     '#4338CA',

  // Illustration gradients
  illusBlue:   'linear-gradient(160deg, #C7D2FE 0%, #818CF8 100%)',
  illusOrange: 'linear-gradient(135deg, #FED7AA 0%, #F97316 60%, #EA580C 100%)',
  illusGreen:  'linear-gradient(135deg, #BBF7D0 0%, #4ADE80 50%, #16A34A 100%)',
  illusViolet: 'linear-gradient(135deg, #E9D5FF 0%, #A855F7 60%, #7E22CE 100%)',
  illusRed:    'linear-gradient(135deg, #FECACA 0%, #F87171 50%, #DC2626 100%)',

  // Hero gradient (applied to screen top)
  heroGradient: `
    radial-gradient(ellipse 60% 55% at 50% -5%, #F97316 0%, #FB923C 25%, transparent 65%),
    radial-gradient(ellipse 45% 55% at -5% 50%, #C7D2FE 0%, transparent 60%),
    radial-gradient(ellipse 45% 55% at 105% 50%, #C7D2FE 0%, transparent 60%)
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
    borderRadius: 9999,
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
    borderRadius: 9999,
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

/** Section label — uppercase small */
export const SectionLabel = ({ children, style = {} }) => (
  <p style={{ fontFamily: T.fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: T.textTertiary, ...style }}>{children}</p>
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
  const [selected, setSelected] = useState(null);
  const languages = ['Hindi','English','Tamil','Telugu','Kannada','Malayalam','Marathi','Bengali','Gujarati','Punjabi','Odia','Assamese','Urdu','Nepali','Manipuri','Bodo','Dogri','Santali'];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Header Area */}
      <div style={{ position: 'relative', height: 220, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', borderBottom: '1px solid #E5E5EA' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', transform: 'scale(1.5) translateY(-20%)' }} />
        
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {/* Main graphics */}
          <div style={{ width: 80, height: 80, background: '#F9FAFB', border: '1px solid #E5E5EA', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            🇮🇳
          </div>
          <span style={{ background: '#fff', color: '#0F0F12', border: '1px solid #D1D1D8', borderRadius: 9999, padding: '6px 16px', fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>KHELO INDIA</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 26, fontWeight: 500, color: '#0F0F12', letterSpacing: '-0.02em', margin: '0 0 8px 0', lineHeight: 1.2 }}>
            Khel bado. Bharat bado.
          </h1>
          <p style={{ fontFamily: T.fontSans, fontSize: 15, color: '#6B6B7B', lineHeight: 1.6, margin: 0 }}>
            Choose your language to begin.
          </p>
        </div>

        {/* Language grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {languages.map(lang => (
            <button key={lang} onClick={() => setSelected(lang)} style={{
              background: selected === lang ? '#0F0F12' : '#fff',
              color: selected === lang ? '#fff' : '#0F0F12',
              border: `1px solid ${selected === lang ? '#0F0F12' : '#D1D1D8'}`,
              borderRadius: 12,
              padding: '12px 8px',
              fontFamily: T.fontSans,
              fontSize: 14,
              fontWeight: selected === lang ? 600 : 500,
              cursor: 'pointer',
              transition: 'all .15s',
            }}>{lang}</button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 40px', flexShrink: 0 }}>
        <BtnPrimary disabled={!selected} onClick={() => onContinue?.(selected)}>
          Continue →
        </BtnPrimary>
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
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('62');
  const [selectedSports, setSelectedSports] = useState([]);
  const [skill, setSkill] = useState(null);

  const sports = ['Athletics','Football','Cricket','Kabaddi','Wrestling','Badminton','Hockey','Boxing','Volleyball','Kho-Kho','Mallakhamb','Archery','Swimming','Weightlifting','Cycling','Shooting'];
  const skills = ['Beginner','Intermediate','Competitive'];

  const toggleSport = s => setSelectedSports(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);
  const isValid = name.trim() && height && weight && selectedSports.length > 0 && skill;

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={120} style={{ flexShrink: 0 }}>
        {/* Step dots */}
        <div style={{ position: 'absolute', top: 68, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===2 ? 24 : 8, background: i===2 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
        <SectionLabel style={{ color: 'rgba(15,15,18,0.6)' }}>02 / Profile</SectionLabel>
      </HeroStrip>

      <div style={{ flex: 1, padding: '20px 24px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h1 style={{ fontFamily: T.fontSerif, fontSize: 26, fontWeight: 500, color: '#0F0F12', letterSpacing: '-0.01em', margin: 0 }}>
          Tell us about yourself
        </h1>

        {/* Name */}
        <div>
          <SectionLabel style={{ color: '#9090A0', marginBottom: 8 }}>NAME</SectionLabel>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{ width: '100%', background: '#fff', border: '1px solid #D1D1D8', borderRadius: 12, height: 50, padding: '0 16px', fontFamily: T.fontSans, fontSize: 15, color: '#0F0F12', outline: 'none', boxSizing: 'border-box' }}/>
        </div>

        {/* Age stepper */}
        <div>
          <SectionLabel style={{ color: '#9090A0', marginBottom: 8 }}>AGE</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={()=>setAge(a=>Math.max(10,a-1))} style={{ width: 44, height: 44, borderRadius: 9999, border: '1px solid #D1D1D8', background: '#fff', fontSize: 20, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: '#0F0F12' }}>−</button>
            <span style={{ fontFamily: T.fontSans, fontSize: 24, fontWeight: 600, color: '#0F0F12', minWidth: 48, textAlign: 'center' }}>{age}</span>
            <button onClick={()=>setAge(a=>Math.min(35,a+1))} style={{ width: 44, height: 44, borderRadius: 9999, border: '1px solid #D1D1D8', background: '#fff', fontSize: 20, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: '#0F0F12' }}>+</button>
          </div>
        </div>

        {/* Height and Weight Box */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <SectionLabel style={{ color: '#9090A0', marginBottom: 8 }}>HEIGHT</SectionLabel>
            <div style={{ position: 'relative' }}>
              <input value={height} onChange={e=>setHeight(e.target.value)} placeholder="0" type="number" style={{ width: '100%', background: '#fff', border: '1px solid #D1D1D8', borderRadius: 12, height: 50, padding: '0 40px 0 16px', fontFamily: T.fontSans, fontSize: 16, color: '#0F0F12', outline: 'none', boxSizing: 'border-box' }}/>
              <span style={{ position: 'absolute', right: 16, top: 16, fontFamily: T.fontSans, fontSize: 14, color: '#9090A0' }}>cm</span>
            </div>
          </div>
          <div>
            <SectionLabel style={{ color: '#9090A0', marginBottom: 8 }}>WEIGHT</SectionLabel>
            <div style={{ position: 'relative' }}>
              <input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="0" type="number" style={{ width: '100%', background: '#fff', border: '1px solid #D1D1D8', borderRadius: 12, height: 50, padding: '0 40px 0 16px', fontFamily: T.fontSans, fontSize: 16, color: '#0F0F12', outline: 'none', boxSizing: 'border-box' }}/>
              <span style={{ position: 'absolute', right: 16, top: 16, fontFamily: T.fontSans, fontSize: 14, color: '#9090A0' }}>Kg</span>
            </div>
          </div>
        </div>

        {/* Sport interests */}
        <div>
          <SectionLabel style={{ color: '#9090A0', marginBottom: 12 }}>SPORT INTERESTS</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {sports.map(s => {
              const active = selectedSports.includes(s);
              return (
                <button key={s} onClick={()=>toggleSport(s)} style={{ background: active ? '#0F0F12' : '#fff', color: active ? '#fff' : '#0F0F12', border: `1px solid ${active ? '#0F0F12' : '#D1D1D8'}`, borderRadius: 9999, padding: '10px 16px', fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all .15s' }}>{s}</button>
              );
            })}
          </div>
        </div>

        {/* Skill level */}
        <div style={{ paddingBottom: 24 }}>
          <SectionLabel style={{ color: '#9090A0', marginBottom: 12 }}>SKILL LEVEL</SectionLabel>
          <div style={{ display: 'flex', background: '#fff', border: `1px solid #D1D1D8`, borderRadius: 12, padding: 4 }}>
            {skills.map(s => (
              <button key={s} onClick={()=>setSkill(s)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: 'none', background: skill===s ? '#0F0F12' : 'transparent', color: skill===s ? '#FFFFFF' : '#6B6B7B', fontFamily: T.fontSans, fontSize: 14, fontWeight: skill===s?500:400, cursor: 'pointer', transition: 'all .2s' }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px 40px', flexShrink: 0, background: '#F2F2F7' }}>
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

export function FacilityListScreen({ sport = 'Badminton', onSelectFacility }) {
  const [activeFilter, setActiveFilter] = useState('Nearest');
  const [saved, setSaved] = useState([]);
  const filters = ['Nearest','Open now','Indoor','Outdoor'];

  const facilities = [
    { id:1, name: 'Balewadi Sports Complex', sport, distance: '1.2 km', open: true,  address: 'Mahalunge Rd, Balewadi, Pune', amenities: ['Coaching','Parking','Changing rooms'], rating: 4.3, reviews: 24, entry: 'Free entry' },
    { id:2, name: 'Shree Shiv Chhatrapati', sport, distance: '2.4 km', open: true,  address: 'Mahalunge, Pune 411057', amenities: ['Changing rooms'], rating: 4.8, reviews: 112, entry: '₹150 / hr' },
    { id:3, name: 'Municipal Sports Ground', sport, distance: '3.8 km', open: false, address: 'Kothrud, Pune 411038', amenities: ['Parking'], rating: 3.9, reviews: 14, entry: 'Free entry' },
  ];

  const toggleSave = id => setSaved(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero Header */}
      <div style={{ position: 'relative', height: 160, background: 'linear-gradient(135deg, #E9D5FF 0%, #A855F7 60%, #7E22CE 100%)', flexShrink: 0, padding: '52px 20px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <button style={{ background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 9999, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 24, fontWeight: 500, color: '#fff', letterSpacing: '-0.015em', margin: '0 0 4px 0' }}>{sport} Facilities <span style={{ display:'inline-block', background:'rgba(255,255,255,0.2)', border:'0.5px solid rgba(255,255,255,0.4)', borderRadius:9999, padding:'2px 8px', fontSize:11, fontFamily:T.fontSans, marginLeft:6, verticalAlign:'middle' }}>{facilities.length} found</span></h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.9)' }}>
            <span style={{ fontFamily: T.fontSans, fontSize: 13, fontWeight: 400 }}>Pimpri-Chinchwad, Pune</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        
        {/* Search & Map View */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: 14, top: 12 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9090A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder={`Search ${sport.toLowerCase()} centers...`} style={{ width: '100%', height: 42, background: '#fff', border: '1px solid #D1D1D8', borderRadius: 9999, padding: '0 16px 0 40px', fontFamily: T.fontSans, fontSize: 14, color: '#0F0F12', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4338CA', borderRadius: 9999, padding: '0 16px', fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Map View
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, background: activeFilter===f ? '#0F0F12' : '#fff', color: activeFilter===f ? '#fff' : '#6B6B7B', border: `1px solid ${activeFilter===f ? '#0F0F12' : '#D1D1D8'}`, borderRadius: 9999, padding: '8px 16px', fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>{f}</button>
          ))}
        </div>

        {/* Facility cards */}
        {facilities.map(f => (
          <div key={f.id} style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E5EA', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => onSelectFacility?.(f)}>
            {/* Image Placeholder */}
            <div style={{ height: 140, background: '#E5E5EA', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <button onClick={e=>{e.stopPropagation();toggleSave(f.id)}} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved.includes(f.id) ? '#4338CA' : '#9090A0' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={saved.includes(f.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7-5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
              </div>
            </div>
            
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <h3 style={{ fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, color: '#0F0F12', margin: 0 }}>{f.name}</h3>
                <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, color: '#0F0F12' }}>{f.entry}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#F59E0B' }}>★</span>
                <span style={{ fontFamily: T.fontSans, fontSize: 13, fontWeight: 600, color: '#0F0F12' }}>{f.rating}</span>
                <span style={{ fontFamily: T.fontSans, fontSize: 13, color: '#9090A0' }}>({f.reviews} reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 16 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9090A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span style={{ fontFamily: T.fontSans, fontSize: 13, color: '#6B6B7B', lineHeight: 1.4 }}>{f.address}</span>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ background: '#fff', border: '1px solid #D1D1D8', borderRadius: 9999, padding: '4px 10px', fontFamily: T.fontSans, fontSize: 11, color: '#6B6B7B', fontWeight: 500 }}>{f.distance}</span>
                <span style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 9999, padding: '4px 10px', fontFamily: T.fontSans, fontSize: 11, color: '#4338CA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.sport}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: T.fontSans, fontSize: 11, fontWeight: 600, color: f.open ? '#16A34A' : '#9090A0', letterSpacing: '0.04em' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: f.open ? '#16A34A' : '#9090A0', display: 'inline-block' }}/>
                  {f.open ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>
          </div>
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
    image: '/img/sport-badminton.jpg' // Use a generic image placeholder
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero Image Banner */}
      <div style={{ position: 'relative', height: 280, flexShrink: 0, borderRadius: '0 0 32px 32px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0F0F12' }}>
           {/* Replace with actual image url, using a dark gray fallback and subtle linear gradient over it */}
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        
        {/* Top bar */}
        <div style={{ position: 'absolute', top: 52, left: 16, right: 16, zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ background: '#fff', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize: '18px', color: '#0F0F12', lineHeight: 1 }}>←</span>
          </button>
        </div>
        
        {/* Title and tags overlay */}
        <div style={{ position: 'absolute', bottom: 24, left: 20, zIndex: 2 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 24, fontWeight: 500, color: '#fff', letterSpacing: '-0.015em', marginBottom: 12 }}>{f.name}</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: 9999, padding: '6px 12px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500 }}>{f.sport}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: 9999, padding: '6px 12px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500 }}>{f.distance}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: 9999, padding: '6px 12px', fontFamily: T.fontSans, fontSize: 11, fontWeight: 500, letterSpacing: '0.05em' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: f.open ? '#4ADE80' : '#F87171', display:'inline-block' }}/>{f.open ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Info rows */}
        <Card style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flexShrink: 0, color: '#9090A0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div>
            <SectionLabel style={{ marginBottom: 4 }}>TIMINGS</SectionLabel>
            <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textPrimary }}>{f.timings}</p>
          </div>
        </Card>

        <Card style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flexShrink: 0, color: '#9090A0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <SectionLabel style={{ marginBottom: 4 }}>ADDRESS</SectionLabel>
            <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textPrimary }}>{f.address}</p>
          </div>
        </Card>

        <Card style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flexShrink: 0, color: '#9090A0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24 }}>
             <span style={{ fontSize: '18px', fontWeight: '500' }}>₹</span>
          </div>
          <div>
            <SectionLabel style={{ marginBottom: 4 }}>ENTRY</SectionLabel>
            <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textPrimary }}>{f.entry}</p>
          </div>
        </Card>

        {/* Amenities */}
        <Card style={{ padding: '20px' }}>
          <SectionLabel style={{ marginBottom: 12 }}>AMENITIES</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {f.amenities.map(a => (
              <span key={a} style={{ background: '#fff', border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: '8px 16px', fontFamily: T.fontSans, fontSize: 13, color: T.textSecond }}>{a}</span>
            ))}
          </div>
        </Card>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          <button onClick={onDirections} style={{ background: '#0F0F12', color: '#fff', border: 'none', borderRadius: 9999, padding: '18px', fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Get directions →
          </button>
          <button onClick={onSave} style={{ background: '#fff', color: '#0F0F12', border: '1px solid #D1D1D8', borderRadius: 9999, padding: '18px', fontFamily: T.fontSans, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
            Save facility
          </button>
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

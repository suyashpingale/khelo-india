/**
 * Khelo India — Two additions
 *
 * 1. PhoneWrapper  — wraps the entire app so desktop shows a phone frame,
 *    mobile shows full-screen. Import once in App.jsx around your router outlet.
 *
 * 2. ScienceBehindSport — the "Science behind sport" learning module.
 *    Screens: ScienceHomeScreen, ScienceLessonScreen, ScienceQuizScreen,
 *    ScienceResultScreen
 *
 * Routes to add:
 *   /learn/:sportId/science          → ScienceHomeScreen
 *   /learn/:sportId/science/:lessonId → ScienceLessonScreen
 *   /learn/:sportId/science/:lessonId/quiz → ScienceQuizScreen
 */

import React, { useState, useEffect } from 'react';

// ─── DESIGN TOKENS (same as screens.jsx) ────────────────────────────────────
const T = {
  bgPage:      '#F2F2F7',
  bgCard:      '#FFFFFF',
  textPrimary: '#0F0F12',
  textSecond:  '#6B6B7B',
  textTert:    '#9090A0',
  borderLight: 'rgba(0,0,0,0.06)',
  borderMed:   '#D1D1D8',
  indigo:      '#E85D24',
  indigoBg:    '#FEF0E7',
  indigoBorder:'#F5C4AA',
  green:       '#16A34A',
  orange:      '#F97316',
  amber:       '#D97706',
  amberBg:     '#FEF3C7',
  illusBlue:   'linear-gradient(160deg,#F5C4AA 0%,#E85D24 100%)',
  illusOrange: 'linear-gradient(135deg,#FED7AA 0%,#F97316 60%,#EA580C 100%)',
  illusGreen:  'linear-gradient(135deg,#BBF7D0 0%,#4ADE80 50%,#16A34A 100%)',
  illusViolet: 'linear-gradient(135deg,#E9D5FF 0%,#A855F7 60%,#7E22CE 100%)',
  heroGrad:    `radial-gradient(ellipse 60% 55% at 50% -5%,#F97316 0%,#FB923C 25%,transparent 65%),
                radial-gradient(ellipse 45% 55% at -5% 50%,#F5C4AA 0%,transparent 60%),
                radial-gradient(ellipse 45% 55% at 105% 50%,#F5C4AA 0%,transparent 60%)`,
  serif:       "'Lora',Georgia,serif",
  sans:        "'Inter',system-ui,sans-serif",
};

const HeroStrip = ({ height=180, children, style={} }) => (
  <div style={{ position:'relative', height, background:`${T.heroGrad},${T.bgPage}`,
    display:'flex', flexDirection:'column', alignItems:'center',
    justifyContent:'flex-end', paddingBottom:20, overflow:'hidden',
    flexShrink:0, ...style }}>
    {children}
  </div>
);

const ScrollMotif = ({ size=80, color='#0F0F12', opacity=0.75 }) => (
  <svg width={size} height={size*0.44} viewBox="0 0 160 70" fill="none" style={{opacity}}>
    <path d="M80 35 Q68 14 54 20 Q42 26 45 38 Q48 50 60 44 Q70 38 67 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M80 35 Q92 14 106 20 Q118 26 115 38 Q112 50 100 44 Q90 38 93 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="22" y1="35" x2="52" y2="35" stroke={color} strokeWidth="0.9"/>
    <line x1="108" y1="35" x2="138" y2="35" stroke={color} strokeWidth="0.9"/>
    <circle cx="80" cy="35" r="2.5" fill={color}/>
    <circle cx="36" cy="35" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="124" cy="35" r="1.5" fill={color} opacity="0.5"/>
  </svg>
);

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{ background:T.bgCard, borderRadius:18,
    border:`1px solid ${T.borderLight}`, padding:18, ...style }}>
    {children}
  </div>
);

const Pill = ({ children, color=T.indigo, bg=T.indigoBg, border=T.indigoBorder }) => (
  <span style={{ background:bg, color, border:`1px solid ${border}`,
    borderRadius:9999, padding:'5px 14px',
    fontFamily:T.sans, fontSize:12, fontWeight:500 }}>
    {children}
  </span>
);

const Label = ({ children, style={} }) => (
  <p style={{ fontFamily:T.sans, fontSize:10, fontWeight:500,
    letterSpacing:'0.6px', textTransform:'uppercase',
    color:'#888888', ...style }}>
    {children}
  </p>
);

const BtnPrimary = ({ children, onClick, disabled=false, style={} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? '#D1D1D8' : '#0F0F12',
    color: disabled ? '#9090A0' : '#fff',
    border:'none', borderRadius:12, padding:'14px 28px',
    width:'100%', fontFamily:T.sans, fontSize:16, fontWeight:600,
    letterSpacing:'-0.01em', cursor: disabled ? 'not-allowed' : 'pointer', ...style,
  }}>{children}</button>
);

const BtnSecondary = ({ children, onClick, style={} }) => (
  <button onClick={onClick} style={{
    background:T.bgCard, color:T.textPrimary,
    border:`1px solid ${T.borderMed}`, borderRadius:12,
    padding:'14px 28px', width:'100%',
    fontFamily:T.sans, fontSize:16, fontWeight:400, cursor:'pointer', ...style,
  }}>{children}</button>
);

// ══════════════════════════════════════════════════════════════════════════════
// 1.  PHONE WRAPPER
//     Put this in App.jsx wrapping your <Routes>.
//     On a real phone → transparent, full-screen.
//     On a laptop / desktop → centred iPhone shell.
// ══════════════════════════════════════════════════════════════════════════════

export function PhoneWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 480
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <div style={{ width:'100%', minHeight:'100vh',
        background:T.bgPage, overflow:'hidden' }}>
        {children}
      </div>
    );
  }

  // Desktop — draw the shell, embed the app content inside
  return (
    <div style={{
      minHeight:'100vh',
      background:'#1C1C1E',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      padding:'40px 20px',
      fontFamily:T.sans,
    }}>

      {/* Quick-jump bar */}
      <div style={{
        display:'flex', flexWrap:'wrap', gap:6,
        justifyContent:'center', marginBottom:20, maxWidth:600,
      }}>
        {[
          ['Language',    '/onboarding/language'],
          ['Profile',     '/onboarding/profile'],
          ['Discover',    '/discover'],
          ['Learn',       '/learn'],
          ['Play',        '/play'],
          ['Get Fit',     '/getfit'],
          ['Challenges',  '/challenges'],
          ['My Space',    '/myspace'],
          ['Science (Badminton)',     '/learn/Badminton/science'],
          ['Science (Cricket)', '/learn/Cricket/science'],
          ['Science (Kabaddi)', '/learn/Kabaddi/science'],
        ].map(([label, path]) => (
          <button
            key={label}
            onClick={() => window.history.pushState({}, '', path) && window.dispatchEvent(new PopStateEvent('popstate'))}
            style={{
              background:'#2C2C2E', color:'#E5E5EA',
              border:'1px solid #3A3A3C', borderRadius:9999,
              padding:'5px 14px', fontFamily:T.sans,
              fontSize:11, fontWeight:500, cursor:'pointer',
            }}
          >{label}</button>
        ))}
      </div>

      {/* iPhone 14 shell */}
      <div style={{
        position:'relative',
        width:393,
        height:852,
        background:'#1A1A1A',
        borderRadius:54,
        boxShadow:`
          0 0 0 2px #3A3A3C,
          0 0 0 10px #1C1C1E,
          0 0 0 12px #3A3A3C,
          0 50px 100px rgba(0,0,0,0.8)
        `,
        overflow:'hidden',
        flexShrink:0,
      }}>
        {/* Side buttons */}
        <div style={{
          position:'absolute', left:-14, top:130,
          width:4, height:36, background:'#3A3A3C', borderRadius:'2px 0 0 2px',
          boxShadow:'0 52px 0 #3A3A3C, 0 96px 0 #3A3A3C',
        }}/>
        <div style={{
          position:'absolute', right:-14, top:164,
          width:4, height:72, background:'#3A3A3C', borderRadius:'0 2px 2px 0',
        }}/>

        {/* Screen bezel */}
        <div style={{
          position:'absolute', inset:6,
          borderRadius:49, overflow:'hidden',
          background:T.bgPage,
        }}>
          {/* Dynamic Island */}
          <div style={{
            position:'absolute', top:14, left:'50%',
            transform:'translateX(-50%)',
            width:120, height:34,
            background:'#1A1A1A', borderRadius:20, zIndex:100,
          }}/>

          {/* Status bar */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:58,
            display:'flex', alignItems:'flex-end',
            justifyContent:'space-between',
            padding:'0 28px 8px', zIndex:99, pointerEvents:'none',
          }}>
            <ClockDisplay/>
            <div style={{ display:'flex', gap:5, alignItems:'center' }}>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="#0F0F12">
                <rect x="0" y="3" width="3" height="9" rx="1"/>
                <rect x="4.5" y="2" width="3" height="10" rx="1"/>
                <rect x="9" y="0" width="3" height="12" rx="1" opacity="0.3"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="#0F0F12"/>
                <path d="M3.5 6.5A6.5 6.5 0 018 5a6.5 6.5 0 014.5 1.5" stroke="#0F0F12" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M1 4A9.5 9.5 0 018 1.5 9.5 9.5 0 0115 4" stroke="#0F0F12" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0" y="1" width="21" height="10" rx="2.5" stroke="#0F0F12" strokeWidth="1"/>
                <rect x="1.5" y="2.5" width="16" height="7" rx="1.5" fill="#0F0F12"/>
                <path d="M22.5 4v4a2 2 0 000-4z" fill="#0F0F12"/>
              </svg>
            </div>
          </div>

          {/* App content */}
          <div style={{
            position:'absolute', inset:0,
            overflowY:'auto', overflowX:'hidden',
            WebkitOverflowScrolling:'touch',
          }}>
            {children}
          </div>
        </div>
      </div>

      <p style={{ color:'#48484A', fontSize:11, marginTop:20, textAlign:'center' }}>
        khelo-india.vercel.app · open on your phone for full-screen experience
      </p>
    </div>
  );
}

function ClockDisplay() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontSize:15, fontWeight:600, color:'#0F0F12',
      fontFamily:T.sans }}>{time}</span>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// 2.  SCIENCE BEHIND SPORT — LEARNING MODULE
// ══════════════════════════════════════════════════════════════════════════════

// Lesson data — one sport (Badminton) fully built as template.
// Each sport follows the same schema.
const LESSONS = {
  Badminton: [
    {
      id: 'smash-physics',
      tier: 'Curious',           // Curious | Explorer | Athlete
      hook: 'Why does a smash travel faster than you can react?',
      hookSub: 'A shuttlecock can hit 400 km/h — faster than a Formula 1 car at start.',
      concept: 'Force & velocity',
      explanation: [
        'When you swing a racket, your arm stores energy like a spring.',
        'At the moment of contact, all that energy transfers to the shuttlecock in milliseconds.',
        'The lighter the shuttle + the faster the swing = the greater the velocity.',
      ],
      visual: 'force',           // used to pick the inline SVG illustration
      formula: null,             // null for Curious tier
      challenge: {
        question: 'Bumrah bowls a yorker at 145 km/h. Prannoy smashes at 400 km/h. Which has more force on impact at the target?',
        options: ['The yorker', 'The smash', 'They are equal', 'Depends on weight'],
        correct: 1,
        explanation: 'Even though the shuttlecock is lighter, 400 km/h gives it enormous kinetic energy at contact. Force = mass × acceleration — but the deceleration on impact is so rapid the force spikes enormously.',
      },
      xp: 40,
      badge: 'Force Seeker',
    },
    {
      id: 'spin-aerodynamics',
      tier: 'Explorer',
      hook: 'How does a net shot just die at the tape?',
      hookSub: 'The feathers on a shuttle are not decoration — they are engineering.',
      concept: 'Aerodynamics & drag',
      explanation: [
        'The 16 goose feathers on a shuttle create turbulent airflow that slows it rapidly.',
        'Spinning the shuttle changes the drag pattern — a tumbling shuttle drops faster.',
        'Top players use this to make the shuttle land exactly at the net tape.',
      ],
      visual: 'aero',
      formula: 'Drag = ½ × ρ × v² × Cd × A',
      challenge: {
        question: 'If you hit the shuttle harder, what happens to drag force?',
        options: ['Drag stays the same', 'Drag decreases', 'Drag increases with v²', 'Drag increases with v'],
        correct: 2,
        explanation: 'Drag scales with velocity squared. Double the speed → four times the drag. This is why very fast smashes slow down dramatically in the back half of the court.',
      },
      xp: 60,
      badge: 'Aero Explorer',
    },
    {
      id: 'footwork-biomechanics',
      tier: 'Athlete',
      hook: 'Why can Lin Dan cover the whole court in 2 steps?',
      hookSub: 'It is not leg length. It is physics — and you can learn it.',
      concept: 'Centre of gravity & momentum',
      explanation: [
        'A low centre of gravity (bent knees) lets you change direction without losing speed.',
        'Momentum = mass × velocity. You want to kill horizontal momentum instantly.',
        'The split-step — a tiny jump before your opponent hits — removes your momentum so you can re-accelerate in any direction.',
      ],
      visual: 'cog',
      formula: 'p = mv  |  Impulse = FΔt',
      challenge: {
        question: 'You weigh 60kg and run at 3 m/s toward the net. Your opponent lifts. How much impulse do you need to stop fully?',
        options: ['60 N·s', '180 N·s', '20 N·s', '3 N·s'],
        correct: 1,
        explanation: 'Impulse = change in momentum = 60 × 3 = 180 N·s. Your muscles have to generate this force × time to stop. This is why footwork drills build slow-twitch stamina alongside fast-twitch explosiveness.',
      },
      xp: 80,
      badge: 'Biomechanics Athlete',
    },
  ],
  Cricket: [
    {
      id: 'yorker-trajectory',
      tier: 'Curious',
      hook: 'Why does a yorker beat the batsman every time?',
      hookSub: '"Bumrah is bowling the final over. 6 runs needed. What pitch does he bowl?"',
      concept: 'Projectile motion',
      explanation: [
        'A yorker lands right at the batsman\'s feet — the hardest spot to hit.',
        'A full-toss travels in an arc. A yorker uses a flatter arc that arrives faster.',
        'The batsman\'s brain needs ~0.4 seconds to decide the shot. A yorker gives 0.35.',
      ],
      visual: 'projectile',
      formula: null,
      challenge: {
        question: 'A yorker and a half-volley are bowled at the same speed. Which arrives at the batsman first?',
        options: ['Yorker', 'Half-volley', 'Same time', 'Depends on the pitch'],
        correct: 0,
        explanation: 'The yorker travels a flatter, more direct path. Less vertical arc = less distance covered = arrives marginally faster with less time to react.',
      },
      xp: 40,
      badge: 'Physics Opener',
    },
  ],
  Kabaddi: [
    {
      id: 'raid-momentum',
      tier: 'Curious',
      hook: 'Why does a raider touch more defenders when they run faster?',
      hookSub: 'Momentum = mass × velocity. More speed = harder to stop.',
      concept: 'Momentum & impulse',
      explanation: [
        'A running raider carries momentum that defenders must absorb.',
        'The more defenders who try to stop them, the more force needed.',
        'A quick direction change changes the momentum vector — this is the feint.',
      ],
      visual: 'force',
      formula: null,
      challenge: {
        question: 'A 70kg raider runs at 5 m/s. What is their momentum?',
        options: ['14 kg·m/s', '75 kg·m/s', '350 kg·m/s', '35 kg·m/s'],
        correct: 2,
        explanation: 'p = mv = 70 × 5 = 350 kg·m/s. This is the impulse defenders must generate to stop them — shared across multiple bodies.',
      },
      xp: 40,
      badge: 'Momentum Raider',
    },
  ],
};

const TIER_COLORS = {
  Curious:  { bg:'#FEF0E7', border:'#F5C4AA', text:'#E85D24', dot:'#E85D24' },
  Explorer: { bg:'#FEF3C7', border:'#FDE68A', text:'#92400E', dot:'#F59E0B' },
  Athlete:  { bg:'#DCFCE7', border:'#86EFAC', text:'#166534', dot:'#22C55E' },
};

// ── Science Home: lists all lessons for a sport ──────────────────────────────
export function ScienceHomeScreen({ sportId = 'Badminton', onLesson, onBack }) {
  const lessons = LESSONS[sportId] || LESSONS.Badminton;

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage,
      display:'flex', flexDirection:'column', paddingBottom:80 }}>

      <HeroStrip height={190}>
        <div style={{ position:'absolute', top:55, display:'flex',
          flexDirection:'column', alignItems:'center', gap:8 }}>
          <ScrollMotif size={72}/>
          <Pill>Science behind {sportId}</Pill>
        </div>
        <h1 style={{ fontFamily:T.serif, fontSize:24, fontWeight:400,
          color:T.textPrimary, letterSpacing:'-0.02em',
          textAlign:'center', padding:'0 16px' }}>
          Why does {sportId} work?
        </h1>
      </HeroStrip>

      <div style={{ padding:'20px 16px', display:'flex',
        flexDirection:'column', gap:16 }}>

        {/* Intro callout */}
        <Card style={{ padding:'16px 18px', borderLeft:`3px solid ${T.indigo}` }}>
          <p style={{ fontFamily:T.sans, fontSize:14, color:T.textSecond,
            lineHeight:1.7, margin:0 }}>
            Learn how to play better by understanding the science behind the sport.
            Each module takes 3–5 minutes and ends with a challenge that earns you XP.
          </p>
        </Card>

        {/* Tier legend */}
        <div style={{ display:'flex', gap:8 }}>
          {Object.entries(TIER_COLORS).map(([tier, c]) => (
            <div key={tier} style={{ flex:1, background:c.bg,
              border:`1px solid ${c.border}`, borderRadius:10,
              padding:'8px 10px', textAlign:'center' }}>
              <div style={{ width:8, height:8, borderRadius:'50%',
                background:c.dot, margin:'0 auto 4px' }}/>
              <p style={{ fontFamily:T.sans, fontSize:10, fontWeight:600,
                color:c.text, margin:0, letterSpacing:'0.04em' }}>{tier}</p>
            </div>
          ))}
        </div>

        <Label>Lessons</Label>

        {lessons.map((lesson, i) => {
          const c = TIER_COLORS[lesson.tier];
          return (
            <Card key={lesson.id} onClick={() => onLesson?.(lesson)}
              style={{ cursor:'pointer', padding:'16px 18px' }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                {/* Number */}
                <div style={{ width:36, height:36, borderRadius:10,
                  background:c.bg, border:`1px solid ${c.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0 }}>
                  <span style={{ fontFamily:T.serif, fontSize:16,
                    fontWeight:400, color:c.text }}>{i+1}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center',
                    gap:8, marginBottom:4 }}>
                    <span style={{ fontFamily:T.sans, fontSize:14,
                      fontWeight:600, color:T.textPrimary }}>{lesson.concept}</span>
                    <span style={{ background:c.bg, color:c.text,
                      border:`1px solid ${c.border}`, borderRadius:4,
                      padding:'1px 7px', fontSize:10,
                      fontWeight:600, letterSpacing:'0.04em' }}>{lesson.tier}</span>
                  </div>
                  <p style={{ fontFamily:T.sans, fontSize:12,
                    color:T.textSecond, margin:0, lineHeight:1.5 }}>
                    {lesson.hook}
                  </p>
                  <div style={{ display:'flex', justifyContent:'space-between',
                    marginTop:8, alignItems:'center' }}>
                    <span style={{ fontFamily:T.sans, fontSize:11,
                      color:T.indigo, fontWeight:500 }}>+{lesson.xp} XP</span>
                    <span style={{ fontFamily:T.sans, fontSize:11,
                      color:T.textTert }}>3 min →</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Science Lesson: hook → explanation → try it prompt ───────────────────────
export function ScienceLessonScreen({ lesson, onQuiz, onBack }) {
  const [step, setStep] = useState(0); // 0=hook, 1=concept, 2=tryit
  const c = TIER_COLORS[lesson?.tier || 'Curious'];
  const L = lesson || LESSONS.Badminton[0];

  const steps = ['The hook', 'The science', 'Try it yourself'];

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage,
      display:'flex', flexDirection:'column' }}>

      <HeroStrip height={140}>
        <div style={{ width:'100%', padding:'0 16px',
          display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={onBack} style={{ background:'rgba(255,255,255,0.8)',
            border:'none', borderRadius:9999, width:36, height:36,
            cursor:'pointer', fontSize:16, display:'flex',
            alignItems:'center', justifyContent:'center', flexShrink:0 }}>←</button>
          <div>
            <Label style={{ color:'rgba(15,15,18,0.5)', marginBottom:2 }}>
              {L.concept}
            </Label>
            <h2 style={{ fontFamily:T.serif, fontSize:18, fontWeight:400,
              color:T.textPrimary, letterSpacing:'-0.015em', margin:0 }}>
              {L.tier} level
            </h2>
          </div>
        </div>
        {/* Step dots */}
        <div style={{ display:'flex', gap:6, marginTop:12 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column',
              alignItems:'center', gap:3 }}>
              <div style={{ height:3, width: i===step ? 28 : 10,
                borderRadius:2, background: i<=step ? '#0F0F12' : '#D1D1D8',
                transition:'all .2s' }}/>
              <span style={{ fontSize:9, fontFamily:T.sans,
                color: i===step ? T.textPrimary : T.textTert,
                fontWeight: i===step ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
      </HeroStrip>

      <div style={{ flex:1, padding:'24px 16px',
        display:'flex', flexDirection:'column', gap:20 }}>

        {step === 0 && (
          <>
            {/* Hook */}
            <Card style={{ padding:'24px 20px', background:c.bg,
              border:`1px solid ${c.border}` }}>
              <Label style={{ color:c.text, marginBottom:10 }}>The question</Label>
              <h2 style={{ fontFamily:T.serif, fontSize:22, fontWeight:400,
                color:T.textPrimary, letterSpacing:'-0.02em',
                lineHeight:1.3, marginBottom:12 }}>
                {L.hook}
              </h2>
              <p style={{ fontFamily:T.sans, fontSize:13,
                color:T.textSecond, lineHeight:1.6, margin:0 }}>
                {L.hookSub}
              </p>
            </Card>

            {/* Inline sport illustration */}
            <SportIllustration type={L.visual}/>

            <BtnPrimary onClick={() => setStep(1)}>
              Show me the science →
            </BtnPrimary>
          </>
        )}

        {step === 1 && (
          <>
            <Label>The concept: {L.concept}</Label>

            {L.explanation.map((line, i) => (
              <Card key={i} style={{ padding:'14px 18px', display:'flex',
                gap:12, alignItems:'flex-start' }}>
                <div style={{ width:24, height:24, borderRadius:9999,
                  background:c.bg, border:`1px solid ${c.border}`,
                  display:'flex', alignItems:'center',
                  justifyContent:'center', flexShrink:0, marginTop:1 }}>
                  <span style={{ fontFamily:T.sans, fontSize:11,
                    fontWeight:700, color:c.text }}>{i+1}</span>
                </div>
                <p style={{ fontFamily:T.sans, fontSize:14,
                  color:T.textPrimary, lineHeight:1.6, margin:0 }}>{line}</p>
              </Card>
            ))}

            {L.formula && (
              <Card style={{ padding:'14px 18px',
                background:'#F8F8FC', borderLeft:`3px solid ${T.indigo}` }}>
                <Label style={{ marginBottom:6 }}>Formula ({L.tier})</Label>
                <p style={{ fontFamily:"'Courier New',monospace", fontSize:15,
                  color:T.indigo, margin:0, letterSpacing:'0.02em' }}>
                  {L.formula}
                </p>
              </Card>
            )}

            <BtnPrimary onClick={() => setStep(2)}>Got it →</BtnPrimary>
          </>
        )}

        {step === 2 && (
          <>
            <Card style={{ padding:'20px', background:c.bg,
              border:`1px solid ${c.border}` }}>
              <Label style={{ color:c.text, marginBottom:10 }}>
                Try it yourself
              </Label>
              <h3 style={{ fontFamily:T.serif, fontSize:18, fontWeight:400,
                color:T.textPrimary, marginBottom:12, letterSpacing:'-0.01em' }}>
                Go outside and test it
              </h3>
              <TryItPrompt type={L.visual} sport="Badminton"/>
            </Card>

            <Card style={{ padding:'14px 18px',
              display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <p style={{ fontFamily:T.sans, fontSize:13, fontWeight:500,
                  color:T.textPrimary, margin:0 }}>Ready for the challenge?</p>
                <p style={{ fontFamily:T.sans, fontSize:12,
                  color:T.textSecond, margin:'2px 0 0' }}>
                  Answer 1 question · earn +{L.xp} XP
                </p>
              </div>
              <span style={{ fontFamily:T.serif, fontSize:22,
                color:T.indigo }}>{L.xp}</span>
            </Card>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <BtnPrimary onClick={onQuiz}>Take the challenge →</BtnPrimary>
              <BtnSecondary onClick={onBack}>Back to lessons</BtnSecondary>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Science Quiz ──────────────────────────────────────────────────────────────
export function ScienceQuizScreen({ lesson, onResult, onBack }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const L = lesson || LESSONS.Badminton[0];
  const q = L.challenge;

  const submit = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const correct = selected === q.correct;

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage,
      display:'flex', flexDirection:'column' }}>

      <HeroStrip height={130}>
        <div style={{ width:'100%', padding:'0 16px',
          display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={onBack} style={{ background:'rgba(255,255,255,0.8)',
            border:'none', borderRadius:9999, width:36, height:36,
            cursor:'pointer', fontSize:16, display:'flex',
            alignItems:'center', justifyContent:'center' }}>←</button>
          <div>
            <Label style={{ color:'rgba(15,15,18,0.5)', marginBottom:2 }}>Challenge</Label>
            <h2 style={{ fontFamily:T.serif, fontSize:18, fontWeight:400,
              color:T.textPrimary, margin:0 }}>{L.concept}</h2>
          </div>
        </div>
      </HeroStrip>

      <div style={{ flex:1, padding:'24px 16px',
        display:'flex', flexDirection:'column', gap:16 }}>

        <Card style={{ padding:'20px' }}>
          <Label style={{ marginBottom:10 }}>Question</Label>
          <p style={{ fontFamily:T.serif, fontSize:18, fontWeight:400,
            color:T.textPrimary, lineHeight:1.4, margin:0 }}>
            {q.question}
          </p>
        </Card>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {q.options.map((opt, i) => {
            let bg = T.bgCard, border = T.borderMed, color = T.textPrimary;
            if (revealed) {
              if (i === q.correct) { bg='#F0FDF4'; border='#86EFAC'; color='#166534'; }
              else if (i === selected) { bg='#FFF5F5'; border='#FECACA'; color='#DC2626'; }
            } else if (i === selected) {
              bg = T.indigoBg; border = T.indigo; color = T.indigo;
            }
            return (
              <button key={i} onClick={() => !revealed && setSelected(i)} style={{
                background:bg, color, border:`1.5px solid ${border}`,
                borderRadius:14, padding:'14px 16px', textAlign:'left',
                fontFamily:T.sans, fontSize:14, fontWeight: i===selected ? 600 : 400,
                cursor: revealed ? 'default' : 'pointer', display:'flex',
                alignItems:'center', gap:10, transition:'all .15s',
              }}>
                <span style={{ width:22, height:22, borderRadius:'50%',
                  background: revealed && i===q.correct ? '#16A34A' : revealed && i===selected ? '#DC2626' : 'rgba(0,0,0,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>
                  {String.fromCharCode(65+i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {!revealed ? (
          <BtnPrimary onClick={submit} disabled={selected===null}>
            Submit answer →
          </BtnPrimary>
        ) : (
          <>
            <Card style={{ padding:'16px 18px',
              background: correct ? '#F0FDF4' : '#FFF5F5',
              border: `1px solid ${correct ? '#86EFAC' : '#FECACA'}` }}>
              <p style={{ fontFamily:T.sans, fontSize:13,
                fontWeight:600, color: correct ? '#166534' : '#DC2626',
                marginBottom:6 }}>
                {correct ? 'Correct!' : 'Not quite —'}
              </p>
              <p style={{ fontFamily:T.sans, fontSize:13,
                color:T.textSecond, lineHeight:1.6, margin:0 }}>
                {q.explanation}
              </p>
            </Card>
            <BtnPrimary onClick={() => onResult?.(correct, L.xp)}>
              {correct ? `Claim +${L.xp} XP →` : 'Continue anyway →'}
            </BtnPrimary>
          </>
        )}
      </div>
    </div>
  );
}

// ── Science Result / XP celebration ──────────────────────────────────────────
export function ScienceResultScreen({ lesson, correct, xpEarned, onDone }) {
  const L = lesson || LESSONS.Badminton[0];
  return (
    <div style={{ minHeight:'100vh', background:T.bgPage,
      display:'flex', flexDirection:'column' }}>

      <HeroStrip height={200}>
        <div style={{ position:'absolute', top:55, display:'flex',
          flexDirection:'column', alignItems:'center', gap:8 }}>
          <ScrollMotif size={72}/>
        </div>
        <h1 style={{ fontFamily:T.serif, fontSize:26, fontWeight:400,
          color:T.textPrimary, letterSpacing:'-0.02em' }}>
          {correct ? 'Brilliant!' : 'Keep going!'}
        </h1>
      </HeroStrip>

      <div style={{ flex:1, padding:'24px 16px',
        display:'flex', flexDirection:'column', gap:16 }}>

        {/* Badge */}
        <Card style={{ padding:'28px 20px', textAlign:'center' }}>
          <div style={{ width:72, height:72,
            borderRadius:'60% 40% 55% 45% / 45% 55% 45% 55%',
            background: correct ? T.illusGreen : T.illusBlue,
            margin:'0 auto 16px', display:'flex',
            alignItems:'center', justifyContent:'center', fontSize:28 }}>
            {correct ? '🧪' : '📖'}
          </div>
          <h2 style={{ fontFamily:T.serif, fontSize:20, fontWeight:400,
            color:T.textPrimary, marginBottom:6 }}>
            {correct ? L.badge : 'Lesson complete'}
          </h2>
          <p style={{ fontFamily:T.sans, fontSize:13,
            color:T.textSecond, lineHeight:1.6, margin:0 }}>
            {correct
              ? `You understand ${L.concept}. Take this to the court.`
              : `You've seen the science. Try the lesson again to earn the badge.`}
          </p>
        </Card>

        {/* XP */}
        {correct && (
          <div style={{ background:T.indigoBg, border:`1px solid ${T.indigoBorder}`,
            borderRadius:14, padding:'14px 18px',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:T.sans, fontSize:13,
              fontWeight:500, color:T.indigo }}>XP earned</span>
            <span style={{ fontFamily:T.serif, fontSize:28,
              fontWeight:400, color:T.indigo }}>+{xpEarned}</span>
          </div>
        )}

        {/* Embodied cognition prompt */}
        <Card style={{ padding:'16px 18px',
          borderLeft:`3px solid ${T.orange}` }}>
          <Label style={{ marginBottom:6, color:T.amber }}>
            Now take it to the field
          </Label>
          <p style={{ fontFamily:T.sans, fontSize:13,
            color:T.textSecond, lineHeight:1.6, margin:0 }}>
            A child who has tried to bowl fast will understand velocity more
            viscerally than one who read about it. Go outside and feel the physics.
          </p>
        </Card>

        <BtnPrimary onClick={onDone}>Back to lessons</BtnPrimary>
      </div>
    </div>
  );
}

// ── Inline sport SVG illustrations ───────────────────────────────────────────
function SportIllustration({ type }) {
  const illustrations = {
    force: (
      <svg viewBox="0 0 340 140" width="100%" style={{ display:'block' }}>
        <rect x="0" y="0" width="340" height="140" rx="14"
          fill="url(#illus-blue)" opacity="0"/>
        <defs>
          <linearGradient id="illus-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C7D2FE"/>
            <stop offset="100%" stopColor="#818CF8"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="340" height="140" rx="14" fill="#FEF0E7"/>
        {/* Racket arm */}
        <line x1="60" y1="110" x2="130" y2="50" stroke="#E85D24" strokeWidth="6"
          strokeLinecap="round"/>
        <ellipse cx="138" cy="42" rx="18" ry="28" fill="none"
          stroke="#E85D24" strokeWidth="3" transform="rotate(-30 138 42)"/>
        {/* Shuttlecock */}
        <circle cx="210" cy="60" r="8" fill="#F97316"/>
        <path d="M210 52 L218 30 M210 52 L224 38 M210 52 L228 52"
          stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Velocity arrow */}
        <path d="M222 60 L290 60" stroke="#E85D24" strokeWidth="2"
          strokeLinecap="round" markerEnd="url(#arr)"/>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#E85D24"
              strokeWidth="1.5" strokeLinecap="round"/>
          </marker>
        </defs>
        <text x="256" y="52" fontFamily="Inter,sans-serif"
          fontSize="11" fill="#E85D24" fontWeight="600">v = 400 km/h</text>
        <text x="80" y="130" fontFamily="Inter,sans-serif"
          fontSize="11" fill="#6B6B7B">Force → velocity transfers on contact</text>
      </svg>
    ),
    projectile: (
      <svg viewBox="0 0 340 140" width="100%" style={{ display:'block' }}>
        <rect x="0" y="0" width="340" height="140" rx="14" fill="#FEF3C7"/>
        {/* Crease */}
        <line x1="40" y1="120" x2="300" y2="120" stroke="#D97706"
          strokeWidth="1.5" strokeDasharray="4 4"/>
        {/* Yorker arc */}
        <path d="M60 120 Q160 40 280 120" fill="none"
          stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Half-volley arc (higher) */}
        <path d="M60 120 Q150 10 280 120" fill="none"
          stroke="#D1D1D8" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="5 3"/>
        <circle cx="280" cy="120" r="5" fill="#0F0F12"/>
        <text x="60" y="110" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#92400E" fontWeight="600">Yorker</text>
        <text x="130" y="22" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#9090A0">Half-volley</text>
        <text x="80" y="135" fontFamily="Inter,sans-serif"
          fontSize="11" fill="#6B6B7B">Flatter arc = faster arrival = less reaction time</text>
      </svg>
    ),
    aero: (
      <svg viewBox="0 0 340 140" width="100%" style={{ display:'block' }}>
        <rect x="0" y="0" width="340" height="140" rx="14" fill="#F0FDF4"/>
        <circle cx="80" cy="70" r="12" fill="#4ADE80"/>
        <path d="M80 58 L88 30 M80 58 L94 46 M80 58 L96 62 M80 58 L94 74 M80 58 L88 86"
          stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M100 70 Q170 40 250 70" fill="none" stroke="#16A34A"
          strokeWidth="2" strokeLinecap="round"/>
        <path d="M100 70 Q170 100 250 70" fill="none" stroke="#16A34A"
          strokeWidth="2" strokeLinecap="round"/>
        <text x="155" y="65" textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#166534" fontWeight="600">turbulent airflow</text>
        <text x="80" y="128" fontFamily="Inter,sans-serif"
          fontSize="11" fill="#6B6B7B">16 feathers create drag that controls speed</text>
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 340 140" width="100%" style={{ display:'block' }}>
        <rect x="0" y="0" width="340" height="140" rx="14" fill="#EEF2FF"/>
        {/* High COG stick figure */}
        <circle cx="100" cy="40" r="12" fill="none" stroke="#DC2626" strokeWidth="2"/>
        <line x1="100" y1="52" x2="100" y2="95" stroke="#DC2626" strokeWidth="2"/>
        <line x1="100" y1="70" x2="82" y2="85" stroke="#DC2626" strokeWidth="2"/>
        <line x1="100" y1="70" x2="118" y2="85" stroke="#DC2626" strokeWidth="2"/>
        <line x1="100" y1="95" x2="85" y2="115" stroke="#DC2626" strokeWidth="2"/>
        <line x1="100" y1="95" x2="115" y2="115" stroke="#DC2626" strokeWidth="2"/>
        <text x="100" y="130" textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#DC2626">High COG</text>
        {/* Low COG stick figure */}
        <circle cx="240" cy="55" r="12" fill="none" stroke="#16A34A" strokeWidth="2"/>
        <line x1="240" y1="67" x2="240" y2="95" stroke="#16A34A" strokeWidth="2"/>
        <line x1="240" y1="80" x2="216" y2="100" stroke="#16A34A" strokeWidth="2"/>
        <line x1="240" y1="80" x2="264" y2="100" stroke="#16A34A" strokeWidth="2"/>
        <line x1="240" y1="95" x2="218" y2="115" stroke="#16A34A" strokeWidth="2"/>
        <line x1="240" y1="95" x2="262" y2="115" stroke="#16A34A" strokeWidth="2"/>
        <text x="240" y="130" textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#16A34A">Low COG = faster change</text>
      </svg>
    ),
  };

  return (
    <Card style={{ padding:0, overflow:'hidden' }}>
      {illustrations[type] || illustrations.force}
    </Card>
  );
}

function TryItPrompt({ type }) {
  const prompts = {
    force:      'Hold a racket and swing slowly, then as fast as you can. Feel the difference in your forearm. That\'s force increasing. Now try to stop mid-swing. That\'s inertia.',
    projectile: 'Stand at a crease and roll a ball along the ground vs toss it in a high arc. Which one arrived at the other end first? Which was harder to stop?',
    aero:       'Take a shuttlecock and hold it feathers-up. Drop it and watch it flip mid-air. Now drop it feathers-down. Notice how much faster it falls. That\'s drag at work.',
    cog:        'Stand straight and try to change direction while running. Now bend your knees slightly and try again. Feel how much quicker you can react.',
  };
  return (
    <p style={{ fontFamily:T.sans, fontSize:13, color:T.textSecond,
      lineHeight:1.7, margin:0 }}>
      {prompts[type] || prompts.force}
    </p>
  );
}

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
import { useNavigate } from 'react-router-dom';

// ─── DESIGN TOKENS (same as screens.jsx) ────────────────────────────────────
const T = {
  bgPage:      '#F2F2F7',
  bgCard:      '#FFFFFF',
  textPrimary: '#0F0F12',
  textSecond:  '#6B6B7B',
  textTert:    '#9090A0',
  borderLight: 'rgba(0,0,0,0.06)',
  borderMed:   '#D1D1D8',
  indigo:      '#4338CA',
  indigoBg:    '#EEF2FF',
  indigoBorder:'#C7D2FE',
  green:       '#16A34A',
  orange:      '#F97316',
  amber:       '#D97706',
  amberBg:     '#FEF3C7',
  illusBlue:   'linear-gradient(160deg,#C7D2FE 0%,#818CF8 100%)',
  illusOrange: 'linear-gradient(135deg,#FED7AA 0%,#F97316 60%,#EA580C 100%)',
  illusGreen:  'linear-gradient(135deg,#BBF7D0 0%,#4ADE80 50%,#16A34A 100%)',
  illusViolet: 'linear-gradient(135deg,#E9D5FF 0%,#A855F7 60%,#7E22CE 100%)',
  heroGrad:    `radial-gradient(ellipse 60% 55% at 50% -5%,#F97316 0%,#FB923C 25%,transparent 65%),
                radial-gradient(ellipse 45% 55% at -5% 50%,#C7D2FE 0%,transparent 60%),
                radial-gradient(ellipse 45% 55% at 105% 50%,#C7D2FE 0%,transparent 60%)`,
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
  <p style={{ fontFamily:T.sans, fontSize:11, fontWeight:500,
    letterSpacing:'0.07em', textTransform:'uppercase',
    color:T.textTert, ...style }}>
    {children}
  </p>
);

const BtnPrimary = ({ children, onClick, disabled=false, style={} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? '#D1D1D8' : '#0F0F12',
    color: disabled ? '#9090A0' : '#fff',
    border:'none', borderRadius:9999, padding:'14px 28px',
    width:'100%', fontFamily:T.sans, fontSize:16, fontWeight:600,
    letterSpacing:'-0.01em', cursor: disabled ? 'not-allowed' : 'pointer', ...style,
  }}>{children}</button>
);

const BtnSecondary = ({ children, onClick, style={} }) => (
  <button onClick={onClick} style={{
    background:T.bgCard, color:T.textPrimary,
    border:`1px solid ${T.borderMed}`, borderRadius:9999,
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
  const navigate = useNavigate();
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
          ['Learning Module Video', '/learn/football/science/projectile-motion'],
        ].map(([label, path]) => (
          <button
            key={label}
            onClick={() => navigate(path)}
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
  Curious:  { bg:'#EEF2FF', border:'#C7D2FE', text:'#4338CA', dot:'#818CF8' },
  Explorer: { bg:'#FEF3C7', border:'#FDE68A', text:'#92400E', dot:'#F59E0B' },
  Athlete:  { bg:'#DCFCE7', border:'#86EFAC', text:'#166534', dot:'#22C55E' },
};

// ── Science Home: lists all lessons for a sport ──────────────────────────────
export function ScienceHomeScreen({ sportId = 'Badminton', onLesson, onBack }) {
  const lessons = LESSONS[sportId] || LESSONS.Badminton;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col pb-32 overflow-hidden">
      {/* Hero */}
      <div className="relative h-[300px] w-full shrink-0 flex flex-col items-center justify-end pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0E7FF] to-[#F2F2F7]" />
        
        {/* Top Bar */}
        <div className="absolute top-14 left-6 right-6 flex justify-between items-center z-10">
           <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
             <span className="text-xl">←</span>
           </button>
           <h1 className="font-serif text-[18px] font-medium text-[#0F0F12]">Learn</h1>
           <div className="w-10" />
        </div>

        {/* Mascot */}
        <div className="relative w-40 h-40 mb-4 group">
          <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-2xl group-hover:bg-indigo-300/60 transition-colors" />
          <div className="absolute inset-0 bg-white rounded-full border-[6px] border-[#EEF2FF] shadow-xl flex items-center justify-center text-5xl overflow-hidden">
            <img src="/img/mascot.png" className="w-[120%] h-[120%] object-contain" alt="" onError={(e) => { e.currentTarget.style.display='none'; }} />
            <span className="group-hover:scale-110 transition-transform">🦉</span>
          </div>
        </div>

        <h2 className="font-serif text-[28px] font-medium text-[#0F0F12] text-center px-6 leading-tight tracking-tight">
          The fun way to learn the science behind {sportId}.
        </h2>
      </div>

      <div className="px-6 space-y-4 -mt-2 relative z-10">
        <p className="text-center text-[#6B6B7B] font-medium text-[15px] mb-6">Select a module to begin</p>
        
        {lessons.map((lesson, i) => {
          const colors = [
            { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600' },
            { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600' },
            { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600' },
          ];
          const c = colors[i % colors.length];
          return (
            <div 
              key={lesson.id} 
              onClick={() => onLesson?.(lesson)} 
              className="bg-white rounded-[24px] p-5 flex items-center gap-5 border border-black/5 shadow-sm active:scale-[0.98] transition-all cursor-pointer group hover:shadow-md"
            >
              <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center text-2xl font-bold shrink-0 border ${c.border} transition-transform group-hover:scale-105`}>
                {i + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-sans text-[16px] font-bold text-[#0F0F12] truncate mb-1">
                  {lesson.hook.split('?')[0].replace(/Why does a |How does a |Why can |Why does the /i, '') + "..."}
                </h3>
                <p className="text-[13px] text-[#6B6B7B] font-medium mb-3">
                  {i + 1} • {lesson.concept}
                </p>
                
                <div className="flex gap-2">
                  <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide">+{lesson.xp} XP</span>
                  <span className="bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase">3 MINS</span>
                </div>
              </div>
              <div className="text-gray-300">
                <ChevronRight size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Science Lesson: hook → explanation → try it prompt ───────────────────────
export function ScienceLessonScreen({ lesson, onQuiz, onBack }) {
  const [step, setStep] = useState(0); 
  const c = TIER_COLORS[lesson?.tier || 'Curious'];
  const L = lesson || LESSONS.Badminton[0];

  const steps = ['The hook', 'The science', 'Try it yourself'];

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col overflow-hidden pb-10">
      {/* Header */}
      <div className="pt-14 px-6 flex items-center gap-4 shrink-0">
        <button onClick={onBack} className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <span className="text-xl">←</span>
        </button>
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">{L.tier} level</p>
          <h2 className="font-serif text-[20px] font-medium text-black leading-tight">{L.concept}</h2>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 mt-6 flex gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 space-y-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-black' : 'bg-gray-200'}`} />
            <span className={`text-[9px] font-bold uppercase tracking-wider ${i === step ? 'text-black' : 'text-gray-400'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm mb-6">
              <p className="text-indigo-600 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">The Question</p>
              <h2 className="font-serif text-[28px] font-medium text-black leading-tight mb-6">
                {L.hook}
              </h2>
              <p className="text-[#6B6B7B] leading-relaxed text-[15px] font-medium">
                {L.hookSub}
              </p>
            </div>

            {/* Video-style placeholder */}
            <div className="relative aspect-video bg-black rounded-[24px] overflow-hidden shadow-2xl mb-8 group">
               <img src={`https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop`} className="w-full h-full object-cover opacity-60" alt="" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                     <div className="ml-1 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-black" />
                  </div>
               </div>
            </div>

            {/* Mascot Tip */}
            <div className="relative bg-indigo-50/50 rounded-[24px] p-6 pr-24 border border-indigo-100/50 mb-8">
               <p className="italic text-indigo-700/80 text-[14px] leading-relaxed">
                 "Think about how gravity pulls the object down while inertia keeps it moving forward!"
               </p>
               <img src="/img/mascot.png" className="absolute -bottom-2 -right-4 w-28 h-28 object-contain" alt="" onError={(e) => { e.currentTarget.style.display='none'; }} />
               <span className="absolute -bottom-2 -right-2 text-4xl">🦉</span>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="w-full bg-[#0F0F12] text-white py-5 rounded-full font-bold text-[16px] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Continue Learning <div className="ml-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">The scientific breakdown</p>
            {L.explanation.map((line, i) => (
              <div key={i} className="bg-white rounded-[24px] p-5 flex gap-4 border border-black/5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{line}</p>
              </div>
            ))}

            {L.formula && (
              <div className="bg-black text-white p-6 rounded-[24px] shadow-xl mt-4">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">Mathematical Model</p>
                <p className="font-mono text-xl tracking-wider text-indigo-400">{L.formula}</p>
              </div>
            )}

            <button onClick={() => setStep(2)} className="w-full bg-[#0F0F12] text-white py-5 rounded-full font-bold text-[16px] shadow-xl active:scale-95 transition-all mt-6">
              Got it, let's test it →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-100 shadow-sm">
                <p className="text-amber-600 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">Try it yourself</p>
                <h3 className="font-serif text-[24px] font-medium text-black leading-tight mb-4">Go outside and test it</h3>
                <p className="text-amber-900/70 leading-relaxed text-[15px] font-medium">
                  Find a clear space and try to replicate the motion. Observe how changing the force impacts the result!
                </p>
             </div>

             <div className="bg-white rounded-[24px] p-6 flex justify-between items-center border border-black/5 shadow-sm">
                <div>
                   <p className="text-[15px] font-bold text-black">Ready for the challenge?</p>
                   <p className="text-[13px] text-gray-500">Answer 1 question · earn +{L.xp} XP</p>
                </div>
                <div className="text-3xl font-serif text-indigo-600">+{L.xp}</div>
             </div>

             <div className="flex flex-col gap-3">
               <button onClick={onQuiz} className="w-full bg-[#0F0F12] text-white py-5 rounded-full font-bold text-[16px] shadow-xl active:scale-95 transition-all">
                 Take the challenge →
               </button>
               <button onClick={onBack} className="w-full bg-white text-gray-500 py-5 rounded-full font-bold text-[16px] border border-gray-200">
                 Maybe later
               </button>
             </div>
          </div>
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
        <rect x="0" y="0" width="340" height="140" rx="14" fill="#EEF2FF"/>
        {/* Racket arm */}
        <line x1="60" y1="110" x2="130" y2="50" stroke="#818CF8" strokeWidth="6"
          strokeLinecap="round"/>
        <ellipse cx="138" cy="42" rx="18" ry="28" fill="none"
          stroke="#818CF8" strokeWidth="3" transform="rotate(-30 138 42)"/>
        {/* Shuttlecock */}
        <circle cx="210" cy="60" r="8" fill="#F97316"/>
        <path d="M210 52 L218 30 M210 52 L224 38 M210 52 L228 52"
          stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Velocity arrow */}
        <path d="M222 60 L290 60" stroke="#4338CA" strokeWidth="2"
          strokeLinecap="round" markerEnd="url(#arr)"/>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#4338CA"
              strokeWidth="1.5" strokeLinecap="round"/>
          </marker>
        </defs>
        <text x="256" y="52" fontFamily="Inter,sans-serif"
          fontSize="11" fill="#4338CA" fontWeight="600">v = 400 km/h</text>
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

export function ProjectileMotionScreen({ onBack, onContinue }) {
  return (
    <div style={{ minHeight:'100vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 20%, #F2F2F7 100%)', display:'flex', flexDirection:'column', padding:'16px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background:'#fff', border:'none', borderRadius:'50%', width:40, height:40, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>←</button>
        <div style={{ marginLeft: 16 }}>
          <p style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: '#9090A0', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>Curious Level</p>
          <h1 style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 500, color: '#0F0F12', margin: 0 }}>Projectile Motion</h1>
        </div>
      </div>

      <Card style={{ padding: '20px', borderRadius: 20, marginBottom: 16, border: '1px solid #E5E5EA', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>THE QUESTION</p>
        <h2 style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 400, color: '#0F0F12', lineHeight: 1.3, marginBottom: 12 }}>Why does the ball cover the maximum angle when kicked at an angle of 45°?</h2>
        <p style={{ fontFamily: T.sans, fontSize: 14, color: '#6B6B7B', lineHeight: 1.5, margin: 0 }}>The football covers maximum range when kicked at angle of 45°.</p>
      </Card>

      <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', background: '#000' }}>
        {/* TODO: drop your video file at public/learning-module.mp4 */}
        <video
          src="/learning-module.mp4"
          controls
          playsInline
          style={{ width: '100%', display: 'block', height: 220, objectFit: 'cover' }}
        />
      </div>

      <div style={{ marginTop: 'auto', position: 'relative', paddingBottom: 24 }}>
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px 16px 16px 4px', padding: '16px', width: '80%', position: 'relative', zIndex: 2, top: 20 }}>
          <p style={{ fontFamily: T.sans, fontStyle: 'italic', fontSize: 15, color: '#6B6B7B', margin: 0, lineHeight: 1.5 }}>"Next time you step onto the field, try kicking the ball at different angles and see how far it travels!"</p>
        </div>
        <img src="/mascot.png" style={{ position: 'absolute', right: -10, bottom: 44, width: 140, height: 180, objectFit: 'contain', zIndex: 1 }} alt="Mascot" />
        <div style={{ marginTop: 40, position: 'relative', zIndex: 3 }}>
          <button onClick={onContinue} style={{ width: '100%', background: '#0F0F12', color: '#fff', padding: '18px 24px', borderRadius: 9999, border: 'none', fontFamily: T.sans, fontSize: 18, fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <span>Continue Learning</span>
            <span style={{ fontSize: 24 }}>✨</span>
          </button>
        </div>
      </div>
    </div>
  );
}

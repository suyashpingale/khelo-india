/**
 * Khelo India — New Feature Screens
 * 1. ChallengesScreen      → /challenges
 * 2. EventRegistration     → /play/event/:id/register
 * 3. StreakTracker widget  → embedded in Discover + My Space
 *
 * Same T tokens as screens.jsx — import from there or copy the T object.
 * Fonts: Lora (serif headings) + Inter (body). Load in index.html.
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const T = {
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
  illusBlue:    'linear-gradient(160deg, #F5C4AA 0%, #E85D24 100%)',
  illusOrange:  'linear-gradient(135deg, #FED7AA 0%, #F97316 60%, #EA580C 100%)',
  illusGreen:   'linear-gradient(135deg, #BBF7D0 0%, #4ADE80 50%, #16A34A 100%)',
  illusViolet:  'linear-gradient(135deg, #E9D5FF 0%, #A855F7 60%, #7E22CE 100%)',
  illusRed:     'linear-gradient(135deg, #FECACA 0%, #F87171 50%, #DC2626 100%)',
  heroGradient: `radial-gradient(ellipse 60% 55% at 50% -5%, #F97316 0%, #FB923C 25%, transparent 65%),
                 radial-gradient(ellipse 45% 55% at -5% 50%, #F5C4AA 0%, transparent 60%),
                 radial-gradient(ellipse 45% 55% at 105% 50%, #F5C4AA 0%, transparent 60%)`,
  fontSerif:    "'Lora', Georgia, serif",
  fontSans:     "'Inter', system-ui, sans-serif",
};

const HeroStrip = ({ height = 180, children, style = {} }) => (
  <div style={{ position:'relative', height, background:`${T.heroGradient}, ${T.bgPage}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:20, overflow:'hidden', flexShrink:0, ...style }}>
    {children}
  </div>
);

const ScrollMotif = ({ size = 80, color = '#0F0F12', opacity = 0.8 }) => (
  <svg width={size} height={size*0.44} viewBox="0 0 160 70" fill="none" style={{ opacity }}>
    <path d="M80 35 Q68 14 54 20 Q42 26 45 38 Q48 50 60 44 Q70 38 67 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M80 35 Q92 14 106 20 Q118 26 115 38 Q112 50 100 44 Q90 38 93 26" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="22" y1="35" x2="52" y2="35" stroke={color} strokeWidth="0.9"/>
    <line x1="108" y1="35" x2="138" y2="35" stroke={color} strokeWidth="0.9"/>
    <circle cx="80" cy="35" r="2.5" fill={color}/>
    <circle cx="36" cy="35" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="124" cy="35" r="1.5" fill={color} opacity="0.5"/>
  </svg>
);

const BadgePill = ({ children, color = T.pillText, bg = T.pillBg, border = T.pillBorder }) => (
  <span style={{ background:bg, color, border:`1px solid ${border}`, borderRadius:9999, padding:'5px 14px', fontFamily:T.fontSans, fontSize:12, fontWeight:500 }}>{children}</span>
);

const SectionLabel = ({ children, style={} }) => (
  <p style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:500, letterSpacing:'0.6px', textTransform:'uppercase', color:'#888888', ...style }}>{children}</p>
);

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{ background:T.bgCard, borderRadius:18, border:`0.5px solid ${T.borderLight}`, padding:18, ...style }}>{children}</div>
);

const ProgressBar = ({ value=0, color='linear-gradient(90deg, #818CF8, #6366F1)', height=4 }) => (
  <div style={{ height, background:'#E5E5EA', borderRadius:height/2, overflow:'hidden' }}>
    <div style={{ height, width:`${Math.min(100,value)}%`, background:color, borderRadius:height/2, transition:'width .4s ease' }}/>
  </div>
);

const BtnPrimary = ({ children, onClick, disabled=false, style={} }) => (
  <button onClick={onClick} disabled={disabled} style={{ background:disabled?'#D1D1D8':'#0F0F12', color:disabled?'#9090A0':'#FFFFFF', border:'none', borderRadius:12, padding:'14px 28px', width:'100%', fontFamily:T.fontSans, fontSize:16, fontWeight:600, letterSpacing:'-0.01em', cursor:disabled?'not-allowed':'pointer', ...style }}>{children}</button>
);

const BtnSecondary = ({ children, onClick, style={} }) => (
  <button onClick={onClick} style={{ background:T.bgCard, color:T.textPrimary, border:`1px solid ${T.borderMed}`, borderRadius:12, padding:'14px 28px', width:'100%', fontFamily:T.fontSans, fontSize:16, fontWeight:400, cursor:'pointer', ...style }}>{children}</button>
);

// ─────────────────────────────────────────────
// FEATURE 1: CHALLENGES HUB
// Route: /challenges
// ─────────────────────────────────────────────

const CHALLENGES = [
  { id:1, title:'30km Cycling Sprint', sport:'Cycling', xp:100, days:2,  progress:68, gradient:T.illusBlue,   participants:142, joined:true  },
  { id:2, title:'100 Free Throws',      sport:'Basketball', xp:250, days:5, progress:30, gradient:T.illusOrange, participants:89,  joined:true  },
  { id:3, title:'5K Morning Run',       sport:'Athletics',  xp:80,  days:8, progress:0,  gradient:T.illusGreen,  participants:310, joined:false },
  { id:4, title:'Flexibility Week',     sport:'Gymnastics', xp:120, days:6, progress:0,  gradient:T.illusViolet, participants:56,  joined:false },
];

const LEADERBOARD = [
  { rank:1,  name:'Priya Sharma',   state:'MH', xp:1840, you:false },
  { rank:2,  name:'Arjun Rao',      state:'MH', xp:1620, you:true  },
  { rank:3,  name:'Kabir Nair',     state:'KA', xp:1540, you:false },
  { rank:4,  name:'Meena Iyer',     state:'TN', xp:1380, you:false },
  { rank:5,  name:'Rohit Desai',    state:'GJ', xp:1210, you:false },
  { rank:6,  name:'Tanvi Patel',    state:'GJ', xp:1090, you:false },
  { rank:7,  name:'Amit Verma',     state:'UP', xp: 980, you:false },
];

export function ChallengesScreen() {
  const [tab, setTab]   = useState('Challenges');
  const [lbTab, setLbTab] = useState('State');
  const tabs = ['Challenges','Leaderboard'];
  const lbTabs = ['State','National'];

  const totalXP = 1620;

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage, display:'flex', flexDirection:'column', paddingBottom:80 }}>

      <HeroStrip height={190}>
        <div style={{ position:'absolute', top:55, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <ScrollMotif size={70}/>
          <BadgePill>{totalXP} XP total</BadgePill>
        </div>
        <h1 style={{ fontFamily:T.fontSerif, fontSize:26, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.02em' }}>Challenges</h1>
      </HeroStrip>

      {/* Tab strip */}
      <div style={{ display:'flex', background:T.bgCard, borderBottom:`0.5px solid ${T.borderLight}`, flexShrink:0 }}>
        {tabs.map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:'13px 0', border:'none', background:'transparent', fontFamily:T.fontSans, fontSize:14, fontWeight:tab===t?600:400, color:tab===t?T.textPrimary:T.textTertiary, borderBottom:tab===t?`2px solid ${T.accentIndigo}`:'2px solid transparent', cursor:'pointer', transition:'all .15s' }}>{t}</button>
        ))}
      </div>

      <div style={{ flex:1, padding:'16px 16px 0', display:'flex', flexDirection:'column', gap:14 }}>

        {tab === 'Challenges' && (
          <>
            {/* XP progress card */}
            <Card style={{ padding:'14px 18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div>
                  <SectionLabel style={{ marginBottom:3 }}>Weekly XP</SectionLabel>
                  <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                    <span style={{ fontFamily:T.fontSerif, fontSize:32, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.03em' }}>340</span>
                    <span style={{ fontFamily:T.fontSans, fontSize:13, color:T.textSecond }}> / 500 XP</span>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <SectionLabel style={{ marginBottom:3 }}>Level</SectionLabel>
                  <span style={{ fontFamily:T.fontSerif, fontSize:28, fontWeight:400, color:T.accentIndigo }}>4</span>
                </div>
              </div>
              <ProgressBar value={68}/>
              <p style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary, marginTop:6 }}>160 XP to reach Level 5</p>
            </Card>

            <SectionLabel>Active challenges</SectionLabel>

            {CHALLENGES.filter(c=>c.joined).map(c => (
              <Card key={c.id} style={{ padding:'16px 18px' }}>
                <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  {/* Gradient icon */}
                  <div style={{ width:44, height:44, borderRadius:12, background:c.gradient, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:T.fontSans, fontSize:14, fontWeight:600, color:T.textPrimary, marginBottom:3 }}>{c.title}</div>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                      <span style={{ background:T.pillBg, color:T.pillText, border:`1px solid ${T.pillBorder}`, borderRadius:4, padding:'2px 7px', fontFamily:T.fontSans, fontSize:10, fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase' }}>{c.sport}</span>
                      <span style={{ fontFamily:T.fontSans, fontSize:11, fontWeight:600, color:T.accentIndigo }}>+{c.xp} XP</span>
                      <span style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary }}>{c.days}d left</span>
                    </div>
                    <ProgressBar value={c.progress}/>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                      <span style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary }}>{c.progress}% complete</span>
                      <span style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary }}>{c.participants} athletes</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <SectionLabel style={{ marginTop:4 }}>Join a challenge</SectionLabel>

            {CHALLENGES.filter(c=>!c.joined).map(c => (
              <Card key={c.id} style={{ padding:'14px 18px', display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ width:40, height:40, borderRadius:10, background:c.gradient, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:600, color:T.textPrimary }}>{c.title}</div>
                  <div style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary, marginTop:2 }}>{c.sport} · +{c.xp} XP · {c.participants} athletes</div>
                </div>
                <button style={{ background:T.bgPage, border:`1px solid ${T.borderMed}`, borderRadius:9999, padding:'6px 14px', fontFamily:T.fontSans, fontSize:12, fontWeight:600, color:T.textPrimary, cursor:'pointer', whiteSpace:'nowrap' }}>Join</button>
              </Card>
            ))}
          </>
        )}

        {tab === 'Leaderboard' && (
          <>
            {/* Scope tabs */}
            <div style={{ display:'flex', background:T.bgCard, border:`1px solid ${T.borderMed}`, borderRadius:9999, padding:3, gap:2 }}>
              {lbTabs.map(t => (
                <button key={t} onClick={()=>setLbTab(t)} style={{ flex:1, padding:'8px 0', borderRadius:9999, border:'none', background:lbTab===t?'#0F0F12':'transparent', color:lbTab===t?'#fff':T.textSecond, fontFamily:T.fontSans, fontSize:13, fontWeight:lbTab===t?600:400, cursor:'pointer' }}>{t}</button>
              ))}
            </div>

            <SectionLabel>{lbTab === 'State' ? 'Maharashtra' : 'All India'} · this month</SectionLabel>

            {/* Top 3 podium */}
            <Card style={{ padding:'20px 18px' }}>
              <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-end', gap:16, marginBottom:16 }}>
                {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((p, idx) => {
                  const heights = [72, 90, 60];
                  const colors  = [T.illusBlue, T.illusOrange, T.illusViolet];
                  const ranks   = [2, 1, 3];
                  return (
                    <div key={p.rank} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                      <div style={{ width:44, height:44, borderRadius:'50%', background:colors[idx], display:'flex', alignItems:'center', justifyContent:'center', fontFamily:T.fontSans, fontSize:14, fontWeight:700, color:'#fff', border:p.you?`3px solid ${T.accentIndigo}`:'3px solid transparent' }}>
                        {p.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div style={{ width:56, height:heights[idx], background:colors[idx], borderRadius:'6px 6px 0 0', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:6 }}>
                        <span style={{ fontFamily:T.fontSans, fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.9)' }}>{ranks[idx]}</span>
                      </div>
                      <span style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:500, color:T.textPrimary, textAlign:'center', maxWidth:60 }}>{p.name.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Full list */}
            {LEADERBOARD.map(p => (
              <div key={p.rank} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:`0.5px solid ${T.borderLight}`, background:p.you?T.pillBg:'transparent', borderRadius:p.you?10:0, paddingLeft:p.you?12:0, paddingRight:p.you?12:0 }}>
                <span style={{ fontFamily:T.fontSerif, fontSize:18, fontWeight:400, color:p.rank<=3?T.accentIndigo:T.textTertiary, width:28, textAlign:'center' }}>{p.rank}</span>
                <div style={{ width:34, height:34, borderRadius:'50%', background:p.you?T.illusBlue:T.bgPage, border:`1px solid ${T.borderMed}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:T.fontSans, fontSize:12, fontWeight:600, color:p.you?'#fff':T.textSecond, flexShrink:0 }}>
                  {p.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:p.you?600:500, color:T.textPrimary }}>{p.name} {p.you && <span style={{ fontSize:10, color:T.accentIndigo }}>(you)</span>}</div>
                  <div style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary }}>{p.state}</div>
                </div>
                <span style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:600, color:T.accentIndigo }}>{p.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// FEATURE 2: EVENT REGISTRATION FLOW
// Route: /play/event/:id/register
// 3 steps: Details → Info form → Confirmation
// ─────────────────────────────────────────────

export function EventRegistrationScreen({ onSuccess, onBack }) {
  const { state: event } = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', age:'', state:'', emergency:'', consent:false });

  const ev = event || {
    title: 'State Qualifiers — Kabaddi',
    sport: 'Kabaddi',
    date:  'Dec 12, 2024',
    venue: 'Shree Shiv Chhatrapati, Pune',
    organiser: 'Maharashtra Sports Authority',
    fee: 'Free',
    slots: 48,
    remaining: 12,
  };

  const indianStates = ['Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

  const isFormValid = form.name.trim() && form.age && form.state && form.consent;

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage, display:'flex', flexDirection:'column' }}>

      {/* Header */}
      <div style={{ background:`${T.heroGradient}, ${T.bgPage}`, padding:'52px 16px 20px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <button onClick={onBack} style={{ background:'rgba(255,255,255,0.8)', border:'none', borderRadius:9999, width:36, height:36, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>←</button>
          <h1 style={{ fontFamily:T.fontSerif, fontSize:20, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.015em' }}>Register for event</h1>
        </div>
        {/* Step indicator */}
        <div style={{ display:'flex', gap:6 }}>
          {['Details','Your info','Confirm'].map((label, i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
              <div style={{ height:3, borderRadius:2, background: i < step ? '#0F0F12' : i === step-1 ? '#0F0F12' : '#D1D1D8', transition:'background .2s' }}/>
              <span style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:500, color: i < step ? T.textPrimary : T.textTertiary, letterSpacing:'0.04em', textTransform:'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, padding:'20px 16px', overflowY:'auto', display:'flex', flexDirection:'column', gap:14 }}>

        {/* STEP 1 — Event details */}
        {step === 1 && (
          <>
            {/* Event hero card */}
            <Card style={{ overflow:'hidden', padding:0 }}>
              <div style={{ height:100, background:T.illusViolet, position:'relative', display:'flex', alignItems:'flex-end', padding:'12px 16px' }}>
                <div>
                  <span style={{ background:'rgba(255,255,255,0.2)', color:'#fff', border:'1px solid rgba(255,255,255,0.3)', borderRadius:4, padding:'2px 8px', fontFamily:T.fontSans, fontSize:10, fontWeight:500, letterSpacing:'0.05em', textTransform:'uppercase' }}>{ev.sport}</span>
                  <h2 style={{ fontFamily:T.fontSerif, fontSize:18, fontWeight:400, color:'#fff', marginTop:6 }}>{ev.title}</h2>
                </div>
              </div>
              <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
                {[['📅','Date', ev.date],['📍','Venue', ev.venue],['🏛','Organiser', ev.organiser],['₹','Entry', ev.fee]].map(([icon,label,val]) => (
                  <div key={label} style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <span style={{ fontSize:15, width:22, textAlign:'center', flexShrink:0 }}>{icon}</span>
                    <div>
                      <span style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:T.textTertiary, marginRight:8 }}>{label}</span>
                      <span style={{ fontFamily:T.fontSans, fontSize:13, color:T.textPrimary }}>{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Slots warning */}
            <div style={{ background:'#FFF7ED', border:'1px solid #FED7AA', borderRadius:12, padding:'10px 14px', display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontSize:16 }}>⚡</span>
              <span style={{ fontFamily:T.fontSans, fontSize:13, color:'#92400E', fontWeight:500 }}>Only {ev.remaining} spots left of {ev.slots}</span>
            </div>

            <BtnPrimary onClick={()=>setStep(2)}>Continue →</BtnPrimary>
          </>
        )}

        {/* STEP 2 — Registration form */}
        {step === 2 && (
          <>
            <Card>
              <SectionLabel style={{ marginBottom:14 }}>Your details</SectionLabel>
              {[
                { key:'name',      label:'Full name',     type:'text',   placeholder:'As per school/college ID' },
                { key:'age',       label:'Age',           type:'number', placeholder:'Must be 10–25 to compete' },
                { key:'emergency', label:'Emergency contact', type:'text', placeholder:'Parent / guardian phone number' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:14 }}>
                  <SectionLabel style={{ marginBottom:6 }}>{f.label}</SectionLabel>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    style={{ width:'100%', background:T.bgPage, border:`1px solid ${T.borderMed}`, borderRadius:10, height:48, padding:'0 14px', fontFamily:T.fontSans, fontSize:14, color:T.textPrimary, outline:'none', boxSizing:'border-box' }}
                  />
                </div>
              ))}

              <div style={{ marginBottom:14 }}>
                <SectionLabel style={{ marginBottom:6 }}>State</SectionLabel>
                <select value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} style={{ width:'100%', background:T.bgPage, border:`1px solid ${T.borderMed}`, borderRadius:10, height:48, padding:'0 14px', fontFamily:T.fontSans, fontSize:14, color:form.state?T.textPrimary:T.textTertiary, outline:'none', boxSizing:'border-box' }}>
                  <option value="" disabled>Select your state</option>
                  {indianStates.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Consent */}
              <div style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'12px 0', borderTop:`0.5px solid ${T.borderLight}` }}>
                <div onClick={()=>setForm(p=>({...p,consent:!p.consent}))} style={{ width:20, height:20, borderRadius:5, border:`1.5px solid ${form.consent?T.accentIndigo:T.borderMed}`, background:form.consent?T.accentIndigo:'transparent', cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', marginTop:1 }}>
                  {form.consent && <svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontFamily:T.fontSans, fontSize:12, color:T.textSecond, lineHeight:1.5 }}>I confirm that the information is accurate and I agree to the event rules and the Khelo India participation terms.</span>
              </div>
            </Card>

            <div style={{ display:'flex', gap:10 }}>
              <BtnSecondary onClick={()=>setStep(1)} style={{ width:'auto', padding:'14px 24px' }}>← Back</BtnSecondary>
              <BtnPrimary onClick={()=>setStep(3)} disabled={!isFormValid} style={{ flex:1 }}>Review →</BtnPrimary>
            </div>
          </>
        )}

        {/* STEP 3 — Confirmation */}
        {step === 3 && (
          <>
            <Card style={{ textAlign:'center', padding:'28px 18px' }}>
              {/* Checkmark animation placeholder */}
              <div style={{ width:64, height:64, borderRadius:'50%', background:T.illusGreen, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="28" height="28" viewBox="0 0 28 28"><polyline points="5,14 11,20 23,8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily:T.fontSerif, fontSize:22, fontWeight:400, color:T.textPrimary, marginBottom:8 }}>You're registered!</h2>
              <p style={{ fontFamily:T.fontSans, fontSize:13, color:T.textSecond, lineHeight:1.6, marginBottom:16 }}>
                Your spot at <strong style={{ color:T.textPrimary }}>{ev.title}</strong> is confirmed. We'll send a reminder 24 hours before the event.
              </p>
              <BadgePill color="#16A34A" bg="#F0FDF4" border="#86EFAC">Registration confirmed</BadgePill>
            </Card>

            {/* Summary */}
            <Card>
              <SectionLabel style={{ marginBottom:10 }}>Registration summary</SectionLabel>
              {[['Name', form.name || 'Arjun Rao'],['Event', ev.title],['Date', ev.date],['Venue', ev.venue],['Entry', ev.fee]].map(([label,val]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`0.5px solid ${T.borderLight}` }}>
                  <span style={{ fontFamily:T.fontSans, fontSize:12, color:T.textTertiary }}>{label}</span>
                  <span style={{ fontFamily:T.fontSans, fontSize:12, fontWeight:500, color:T.textPrimary, maxWidth:'55%', textAlign:'right' }}>{val}</span>
                </div>
              ))}
            </Card>

            {/* XP reward */}
            <div style={{ background:T.pillBg, border:`1px solid ${T.pillBorder}`, borderRadius:14, padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:500, color:T.accentIndigo }}>XP earned for registering</span>
              <span style={{ fontFamily:T.fontSerif, fontSize:22, fontWeight:400, color:T.accentIndigo }}>+25</span>
            </div>

            <BtnPrimary onClick={onSuccess}>Back to events</BtnPrimary>
          </>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// FEATURE 3: STREAK TRACKER
// Two parts:
//   A. StreakWidget   → embed inside Discover (home feed)
//   B. StreakHistoryScreen → /myspace/streak (full history)
// ─────────────────────────────────────────────

const DAYS = ['M','T','W','T','F','S','S'];
const THIS_WEEK = [true, true, true, false, true, false, false]; // today = index 4 (Thu)
const HISTORY = [
  { week:'Mar 10–16', days:[true,true,false,true,true,true,false], streak:5 },
  { week:'Mar 3–9',   days:[true,true,true,true,true,false,false], streak:5 },
  { week:'Feb 24–Mar 2', days:[false,true,true,true,false,false,false], streak:3 },
];

/** Embeddable streak card for the Discover home feed */
export function StreakWidget({ currentStreak = 4, longestStreak = 12 }) {
  const [checked, setChecked] = useState(THIS_WEEK);
  const todayIdx = 4;
  const todayDone = checked[todayIdx];

  const markToday = () => {
    if (todayDone) return;
    const next = [...checked];
    next[todayIdx] = true;
    setChecked(next);
  };

  return (
    <Card style={{ padding:'16px 18px' }}>
      {/* Header row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <div>
          <SectionLabel style={{ marginBottom:3 }}>Training streak</SectionLabel>
          <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
            <span style={{ fontFamily:T.fontSerif, fontSize:30, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.03em' }}>{currentStreak}</span>
            <span style={{ fontFamily:T.fontSans, fontSize:13, color:T.textSecond }}>days</span>
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <SectionLabel style={{ marginBottom:3 }}>Best</SectionLabel>
          <span style={{ fontFamily:T.fontSerif, fontSize:24, fontWeight:400, color:T.textTertiary }}>{longestStreak}</span>
        </div>
      </div>

      {/* Day dots */}
      <div style={{ display:'flex', gap:6, marginBottom:14 }}>
        {DAYS.map((d, i) => {
          const done   = checked[i];
          const today  = i === todayIdx;
          const future = i > todayIdx;
          return (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
              <div style={{
                width:32, height:32, borderRadius:'50%',
                background: done ? T.accentIndigo : future ? T.bgPage : '#F0F0F4',
                border: today && !done ? `2px solid ${T.accentIndigo}` : `1px solid ${T.borderMed}`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {done && <svg width="14" height="14" viewBox="0 0 14 14"><polyline points="2,7 5,10 12,4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:500, color:today?T.accentIndigo:T.textTertiary, letterSpacing:'0.04em' }}>{d}</span>
            </div>
          );
        })}
      </div>

      {/* Today CTA */}
      {!todayDone ? (
        <button onClick={markToday} style={{ width:'100%', background:T.bgPage, border:`1px solid ${T.accentIndigo}`, borderRadius:9999, padding:'10px 0', fontFamily:T.fontSans, fontSize:13, fontWeight:600, color:T.accentIndigo, cursor:'pointer' }}>
          Log today's training +10 XP
        </button>
      ) : (
        <div style={{ textAlign:'center', fontFamily:T.fontSans, fontSize:13, color:T.accentGreen, fontWeight:500 }}>
          Today logged · keep it up!
        </div>
      )}
    </Card>
  );
}

/** Full streak history screen — accessible from My Space */
export function StreakHistoryScreen({ onBack }) {
  const totalDays = 34;
  const currentStreak = 4;
  const longestStreak = 12;

  return (
    <div style={{ minHeight:'100vh', background:T.bgPage, display:'flex', flexDirection:'column', paddingBottom:80 }}>

      <HeroStrip height={170}>
        <div style={{ position:'absolute', top:55, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <ScrollMotif size={70}/>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12, width:'100%', padding:'0 16px' }}>
          <button onClick={onBack} style={{ background:'rgba(255,255,255,0.8)', border:'none', borderRadius:9999, width:36, height:36, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>←</button>
          <h1 style={{ fontFamily:T.fontSerif, fontSize:22, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.02em' }}>Training streak</h1>
        </div>
      </HeroStrip>

      <div style={{ padding:'16px 16px 0', display:'flex', flexDirection:'column', gap:14 }}>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {[['Current','4 days'],['Longest','12 days'],['Total','34 days']].map(([label,val]) => (
            <Card key={label} style={{ padding:'14px 16px', textAlign:'center' }}>
              <SectionLabel style={{ marginBottom:6 }}>{label}</SectionLabel>
              <span style={{ fontFamily:T.fontSerif, fontSize:22, fontWeight:400, color:T.textPrimary, letterSpacing:'-0.02em' }}>{val.split(' ')[0]}</span>
              <div style={{ fontFamily:T.fontSans, fontSize:11, color:T.textTertiary, marginTop:2 }}>{val.split(' ')[1]}</div>
            </Card>
          ))}
        </div>

        {/* This week */}
        <SectionLabel>This week</SectionLabel>
        <StreakWidget currentStreak={currentStreak} longestStreak={longestStreak}/>

        {/* Past weeks */}
        <SectionLabel>History</SectionLabel>
        {HISTORY.map(w => (
          <Card key={w.week} style={{ padding:'14px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:500, color:T.textPrimary }}>{w.week}</span>
              <span style={{ fontFamily:T.fontSans, fontSize:12, color:T.accentIndigo, fontWeight:500 }}>{w.streak} day streak</span>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {DAYS.map((d,i) => (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:w.days[i]?T.accentIndigo:'#F0F0F4', border:`1px solid ${w.days[i]?T.accentIndigo:T.borderMed}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {w.days[i] && <svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ fontFamily:T.fontSans, fontSize:9, color:T.textTertiary }}>{d}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

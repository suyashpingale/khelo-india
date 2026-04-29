import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  T, HeroStrip, ScrollMotif, DomeIllustration,
  BtnPrimary, BtnSecondary, SectionLabel, Card, LotusBlob
} from './screens';
import { StreakWidget } from './new-features';

// A. Sport Detail screen
export function SportDetailScreen() {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const sportName = sportId ? sportId.charAt(0).toUpperCase() + sportId.slice(1) : 'Kabaddi';
  
  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero (240px) */}
      <div style={{ position: 'relative', height: 260, background: 'linear-gradient(135deg, #E9D5FF 0%, #A855F7 60%, #7E22CE 100%)', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <DomeIllustration color="rgba(255,255,255,0.15)" />
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 52, left: 16, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display:'flex', alignItems:'center', justifyContent:'center', color: '#0F0F12' }}>←</button>
        <button style={{ position: 'absolute', top: 52, right: 16, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display:'flex', alignItems:'center', justifyContent:'center', color: '#0F0F12' }}>⤴</button>
        
        <ScrollMotif size={80} color="rgba(255,255,255,0.6)" />
        
        <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 32, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', margin: 0 }}>{sportName}</h1>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #E5E5EA', position: 'sticky', top: 0, zIndex: 10 }}>
        {['Overview', 'Rules', 'Videos', 'Science'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, 
              padding: '16px 0', 
              background: 'none', 
              border: 'none',
              fontFamily: T.fontSans, 
              fontSize: 14, 
              fontWeight: activeTab === tab ? 600 : 500, 
              color: activeTab === tab ? '#0F0F12' : '#9090A0',
              borderBottom: activeTab === tab ? `2px solid #F97316` : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '24px', flex: 1 }}>
        {activeTab === 'Overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontFamily: T.fontSans, fontSize: 15, color: '#6B6B7B', lineHeight: 1.6, margin: 0 }}>
              {sportName} is a sport that tests your agility, strength, and mental focus. Rooted in the rich cultural heritage of Bharat, it continues to inspire millions.
            </p>

            <div style={{ background: '#fff', borderRadius: 24, padding: 24, paddingBottom: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <SectionLabel style={{ color: '#0F0F12', marginBottom: 16 }}>Equipment Needed</SectionLabel>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['Standard Gear', 'Safety Kit', 'Indoor Shoes'].map(item => (
                  <span key={item} style={{ background: '#F9FAFB', border: `1px solid #E5E5EA`, borderRadius: 9999, padding: '8px 16px', fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, color: '#0F0F12' }}>{item}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '20px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 15, color: '#6B6B7B', fontWeight: 500 }}>Age range</span>
              <span style={{ background: '#FFF7ED', color: '#EA580C', padding: '6px 12px', borderRadius: 9999, fontFamily: T.fontSans, fontSize: 13, fontWeight: 600 }}>8 – 45 years</span>
            </div>

            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#16A34A', color: '#fff', border: 'none', borderRadius: 9999, padding: '16px', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, marginTop: 8, cursor: 'pointer', boxShadow: '0 8px 20px rgba(22, 163, 74, 0.25)' }}>
              WhatsApp Share <span style={{ fontSize: 18 }}>💬</span>
            </button>
          </div>
        )}

        {activeTab === 'Science' && (
          <div style={{ padding:'0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: 24, border: '1px solid #E5E5EA' }}>
              <h3 style={{ fontFamily: T.fontSerif, fontSize: 20, color: '#0F0F12', margin: '0 0 12px 0' }}>The Physics of {sportName}</h3>
              <p style={{ fontFamily: T.fontSans, fontSize: 15, color: '#6B6B7B', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                Understand the physics and biomechanics behind {sportId || sportName}. We break down complex movements into simple, easy-to-learn science concepts.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ background: '#F2F2F7', color: '#6B6B7B', padding: '6px 12px', borderRadius: 9999, fontFamily: T.fontSans, fontSize: 12, fontWeight: 600 }}>🌟 3 LESSONS</span>
                <span style={{ background: '#F2F2F7', color: '#6B6B7B', padding: '6px 12px', borderRadius: 9999, fontFamily: T.fontSans, fontSize: 12, fontWeight: 600 }}>⏱️ 5 MINS EACH</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate(`/learn/${sportId || 'Badminton'}/science`)}
              style={{ width:'100%', background:'#0F0F12', color:'#fff',
                border:'none', borderRadius:9999, padding:'18px 24px',
                fontFamily: T.fontSans, fontSize:16, fontWeight:600,
                cursor:'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            >
              Start science lessons →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// B. Test Card screen (/getfit/test/:testId)
export function TestCardScreen() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const currentStep = parseInt(testId || '1', 10);
  const totalSteps = 8;
  const [value, setValue] = useState(7.2);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      navigate(`/getfit/test/${currentStep + 1}`);
    } else {
      navigate('/getfit/results');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      navigate(`/getfit/test/${currentStep - 1}`);
    } else {
      navigate('/getfit');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Top bar */}
      <div style={{ padding: '60px 20px 20px', background: T.bgPage }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ height: 4, flex: i + 1 === currentStep ? 2 : 1, background: i + 1 === currentStep ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'all .2s' }} />
          ))}
        </div>
        <SectionLabel style={{ margin: 0 }}>Test {currentStep} of {totalSteps}</SectionLabel>
      </div>

      <div style={{ padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontFamily: T.fontSerif, fontSize: 24, fontWeight: 400, color: T.textPrimary, margin: '0 0 12px 0' }}>50m Sprint</h1>
        <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textSecond, lineHeight: 1.5, margin: '0 0 24px 0' }}>
          Run as fast as you can for 50 meters. Record your time in seconds.
        </p>

        {/* Illustration Card */}
        <div style={{ height: 160, background: T.illusOrange, borderRadius: 16, position: 'relative', overflow: 'hidden', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DomeIllustration color="rgba(255,255,255,0.2)" />
          {/* Inner icon/visual can be added here if needed */}
          <span style={{ fontSize: 40 }}>🏃</span>
        </div>

        {/* Numeric input */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setValue(v => Math.max(0, parseFloat((v - 0.1).toFixed(1))))} style={{ width: 48, height: 48, borderRadius: 9999, border: `1px solid ${T.borderMed}`, background: T.bgCard, fontSize: 24, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
            <div style={{ textAlign: 'center', minWidth: 100 }}>
              <span style={{ fontFamily: T.fontSerif, fontSize: 40, fontWeight: 400, color: T.textPrimary, display: 'block', lineHeight: 1.2 }}>{value}</span>
              <SectionLabel style={{ marginTop: 4 }}>Seconds</SectionLabel>
            </div>
            <button onClick={() => setValue(v => parseFloat((v + 0.1).toFixed(1)))} style={{ width: 48, height: 48, borderRadius: 9999, border: `1px solid ${T.borderMed}`, background: T.bgCard, fontSize: 24, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, marginTop: 'auto', marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
             <button onClick={handlePrev} style={{ width: '100%', background: 'none', border: 'none', color: T.textSecond, fontFamily: T.fontSans, fontSize: 16, fontWeight: 500, padding: '14px 28px', cursor: 'pointer' }}>
               Back
             </button>
          </div>
          <div style={{ flex: 1 }}>
            <BtnPrimary onClick={handleNext}>Next →</BtnPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

// C. Onboarding — Location Permission (/onboarding/location)
export function OnboardingLocationScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={120} style={{ flexShrink: 0, justifyContent: 'center', background: '#fff', borderBottom: '1px solid #E5E5EA' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.1) 0%, transparent 70%)', transform: 'scale(1.5) translateY(-20%)' }} />
        <div style={{ position: 'absolute', top: 68, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===3 ? 24 : 8, background: i===3 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
        <SectionLabel style={{ color: 'rgba(15,15,18,0.6)', marginTop: 40, zIndex: 1 }}>03 / Permission</SectionLabel>
      </HeroStrip>

      <div style={{ padding: '60px 24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)', borderRadius: '50%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, boxShadow: '0 10px 30px rgba(2, 132, 199, 0.2)' }}>
            <DomeIllustration color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 48, zIndex: 1 }}>📍</span>
        </div>

        <h2 style={{ fontFamily: T.fontSerif, fontSize: 28, fontWeight: 500, color: '#0F0F12', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
          Find sports near you
        </h2>
        <p style={{ fontFamily: T.fontSans, fontSize: 16, color: '#6B6B7B', lineHeight: 1.6, margin: '0 0 40px 0', maxWidth: 300 }}>
          We'll show you facilities, upcoming events, and coaches right in your area.
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto', paddingBottom: 20 }}>
          <button onClick={() => navigate('/onboarding/transparency')} style={{ width: '100%', background: '#0F0F12', color: '#fff', border: 'none', borderRadius: 9999, padding: '18px 24px', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}>
            Allow location access
          </button>
          <button onClick={() => navigate('/onboarding/transparency')} style={{ width: '100%', background: 'none', border: 'none', color: '#9090A0', fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: '10px' }}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-creating Discover Screen locally here since we delete it from App.tsx
export function DiscoverScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, paddingBottom: 100 }}>
      {/* Recreating the Discover screen from App.tsx using our components */}
      <HeroStrip height={220} style={{ paddingBottom: 0, alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
           <ScrollMotif size={80}/>
           <span style={{ fontFamily: T.fontSerif, fontStyle: 'italic', fontSize: 18, color: T.textPrimary }}>KHELO INDIA</span>
         </div>
         <div style={{ width: '100%', padding: '0 24px 24px' }}>
           <h1 style={{ fontFamily: T.fontSans, fontSize: 26, fontWeight: 400, color: T.textPrimary, margin: 0 }}>Namaskar, Arjun</h1>
         </div>
      </HeroStrip>
      
      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>
         <section>
            <SectionLabel style={{ marginBottom: 16 }}>This Week</SectionLabel>
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: T.illusBlue, height: 160 }}>
              <DomeIllustration />
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                 <span style={{ background: '#fff', color: T.accentIndigo, padding: '4px 12px', borderRadius: 9999, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>SPOTLIGHT</span>
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 16, color: '#fff', fontSize: 12, fontWeight: 500 }} onClick={() => navigate('/learn/badminton')}>Learn more →</div>
            </div>
         </section>
         <div style={{ padding: '0 0px' }}>
           <SectionLabel style={{ marginBottom: 10 }}>Training streak</SectionLabel>
           <StreakWidget currentStreak={4} longestStreak={12} />
         </div>

         <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <SectionLabel>Events Near You</SectionLabel>
              <button style={{ fontSize: 12, fontWeight: 500, color: T.accentIndigo, background: 'none', border: 'none' }}>View all</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
               {[
                 { title: 'State Kabaddi Trials', sport: 'Kabaddi', date: '24 Mar', dist: '2.4 km', venue: 'Shree Shiv Chhatrapati, Pune', organiser: 'Maharashtra Sports Authority', fee: 'Free', slots: 48, remaining: 12 },
                 { title: 'Open Wrestling Meet', sport: 'Wrestling', date: '26 Mar', dist: '4.1 km', venue: 'National Sports Arena', organiser: 'Wrestling Federation of India', fee: '100', slots: 32, remaining: 5 }
               ].map((event, i) => (
                 <div key={i} onClick={() => navigate('/play/event/1/register', { state: event })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${T.borderLight}`, cursor: 'pointer' }}>
                   <div>
                     <h3 style={{ fontSize: 14, fontWeight: 500, margin: '0 0 4px 0', color: T.textPrimary }}>{event.title}</h3>
                     <span style={{ fontSize: 12, color: T.textSecond }}>{event.date}</span>
                   </div>
                   <span style={{ background: '#fff', border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: '4px 12px', fontSize: 11, fontWeight: 500 }}>{event.dist}</span>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
}

// Re-creating Play Entry Screen (sport selector for Play)
export function PlayEntryScreen() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState(null);
  const sports = [
    { name: 'Athletics' },
    { name: 'Football' },
    { name: 'Cricket' },
    { name: 'Badminton' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: 100, position: 'relative' }}>
       {/* Top Orange Gradient Glow */}
       <div style={{ position: 'absolute', top: -50, left: 0, right: 0, height: 250, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.4) 0%, rgba(251, 146, 60, 0.2) 40%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
       
       <div style={{ position: 'relative', zIndex: 1 }}>
         <div style={{ width: '100%', padding: '60px 24px 20px', display: 'flex', justifyContent: 'center' }}>
           <h1 style={{ fontFamily: T.fontSerif, fontSize: 26, margin: 0, color: '#0F0F12', textAlign: 'center', fontWeight: 500, letterSpacing: '-0.01em' }}>Find a place to play</h1>
         </div>

         <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
           {/* Search Input */}
           <div style={{ position: 'relative' }}>
             <svg style={{ position: 'absolute', left: 16, top: 14 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9090A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             <input type="text" placeholder="Search sports" style={{ width: '100%', height: 46, background: '#fff', border: '1px solid #D1D1D8', borderRadius: 9999, padding: '0 16px 0 42px', fontFamily: T.fontSans, fontSize: 16, color: '#0F0F12', outline: 'none', boxSizing: 'border-box' }} />
           </div>

           {/* 2x2 Grid Pills */}
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
             {sports.map(s => (
               <button 
                 key={s.name}
                 onClick={() => setSelectedSport(s.name)}
                 style={{ 
                   padding: '12px 16px', borderRadius: 9999, 
                   background: selectedSport === s.name ? '#0F0F12' : '#fff',
                   border: selectedSport === s.name ? '1px solid #0F0F12' : `1px solid #D1D1D8`,
                   color: selectedSport === s.name ? '#fff' : '#0F0F12',
                   fontFamily: T.fontSans, fontSize: 14, fontWeight: 500,
                   cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap'
                 }}
               >{s.name}</button>
             ))}
           </div>
           
           <BtnPrimary disabled={!selectedSport} onClick={() => navigate(`/play/facilities/${selectedSport?.toLowerCase()}`)} style={{ opacity: selectedSport ? 1 : 0.4 }}>
             Find facilities →
           </BtnPrimary>

           <section style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <SectionLabel style={{ color: '#9090A0', fontWeight: 600, letterSpacing: '0.05em' }}>UPCOMING EVENTS</SectionLabel>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                 {[
                   { title: 'State Kabaddi Trials', sport: 'Kabaddi', date: '24 Mar', dist: '2.4 KM', venue: 'Shree Shiv Chhatrapati, Pune', organiser: 'Maharashtra Sports Authority', fee: 'Free', slots: 48, remaining: 12 },
                   { title: 'Open Wrestling Meet', sport: 'Wrestling', date: '26 Mar', dist: '4.1 KM', venue: 'National Sports Arena', organiser: 'Wrestling Federation of India', fee: '100', slots: 32, remaining: 5 }
                 ].map((event, i) => (
                   <div key={i} onClick={() => navigate('/play/event/1/register', { state: event })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid #D1D1D8`, cursor: 'pointer' }}>
                     <div>
                       <h3 style={{ fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, margin: '0 0 6px 0', color: '#0F0F12' }}>{event.title}</h3>
                       <span style={{ fontFamily: T.fontSans, fontSize: 13, color: '#6B6B7B' }}>{event.date}</span>
                     </div>
                     <span style={{ background: '#EEF2FF', border: `1px solid #C7D2FE`, color: '#4338CA', borderRadius: 9999, padding: '4px 10px', fontFamily: T.fontSans, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{event.dist}</span>
                   </div>
                 ))}
              </div>
           </section>
         </div>
       </div>
    </div>
  );
}
// Re-creating Fitness Results Screen
// Re-creating Fitness Results Screen
export function FitResultsScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: 100, display: 'flex', flexDirection: 'column' }}>
       {/* High-Fidelity Hero */}
       <div style={{ padding: '60px 24px 32px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', position: 'relative', overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, boxShadow: '0 10px 30px rgba(5, 150, 105, 0.2)' }}>
         <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)', pointerEvents: 'none' }} />
         <DomeIllustration color="rgba(255,255,255,0.1)" />
         <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
           <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '6px 12px', borderRadius: '9999px', fontFamily: T.fontSans, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Test Complete</span>
           <h1 style={{ fontFamily: T.fontSerif, fontSize: 36, margin: 0, color: '#fff', lineHeight: 1.1 }}>Your Fitness<br/>Profile</h1>
         </div>
       </div>

       <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
         
         <div style={{ display: 'flex', gap: 16 }}>
             <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 20, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #E5E5EA' }}>
                 <div style={{ fontFamily: T.fontSerif, fontSize: 28, color: '#0F0F12', marginBottom: 4 }}>Agility</div>
                 <div style={{ fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, color: '#16A34A' }}>TOP 10%</div>
             </div>
             <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 20, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #E5E5EA' }}>
                 <div style={{ fontFamily: T.fontSerif, fontSize: 28, color: '#0F0F12', marginBottom: 4 }}>Power</div>
                 <div style={{ fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, color: '#F97316' }}>TOP 25%</div>
             </div>
         </div>

         <div style={{ background: '#fff', borderRadius: 24, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 25px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden', border: '1px solid #E5E5EA' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle, #E0E7FF 0%, transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEF2FF', color: '#4338CA', padding: '4px 10px', borderRadius: 9999, fontFamily: T.fontSans, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4338CA' }} /> BEST MATCH
              </span>
              <h2 style={{ fontFamily: T.fontSerif, fontSize: 36, margin: '0 0 4px 0', color: '#0F0F12', letterSpacing: '-0.02em' }}>Wrestling</h2>
              <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 16 }}>🎯</span> 94% Match
              </span>
            </div>
            <div style={{ width: 80, height: 80, background: '#F9FAFB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '1px solid #F3F4F6', zIndex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              🤼
            </div>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto' }}>
           <button onClick={() => navigate('/learn/wrestling')} style={{ width: '100%', background: '#0F0F12', color: '#fff', border: 'none', borderRadius: 9999, padding: '18px 24px', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
             Explore Wrestling →
           </button>
           <button onClick={() => navigate('/play/facilities/wrestling')} style={{ width: '100%', background: '#fff', color: '#0F0F12', border: '1px solid #E5E5EA', borderRadius: 9999, padding: '18px 24px', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
             Find facilities
           </button>
         </div>
         
         <button onClick={() => navigate('/getfit')} style={{ background: 'none', border: 'none', color: '#9090A0', fontSize: 14, fontWeight: 500, fontFamily: T.fontSans, cursor: 'pointer', marginTop: 8 }}>
           Retake physical tests
         </button>
       </div>
    </div>
  );
}

// Onboarding Transparency (Privacy) Screen placeholder
export function OnboardingPrivacyScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={120} style={{ flexShrink: 0, justifyContent: 'center', background: '#fff', borderBottom: '1px solid #E5E5EA' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)', transform: 'scale(1.5) translateY(-20%)' }} />
        <div style={{ position: 'absolute', top: 68, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===4 ? 24 : 8, background: i===4 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
        <SectionLabel style={{ color: 'rgba(15,15,18,0.6)', marginTop: 40, zIndex: 1 }}>04 / Privacy</SectionLabel>
      </HeroStrip>
      
      <div style={{ padding: '60px 24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', borderRadius: '40px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, boxShadow: '0 10px 30px rgba(22, 163, 74, 0.2)' }}>
            <DomeIllustration color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 48, zIndex: 1 }}>🛡️</span>
        </div>

        <h2 style={{ fontFamily: T.fontSerif, fontSize: 28, fontWeight: 500, color: '#0F0F12', margin: '0 0 16px 0', letterSpacing: '-0.01em' }}>
          Your data, your control
        </h2>
        <p style={{ fontFamily: T.fontSans, fontSize: 16, color: '#6B6B7B', lineHeight: 1.6, margin: '0 0 40px 0', maxWidth: 300 }}>
          We never sell your fitness data. It is only used to recommend sports tailored for your body. Fully DPDPA 2023 compliant.
        </p>
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto', paddingBottom: 20 }}>
          <button onClick={() => navigate('/home')} style={{ width: '100%', background: '#0F0F12', color: '#fff', border: 'none', borderRadius: 9999, padding: '18px 24px', fontFamily: T.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Get Started</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
              <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
              <span style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%' }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Hero (240px) */}
      <div style={{ position: 'relative', height: 240, background: T.illusViolet, overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <DomeIllustration color="rgba(255,255,255,0.22)" />
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 52, left: 16, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
        <button style={{ position: 'absolute', top: 52, right: 16, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 9999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, display:'flex', alignItems:'center', justifyContent:'center' }}>⤴</button>
        
        <ScrollMotif size={72} color="rgba(255,255,255,0.6)" />
        
        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <h1 style={{ fontFamily: T.fontSerif, fontSize: 28, fontWeight: 400, color: '#fff', letterSpacing: '-0.015em', margin: 0 }}>{sportName}</h1>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', background: T.bgCard, borderBottom: `1px solid ${T.borderLight}` }}>
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
              fontWeight: activeTab === tab ? 600 : 400, 
              color: activeTab === tab ? T.textPrimary : T.textTertiary,
              borderBottom: activeTab === tab ? `2px solid ${T.accentIndigo}` : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '24px 16px', flex: 1 }}>
        {activeTab === 'Overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textSecond, lineHeight: 1.6, margin: 0 }}>
              {sportName} is a sport that tests your agility, strength, and mental focus. Rooted in the rich cultural heritage of Bharat, it continues to inspire millions.
            </p>

            <div>
              <SectionLabel style={{ marginBottom: 12 }}>Equipment Needed</SectionLabel>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Standard Gear', 'Safety Kit'].map(item => (
                  <span key={item} style={{ background: T.bgCard, border: `1px solid ${T.borderMed}`, borderRadius: 9999, padding: '6px 14px', fontFamily: T.fontSans, fontSize: 12, color: T.textPrimary }}>{item}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${T.borderLight}`, paddingTop: 16 }}>
              <span style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textSecond }}>Age range</span>
              <span style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 500, color: T.textPrimary }}>8 – 45 years</span>
            </div>

            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: T.accentGreen, color: '#fff', border: 'none', borderRadius: 9999, padding: '14px', fontFamily: T.fontSans, fontSize: 15, fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>
              WhatsApp Share
            </button>
          </div>
        )}

        {activeTab === 'Science' && (
          <div style={{ padding:'20px 0' }}>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14,
              color:'#6B6B7B', lineHeight:1.7, marginBottom:16 }}>
              Understand the physics and biomechanics behind {sportId || sportName}.
              3 lessons · 5 minutes each · earn badges.
            </p>
            <button
              onClick={() => navigate(`/learn/${sportId || 'Badminton'}/science`)}
              style={{ width:'100%', background:'#0F0F12', color:'#fff',
                border:'none', borderRadius:9999, padding:'14px 28px',
                fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:600,
                cursor:'pointer' }}
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
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={200} style={{ flexShrink: 0, justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 30, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===3 ? 24 : 8, background: i===3 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
        <div style={{ width: 140, height: 140, background: T.illusBlue, borderRadius: 24, position: 'relative', overflow: 'hidden', marginTop: 30 }}>
            <DomeIllustration color="rgba(255,255,255,0.4)" />
        </div>
      </HeroStrip>

      <div style={{ padding: '40px 24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontFamily: T.fontSerif, fontSize: 26, fontWeight: 400, color: T.textPrimary, marginBottom: 12 }}>
          Find sports near you
        </h2>
        <p style={{ fontFamily: T.fontSans, fontSize: 15, color: T.textSecond, lineHeight: 1.6, marginBottom: 40, maxWidth: 280 }}>
          We'll show you facilities, events, and coaches in your area.
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', paddingBottom: 20 }}>
          <BtnPrimary onClick={() => navigate('/onboarding/transparency')}>Allow location access</BtnPrimary>
          <BtnSecondary onClick={() => navigate('/onboarding/transparency')} style={{ border: 'none', background: 'transparent', color: T.textSecond }}>Skip for now</BtnSecondary>
        </div>
      </div>
    </div>
  );
}

// Re-creating Discover Screen locally here since we delete it from App.tsx
export function DiscoverScreen() {
  const navigate = useNavigate();

  const event1 = { title: 'District Athletics Trial', sport: 'Athletics', date: 'Mar 28, 2026', venue: 'Nehru Stadium, Bhopal', organiser: 'Sports Authority', fee: 'Free', slots: 48, remaining: 12 };
  const event2 = { title: 'Kho-Kho Open Camp', sport: 'Kho-Kho', date: 'Apr 2, 2026', venue: 'SAI Centre, Bhopal', organiser: 'Kho-Kho Association', fee: '100', slots: 32, remaining: 5 };

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, paddingBottom: 100 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EEE', padding: '14px 16px 11px', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: T.fontSans, fontSize: 10.8, color: '#888' }}>Good morning,</span>
          <span style={{ fontFamily: T.fontSans, fontSize: 12.3, color: '#111', fontWeight: 600 }}>Arjun 👋</span>
        </div>
        <div style={{ width: 36, height: 36, background: '#E6F1FB', color: '#0C447C', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, fontFamily: T.fontSans }}>
          AK
        </div>
      </div>
      
      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>
         {/* 1. Today's challenge streak card */}
         <section>
           <div style={{ background: '#111111', borderRadius: 14, padding: 16, width: '100%' }}>
             <div style={{ display: 'inline-block', background: '#FEF0E7', color: '#993C1D', borderRadius: 20, padding: '3px 8px', fontSize: 10, fontFamily: T.fontSans, fontWeight: 500, marginBottom: 12 }}>
               Today's challenge
             </div>
             <h3 style={{ fontSize: 16, color: '#fff', fontFamily: T.fontSans, margin: '0 0 4px 0', fontWeight: 600 }}>7-day sprint streak</h3>
             <p style={{ fontSize: 11.8, color: '#AAA', fontFamily: T.fontSans, margin: '0 0 16px 0' }}>Day 4 of 7 — keep going!</p>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ height: 6, flex: 1, background: '#333', borderRadius: 3, overflow: 'hidden' }}>
                 <div style={{ width: '57%', height: '100%', background: '#E85D24', borderRadius: 3 }} />
               </div>
               <span style={{ fontSize: 10, color: '#888', fontFamily: T.fontSans }}>4 / 7 days</span>
             </div>
           </div>
         </section>

         {/* 2. Sport of the week */}
         <section>
            <SectionLabel style={{ marginBottom: 16 }}>This Week</SectionLabel>
            <div onClick={() => navigate('/learn/kabaddi')} style={{ background: '#fff', border: '1px solid #EEE', borderLeft: '3px solid #E85D24', borderRadius: '0 14px 14px 0', padding: '13px 15px 13px 17px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, color: '#111', fontFamily: T.fontSans, fontWeight: 600 }}>Kabaddi</span>
                <span style={{ fontSize: 12, color: '#666', fontFamily: T.fontSans, lineHeight: '18px' }}>Learn the science behind a raid</span>
              </div>
              <span style={{ background: '#FEF0E7', color: '#993C1D', fontSize: 10, borderRadius: 20, padding: '4px 10px', fontFamily: T.fontSans, fontWeight: 500 }}>New lesson</span>
            </div>
         </section>

         {/* 3. Nearby events */}
         <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <SectionLabel>Events Near You</SectionLabel>
              <button style={{ fontSize: 12, fontWeight: 500, color: T.accentIndigo, background: 'none', border: 'none' }}>View all</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
               <div onClick={() => navigate('/play/event/1/register', { state: event1 })} style={{ background: '#fff', border: '1px solid #EEE', borderRadius: 14, padding: 15, cursor: 'pointer' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                   <span style={{ fontSize: 14, color: '#111', fontFamily: T.fontSans, fontWeight: 600 }}>District Athletics Trial</span>
                   <span style={{ background: '#EAF3DE', color: '#3B6D11', borderRadius: 9999, padding: '3px 10px', fontSize: 11, fontFamily: T.fontSans, fontWeight: 600 }}>2.3 km</span>
                 </div>
                 <div style={{ fontSize: 12, color: '#666', fontFamily: T.fontSans, lineHeight: '18px' }}>Mar 28 · Nehru Stadium, Bhopal</div>
               </div>
               <div onClick={() => navigate('/play/event/2/register', { state: event2 })} style={{ background: '#fff', border: '1px solid #EEE', borderRadius: 14, padding: 15, cursor: 'pointer' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                   <span style={{ fontSize: 14, color: '#111', fontFamily: T.fontSans, fontWeight: 600 }}>Kho-Kho Open Camp</span>
                   <span style={{ background: '#E6F1FB', color: '#0C447C', borderRadius: 9999, padding: '3px 10px', fontSize: 11, fontFamily: T.fontSans, fontWeight: 600 }}>4.1 km</span>
                 </div>
                 <div style={{ fontSize: 12, color: '#666', fontFamily: T.fontSans, lineHeight: '18px' }}>Apr 2 · SAI Centre, Bhopal</div>
               </div>
            </div>
         </section>

         {/* 4. Para Athlete spotlight */}
         <section>
           <SectionLabel style={{ marginBottom: 16 }}>PARA ATHLETE SPOTLIGHT</SectionLabel>
           <div style={{ background: '#111', borderRadius: 14, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
             <div style={{ width: 52, height: 52, background: '#E85D24', borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               <span style={{ fontSize: 18, color: '#fff', fontFamily: T.fontSans, fontWeight: 600 }}>SR</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
               <span style={{ fontSize: 13, color: '#fff', fontFamily: T.fontSans, fontWeight: 600 }}>Suresh Rana</span>
               <span style={{ fontSize: 11, color: '#AAA', fontFamily: T.fontSans }}>Para-Athletics · T44</span>
               <div style={{ marginTop: 4 }}>
                 <span style={{ display: 'inline-block', background: '#FEF0E7', color: '#993C1D', fontSize: 9.8, borderRadius: 20, padding: '3px 8px', fontFamily: T.fontSans, fontWeight: 600 }}>National gold 2024</span>
               </div>
             </div>
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
    { name: 'Athletics', gradient: T.illusOrange },
    { name: 'Football', gradient: T.illusGreen },
    { name: 'Cricket', gradient: T.illusBlue },
    { name: 'Badminton', gradient: T.illusViolet }
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, paddingBottom: 100 }}>
       <HeroStrip height={160}>
         <div style={{ width: '100%', padding: '0 24px 16px' }}>
           <h1 style={{ fontFamily: T.fontSerif, fontSize: 28, margin: '0 0 8px 0', color: T.textPrimary }}>Find a place to play</h1>
           <p style={{ fontFamily: T.fontSans, fontSize: 14, color: T.textSecond, margin: 0 }}>Pick your sport first — we'll find the right facilities.</p>
         </div>
       </HeroStrip>

       <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
           {sports.map(s => (
             <button 
               key={s.name}
               onClick={() => setSelectedSport(s.name)}
               style={{ 
                 padding: '12px 16px', borderRadius: 12, 
                 background: selectedSport === s.name ? s.gradient : '#fff',
                 border: selectedSport === s.name ? 'none' : `1px solid ${T.borderMed}`,
                 color: selectedSport === s.name ? '#fff' : T.textPrimary,
                 fontFamily: T.fontSans, fontSize: 14, fontWeight: selectedSport === s.name ? 600 : 400,
                 cursor: 'pointer'
               }}
             >{s.name}</button>
           ))}
         </div>
         
         <BtnPrimary disabled={!selectedSport} onClick={() => navigate(`/play/facilities/${selectedSport.toLowerCase()}`)}>
           Find facilities →
         </BtnPrimary>

         <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <SectionLabel>Upcoming Events</SectionLabel>
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
// Re-creating Fitness Results Screen
export function FitResultsScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, paddingBottom: 100 }}>
       <HeroStrip height={160}>
         <div style={{ width: '100%', padding: '0 24px 16px' }}>
           <SectionLabel style={{ color: 'rgba(15,15,18,0.6)', marginBottom: 4 }}>Your Results</SectionLabel>
           <h1 style={{ fontFamily: T.fontSerif, fontSize: 30, margin: 0, color: T.textPrimary }}>Fitness profile</h1>
         </div>
       </HeroStrip>

       <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>
         <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1.5px solid rgba(129, 140, 248, 0.3)` }}>
            <div>
              <SectionLabel style={{ color: T.accentIndigo, fontWeight: 700, marginBottom: 4 }}>BEST MATCH</SectionLabel>
              <h2 style={{ fontFamily: T.fontSerif, fontSize: 36, margin: '0 0 4px 0', color: T.textPrimary }}>Wrestling</h2>
              <span style={{ fontSize: 14, color: T.textSecond }}>94% match</span>
            </div>
            <LotusBlob gradient={T.illusBlue} size={80} />
         </Card>

         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
           <BtnPrimary onClick={() => navigate('/learn/wrestling')}>Explore Wrestling →</BtnPrimary>
           <BtnSecondary onClick={() => navigate('/play/facilities/wrestling')}>Find facilities →</BtnSecondary>
         </div>
         
         <button onClick={() => navigate('/getfit')} style={{ background: 'none', border: 'none', color: T.textTertiary, fontSize: 12, fontFamily: T.fontSans }}>
           Retake tests
         </button>
       </div>
    </div>
  );
}

// Onboarding Transparency (Privacy) Screen placeholder
export function OnboardingPrivacyScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: T.bgPage, display: 'flex', flexDirection: 'column' }}>
      <HeroStrip height={120} style={{ flexShrink: 0, justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 30, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 4, width: i===4 ? 24 : 8, background: i===4 ? '#0F0F12' : '#D1D1D8', borderRadius: 2, transition: 'width .2s' }}/>
          ))}
        </div>
      </HeroStrip>
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontFamily: T.fontSerif, fontSize: 26, color: T.textPrimary, margin: '0 0 24px 0' }}>Your data, your control</h2>
        <p style={{ fontFamily: T.fontSans, fontSize: 15, color: T.textSecond, marginBottom: 40 }}>We never sell your fitness data. Used only to recommend sports for you.</p>
        <div style={{ marginTop: 'auto', paddingBottom: 20 }}>
          <BtnPrimary onClick={() => navigate('/discover')}>Get started</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

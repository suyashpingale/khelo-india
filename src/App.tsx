import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Compass, BookOpen, MapPin, Activity, User, Trophy } from 'lucide-react';

import {
  LanguageSelectScreen,
  ProfileSetupScreen,
  LearnScreen,
  FacilityListScreen,
  FacilityDetailScreen,
  GetFitIntroScreen,
  MySpaceScreen
} from './screens';

import {
  SportDetailScreen,
  TestCardScreen,
  OnboardingLocationScreen,
  DiscoverScreen,
  PlayEntryScreen,
  FitResultsScreen,
  OnboardingPrivacyScreen
} from './screens-missing';

import {
  ChallengesScreen,
  EventRegistrationScreen,
  StreakHistoryScreen
} from './new-features';

function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const p = location.pathname;

  // Do not show tab bar on onboarding paths
  if (p.startsWith('/onboarding') || p === '/') return null;

  const tabs = [
    { id: 'discover', path: '/discover', icon: Compass, label: 'Discover' },
    { id: 'learn',    path: '/learn',    icon: BookOpen, label: 'Learn' },
    { id: 'play',     path: '/play',     icon: MapPin, label: 'Play' },
    { id: 'challenges', path: '/challenges', icon: Trophy, label: 'Challenges' },
    { id: 'myspace',  path: '/myspace',  icon: User, label: 'My Space' },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'calc(64px + env(safe-area-inset-bottom))',
      paddingBottom: 'env(safe-area-inset-bottom)',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '0.5px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 50,
      maxWidth: 480,
      margin: '0 auto'
    }}>
      {tabs.map((tab) => {
        const isActive = p.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <button 
            key={tab.id} 
            onClick={() => navigate(tab.path)}
            style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer',
              color: isActive ? '#4338CA' : '#9090A0',
              flex: 1
            }}
          >
            <Icon size={22} strokeWidth={1.5} color={isActive ? '#4338CA' : '#9090A0'} />
            <span style={{ 
              fontSize: 10, fontFamily: "'Inter', sans-serif", fontWeight: 500, 
              textTransform: 'uppercase', letterSpacing: '0.04em' 
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function InnerApp() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative', minHeight: '100vh', background: '#F2F2F7', overflowX: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/language" replace />} />
        <Route path="/onboarding/language" element={<LanguageSelectScreen onContinue={() => navigate('/onboarding/profile')} />} />
        <Route path="/onboarding/profile"  element={<ProfileSetupScreen onContinue={() => navigate('/onboarding/location')} />} />
        <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
        <Route path="/onboarding/transparency" element={<OnboardingPrivacyScreen />} />
        
        <Route path="/discover"  element={<DiscoverScreen />} />

        <Route path="/learn"               element={<LearnScreen onSelectSport={(s) => navigate(`/learn/${s.toLowerCase()}`)} />} />
        <Route path="/learn/:sportId"      element={<SportDetailScreen />} />

        <Route path="/play"                element={<PlayEntryScreen />} />
        <Route path="/play/facilities/:sport" element={<FacilityListScreen sport="Badminton" onSelectFacility={(f) => navigate(`/play/facility/${f.id}`, { state: f })} />} />
        <Route path="/play/facility/:id"   element={<FacilityDetailScreen facility={null} onBack={() => navigate(-1)} onDirections={() => {}} onSave={() => {}} />} />

        <Route path="/getfit"              element={<GetFitIntroScreen onStandard={() => navigate('/getfit/test/1')} onPara={() => navigate('/getfit/para/1')} />} />
        <Route path="/getfit/test/:testId" element={<TestCardScreen />} />
        <Route path="/getfit/results"      element={<FitResultsScreen />} />

        <Route path="/myspace"             element={<MySpaceScreen />} />
        
        <Route path="/challenges"                    element={<ChallengesScreen />} />
        <Route path="/play/event/:id/register"       element={<EventRegistrationScreen onBack={() => navigate(-1)} onSuccess={() => navigate('/play')} />} />
        <Route path="/myspace/streak"                element={<StreakHistoryScreen onBack={() => navigate('/myspace')} />} />
      </Routes>
      <TabBar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

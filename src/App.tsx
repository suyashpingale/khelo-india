import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
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
import { NewLearnScreen } from './new-learn-screen';

import {
  ChallengesScreen,
  EventRegistrationScreen,
  StreakHistoryScreen
} from './new-features';

import {
  NewChallengesScreen,
  NewPlayEntryScreen,
  NewFacilityListScreen,
  NewFacilityDetailScreen
} from './play-designs';

import {
  NewSportDetailScreen
} from './learn-redesign';

import {
  ParaAthletesScreen
} from './para-athletes';

import {
  TestCardScreen,
  OnboardingLocationScreen,
  FitResultsScreen,
  OnboardingPrivacyScreen
} from './screens-missing';

import {
  PhoneWrapper,
  ScienceHomeScreen,
  ScienceLessonScreen,
  ScienceQuizScreen,
  ScienceResultScreen,
  ProjectileMotionScreen
} from './phone-wrapper-and-science';

import {
  FigmaTabBar,
  WelcomeScreen,
  SportsSelectionScreen,
  HomeScreen,
  ExploreScreen,
  IndigenousSportsScreen,
  ProfileScreen
} from './figma-screens';

import { NewHomeScreen } from './components/PixelPerfectUI';


function ScienceHomeRoute() {
  const { sportId } = useParams();
  const navigate = useNavigate();
  return <ScienceHomeScreen sportId={sportId} onLesson={(l) => navigate(`/learn/${sportId}/science/${l.id}`, { state: { lesson: l } })} onBack={() => navigate(-1)} />;
}

function ScienceLessonRoute() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return <ScienceLessonScreen lesson={state?.lesson} onQuiz={() => navigate('quiz', { state })} onBack={() => navigate(-1)} />;
}

function ScienceQuizRoute() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return <ScienceQuizScreen lesson={state?.lesson} onResult={(correct, xp) => navigate('result', { state: { ...state, correct, xp } })} onBack={() => navigate(-1)} />;
}

function ScienceResultRoute() {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  return <ScienceResultScreen lesson={state?.lesson} correct={state?.correct} xpEarned={state?.xp} onDone={() => navigate(`/learn/${sportId}/science`)} />;
}

function InnerApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const p = location.pathname;
  return (
    <PhoneWrapper>
      <div style={{ position: 'relative', minHeight: '100vh', background: '#F2F2F7' }}>
        <Routes>
        <Route path="/" element={<Navigate to="/onboarding/language" replace />} />
        <Route path="/onboarding/language" element={<LanguageSelectScreen onContinue={() => navigate('/onboarding/welcome')} />} />
        <Route path="/onboarding/welcome" element={<WelcomeScreen />} />
        <Route path="/onboarding/sports-selection" element={<SportsSelectionScreen />} />
        
        <Route path="/onboarding/profile"  element={<ProfileSetupScreen onContinue={() => navigate('/onboarding/location')} />} />
        <Route path="/onboarding/location" element={<OnboardingLocationScreen />} />
        <Route path="/onboarding/transparency" element={<Navigate to="/home" replace />} />
        
        <Route path="/home"      element={<NewHomeScreen />} />
        <Route path="/explore"   element={<ExploreScreen />} />
        <Route path="/explore/para-athletes" element={<ParaAthletesScreen />} />
        <Route path="/explore/indigenous-sports" element={<IndigenousSportsScreen />} />
        
        <Route path="/discover"  element={<Navigate to="/home" replace />} />

        <Route path="/learn"               element={<NewLearnScreen />} />
        <Route path="/learn/:sportId"      element={<NewSportDetailScreen />} />

        <Route path="/para-athletes"       element={<ParaAthletesScreen />} />

        <Route path="/play"                element={<NewPlayEntryScreen />} />
        <Route path="/play/facilities/:sportId" element={<NewFacilityListScreen />} />
        <Route path="/play/facility/:id"   element={<NewFacilityDetailScreen />} />

        <Route path="/getfit"              element={<GetFitIntroScreen onStandard={() => navigate('/getfit/test/1')} onPara={() => navigate('/getfit/para/1')} />} />
        <Route path="/getfit/test/:testId" element={<TestCardScreen />} />
        <Route path="/getfit/results"      element={<FitResultsScreen />} />

        <Route path="/myspace"             element={<Navigate to="/profile" replace />} />
        <Route path="/profile"             element={<ProfileScreen />} />

        <Route path="/challenges"                    element={<NewChallengesScreen />} />
        <Route path="/play/event/:id/register"       element={<EventRegistrationScreen onBack={() => navigate(-1)} onSuccess={() => navigate('/play')} />} />
        <Route path="/myspace/streak"                element={<StreakHistoryScreen onBack={() => navigate('/profile')} />} />
        
        <Route path="/learn/:sportId/science" element={<ScienceHomeRoute />} />
        <Route path="/learn/:sportId/science/:lessonId" element={<ScienceLessonRoute />} />
        <Route path="/learn/:sportId/science/:lessonId/quiz" element={<ScienceQuizRoute />} />
        <Route path="/learn/:sportId/science/:lessonId/result" element={<ScienceResultRoute />} />
        
        <Route path="/learn/football/science/projectile-motion" element={<ProjectileMotionScreen onBack={() => window.history.back()} onContinue={() => {}} />} />
      </Routes>
    </div>
      <FigmaTabBar activePath={p} />
    </PhoneWrapper>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <InnerApp />
    </BrowserRouter>
  );
}

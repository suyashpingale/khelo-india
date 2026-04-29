import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, ChevronRight, MapPin, Clock, Info, Check, QrCode } from 'lucide-react';

/* =========================================
   1. FACILITY FINDER (PLAY ENTRY)
   Node: 2132:2190
   ========================================= */
export function NewPlayEntryScreen() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState(null);
  const sports = ['Athletics', 'Football', 'Cricket', 'Badminton'];

  const upcomingEvents = [
    { title: 'State Kabaddi Trials', date: '24 Mar', distance: '2.4 KM' },
    { title: 'Open Wrestling Meet', date: '26 Mar', distance: '4.1 KM' }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative font-sans overflow-hidden pb-32">
      <div className="absolute top-0 left-0 right-0 h-[300px] opacity-80 pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at 50% -10%, #fb923c 0%, #fb923c 15%, transparent 60%), radial-gradient(ellipse at -20% 40%, #c7d2fe 0%, transparent 60%), radial-gradient(ellipse at 120% 40%, #c7d2fe 0%, transparent 60%)' }}>
      </div>

      <div className="relative z-10 px-6 pt-16">
        <h1 className="font-serif text-[32px] leading-tight font-medium text-black tracking-tight mb-8">
          Find a place to play
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search sports..." 
            className="w-full h-[52px] bg-white rounded-full border border-gray-200 pl-12 pr-4 text-[15px] outline-none shadow-sm placeholder-gray-400 font-medium"
          />
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {sports.map(s => (
            <button 
              key={s}
              onClick={() => setSelectedSport(s)}
              className={`h-[48px] rounded-xl border flex items-center justify-center font-medium transition-all ${
                selectedSport === s 
                  ? 'bg-[#0f0f12] text-white border-[#0f0f12] shadow-md' 
                  : 'bg-white text-black border-gray-200 hover:border-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => selectedSport && navigate(`/play/facilities/${selectedSport.toLowerCase()}`)}
          className={`w-full h-[52px] rounded-full flex items-center justify-center font-semibold text-[15px] tracking-tight transition-all mb-12 ${
            selectedSport 
              ? 'bg-[#0f0f12] text-white' 
              : 'bg-[#d1d1d8] text-[#9090a0] cursor-not-allowed'
          }`}
        >
          Find facilities →
        </button>

        {/* Upcoming Events */}
        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-bold text-gray-400 tracking-[0.08em] uppercase">UPCOMING EVENTS</div>
          <div className="space-y-0">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-black/5 group cursor-pointer">
                <div>
                  <h3 className="font-semibold text-black text-[15px] mb-1">{ev.title}</h3>
                  <p className="text-gray-500 text-[13px]">{ev.date}</p>
                </div>
                <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-full px-3 py-1 flex items-center justify-center">
                  <span className="text-[#4338CA] text-[10px] font-bold tracking-wider">{ev.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   2. FACILITY LIST (SPORT SPECIFIC)
   Node: 2132:3590
   ========================================= */
export function NewFacilityListScreen() {
  const navigate = useNavigate();
  const { sportId } = useParams();
  const sportName = sportId ? sportId.charAt(0).toUpperCase() + sportId.slice(1) : 'Badminton';
  const filters = ['Nearest', 'Open now', 'Indoor', 'Outdoor'];
  const [activeFilter, setActiveFilter] = useState('Nearest');

  const facilities = [
    { name: 'Balewadi Sports Complex', status: 'OPEN', distance: '1.2 KM', address: 'Balewadi, Pune 411045' },
    { name: 'Shree Shiv Chhatrapati', status: 'OPEN', distance: '2.4 KM', address: 'Mahalunge, Pune 411057' },
    { name: 'Municipal Sports Ground', status: 'CLOSED', distance: '3.8 KM', address: 'Kothrud, Pune 411038' },
    { name: 'Deccan Gymkhana', status: 'OPEN', distance: '4.1 KM', address: 'Deccan, Pune 411004' }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative font-sans overflow-hidden pb-32">
      <div className="absolute top-0 left-0 right-0 h-[260px] opacity-70 pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at 80% -10%, #EEF2FF 0%, #DBEAFE 30%, #F2F2F7 70%), radial-gradient(ellipse at -10% -10%, #fff7ed 0%, #fff7ed 20%, #F2F2F7 60%)' }}>
      </div>

      <div className="relative z-10 pt-16 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5">
            <span className="text-xl">←</span>
          </button>
          <h1 className="font-serif text-[28px] font-medium text-black">{sportName} Facilities</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-semibold transition-all border ${
                f === activeFilter 
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-4 ring-indigo-50/50' 
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Facility Cards */}
        <div className="flex flex-col gap-4">
          {facilities.map((fac, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/play/facility/${i+1}`)}
              className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/5 flex flex-col gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-[17px] font-bold text-black tracking-tight">{fac.name}</h3>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${fac.status === 'OPEN' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className={`text-[10px] font-bold tracking-wider ${fac.status === 'OPEN' ? 'text-green-500' : 'text-gray-400'}`}>{fac.status}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-[14px] text-gray-400">{fac.address}</p>
                <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-full px-3 py-1 flex items-center justify-center">
                  <span className="text-[#4338CA] text-[10px] font-bold tracking-wider">{fac.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   3. FACILITY DETAIL
   Node: 2132:3706
   ========================================= */
export function NewFacilityDetailScreen() {
  const navigate = useNavigate();
  const amenities = [
    { icon: '🏸', label: 'Badminton' },
    { icon: '📏', label: '1.2 km' },
    { icon: '🟢', label: 'OPEN' }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative font-sans overflow-hidden pb-40">
      {/* Hero Image */}
      <div className="h-[280px] w-full relative overflow-hidden bg-black">
        <img 
          src="/img/sport-badminton.png" 
          className="w-full h-full object-cover opacity-60" 
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1626225967045-977674456735?q=80&w=2670&auto=format&fit=crop'; }}
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F2F2F7] via-transparent to-transparent pointer-events-none" />
        
        <button onClick={() => navigate(-1)} className="absolute top-14 left-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">←</span>
        </button>

        <div className="absolute bottom-10 left-6 right-6">
          <h1 className="font-serif text-[32px] font-medium text-white mb-4 drop-shadow-lg">
            Balewadi Sports Complex
          </h1>
          <div className="flex gap-2">
            {amenities.map((a, i) => (
              <span key={i} className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-4 py-1.5 text-[11px] font-semibold">
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 -mt-4 space-y-4">
        {/* Info Blocks */}
        {[
          { icon: Clock, label: 'TIMINGS', value: '6:00 AM – 10:00 PM, Mon–Sat' },
          { icon: MapPin, label: 'ADDRESS', value: 'Mahalunge Rd, Balewadi, Pune 411045' },
          { icon: Info, label: 'ENTRY', value: 'Free' }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5 flex items-center gap-5">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#9090A0] mb-0.5 uppercase">{item.label}</p>
              <p className="text-[15px] font-medium text-black">{item.value}</p>
            </div>
          </div>
        ))}

        {/* Amenities section */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
          <p className="text-[10px] font-bold tracking-widest text-[#9090A0] mb-4 uppercase">AMENITIES</p>
          <div className="flex flex-wrap gap-2">
            {['Coaching', 'Parking', 'Changing rooms', 'Canteen'].map(a => (
              <span key={a} className="bg-gray-50 text-gray-600 border border-gray-100 rounded-full px-4 py-2 text-[13px] font-medium">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Fixed Footer Buttons */}
        <div className="pt-4 space-y-3">
          <button className="w-full h-[60px] bg-[#0f0f12] text-white rounded-full font-bold text-[16px] shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
            Get directions →
          </button>
          <button className="w-full h-[60px] bg-white text-black border border-gray-200 rounded-full font-semibold text-[16px] shadow-sm active:scale-[0.98] transition-transform">
            Save facility
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   4. CHALLENGES SCREEN
   Node: 2132:3809
   ========================================= */
// ─── Figma Asset URLs (node 2132:3809) ───
const IMG_CYCLING    = "https://www.figma.com/api/mcp/asset/60ecc02c-d232-4606-bd7b-881b6d7195ab";
const IMG_BASKETBALL = "https://www.figma.com/api/mcp/asset/3f686cad-3b16-4848-b465-44ae1d0f1855";
const IMG_XP_ICON    = "https://www.figma.com/api/mcp/asset/7ef43917-1c59-4f14-9bdb-64f477318688";
// Weekly streak star assets — each day has its own Figma group asset
const STREAK_STARS = [
  "https://www.figma.com/api/mcp/asset/e87795df-74c1-4402-b23d-4d5046287d79", // Mon
  "https://www.figma.com/api/mcp/asset/fa07c934-b79f-42b0-922e-ad67a7b74d89", // Tue
  "https://www.figma.com/api/mcp/asset/17a4899e-9bb1-44a9-8b71-972ad05427da", // Wed
  "https://www.figma.com/api/mcp/asset/f0b128e5-6ba4-4300-a79f-d83e0d81dba8", // Thu
  "https://www.figma.com/api/mcp/asset/720b77ec-aa82-4667-8b30-4208fca8f0dd", // Fri
  "https://www.figma.com/api/mcp/asset/c2bc17ab-7d78-465c-aae5-ef7283fa46f2", // Sat
  "https://www.figma.com/api/mcp/asset/1283d67d-fbd2-49ee-a0db-3d41134205c4", // Sun
];

export function NewChallengesScreen() {
  const navigate = useNavigate();

  const streakXP = [
    { xp: '+150 XP' },
    { xp: '+60 XP' },
    { xp: '+240 XP' },
    { xp: '+110 XP' },
    { xp: '+40 XP' },
    { xp: '+60 XP' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const joinChallenges = [
    { title: '5K Morning Run',  meta: 'Athletics · +80 XP · 310 athletes' },
    { title: 'Flexibility Week', meta: 'Gymnastics · +120 XP · 56 athletes' },
    { title: 'Flexibility Week', meta: 'Gymnastics · +120 XP · 56 athletes' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', fontFamily: 'Segoe UI, sans-serif', overflowX: 'hidden', paddingBottom: 110, position: 'relative' }}>

      {/* Orange radial gradient header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 170, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
          radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          #F2F2F7
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 12px 0' }}>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h1 style={{ fontWeight: 600, fontSize: 22, color: '#0F0F12', margin: 0 }}>Challenges</h1>
          <div style={{ background: '#EEF2FF', border: '0.426px solid #C7D2FE', borderRadius: 9999, padding: '3px 8px' }}>
            <span style={{ fontSize: 8, fontWeight: 500, color: '#4338CA' }}>1620 XP total</span>
          </div>
        </div>

        {/* Orange streak banner */}
        <div style={{ background: '#F97316', border: '0.35px solid #E46A27', borderRadius: 8, overflow: 'hidden', padding: '8px 8px 10px', marginBottom: 8, position: 'relative' }}>
          <p style={{ fontSize: 8, fontWeight: 500, color: '#fff', textTransform: 'capitalize', letterSpacing: '0.36px', marginBottom: 6 }}>5 days on streak!</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {streakXP.map((item, i) => (
              <div key={i} style={{ flex: 1, background: '#FF9D58', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '8px 4px' }}>
                <img src={IMG_XP_ICON} alt="" style={{ width: 19, height: 19 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span style={{ fontSize: 6, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{item.xp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly streak stars card */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '10px 10px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {days.map((day, i) => (
            <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <img src={STREAK_STARS[i]} alt={day} style={{ width: 20, height: 20 }} />
              <span style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)' }}>{day}</span>
            </div>
          ))}
        </div>

        {/* Active Challenges label */}
        <p style={{ fontSize: 8, fontWeight: 500, color: '#9090A0', letterSpacing: '0.36px', textTransform: 'uppercase', marginBottom: 6 }}>Active Challenges</p>

        {/* Active challenge card — Cycling */}
        <div style={{ background: '#fff', border: '0.469px solid #C7D2FE', borderRadius: 8, overflow: 'hidden', height: 78, position: 'relative', marginBottom: 8 }}>
          {/* Sport image — positioned at left edge, flipped vertically */}
          <div style={{ position: 'absolute', left: -16, top: 8, width: 64, height: 64, overflow: 'hidden', transform: 'scaleY(-1)' }}>
            <img src={IMG_CYCLING} alt="Cycling" style={{ position: 'absolute', left: '-42%', top: 0, width: '178%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          {/* Text content */}
          <div style={{ position: 'absolute', left: 50, right: 10, top: 8, bottom: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#0F0F12', marginBottom: 4 }}>30km Cycling Sprint</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <span style={{ background: '#EEF2FF', border: '0.469px solid #C7D2FE', color: '#4338CA', fontSize: 7, fontWeight: 500, letterSpacing: '0.19px', textTransform: 'uppercase', borderRadius: 2, padding: '2px 5px' }}>Cycling</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#4338CA' }}>+100 XP</span>
              <span style={{ fontSize: 8, color: '#9090A0' }}>2d left</span>
            </div>
            {/* Progress bar */}
            <div style={{ background: '#E5E5EA', borderRadius: 2, height: 3, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(to right, #818CF8, #6366F1)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 8, color: '#9090A0' }}>68% complete</span>
              <span style={{ fontSize: 8, color: '#9090A0' }}>142 athletes</span>
            </div>
          </div>
        </div>

        {/* Active challenge card — Basketball */}
        <div style={{ background: '#fff', border: '0.469px solid #C7D2FE', borderRadius: 8, overflow: 'hidden', height: 78, position: 'relative', marginBottom: 10 }}>
          {/* Sport image — positioned at left edge */}
          <div style={{ position: 'absolute', left: -16, top: 4, width: 64, height: 64, overflow: 'hidden' }}>
            <img src={IMG_BASKETBALL} alt="Basketball" style={{ position: 'absolute', left: '-13.4%', top: '-13.4%', width: '126.8%', height: '126.8%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          {/* Text content */}
          <div style={{ position: 'absolute', left: 50, right: 10, top: 8, bottom: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#0F0F12', marginBottom: 4 }}>100 Free Throws</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <span style={{ background: '#EEF2FF', border: '0.469px solid #C7D2FE', color: '#4338CA', fontSize: 7, fontWeight: 500, letterSpacing: '0.19px', textTransform: 'uppercase', borderRadius: 2, padding: '2px 5px' }}>Basketball</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#4338CA' }}>+250 XP</span>
              <span style={{ fontSize: 8, color: '#9090A0' }}>5d left</span>
            </div>
            {/* Progress bar */}
            <div style={{ background: '#E5E5EA', borderRadius: 2, height: 3, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ width: '30%', height: '100%', background: 'linear-gradient(to right, #818CF8, #6366F1)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 8, color: '#9090A0' }}>30% complete</span>
              <span style={{ fontSize: 8, color: '#9090A0' }}>89 athletes</span>
            </div>
          </div>
        </div>

        {/* Join a challenge label */}
        <p style={{ fontSize: 8, fontWeight: 500, color: '#9090A0', letterSpacing: '0.36px', textTransform: 'uppercase', marginBottom: 6 }}>Join a Challenge</p>

        {/* Joinable challenge rows */}
        {joinChallenges.map((c, i) => (
          <div key={i} style={{ background: '#fff', border: '0.469px solid rgba(0,0,0,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', marginBottom: 6 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#0F0F12', marginBottom: 2 }}>{c.title}</p>
              <p style={{ fontSize: 8, color: '#9090A0' }}>{c.meta}</p>
            </div>
            <div style={{ background: '#EEF2FF', border: '0.363px solid #C7D2FE', borderRadius: 9999, padding: '4px 10px', flexShrink: 0 }}>
              <span style={{ fontSize: 7, fontWeight: 500, color: '#4338CA' }}>Join</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { T } from './screens';

/* =========================================
   1. SPORT DETAIL SCREEN (LEARNING)
   Nodes: 2132:2751 (Football), 2132:2851 (Mallakhamb)
   ========================================= */
export function NewSportDetailScreen() {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const sportName = sportId ? sportId.charAt(0).toUpperCase() + sportId.slice(1) : 'Football';

  const sportsData = {
    football: {
      desc: 'Football is a fast-paced team sport that builds agility, coordination, and sharp decision-making. Played across streets, schools, and stadiums in India, it encourages teamwork, discipline, and endurance while keeping the game fun and competitive.',
      equipment: ['Standard Gear', 'Safety Kit', 'Indoor Shoes'],
      age: '8 – 45 years',
      image: '/img/sport-football-big.png',
      heritage: false
    },
    mallakhamb: {
      desc: 'Mallakhamb is a traditional Indian sport that blends strength, flexibility, and balance through movements performed on a vertical pole or rope. It builds agility, coordination, and focus while reflecting Bharat\'s cultural heritage.',
      equipment: ['Pole / Rope', 'Grip powder'],
      safetyKit: ['Crash mats', 'First aid kit', 'Coach supervision'],
      age: '8 – 45 years',
      image: '/img/sport-mallakhamb.png',
      heritage: true
    },
    badminton: {
      desc: 'Badminton is a high-speed racket sport that demands lightning-fast reflexes and strategic positioning. It is one of the most popular individual sports in India, producing world-class champions.',
      equipment: ['Racket', 'Shuttlecock', 'Non-marking shoes'],
      age: '6 – 60 years',
      image: '/img/sport-badminton.png',
      heritage: false
    }
  };

  const data = sportsData[sportId?.toLowerCase()] || sportsData.football;

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col pb-32 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[280px] w-full shrink-0">
        <div className="absolute inset-0 bg-black">
          <img 
            src={data.image} 
            className="w-full h-full object-cover opacity-70 scale-110" 
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2736&auto=format&fit=crop'; }}
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F2F2F7] via-transparent to-transparent" />
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-14 left-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg z-20 active:scale-90 transition-transform"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Title */}
        <div className="absolute bottom-10 left-6 right-6 z-10">
          <div className="flex items-center gap-3 mb-2">
            {data.heritage && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Indigenous Sport</span>
            )}
            <div className="flex gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
               <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
          <h1 className="font-serif text-[42px] font-medium text-white leading-none drop-shadow-md tracking-tight">
            {sportName}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-black/5 px-2 sticky top-0 z-30">
        {['Overview', 'Rules', 'Videos & Science'].map(tab => (
          <button 
            key={tab}
            onClick={() => {
                if (tab === 'Videos & Science') {
                    navigate(`/learn/${sportId}/science`);
                } else {
                    setActiveTab(tab);
                }
            }}
            className={`flex-1 py-5 text-[14px] font-semibold transition-all relative ${
              activeTab === tab ? 'text-black' : 'text-[#9090A0]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#4338CA]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'Overview' && (
          <>
            <p className="text-[#6B6B7B] text-[15.5px] leading-relaxed font-medium">
              {data.desc}
            </p>

            <div className="space-y-4">
              <p className="text-[11px] font-bold text-[#9090A0] tracking-widest uppercase">Equipment Needed</p>
              <div className="flex flex-wrap gap-2.5">
                {data.equipment.map(item => (
                  <span key={item} className="bg-white border border-[#D1D1D8] text-[#0F0F12] px-5 py-2.5 rounded-full text-[13.5px] font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {data.safetyKit && (
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-[#9090A0] tracking-widest uppercase">Safety Kit</p>
                <div className="flex flex-wrap gap-2.5">
                  {data.safetyKit.map(item => (
                    <span key={item} className="bg-white border border-[#D1D1D8] text-[#0F0F12] px-5 py-2.5 rounded-full text-[13.5px] font-medium shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between py-6 border-t border-black/5">
              <span className="text-[#6B6B7B] font-medium text-[15px]">Age range</span>
              <span className="text-black font-semibold text-[15px]">{data.age}</span>
            </div>

            {/* CTA */}
            <button 
                 onClick={() => navigate(`/learn/${sportId}/science`)}
                 className="w-full bg-[#0F0F12] text-white py-5 rounded-full font-bold text-[16px] shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3">
              Start Learning Science →
            </button>
          </>
        )}

        {activeTab === 'Rules' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-serif text-[24px] font-medium text-black">General Rules</h3>
            <div className="space-y-4">
               {[
                 'Points are scored when the ball crosses the goal line.',
                 'Players except goalkeepers cannot touch the ball with hands.',
                 'A standard game has 11 players per side.',
                 'Fair play and sportsmanship are strictly enforced.'
               ].map((rule, i) => (
                 <div key={i} className="bg-white p-5 rounded-[20px] border border-black/5 shadow-sm flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[12px] font-bold shrink-0">{i+1}</div>
                   <p className="text-[14px] text-gray-700 font-medium leading-relaxed">{rule}</p>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

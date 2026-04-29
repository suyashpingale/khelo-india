import React from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Figma Asset URLs (node 2132:3274) ───
const IMG_T20_NEWS      = "https://www.figma.com/api/mcp/asset/8820e57c-2985-482c-b682-509d10c59ddf";
const IMG_TILTED_CARD   = "https://www.figma.com/api/mcp/asset/b380a854-a3be-4ffb-a637-d6e78efeaa7a";
const IMG_STAR_FILLED   = "https://www.figma.com/api/mcp/asset/31b76ec9-f487-4c20-bcf2-9def6456c84a";
const IMG_STAR_EMPTY    = "https://www.figma.com/api/mcp/asset/6a1d0f09-8d0c-4b34-9f31-592cee5c9d53";
const IMG_LEARN_ARC     = "https://www.figma.com/api/mcp/asset/b06d5301-b0d8-4e68-8829-3c325f43c38c";
const IMG_ARROW         = "https://www.figma.com/api/mcp/asset/8d70052a-e3f1-493d-a6ba-59ac647158c9";
const IMG_PARA_VECTOR   = "https://www.figma.com/api/mcp/asset/f68bbe38-64a5-4de5-becd-bf3df3b46cd3";
const IMG_NEWS_VECTOR   = "https://www.figma.com/api/mcp/asset/73070cfe-4dfd-4120-94d8-e9092f91f791";
const IMG_SPORTS_VECTOR = "https://www.figma.com/api/mcp/asset/5b698b33-f8d3-4cd1-90b3-af7b63ac8751";

export function NewHomeScreen() {
  const navigate = useNavigate();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const streakDays = [true, true, false, false, false, false, false];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: 100, fontFamily: 'Segoe UI, sans-serif', overflowX: 'hidden', position: 'relative' }}>

      {/* Orange + indigo radial gradient header — exact Figma gradients */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 200, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 70% at 50% 0%, rgba(249,115,22,1) 0%, rgba(251,146,60,0) 65%),
          radial-gradient(ellipse 60% 60% at -5% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          radial-gradient(ellipse 60% 60% at 105% 50%, rgba(199,210,254,1) 0%, rgba(199,210,254,0) 60%),
          #F2F2F7
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 16px 0' }}>

        {/* Greeting */}
        <h1 style={{ fontWeight: 600, fontSize: 26, color: '#0F0F12', margin: '0 0 14px', lineHeight: 1.1 }}>
          Namaskar Arjun
        </h1>

        {/* T20 News hero card */}
        <div
          onClick={() => navigate('/explore')}
          style={{ borderRadius: 12, overflow: 'hidden', height: 162, position: 'relative', background: '#61C8FF', marginBottom: 8, cursor: 'pointer' }}
        >
          <img
            src={IMG_T20_NEWS}
            alt="T20 News"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Dark gradient overlay — matches Figma from-transparent to-black/80 */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(102,102,102,0) 0%, rgba(0,0,0,0.8) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: '#fff', margin: '0 0 6px', lineHeight: 1.3 }}>
              History scripted as India capture T20 World Cup crown
            </p>
            <span style={{ fontSize: 9, color: '#F97316', textDecoration: 'underline' }}>Read More</span>
          </div>
        </div>

        {/* Training Streak label */}
        <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.4)', fontWeight: 500, letterSpacing: '0.03em', marginBottom: 6 }}>
          Training Streak &amp; Challenges <span style={{ color: '#F97316' }}>›</span>
        </p>

        {/* Streak card — Figma star assets */}
        <div
          onClick={() => navigate('/challenges')}
          style={{ background: '#fff', borderRadius: 12, padding: '14px 10px', marginBottom: 8, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {days.map((day, idx) => (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <img
                  src={streakDays[idx] ? IMG_STAR_FILLED : IMG_STAR_EMPTY}
                  alt={day}
                  style={{ width: 22, height: 22 }}
                />
                <span style={{ fontSize: 7, color: 'rgba(0,0,0,0.6)', fontWeight: 500 }}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning card — indigo border, arc + tilted card + arrows from Figma */}
        <div
          onClick={() => navigate('/learn/football/science')}
          style={{ background: '#fff', borderRadius: 12, border: '0.5px solid #C7D2FE', height: 107, overflow: 'hidden', position: 'relative', marginBottom: 8, cursor: 'pointer' }}
        >
          {/* Right side: arc decoration + tilted card */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, overflow: 'hidden' }}>
            {/* Arc — Figma: rotate(-90deg) scaleY(-1) */}
            <img
              src={IMG_LEARN_ARC}
              alt=""
              style={{
                position: 'absolute',
                left: -4, top: '50%',
                width: 68, height: 131,
                objectFit: 'contain',
                transform: 'translateY(-50%) rotate(-90deg) scaleY(-1)',
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Tilted card — Figma: rotate(12.91deg), shadow */}
            <img
              src={IMG_TILTED_CARD}
              alt=""
              style={{
                position: 'absolute',
                right: 4, top: 12,
                width: 82, height: 75,
                objectFit: 'cover',
                borderRadius: '0 0 9px 0',
                transform: 'rotate(12.91deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Arrow vector — motion indicator */}
          <div style={{ position: 'absolute', top: '50%', right: 108, transform: 'translateY(-50%)', width: 20, height: 20 }}>
            <img
              src={IMG_ARROW}
              alt=""
              style={{ width: '100%', height: '100%' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Text */}
          <div style={{ padding: '14px 14px', maxWidth: '56%' }}>
            <p style={{ fontSize: 10, color: '#F97316', fontWeight: 500, marginBottom: 6 }}>Continue Learning</p>
            <h3 style={{ fontWeight: 600, fontSize: 16, color: '#0F0F12', margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Projectile Motion in football
            </h3>
          </div>
        </div>

        {/* Discover section */}
        <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.4)', fontWeight: 500, letterSpacing: '0.03em', marginBottom: 8 }}>Discover</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 105px', gridTemplateRows: '44px 63px', gap: 8, height: 115 }}>

          {/* Para Athletes — large left tile, indigo radial gradient + vector */}
          <div
            onClick={() => navigate('/explore/para-athletes')}
            style={{
              gridRow: '1 / 3', borderRadius: 8, overflow: 'hidden', position: 'relative', cursor: 'pointer',
              background: 'radial-gradient(ellipse at center, #2300B0 0%, #3C1DB8 25%, #5439C0 50%, #6D56C9 75%, #8572D1 100%)',
            }}
          >
            {/* Figma vector decoration */}
            <img
              src={IMG_PARA_VECTOR}
              alt=""
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 115, height: 115 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span style={{ position: 'absolute', bottom: 10, left: 10, fontWeight: 600, fontSize: 14, color: '#fff' }}>Para Athletes</span>
          </div>

          {/* Sports tile — sky blue + vector */}
          <div
            onClick={() => navigate('/explore')}
            style={{ borderRadius: 8, overflow: 'hidden', position: 'relative', background: '#61C8FF', cursor: 'pointer' }}
          >
            <img
              src={IMG_SPORTS_VECTOR}
              alt=""
              style={{ position: 'absolute', left: '50%', bottom: -24, transform: 'translateX(-50%)', width: 87 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 600, fontSize: 14, color: '#fff', whiteSpace: 'nowrap' }}>Sports</span>
          </div>

          {/* News tile — green + vector */}
          <div
            onClick={() => navigate('/explore')}
            style={{ borderRadius: 8, overflow: 'hidden', position: 'relative', background: '#83C040', cursor: 'pointer' }}
          >
            <img
              src={IMG_NEWS_VECTOR}
              alt=""
              style={{ position: 'absolute', left: '50%', bottom: -30, transform: 'translateX(-50%)', width: 95 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 600, fontSize: 14, color: '#fff', whiteSpace: 'nowrap' }}>News</span>
          </div>

        </div>
      </div>
    </div>
  );
}

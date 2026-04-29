# Khelo India — UI Revamp Handoff

**Project:** Khelo India — React + Vite app simulating the Khelo India sports platform
**Live URL:** https://khelo-india-tan.vercel.app
**Figma source:** https://www.figma.com/design/HYjMDN53RDh1Z1YiCN4k4Q/DP-Sem-5?node-id=2132-4111&m=dev

---

## What's been done

1. App is live on Vercel.
2. `src/phone-wrapper-and-science.jsx` — pill label renamed to "Learning Module Video"; placeholder `<video>` element added (pointing to `/learning-module.mp4`, user will drop file in later).
3. Figma design context has been extracted for all screens (see "Figma Screens Inventory" below).
4. Assets downloaded from Figma CDN to `public/img/` (see list below).

## What still needs to be done

**Create `src/figma-screens.jsx`** — a new file implementing all Figma-matched screens, then update `App.tsx` to wire them up with new routes and a new 4-tab dark-pill bottom nav.

---

## Tech stack & conventions

- Vite + React 19 + React Router v7
- **ALL screens use inline `style={{}}` — NOT Tailwind classes in JSX.** Match this exactly.
- Existing design token object `T` is exported from `src/screens.jsx` — import from there if needed.
- `src/App.tsx` wraps everything in `<PhoneWrapper>` from `src/phone-wrapper-and-science.jsx`.
- Current 5-tab white TabBar in `App.tsx` must be **replaced** with a new 4-tab dark pill nav (see below).

---

## New navigation architecture

Replace the existing `TabBar` component in `App.tsx` with a new one that has **4 tabs** in a dark pill (#0F0F12 background), centered horizontally, positioned at the bottom:

| Tab | Icon file | Route |
|-----|-----------|-------|
| Home | `/img/icon-home.svg` | `/home` |
| Explore | `/img/icon-explore.svg` | `/explore` |
| Learn | `/img/icon-learn.svg` | `/learn` |
| Profile | `/img/icon-profile.svg` | `/profile` |

Active tab icon tint: **#F97316** (orange). Inactive: **#9090A0**.

The pill is ~320px wide, ~56px tall, `borderRadius: 9999`, `background: '#0F0F12'`, bottom-centered with `margin: '0 auto'` and a 16px bottom margin. Hide on onboarding routes (`/onboarding/*` and `/`).

Also add redirect: `/` → `/onboarding/language` (already exists), and `/onboarding/transparency` → `/home` after completion.

---

## New routes to add in `App.tsx`

```
/home                          → <HomeScreen />
/explore                       → <ExploreScreen />
/explore/para-athletes         → <ParaAthletesScreen />
/explore/indigenous-sports     → <IndigenousSportsScreen />
/profile                       → <ProfileScreen />
/onboarding/welcome            → <WelcomeScreen />
/onboarding/sports-selection   → <SportsSelectionScreen />
```

Keep all existing routes intact. Update `/onboarding/transparency` to navigate to `/home` on completion. Update `DiscoverScreen` route to redirect to `/home` or keep as-is.

---

## Figma Screens — Design Spec

### Color palette
```
background page:   #F2F2F7
card bg:           #FFFFFF
primary orange:    #F97316
dark text:         #0F0F12
secondary text:    #6B6B7B
tertiary text:     #9090A0
border light:      rgba(0,0,0,0.06)
border medium:     #D1D1D8
green:             #16A34A
```

---

### 1. WelcomeScreen (`/onboarding/welcome`)

Full-screen dark background (`#0F0F12`). Center-aligned.
- Top: Khelo India logo text in white serif font, large (32px)
- Center: mascot image `/img/mascot.png` (~240px wide)
- Tagline: "India's Sports Platform" in white, 16px
- CTA button: orange pill button "Get Started" → navigate to `/onboarding/sports-selection`
- Skip link: "Already have an account? Sign in" in gray

---

### 2. SportsSelectionScreen (`/onboarding/sports-selection`)

White background with orange accent header.
- Header: "What sports interest you?" (serif, 26px, dark)
- Subtitle: "Select all that apply" (secondary text, 14px)
- Sport grid (3 columns) with pill-shaped toggles. Sports:
  - Cricket (`/img/sport-cricket.png`)
  - Football (`/img/sport-football-big.png`)
  - Badminton (`/img/sport-badminton.png`)
  - Hockey (`/img/sport-hockey.png`)
  - Basketball (`/img/sport-basketball.png`)
  - Kabaddi (`/img/sport-kabaddi.png`)
  - Tennis (`/img/sport-tennis.png`)
  - Table Tennis (`/img/table-tennis.png`)
  - Rugby (`/img/sport-rugby.png`)
- Selected state: orange border + orange background tint
- CTA: "Continue" pill button (dark) → navigate to `/home`

---

### 3. HomeScreen (`/home`)

```
Layout (scrollable, paddingBottom 80):

[HEADER]
  - "Khelo India" serif 24px left
  - notification bell icon right

[HERO BANNER] ~180px tall, orange gradient background
  - Left text: "Explore Indian Sports" serif 22px white
  - Subtext: "400+ Facilities · 12+ Sports" 13px white/70
  - Right: mascot.png image ~100px

[QUICK STATS ROW] 3 columns, white cards
  - "400+" / "Facilities"
  - "100+" / "Athletes"
  - "12+" / "Sports"

[SECTION: "Quick Access"] SectionLabel style
  Grid 2×3 of action cards (white, rounded-18, 80px tall):
    Row 1: [Explore Sports 🧭] [Learn & Train 📚]
    Row 2: [Play & Events 📍] [Fitness Test 💪]
    Row 3: [Indigenous Sports 🪘] [Para Athletes ♿]
  Each card: icon emoji left, label 13px semibold, arrow right
  Tapping "Para Athletes" → navigate('/explore/para-athletes')
  Tapping "Indigenous Sports" → navigate('/explore/indigenous-sports')
  Tapping "Explore Sports" → navigate('/explore')
  Tapping "Learn & Train" → navigate('/learn')

[SECTION: "Latest News"]
  Single wide card (~160px tall):
    background image: /img/news-t20.jpg (cover)
    LIVE badge (green dot + "LIVE" text) top-left
    Title: "India wins T20 series against Australia" white serif bottom

[SECTION: "Science Behind Sport"]
  Orange-tinted card with football image /img/ball-football.png right side
  Title: "Projectile Motion in Football"
  Subtitle: "How physics shapes the perfect kick"
  "Explore →" link in orange
  onPress → navigate('/learn/football/science/projectile-motion')
```

---

### 4. ExploreScreen (`/explore`)

```
[HEADER] "Explore" serif 24px + search icon

[SEARCH BAR] white rounded input, "Search sports, athletes..."

[CATEGORIES] 2×2 grid of large cards (~140px tall each):
  Card 1 — "Para Athletes"
    gradient: linear-gradient(135deg, #6366F1, #4338CA)
    icon: ♿  subtitle: "111 athletes"
    → navigate('/explore/para-athletes')

  Card 2 — "Indigenous Sports"
    gradient: linear-gradient(135deg, #F97316, #EA580C)
    icon: 🪘  subtitle: "12 sports"
    → navigate('/explore/indigenous-sports')

  Card 3 — "Challenges"
    gradient: linear-gradient(135deg, #16A34A, #15803D)
    icon: 🏆  subtitle: "Join & compete"
    → navigate('/challenges')

  Card 4 — "Facility Finder"
    gradient: linear-gradient(135deg, #0EA5E9, #0284C7)
    icon: 📍  subtitle: "400+ venues"
    → navigate('/play')

[SECTION: "Featured Sports"]
  Horizontal scroll row of sport pills with images:
    /img/sport-cricket.png — "Cricket"
    /img/sport-football-big.png — "Football"
    /img/sport-kabaddi.png — "Kabaddi"
    /img/sport-mallakhamb.png — "Mallakhamb"
  Each: 80×80 rounded white card, image top, label bottom 11px
  → navigate('/learn/' + sport)
```

---

### 5. ParaAthletesScreen (`/explore/para-athletes`)

```
[BACK BUTTON] ← top left

[HERO] Dark background (#0F0F12), 200px tall
  Title: "Para Athletes" white serif 28px
  Subtitle: "India's champions" white/60 14px

[CHAMPION CAROUSEL] white bg, horizontal scroll, 3 cards
  Each card 160px wide:
    - Placeholder colored rect for athlete photo (180px tall)
      (Figma had CDN images for Avani Lekhara, Sumit Antil, Pramod Bhagat)
    - Name bold 15px
    - Sport + medal emoji 13px secondary

[STATS ROW] 4 columns, centered
  "401" / "Athletes"
  "111" / "Gold Medals"
  "18" / "Sports"
  "236" / "Events"

[FILTER TABS] horizontal scroll pill tabs (orange active):
  Archery · Swimming · Athletics · Kabaddi

[SECTION: "Upcoming Events"]
  Card 1: "National Para Athletics Championship" — May 22
  Card 2: "Para Table Tennis Championship" — May 27
  Each: white card, orange date pill left, title right, "Register →" link

[TOPS SCHEME CARD] orange gradient card
  Title: "TOPS Scheme"
  Body: "Target Olympic Podium Scheme — support for elite para athletes"
  "Learn More →" white link
```

---

### 6. IndigenousSportsScreen (`/explore/indigenous-sports`)

```
[BACK BUTTON] ← top left

[HEADER] "Indigenous Sports" serif 26px + "12 Sports · 36 Modules" secondary

[FEATURED CARD] Mallakhamb — large card ~200px tall
  background: orange gradient
  Image: /img/sport-mallakhamb.png right side
  Title: "Mallakhamb" white serif 22px
  Subtitle: "Ancient Indian gymnastics" white/70
  "Explore →" white button

[STATS ROW] 3 columns
  "12" / "Sports"
  "36" / "Modules"
  "6" / "Subjects"

[GRID] 2×2 sport cards, each ~120px tall, white card:
  Kho-Kho    (image: /img/sport-kabaddi.png as placeholder)
  Gilli Danda (no image — use orange emoji placeholder 🏏)
  Kabaddi    (/img/sport-kabaddi.png)
  Kushti     (no image — use purple emoji placeholder 🤼)
  Each: image top-right, sport name serif 16px, "Traditional" label

[ORANGE CTA BUTTON] "Explore All Sports" full-width → navigate('/learn')
```

---

### 7. ProfileScreen (`/profile`)

```
[HEADER] "My Space" serif 24px

[USER CARD] white card, rounded-18
  Left: "AR" avatar circle (orange bg, white text, 52px)
  Center: "Arjun Rao" bold 17px, "Intermediate" orange badge pill
  Right: edit icon ✏️

[STATS ROW] 3 columns, border-right separators
  "7" / "Badges"
  "12" / "Sports"
  "3" / "Tests"

[TRAINING STREAK] white card
  Row: 🔥 icon, "4 day streak" bold left, "12 day best" secondary right
  7-day dots row: colored circles for each day (orange = done, gray = missed)

[SECTION: "Badges"] SectionLabel
  2×3 grid of badge cards:
    Earned (orange tint): "First Test ✓", "Sprint Star ✓", "3-Sport Explorer ✓"
    Locked (gray):        "Local Champion 🔒", "Team Player 🔒", "Iron Will 🔒"

[SECTION: "Saved Sports"] SectionLabel
  Horizontal tab pills: Badminton · Athletics · Kho-Kho
  Content card for active tab sport

[SIGN OUT] ghost button at bottom, red text
```

---

## Assets available in `public/img/`

```
mascot.png             — Khelo India mascot character
news-t20.jpg           — T20 cricket news image
ball-football.png      — Football/soccer ball
football.png           — Football icon
shoe-athletics.png     — Athletics shoe
qr-code.svg            — QR code placeholder

sport-cricket.png
sport-football-big.png
sport-badminton.png
sport-hockey.png
sport-basketball.png
sport-kabaddi.png
sport-tennis.png
sport-table-tennis.png
sport-rugby.png
sport-mallakhamb.png

card-athletics.svg
card-football.svg
card-football-shape.svg
card-swimming.svg
football-kick.svg

icon-home.svg
icon-explore.svg
icon-learn.svg
icon-profile.svg
```

---

## Key files

```
src/App.tsx                        — routes + TabBar (needs update)
src/screens.jsx                    — existing screens + shared components (exports T, HeroStrip, etc.)
src/screens-missing.tsx            — existing screens (DiscoverScreen, SportDetailScreen, etc.)
src/new-features.jsx               — ChallengesScreen, EventRegistrationScreen, StreakHistoryScreen
src/phone-wrapper-and-science.jsx  — PhoneWrapper, ScienceHomeScreen, ProjectileMotionScreen
src/figma-screens.jsx              — *** CREATE THIS FILE *** with all new Figma screens
src/index.css                      — Tailwind v4 + CSS variables
public/img/                        — all downloaded assets
```

---

## Implementation instructions

1. **Create `src/figma-screens.jsx`** — export:
   - `FigmaTabBar` (4-tab dark pill nav, replaces existing TabBar)
   - `WelcomeScreen`
   - `SportsSelectionScreen`
   - `HomeScreen`
   - `ExploreScreen`
   - `ParaAthletesScreen`
   - `IndigenousSportsScreen`
   - `ProfileScreen`

2. **Update `src/App.tsx`**:
   - Import all new screens from `./figma-screens`
   - Replace `TabBar` with `FigmaTabBar`
   - Add all new routes listed above
   - Keep all existing routes intact (science screens, facility screens, etc.)
   - Default redirect `/` → `/onboarding/language` (keep as-is)

3. **Style rules**:
   - Inline `style={{}}` objects only — no className usage
   - Orange `#F97316` as primary accent (replaces indigo)
   - Serif font: `"Lora", Georgia, serif`
   - Sans font: `"Inter", sans-serif`
   - `paddingBottom: 80` on scrollable screens (room for tab bar)
   - Rounded cards: `borderRadius: 18`

4. **After writing the files**, run `npx vercel --prod --yes` in the project root to deploy.

---

## Deployment

```bash
cd /Users/suyashpingale/Downloads/khelo-india
npx vercel --prod --yes
```

Vercel project is already linked. No additional config needed.

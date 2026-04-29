# UI-SPEC — Khelo India App
> Goal: consistent UI + better navigation across all screens. No major redesigns.

---

## 1. Design Tokens (single source of truth)

All screens must use the `T` object from `src/screens.jsx`. Never hardcode values.

| Token | Value | Usage |
|---|---|---|
| `T.bgPage` | `#F2F2F7` | Page background |
| `T.bgCard` | `#FFFFFF` | Cards, sheets |
| `T.textPrimary` | `#0F0F12` | Headings, body |
| `T.textSecond` | `#6B6B7B` | Subtitles, descriptions |
| `T.textTertiary` | `#9090A0` | Labels, captions |
| `T.borderLight` | `rgba(0,0,0,0.06)` | Card borders |
| `T.pillBg / T.pillBorder / T.pillText` | `#EEF2FF / #C7D2FE / #4338CA` | Tag pills |
| `T.accentIndigo` | `#4338CA` | Links, active states |
| `T.accentGreen` | `#16A34A` | Success, CTA secondary |
| **Orange accent** | `#F97316` | Primary CTA, highlights — add as `T.accent` |
| `T.fontSans` | `'Inter', system-ui, sans-serif` | All UI text |
| `T.fontSerif` | `'Lora', Georgia, serif` | Article titles only |
| `T.heroGradient` | orange+lavender radial | Top of every screen |

### Add to `T` in `screens.jsx`:
```js
accent: '#F97316',
accentDark: '#EA580C',
```

### Fix inconsistencies:
- `PixelPerfectUI.tsx` uses `'Segoe UI, sans-serif'` → change to `T.fontSans`
- `PixelPerfectUI.tsx` hardcodes `#F97316`, `#0F0F12`, `#F2F2F7` → use `T.accent`, `T.textPrimary`, `T.bgPage`

---

## 2. Typography Scale

| Role | Size | Weight | Font |
|---|---|---|---|
| Screen title | 26px | 600 | Sans |
| Section heading | 18px | 600 | Sans |
| Card title | 16px | 600 | Sans |
| Body | 14px | 400 | Sans |
| Label / caption | 11px | 500 | Sans |
| Micro label | 9px | 500 | Sans |

---

## 3. Spacing & Radius

| Element | Radius | Horizontal padding |
|---|---|---|
| Cards | `12px` | `16px` screen edge |
| Small tiles | `8px` | — |
| Pills / tags | `9999px` | `12px` |
| Bottom tab bar | `9999px` | — |

Screen edge padding: **16px** on all screens (some screens use 15px — normalise to 16px).

---

## 4. Navigation

### Tab Bar (`FigmaTabBar`)
- 4 tabs: **Home · Explore · Learn · Profile**
- Active tab: icon tinted orange (`#F97316`), label orange
- Inactive: icon + label `#9090A0`
- Hidden on all `/onboarding/*` routes ✓ (already done)
- Must appear on: `/home`, `/explore`, `/learn`, `/profile`, `/challenges`, `/play`

### Back Navigation
Every inner screen needs a back button (`←`) top-left. Screens currently missing it:
- `/explore/para-athletes`
- `/explore/indigenous-sports`
- `/play/facilities/:sportId`
- `/play/facility/:id`
- `/learn/:sportId`
- `/learn/:sportId/science`

Pattern to use (consistent across all):
```jsx
<button onClick={() => navigate(-1)} style={{
  position: 'absolute', top: 16, left: 16, zIndex: 10,
  background: 'rgba(255,255,255,0.9)', border: 'none',
  borderRadius: 9999, width: 36, height: 36,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 18, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
}}>←</button>
```

### Header Pattern
Every non-home screen should have a consistent top bar:
```
[← back]    Screen Title    [optional action]
```
- Background: `T.bgPage` or transparent over hero gradient
- Title: 17px, weight 600, `T.textPrimary`, centered

---

## 5. Card Pattern

All cards must follow:
```jsx
<div style={{
  background: T.bgCard,
  borderRadius: 12,
  padding: '16px',
  marginBottom: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  border: `0.5px solid ${T.borderLight}`,
  cursor: 'pointer'
}}>
```

---

## 6. Screen-by-screen Fixes

| Screen | Issue | Fix |
|---|---|---|
| Home (`/home`) | Font: Segoe UI → Inter | Use `T.fontSans` |
| Home | Hardcoded colors | Use `T.accent`, `T.textPrimary`, `T.bgPage` |
| All inner screens | Missing back button | Add back pattern (§4) |
| All screens | 15px edge padding → 16px | Normalise |
| Tab bar icons | SVG img tags don't tint | Already using emoji fallback — keep |
| Science screens | No tab bar shown | Add tab bar (not hidden on `/learn/*`) |

---

## 7. What NOT to change
- Layout structure and screen content
- Existing routing
- PhoneWrapper desktop shell
- Color palette — orange + indigo is correct

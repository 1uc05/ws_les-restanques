# Les Restanques — Holiday Rental Website

A modern presentation and direct booking website for **"Les Restanques"**, an official 3-star vacation rental villa with private pool located in Saint-Saturnin-lès-Apt (Luberon, Provence, France).

---

## 🌿 Overview & Key Features

- **Bilingual Public Showcase (FR / EN):** Magazine-style editorial design (*Provence Minérale*) built entirely around the property’s own photography, with interactive Google Maps, a filterable gallery, amenities overview, and authentic 5-star Airbnb guest reviews.
- **Direct 3-Step Booking Flow:** Direct booking request engine without upfront online payment. Selected dates are immediately held (`pending`) on the calendar upon submission to prevent double-booking.
- **Host Back-Office for Judith:** Streamlined admin dashboard with 1-click booking validation or rejection (with custom guest note), interactive availability planning, manual date blocking, and seasonal pricing/min-stay manager.
- **Bi-directional Airbnb iCal Sync:** Automatic `.ics` feed export (`/api/ical/export`) and periodic import sync (`/api/ical/sync`) with Airbnb.
- **Transactional Emails:** Automated multilingual notifications for both host and guests powered by Resend.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), Radix UI, Lucide Icons
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Email Service:** [Resend](https://resend.com/)
- **Calendar & iCal:** `ical-generator`, `node-ical`, `date-fns`

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18.17+ or v20+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/1uc05/ws_les-restanques.git
cd ws_les-restanques
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy the example configuration file and fill in your keys:

```bash
cp .env.example .env.local
```

Key environment variables:
```env
# Supabase (Optional in dev mock mode)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend Email Service
RESEND_API_KEY=re_your_api_key_here
HOST_NOTIFICATION_EMAIL=les-restanques@gmail.com
EMAIL_FROM="Les Restanques <contact@les-restanques-gite.fr>"

# Google Maps API (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Airbnb Sync & Secret Token
AIRBNB_ICAL_URL=https://www.airbnb.com/calendar/ical/your_listing.ics
CRON_SECRET_TOKEN=your_secure_cron_token_here

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note:** The application includes a built-in development mock database fallback, allowing you to run, explore, and test the full flow immediately even before configuring live Supabase or Resend API keys.

### 5. Run Locally

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to:
- **Public Website:** [http://localhost:3000](http://localhost:3000) (or `http://localhost:3000?lang=en`)
- **Host Administration Portal:** [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

---

## 📦 Database Setup (Supabase)

If deploying with Supabase, run the initialization script provided in [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL Editor to create the required tables (`bookings`, `blocked_dates`, `pricing_rules`), seed initial seasonal rates, and configure Row Level Security (RLS) policies.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on port 3000 |
| `npm run build` | Compiles and optimizes the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint checks |
| `npx tsx scripts/test-suite.ts` | Runs automated pricing engine and iCal generation tests |

---

## 🎨 Design System — « Provence Minérale »

The public site follows an **Organic Editorial** direction (see [`docs/03-direction-artistique.md`](./docs/03-direction-artistique.md)):
generous white space, moderate asymmetry, hairline rules instead of cards, and photography as the main subject.

**Tokens** live in [`tailwind.config.ts`](./tailwind.config.ts) and [`src/app/globals.css`](./src/app/globals.css).

| Role | Token | Value |
| :--- | :--- | :--- |
| Paper / background | `provence-50` | `#FBF9F5` |
| Alternate band | `provence-100` | `#F5F1E8` |
| Ink (headings) | `ink` | `#22251F` |
| Body text | `ink-soft` | `#4A4E42` |
| Primary (CTA, olive) | `olive-700` | `#586033` |
| Accent (terracotta) | `terracotta-500` | `#B17A5E` |
| Solar highlight (sand) | `sand-400` | `#D9B382` |

- **Type:** Playfair Display (headings, weight 400 — never bold) + Montserrat (body, uppercase labels at `tracking-wideish`), both loaded through `next/font`.
- **Shapes:** radii capped at 2–6 px; buttons and chips stay rectangular (no pills).
- **Depth:** tonal layers and overlap, no drop shadows, no glassmorphism.
- **Motion:** `Reveal` (`src/components/public/Reveal.tsx`) fades sections in once on scroll; everything is disabled under `prefers-reduced-motion`.

Reusable CSS component classes: `.shell`, `.eyebrow`, `.photo` / `.photo-zoom`, `.link-underline`, `.swipe-row`.

---

## 🖼️ Photography

All images are **local** — no external image host, no `remotePatterns` in `next.config.mjs`.

```
public/images/gite/     the house, the garden, the pool
public/images/region/   Saint-Saturnin, Roussillon, Gordes, Rustrel, lavender
```

`public/images/` is the single home for these files — there is no duplicate copy elsewhere in the
repo. Paths are declared once in the `photos` map of
[`src/config/site-data.ts`](./src/config/site-data.ts) — reference them from there rather than
hard-coding strings, so a photo can be swapped in a single place.

Most originals are 1200 px wide. They hold up well at the sizes used here, but re-exporting the
source files at 2400 px or more would visibly sharpen the full-bleed hero and banner images — drop
the replacements in place, no code change needed.

To add a photo: drop it in the right folder, add an entry to `photos`, then reference it from
`galleryImages`, `spaces`, or `attractions` in the same file.

---

## 📄 License & Contact

- **Property:** Gîte Les Restanques — 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt, France.
- **Host:** Judith (`les-restanques@gmail.com`)

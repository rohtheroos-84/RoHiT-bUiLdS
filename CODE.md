# CODE Documentation

This repository is a **single-page React + TypeScript portfolio app** built with **Vite** and styled with **Tailwind CSS** plus custom CSS variables/utilities.  
The app renders one long-scroll page composed of reusable section components, with animation-heavy UI and multiple easter eggs.

## Tech Stack

- **Runtime/UI:** React 18, TypeScript
- **Build Tool:** Vite 5 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS + `src/index.css`
- **Animations/Effects:** Framer Motion, React Intersection Observer, React Parallax Tilt, Typewriter Effect
- **Icons:** lucide-react, react-icons
- **Integrations:** EmailJS (contact form), external GitHub contribution API, CounterAPI (visit counter)

## Project Structure

```text
src/
  main.tsx                 # App bootstrap + global CSS import
  App.tsx                  # Top-level page orchestration + loading state + easter eggs
  index.css                # Theme tokens + shared utility classes + global styles
  hooks/
    useKonamiCode.ts       # Detects Arrow key sequence for Matrix easter egg
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    GitHubHeatmap.tsx
    Education.tsx
    Projects.tsx
    Experience.tsx
    Skills.tsx
    Certificates.tsx
    PatentsPublications.tsx
    Contact.tsx
    Footer.tsx
    Cursor.tsx
    BackToTop.tsx
    SecretConsole.tsx
    MatrixRain.tsx
    ParticleBackground.tsx
public/
  my-pic.jpg
  Rohit's Resume.pdf
  favicon.svg
```

## Application Flow

1. `src/main.tsx` sets the document title and mounts `<App />` inside `#root` with `StrictMode`.
2. `App.tsx` shows a 2-second animated loading splash.
3. After loading, it renders:
   - global interaction components (`Cursor`, `Navbar`, `BackToTop`)
   - page sections in order (`Hero` -> `About` -> `GitHubHeatmap` -> `Education` -> `Projects` -> `Experience` -> `Skills` -> `Certificates` -> `PatentsPublications` -> `Contact`)
   - `Footer`
4. Easter eggs are mounted globally:
   - `SecretConsole` opens when typing `dev`
   - `MatrixRain` activates when Konami-like arrows are detected by `useKonamiCode`
   - Theme toggle in `Navbar` intentionally triggers a "LIGHT MODE IS BANNED" modal instead of changing theme

## Styling System

- Tailwind is configured in `tailwind.config.js` with custom:
  - neon color palette (`neon-blue`, `neon-purple`, `neon-green`, `neon-pink`)
  - fonts (`Space Mono`, `Inter`)
  - keyframes/animations (`glow-pulse`, `matrix-fall`, `float`)
- `src/index.css` defines root design tokens and reusable classes:
  - `.glassmorphism`, `.section-heading`, `.gradient-bg`, `.project-card`, neon text/border helpers
- Sections mostly alternate between `gradient-bg` and `bg-primary-bg` backgrounds.

## Component Responsibilities

- **Navbar:** sticky top nav, desktop/mobile variants, resume download links, pseudo-theme toggle callback.
- **Hero:** first-screen intro, typewriter tagline, CTA linking to projects.
- **About:** profile image, bio, highlights, social links, resume download CTA.
- **GitHubHeatmap:** fetches 1-year contributions for `rohtheroos-84`, builds week/day grid manually, renders month/day labels and legend.
- **Education / Experience / Certificates / PatentsPublications / Projects / Skills:** section-specific data arrays + animated card/grid/timeline rendering.
- **Contact:** controlled form (name/email/message), sends via EmailJS, shows loading/success/error states.
- **Footer:** fetches and caches visitor count from CounterAPI with session-level "count once" behavior.
- **Cursor:** custom animated cursor + trail particles (desktop-like visual effect).
- **ParticleBackground:** canvas particle field with proximity lines (used in Hero).
- **BackToTop:** appears after scrolling down and smooth-scrolls to top.
- **SecretConsole:** hidden mini terminal UI with static command responses (`help`, `about`, etc.).
- **MatrixRain:** full-screen canvas matrix effect shown for a fixed duration.

## Data & State Patterns

- Most section content is static arrays inside component files (`projectData`, `skillsData`, etc.).
- `react-intersection-observer` (`useInView`) gates entrance animations for most sections.
- Local component state drives interactions:
  - nav scroll + mobile menu
  - form values and submit lifecycle
  - card/category filters
  - easter egg visibility/activation

## External Services

### Contact Form (EmailJS)

In `Contact.tsx`, `emailjs.send(...)` uses hardcoded:
- `serviceId = service_m70kele`
- `templateId = template_xy79nv4`
- `publicKey = FhU2vsVmYOe5m-XDP`

### GitHub Contributions

`GitHubHeatmap.tsx` calls:
- `https://github-contributions-api.jogruber.de/v4/rohtheroos-84?y=last`

The response is filtered to the last year, grouped into week columns, and animated in a custom heatmap.

### Visitor Counter

`Footer.tsx` calls:
- increment endpoint: `https://api.counterapi.dev/v1/rohitn-portfolio/visits/up`
- read endpoint: `https://api.counterapi.dev/v1/rohitn-portfolio/visits/`

It caches totals in `localStorage` and avoids repeated increments within the same browser session via `sessionStorage`.

## Build & Dev Commands

From `package.json`:

- `npm run dev` -> start Vite dev server
- `npm run build` -> production build into `dist/`
- `npm run lint` -> ESLint over project
- `npm run preview` -> preview built app

## Configuration Files

- `vite.config.ts`: React plugin + excludes `lucide-react` from dependency optimization.
- `eslint.config.js`: TypeScript ESLint recommended config + React hooks + react-refresh rules.
- `tailwind.config.js`: theme extension for colors/fonts/animations/shadows/backgrounds.
- `postcss.config.js`: Tailwind + Autoprefixer.
- `tsconfig*.json`: strict TS settings split by app/node references.

## How to Modify Content Quickly

- **Hero/About copy:** `Hero.tsx`, `About.tsx`
- **Projects list:** `Projects.tsx` -> `projectData`
- **Experience:** `Experience.tsx` -> `experienceData`
- **Skills:** `Skills.tsx` -> `skillsData`
- **Certificates:** `Certificates.tsx` -> `certificatesData`
- **Patents/Publications:** `PatentsPublications.tsx` -> `patentsData`
- **Contact links/email:** `Contact.tsx`
- **Resume file:** replace `public\Rohit's Resume.pdf` (keep filename or update hrefs in `Navbar` and `About`)

## Notes

- This app is entirely client-side; no backend in this repository.
- The visual identity is intentionally neon/cyberpunk with heavy motion and interactive flair.
- If APIs are unavailable, affected widgets degrade gracefully (counter/heatmap loading/fallback states).

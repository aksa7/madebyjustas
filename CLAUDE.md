# Projektas: madebyjustas.dev

## Kas tai

Justo Aksamitausko developer portfolio svetainė. Justas — nepriklausomas web
kūrėjas, kuriantis greitas, AI-optimizuotas svetaines paslaugų verslams.

- Domenas: madebyjustas.dev
- El. paštas: hello@madebyjustas.dev
- LinkedIn: https://www.linkedin.com/in/justas-aksamitauskas-196133279/
- Kalba: svetainė ANGLŲ kalba.

## Pozicionavimas (naudok šiuos žodžius UI tekstuose)

- "Websites that get found — on Google, ChatGPT, and Perplexity."
- "Fast, AI-optimized websites for service businesses."
- "No agency overhead. Direct communication. Clear scope."
- "Sub-1s load times are the default, not an upgrade."
- Proof: 20+ websites shipped · Sub-1s load times · GEO + SEO baked in

## Procesas (3 etapai — naudok kaip content bloką)

1. AUDIT — svetainė analizuojama 5 dimensijomis: speed, SEO, GEO, UX, trust.
2. BUILD — statinis Astro build, hand-coded, Cloudflare Pages, global CDN.
3. RANK — schema markup, FAQ struktūra, local SEO nuo pirmos dienos.

## Paslaugos (3 formatai)

- 01 · NEW BUILD — nuo nulio. Discovery + content audit, custom design system,
  Astro static build, schema + GEO foundations, Cloudflare deploy, 2 revizijų
  raundai, 30 d. post-launch support. Trukmė 4–6 sav.
- 02 · AUDIT & OPTIMIZE — esamos svetainės taisymas. 5-dim auditas,
  prioritizuotas action list, speed optimizacija, schema fix, FAQ struktūra,
  local SEO + Google Business Profile peržiūra, 1 revizijų raundas. Trukmė 2–3 sav.
- 03 · MAINTENANCE — mėnesinis retainer. Monthly performance + GEO citation
  report, iki 8 val. content/build updates, priority response, ketvirčio strateginis review.
- Kainodara: quote po trumpo discovery call.

## Portfolio (case studies)

- Lumina Aesthetics (2026) — estetikos klinika. LCP 0.6s mobile 4G,
  Lighthouse 100 visose kategorijose, page weight 94KB (su fontais),
  FAQ schema 8 klausimai indeksuoti AI įrankiams. Schema-first, static HTML, Cloudflare edge.
- Sonora Wellness (2026) — med spa konceptas. GEO architecture tyrimas.

## Status (Q2–Q3 2026)

- Vykdo viešų auditų seriją (nemokamas public service business audit).
- Priima 2 naujus projektus Q3 2026.

## Tech stack (NEKEISK be prašymo)

- Astro (static site generation), TypeScript (strict).
- Stiliai: **Tailwind CSS v4** (`@tailwindcss/vite`). VISI design tokens (spalvos,
  type scale, spacing, radius, shadow, motion durations/easings) gyvena
  `tailwind.config.js` — jis įkraunamas per `@config` direktyvą `src/styles/global.css`
  faile (Tailwind v4 JS-config compat režimas). Nekurk naujų tokenų tiesiai CSS
  faile ar komponentuose — visada per `tailwind.config.js`. `src/styles/global.css`
  skirtas TIK: `@import 'tailwindcss'`, `@config`, font-face importai, `@layer base`
  (focus-visible, prefers-reduced-motion, body/heading base stiliai).
- Fontai: self-hosted per `@fontsource-variable` — vienas šriftas visame
  puslapyje (Inter Variable, ir antraštėms, ir tekstui; hierarchija per svorį/
  tarpus, ne per atskirą display šriftą), woff2, `font-display: swap`
  (built-in), preload'inamas `BaseLayout.astro` per Vite `?url` importą. Jokio
  Google Fonts CDN.
- Animacijos: CSS/native 90% atvejų. Framer Motion TIK per React islands su
  client:visible ir TIK ten, kur CSS neužtenka. Jokio Framer Motion hover/fade smulkmenoms.
- Nuotraukos: astro:assets (<Image/>) su width/height/aspect-ratio, WebP/AVIF, lazy load ne-hero.
- Deploy: Cloudflare Pages.

## Kokybės kartelė (privaloma kiekvienam PR)

- Lighthouse tikslas: 100 / 100 / 100 / 100. LCP < 1s.
- Nulis CLS. Visoms nuotraukoms width/height arba aspect-ratio.
- Nulis console errors/warnings. Build + typecheck praeina švariai.
- Responsive tikrinama: 320, 375, 430, 768, 1024, 1280, 1440, 1920px. Jokio horizontal scroll.
- Accessibility: semantic HTML, 1 h1/puslapyje, logiška heading hierarchija,
  matomi focus states, keyboard nav, prasmingi alt, prefers-reduced-motion gerbiamas.
- SEO: unikalus title + meta description kiekvienam puslapiui, canonical, OG, JSON-LD.

## Darbo principai (senior frontend)

- Prieš keisdamas — suprask esamą kodą. Daryk mažiausią švarų pakeitimą.
- Neliesk nesusijusių vietų. Nekeisk dizaino savo nuožiūra. Nekurk duplikatų.
- Reusable design tokens: spalvos, spacing, radius, shadow, font-size, motion timing.
- Jokių magic numbers, inline styles (nebent būtina), console.log, unused imports.
- Event listeneriai — su cleanup. Vengti memory leaks ir heavy scroll listenerių (throttle/debounce).
- Pabaigoje: parašyk kokius failus keitei ir kodėl; paleisk build/lint/typecheck.

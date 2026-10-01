# madebyjustas.dev

A single-page, cinematic portfolio for Justas Aksamitauskas, an independent web
developer who builds fast, beautiful websites for service businesses.

Built with **Astro** (static output), **Tailwind CSS v4** (CSS-first `@theme`
tokens), **GSAP + ScrollTrigger + SplitText** and **Lenis** smooth scroll, plus
self-hosted variable fonts. No client-side framework. Deployed to **Cloudflare**.

## Requirements

- Node.js `>= 22.12.0`

## Commands

Run from the project root:

| Command             | Action                                   |
| :------------------ | :--------------------------------------- |
| `npm install`       | Install dependencies                     |
| `npm run dev`       | Start the dev server at `localhost:4321` |
| `npm run build`     | Build the production site to `./dist/`   |
| `npm run preview`   | Preview the production build locally     |
| `npm run typecheck` | Type-check with `astro check`            |
| `npm run lint`      | Lint with ESLint                         |
| `npm run format`    | Format with Prettier                     |

## Project structure

```text
public/              Served as-is: favicons, og.jpg, hero videos (media/), _headers, _redirects, llms.txt
src/
  assets/brand/      MJ signet and lockup SVGs
  assets/media/      Atmosphere stills (velvet fold, projector beam), optimised at build time
  assets/work/       Real project screenshots (desktop + mobile)
  components/ui/     Preloader, Nav, StickyCta, Atmosphere (film grain)
  components/sections/ Hero, Proof, Manifesto, Work, Pins, Services, About, Contact, Footer
  components/form/   FormField, SubmitButton
  lib/               site.ts (facts, links), content.ts (all copy), async-form.ts
  lib/motion/        One module per scene (preloader, hero, scenes, showcase, magnetic, dust)
  scripts/main.ts    Boots smooth scroll, the intro and every scene in order
  styles/global.css  Design tokens (@theme), fonts, base layer, shared components
design/              Logo sources, moodboard, Higgsfield prompts and source renders
```

Every animation lives behind `gsap.matchMedia()`: full choreography on desktop,
a lighter version under 1024px, and a calm static page with
`prefers-reduced-motion`.

## Forms

The contact form posts to [Formspree](https://formspree.io) (`FORM_ENDPOINT` in
`src/lib/site.ts`). A hidden `_subject` labels it in the inbox and a `_gotcha`
honeypot filters basic spam. On failure it shows an error with the email
address as a fallback. No server of our own is required.

## Deploy to Cloudflare Pages

The site is fully static — Cloudflare Pages only needs to run the build and
serve `dist/`.

**Option A — Git integration (recommended)**

1. Push this repo to GitHub/GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Configure the build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set `NODE_VERSION = 22` (or higher) in the environment variables.
4. Deploy. Every push to the production branch triggers a new build; pull
   requests get preview deployments automatically.

**Option B — Wrangler (manual)**

```sh
npm run build
npx wrangler pages deploy dist --project-name=madebyjustas
```

### Notes

- `public/_headers` sets long-lived immutable caching for `/_astro/*` assets and
  baseline security headers. Cloudflare applies it automatically.
- `public/_redirects` sends the old pages (`/work`, `/work/*`, `/services`,
  `/about`, `/contact`, `/audits`) to the matching section of the homepage with
  a 301, so old links never 404.
- The production domain is `madebyjustas.dev` (set in `astro.config.mjs` as
  `site`). Add it as a custom domain in the Pages project and keep the two in
  sync so canonical URLs, `sitemap-index.xml`, and Open Graph tags stay correct.

```

```

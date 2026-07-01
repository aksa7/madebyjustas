# madebyjustas.dev

Portfolio site for Justas Aksamitauskas, an independent web developer building
fast, AI-optimized websites for service businesses.

Built with **Astro** (static output), **Tailwind CSS v4**, and self-hosted
variable fonts. No client-side framework, no page builder. Deployed to
**Cloudflare Pages**.

## Requirements

- Node.js `>= 22.12.0`

## Commands

Run from the project root:

| Command                | Action                                          |
| :--------------------- | :---------------------------------------------- |
| `npm install`          | Install dependencies                            |
| `npm run dev`          | Start the dev server at `localhost:4321`        |
| `npm run build`        | Build the production site to `./dist/`          |
| `npm run preview`      | Preview the production build locally            |
| `npm run typecheck`    | Type-check with `astro check`                   |
| `npm run lint`         | Lint with ESLint                                |
| `npm run format`       | Format with Prettier                            |

## Project structure

```text
public/            Static assets served as-is (favicon, og-default.jpg, _headers, robots.txt)
src/
  assets/work/     Project images, optimized at build time via astro:assets
  components/       UI components (home, work, services, form, shared)
  layouts/          BaseLayout (head, SEO, schema, header/footer)
  lib/              Site config, content data, small client scripts
  pages/            Routes (index, work, services, about, contact, audits + /work/[slug])
  styles/           global.css (Tailwind entry, @config, fonts, base layer)
tailwind.config.js  Design tokens (colors, type scale, spacing, radius, shadow, motion)
```

## Forms

Both the contact and audit forms submit to a single
[Formspree](https://formspree.io) endpoint (`FORMSPREE_ENDPOINT` in
`src/lib/site.ts`). A hidden `_subject` field distinguishes them in the inbox,
and a `_gotcha` honeypot filters basic spam. On failure, each form shows a
fallback `mailto:` prompt. No server of our own is required.

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
  baseline security headers. Cloudflare Pages applies it automatically.
- The production domain is `madebyjustas.dev` (set in `astro.config.mjs` as
  `site`). Add it as a custom domain in the Pages project and keep the two in
  sync so canonical URLs, `sitemap-index.xml`, and Open Graph tags stay correct.
```

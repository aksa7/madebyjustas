# Projektas: madebyjustas.dev — cinematic landing

Įdėk šį failą į repo šaknį. Claude Code jį skaito automatiškai kiekvienoje sesijoje,
tad visos taisyklės galioja visada.

## Kas tai

Justo Aksamitausko asmeninio developer brando svetainė, perdaroma iš senos
daug-puslapių svetainės į VIENĄ kinematografinę, luxury, šiltai parduodančią landing
page. Puslapis pats yra stipriausias portfolio įrodymas: žmogus užeina ir iškart
mato, kad Justas moka programuoti pasauliniu lygiu — ir pajunta, kad su juo norisi
dirbti. „Užeini ir bam — jauku."

- Domenas: madebyjustas.dev
- El. paštas: info@madebyjustas.dev
- LinkedIn: https://www.linkedin.com/in/justas-aksamitauskas-196133279/
- Kalba: svetainė ANGLŲ kalba.

## Kas yra Justas (faktai, kuriuos galima naudoti)

- Nepriklausomas web kūrėjas. Software engineering fonas. 64+ svetainių sukurta per
  service industries — nuo solo klinikų iki multi-location verslų.
- Specializacija: web development + GEO (Generative Engine Optimization) + SEO +
  performance. Hand-coded static buildai, Cloudflare edge.
- Nišos: med spas, aesthetics, legal, hospitality, wellness — service businesses.
- Jokių „accepting N projects for QX" eilučių: pasensta ir atrodo dirbtinai.

## Procesas (3 etapai, be atskiros sekcijos)

AUDIT (5 dimensijos: speed, SEO, GEO, UX, trust) → BUILD (hand-coded static,
Cloudflare edge, global CDN) → RANK (schema, FAQ struktūra, local SEO nuo pirmos
dienos). Atskiros „Process" sekcijos puslapyje nebėra: Services sekcija tai paaiškina.

## Paslaugos (3 formatai, kaina po discovery call)

- 01 New Build — nuo nulio.
- 02 Audit & Optimize — esamos svetainės taisymas.
- 03 Maintenance — mėnesinis retainer.

## VOICE — kaip rašyti tekstą (tiek pat svarbu kaip vizualas)

Viskas rašoma šiltu, žmogišku, pirmu asmeniu — Justas kalba su tavimi, ne brandas
rėkia į rinką. Pasitikintis bet atsipalaidavęs, truputį žaismingas, nuoširdžiai
kviečiantis. Trumpi, tikri sakiniai. Jokio korporatyvinio žargono, jokių buzzword'ų,
jokio hype. Turi skambėti kaip talentingas draugas, kuris akivaizdžiai moka savo
amatą ir su kuriuo būtų smagu dirbti.

- Naudok „I" ir „you". CTA — šilti, be spaudimo („Let's talk about your project",
  „Tell me what you're building"), ne „Submit" / „Buy now".
- Išlaikyk pozicionavimo esmę, bet padaryk žmogišką.
- Pavyzdžiai (atkartok jausmą, ne žodžius):
  · „Fast, AI-optimized websites for service businesses" → „I build websites that
  load fast, look beautiful, and actually get found — on Google and in tools like
  ChatGPT and Perplexity."
  · „No agency overhead. Direct communication. Clear scope." → „It's just me. You
  talk to the person building your site — no account managers, no surprise invoices."
  · „Sub-1s load times are the default, not an upgrade." → „Speed isn't an add-on I
  sell you later. It's just how I build."
- Nenaudok italics niekur.

## Senos svetainės tvarkymas (cleanup)

Sena svetainė turi daug netvarkingų puslapių. Pirma — išžvalgyk (routes, komponentai,
stiliai, turinys). Tada VISKĄ sukonsoliduok į vieną landing page. Pašalink
nereikalingus puslapius, komponentus, routes, dead CSS ir nenaudojamus assets. Palik
TIK tikrai naudingus faktus apie Justą (kas jis, ką daro, realūs darbai, kaip
susisiekti) ir perkelk į naują puslapį, bet perrašyk visą kopiją nauju balsu. Pridėk
redirectus iš senų routes į homepage, kad niekas nemestų 404. Šalindamas — surašyk ką
pašalinai ir kodėl. Nepalik pusiau migruoto dead kodo.

## Performance filosofija (atpalaiduota, bet patirtis — šventa)

Tobulas Lighthouse balas NĖRA tikslas. Puslapis gali būti sunkus (video, tekstūros,
choreografija) ir krautis šiek tiek ilgiau — tai priimtina dėl kinematografijos.
Kas NEDERASI: užsikrovus viskas turi būti nepriekaištingai sklandu — 60fps, jokio
jank, stutter, flicker, jokio layout shift interakcijos metu. Laukimą maskuok gražiu,
brandiniu kinematografiniu preloaderiu/intro, kuris pats atrodo luxury (projektoriaus
spindulys su dulkėmis, MJ ženklas nusipiešia, spindulys atsiveria į hero), kad laukimas taptų show
dalimi. Preload + decode hero assets už intro, kad pirmas realus kadras būtų tobulas.
Būk protingas (lazy-load žemiau fold, saikingai suspausk) — bet niekada neaukok
sklandumo ar grožio dėl kilobaitų.

## Vizualas — „Velvet Noir" (patvirtinta, atnaujinta)

- Koncepcija: „privati kino peržiūra". Mood: cinematic, nocturnal, luxury, rich —
  bet šiltas ir žmogiškas. Jokio aukso ir jokių auksinių/cognac atspalvių (atrodo kaip
  AI), jokio neon, jokių glossy SaaS gradientų, jokio template look.
- Palette (tik šitos spalvos, tokenai `global.css`):
  · Ink #0E0C0D (bazė) · Carbon #191617 (paviršiai, rėmai)
  · Rouge #4A0D1B (bordeaux) · Amaranth #6A1328 (wine) — TIK šviesa/švytėjimas,
  niekada tekstas ant tamsaus
  · Red #B4202C (sodri raudona: taškai, žymės, hover, pin'ų smeigtukai)
  · Red light #E04848 (etiketės / smulkus tekstas ant ink, ~4.7:1)
  · Red deep #9E1B2A (etiketės/detalės ant bone)
  · Jokios rožinės/rausvos — atrodo dirbtinai.
  · Bone #ECE4D6 (tekstas ant ink; finalo fonas). Muted tekstas #ABA196, dim #736B63.
  Akcentas sodrus, bet saikingas: raudona kaip šviesa ir žymės, ne plotai.
- Puslapio kelionė = „Velvet Fade": viršuje naktis (ink) → per vidurį vyno švytėjimas
  (rouge/amaranth) → finalas (kontaktai) ant bone su oxblood tekstu.
- Centerpiece „The Fold": aksomo raukšlė su viena šonine šviesa, lėtai kvėpuojanti;
  scroll'u įskrendam į giliausią raukšlę → tamsa → Manifesto.
- Atmosfera: projektoriaus spindulio migla su plaukiančiomis dulkėmis, film grain,
  vinjetė. Jokių blizgučių.
- Viewport „The Screen": carbon rėmas, plona bone linija, raudonos vaizdo ieškiklio kampų
  žymės, iš ekrano krentanti amaranth šviesa; 3D reel perėjimai su vienu švelniu šviesos
  mirktelėjimu; auto-advance su pauzės mygtuku; mobile — swipe.
- Pagrindinis hookas: „I can make your Pinterest dreams come true." Pinterest pažadas
  (bet kokią pin'intą svetainę pastatau tau) kartojasi hero, atskiroje Pins sekcijoje,
  FAQ ir kontaktų formos tipuose. Perplexity hero dalyje NEminimas (tik ChatGPT).
- Terminai: New Build 1–2 savaitės, Audit & Optimize iki 1 savaitės, Maintenance mėnesinis.

## Logo (patvirtinta)

- MJ ligatūra iš Bodoni Moda kontūrų: M dešinė koja tampa J lanku su apvalia galūne.
- Pagrindinis — lockup: ženklas + plona linija + „MADE BY JUSTAS" (spaced caps).
- Smulkiems dydžiams (≤64px, favicon) — atskira tvirtesnė versija (opsz 18, wght 640).
- Vienspalvis (bone ant tamsaus, oxblood ant bone). Ne raster — tik SVG.

## Tipografija (patvirtinta, NO ITALICS)

- Vienas šriftas viskam: Archivo Variable (wght + wdth), kaip aksendo.com. Display:
  wght 560, wdth 104, tracking -0.03em — aiškus, tiesus, puikiai įskaitomas. Jokių
  high-contrast serifų (Bodoni hairlines „nukandžiojo" raides). Body: wght 400.
- Etiketės / eyebrows / metadata: IBM Plex Mono, uppercase, letter-spaced, Rose,
  saikingai — subtilus „developer" signalas.
- Self-hosted woff2 (fontsource), font-display:swap, preload kritinį. Fluid type su clamp().

## Animacijų taisyklės

- Animacijos turi atrodyti premium, smooth, natūraliai, kaip filme — niekada pigiai,
  per agresyviai ar per greitai.
- Naudok transform ir opacity. VENK animuoti width/height/top/left/margin/padding.
- Aiški pradinė ir galutinė būsena. Nuoseklūs duration/delay/easing iš motion tokenų.
  Jokių atsitiktinių delay — animacijos turi vizualią logiką.
- Nejudink per daug elementų vienu metu. Scroll animacijos subtilios. Hover — greitas,
  malonus, aiškus. Button hover/active/focus sutvarkyti.
- Jokio flicker, jokio pašokimo po animacijos. Jokio layout shift.
- Scroll choreografija (GSAP/ScrollTrigger): pinning, scrub, zoom — bet sklandžiai,
  be jerk. Scroll listeneriai efektyvūs; JS animacijos su cleanup (jokių memory leaks).
- Gerbk prefers-reduced-motion: paprastesnė, vis tiek graži versija (be pin-scrub,
  švelnūs fades), content niekada neblokuojamas.
- Patikrink animaciją po refresh, resize, scroll (žemyn IR aukštyn), mobile ir desktop.

## Technologijos

- Design tokens gyvena `src/styles/global.css` `@theme` bloke (Tailwind v4, be
  tailwind.config.js): tie patys vardai veikia kaip utility klasės ir CSS kintamieji.
- Astro (static), vienas puslapis, hand-coded, TypeScript (strict, be `any`).
- Smooth scroll: Lenis. Choreografija: GSAP + ScrollTrigger (vanilla, be React →
  mažiau JS). Framer Motion NEnaudojamas.
- Jokio custom cursor (natyvus). Magnetic buttons, refined hover states.
- Deploy: Cloudflare Pages.
- Design tokens: spalvos, spacing, radius, shadow, font-size, motion timing — visi
  reusable, jokių magic numbers.

## Responsive

- Nepriekaištingai: 320, 375, 430, 768, 1024, 1280, 1440, 1920px. Jokio horizontal
  scroll, jokio persidengimo. Tap targets patogūs mobile.
- Mobile: supaprastink sunkiausią choreografiją, kad scroll liktų sviestinis, bet
  išlaikyk grožį. Netaisyk desktop taip, kad lūžtų mobile, ir atvirkščiai.
- Fluid spacing, max-width, clamp. Venk didelių fixed height.

## Nuotraukos / vizualai

- Projektų showcase — REALŪS screenshotai (desktop + mobile), paimti su browser tools.
  NEgeneruoti ir NEfabrikuoti projektų kadrų (autentiškumas kritiškas dev įrodymui).
- Higgsfield generuoja TIK atmosferą/hero/brand (ne projektus): Seedance 2.5 video,
  ChatGPT Image 2.5 images. Jei šių tikslių modelių nėra — SUSTOK ir pranešk prieš
  keisdamas.
- WebP/AVIF. width/height arba aspect-ratio visur (CLS 0). Lazy ne-pirmam ekranui.
  Hero video: loop, suspaustas, poster fallback, nelaužia intro.
- Prasmingi alt tekstai; dekoratyviniai — empty alt.

## Accessibility

- Semantic HTML. Vienas h1. Logiška heading hierarchija.
- <button> mygtukams, <a> nuorodoms. Viskas pasiekiama klaviatūra. Matomi focus states.
- Pakankamas kontrastas. Formos su labels/aria-labels. prefers-reduced-motion gerbiamas.

## SEO / GEO

- Aiškus unikalus title + meta description. Canonical. Open Graph + Twitter card + OG
  image.
- JSON-LD: Person + ProfessionalService; FAQPage jei dedamas FAQ.
- Svarbus tekstas — realus tekstas, ne nuotraukoje. Švari, cituojama struktūra AI
  varikliams (ChatGPT/Perplexity). sitemap.xml + robots.txt.

## Forma (kontaktai)

- Laukai: name, email, project type, message. Būsenos: validation (aiškios klaidos),
  disabled kol nevalidu, loading, success, error. Accessible labels, keyboard-friendly.
- Backend: Formspree (https://formspree.io/f/mbdqzggq) + mailto fallback į
  info@madebyjustas.dev.
- Project type pasirinkimuose yra ir nemokamas svetainės auditas (atskiro Audits
  puslapio nebėra).

## Darbo principai (senior frontend)

- Prieš keisdamas — suprask esamą kodą. Daryk mažiausią švarų pakeitimą, kuris išsprendžia užduotį.
- Neliesk nesusijusių vietų. Nekeisk dizaino savo nuožiūra be prašymo. Nekurk duplikatų.
- Jokio console.log, testinio kodo, nenaudojamų importų produkcijoje.
- Pašalink nenaudojamą kodą tik kai tikras, kad nebenaudojamas.

## Testavimas (po kiekvieno pakeitimo)

- Build + typecheck švarūs, console be errors/warnings.
- Patikrink mobile + desktop; hover/click/scroll/forms/menus/links.
- Jokio broken layout, horizontal scroll, layout shift.
- Animacijos nestringa; scroll žemyn IR aukštyn sklandus; preloader resolvinasi švariai.
- prefers-reduced-motion kelias veikia.

## Svarbiausia

Puslapis turi būti kinematografiškas, šiltas, jaukus, parduodantis ir meistriškai
sklandus. Geriau mažesnis švarus stabilus pakeitimas nei didelis, kuris laužia patirtį.
Nepalik pusiau veikiančių sprendimų ir greitų hackų.

```

```

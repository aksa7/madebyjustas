import type { ImageMetadata } from 'astro';
import aksendoDesktop from '../assets/work/aksendo-desktop.webp';
import aksendoMobile from '../assets/work/aksendo-mobile.webp';
import resetDesktop from '../assets/work/21dayreset-desktop.webp';
import resetMobile from '../assets/work/21dayreset-mobile.webp';
import decksDesktop from '../assets/work/decksandstories-desktop.webp';
import decksMobile from '../assets/work/decksandstories-mobile.webp';
import tvortekaDesktop from '../assets/work/tvorteka-desktop.webp';
import tvortekaMobile from '../assets/work/tvorteka-mobile.webp';
import blumuDesktop from '../assets/work/blumu-desktop.webp';
import blumuMobile from '../assets/work/blumu-mobile.webp';
import elesenDesktop from '../assets/work/elesen2026-desktop.webp';
import elesenMobile from '../assets/work/elesen2026-mobile.webp';

export const HERO = {
	eyebrow: "Hi, I'm Justas · Web developer",
	title: 'I can make your Pinterest dreams come true.',
	lead: "Saved a website you love? Send me the pin. I'll design and hand-code it for your business, make it load fast, and get it found on Google and in ChatGPT.",
	primaryCta: 'Send me your pins',
	secondaryCta: 'See my work',
};

export const PROOF_POINTS = [
	'64+ websites shipped',
	'Any pin, built for real',
	'New build in 1–2 weeks',
	'Found on Google and in ChatGPT',
	'Hand-coded, never templated',
	'You talk to me, not an account manager',
];

export const MANIFESTO =
	"Most websites could be great. They're just not built with enough care. So I sweat the parts you don't see: how fast it opens on a bad connection, how clearly Google and ChatGPT can read it, how it feels the first second someone lands. Speed isn't an add-on I sell you later. It's just how I build.";

export interface Project {
	slug: string;
	name: string;
	url: string;
	category: string;
	role: string;
	year: string;
	description: string;
	desktop: ImageMetadata;
	mobile: ImageMetadata;
	alt: string;
}

export const PROJECTS: Project[] = [
	{
		slug: 'aksendo',
		name: 'Aksendo',
		url: 'https://www.aksendo.com',
		category: 'Artist brand · Editorial site',
		role: 'Designer & Developer',
		year: '2026',
		description:
			'A cinematic, dark editorial site for a house DJ and producer. Shows, releases and mixes woven into one immersive, typographic scroll.',
		desktop: aksendoDesktop,
		mobile: aksendoMobile,
		alt: 'Aksendo homepage: black and white crowd photo with the AKSENDO wordmark',
	},
	{
		slug: '21dayreset',
		name: '21-Day Reset',
		url: 'https://www.21dayreset.me',
		category: 'Product · CRO landing',
		role: 'Designer & Developer',
		year: '2026',
		description:
			'A conversion-focused landing for a digital behavioural-reset workbook. A sharp offer, a real guarantee, and a public fact-check.',
		desktop: resetDesktop,
		mobile: resetMobile,
		alt: '21-Day Reset landing page with the headline Stop living on autopilot and the workbook cover',
	},
	{
		slug: 'decksandstories',
		name: 'Decks&Stories',
		url: 'https://decksandstories.com',
		category: 'Platform',
		role: 'Creative Tech & Digital Lead',
		year: '2025–2026',
		description:
			'A global, community-driven music platform with a custom audio player, built to scale across episodes and countries.',
		desktop: decksDesktop,
		mobile: decksMobile,
		alt: 'Decks&Stories homepage with the round logo and the line International DJ mixes from around the world',
	},
	{
		slug: 'tvorteka',
		name: 'Tvorteka',
		url: 'https://tvorteka.lt',
		category: 'Service business',
		role: 'Designer & Developer',
		year: '2026',
		description:
			'A premium site for a fence and gate maker. A product catalogue, an interactive price calculator, and content built to get found locally.',
		desktop: tvortekaDesktop,
		mobile: tvortekaMobile,
		alt: 'Tvorteka homepage with a brick and metal fence and the headline Dizainas, kokybė ir ilgaamžiškumas viename',
	},
	{
		slug: 'blumu',
		name: 'Blumu',
		url: 'https://blumu.eu',
		category: 'Product · App marketing',
		role: 'Designer & Developer',
		year: '2026',
		description:
			'A benefit-led launch page for a services-marketplace app, built to turn visitors into early sign-ups.',
		desktop: blumuDesktop,
		mobile: blumuMobile,
		alt: 'Blumu homepage with a photo grid of local services and the app shown on a phone',
	},
	{
		slug: 'elesen2026',
		name: 'Elesen Show 2026',
		url: 'https://www.elesen2026.lt',
		category: 'Event microsite',
		role: 'Designer & Developer',
		year: '2026',
		description:
			'A cinema-themed event microsite. Layered cut-out art direction and playful motion turn an invitation into an experience.',
		desktop: elesenDesktop,
		mobile: elesenMobile,
		alt: 'Elesen Show 2026 microsite: The Greatest elesen show lettering over a red velvet curtain',
	},
];

export const WORK_CTA = {
	line: 'Like what you see? The next one could be yours.',
	cta: "Let's build yours",
};

/** The Pinterest promise: typographic "pins", no fabricated screenshots. */
export interface Pin {
	title: string;
	note: string;
}

export const PINS_INTRO = {
	eyebrow: 'The Pinterest promise',
	title: "Found it on Pinterest? I'll build it.",
	lead: "That boutique hotel site with the big photos. The calm, minimal clinic page. The portfolio with the gorgeous type. You've been saving them for a reason.",
	body: "Send me the pins you keep coming back to and I'll turn them into a site that's actually yours: your words, your brand, your customers. And unlike a pin, it'll load fast and show up in search.",
	cta: 'Send me your pins',
};

export const PINS: Pin[] = [
	{ title: 'Boutique hotel', note: 'Warm, editorial, full-bleed photos' },
	{ title: 'Med spa', note: 'Calm, airy, lots of white space' },
	{ title: 'Law firm', note: 'Serious type, quiet confidence' },
	{ title: 'Restaurant', note: 'Moody, cinematic, menu that sings' },
	{ title: 'Studio portfolio', note: 'Bold grid, big names, no clutter' },
	{ title: 'Wellness brand', note: 'Soft tones, slow scroll, real care' },
];

export const PIN_STEPS = [
	{
		number: '01',
		name: 'Send me your pins',
		body: 'Three to five is plenty. Tell me what you love about each one.',
	},
	{
		number: '02',
		name: 'I design and build it',
		body: 'Hand-coded, tailored to your business, with your words and your brand.',
	},
	{
		number: '03',
		name: 'You launch in 1–2 weeks',
		body: 'Fast, found in search, and looked after if you want me to.',
	},
];

export interface Service {
	number: string;
	name: string;
	lead: string;
	includes: string[];
	timing: string;
	cta: string;
	/** Preselects the matching option in the contact form. */
	projectType: string;
}

export const SERVICES: Service[] = [
	{
		number: '01',
		name: 'New Build',
		lead: "Starting from scratch, or from a pin? We'll figure out what your site needs to do, then I'll design and build it properly, from the first line of code.",
		includes: [
			'Discovery call and content plan',
			'A design made for your brand',
			'Hand-coded, fast build',
			'Schema and AI-search foundations',
			'A round of revisions',
			'30 days of support after launch',
		],
		timing: '1–2 weeks',
		cta: 'Start a new build',
		projectType: 'New website',
	},
	{
		number: '02',
		name: 'Audit & Optimize',
		lead: 'Already have a site that should be doing more? I find what is slowing it down or hiding it, then fix what matters most.',
		includes: [
			'Five-part audit: speed, SEO, AI search, UX, trust',
			'A prioritised action list',
			'Speed and structured-data fixes',
			'FAQ and local SEO review',
		],
		timing: '1 week, max',
		cta: 'Fix my site',
		projectType: 'Audit & optimize my current site',
	},
	{
		number: '03',
		name: 'Maintenance',
		lead: 'Want someone who just looks after it? I keep your site fast, current and visible, and tell you what changed every month.',
		includes: [
			'Monthly performance and AI-search report',
			'Up to 8 hours of updates a month',
			'Priority replies',
			'A quarterly strategy chat',
		],
		timing: 'Monthly',
		cta: 'Look after my site',
		projectType: 'Ongoing maintenance',
	},
];

export const PRICING_NOTE =
	'Every project gets its own fixed price after a quick, friendly discovery call. No hourly guessing, no surprise invoices.';

export const FREE_AUDIT_NOTE =
	"Not sure where to start? I'll audit your current site for free and tell you honestly what I'd fix first.";

export interface FaqItem {
	question: string;
	answer: string;
}

export const FAQ: FaqItem[] = [
	{
		question: 'Can you really build a site I found on Pinterest?',
		answer:
			"Yes. Send me the pins and I'll design a site in that spirit, made for your business rather than copied: your brand, your words, your customers. It'll also load fast and be built to show up in search, which most pins never are.",
	},
	{
		question: 'How long does a new website take?',
		answer:
			'A new build usually goes live in 1–2 weeks from our first call, including a round of revisions. An audit and fixes for an existing site take a week at most.',
	},
	{
		question: 'How much does a website cost?',
		answer:
			'It depends on what your site needs to do, so every project gets a fixed quote after a short discovery call. You know the full price before anything starts.',
	},
	{
		question: 'What do you need from me?',
		answer:
			"Your pins or a few sites you like, your logo if you have one, and a rough idea of what the site should do. If you don't have the words yet, I'll help you write them.",
	},
	{
		question: 'What does "found in AI search" mean?',
		answer:
			"More people now ask ChatGPT or Google's AI answers instead of scrolling results. I structure your content and data so those tools can understand your business and recommend it.",
	},
	{
		question: 'Who will I actually work with?',
		answer:
			'Me, Justas. I design, build and look after every site myself, so you always talk to the person writing the code.',
	},
];

export const ABOUT = {
	title: "Hi, I'm Justas.",
	paragraphs: [
		"I'm an independent web developer with a software engineering background. I've shipped 64+ websites, mostly for service businesses: med spas, aesthetic clinics, law firms, hospitality and wellness brands. Some are solo practices, some run several locations.",
		"It's just me. You talk to the person building your site. No account managers, no hand-offs, no surprise invoices.",
		'I care about the small details most people never notice, because your customers feel them anyway. If that sounds like the kind of person you want building yours, I would love to hear from you.',
	],
	stats: [
		{ value: 64, suffix: '+', label: 'websites shipped' },
		{ value: 1, suffix: '', label: 'person you talk to, start to finish' },
		{ value: 2, suffix: '', label: 'weeks or less from first call to launch' },
	],
	cta: "Let's talk about your project",
};

export const CONTACT = {
	title: "Tell me what you're building.",
	lead: 'Write a few lines about your business and what you need. Or just send me your pins. I read every message myself and reply personally.',
	success: "Thank you, your message is on its way to me. I'll get back to you personally.",
	ps: "P.S. Not sure what you need yet? That's completely fine. Say hi anyway and we'll figure it out together.",
};

export const PROJECT_TYPES = [
	'New website',
	'Build what I found on Pinterest',
	'Audit & optimize my current site',
	'Free website audit',
	'Ongoing maintenance',
	'Something else',
];

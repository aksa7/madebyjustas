export interface ServiceOffering {
	number: string;
	name: string;
	summary: string;
	duration: string;
	deliverables: string[];
}

export const SERVICES: ServiceOffering[] = [
	{
		number: '01',
		name: 'New Build',
		summary:
			'From scratch: discovery and content audit, a custom design system, a hand-coded build tailored to the project, schema and GEO foundations, deployed to Cloudflare.',
		duration: '4–6 weeks',
		deliverables: [
			'Discovery and content audit',
			'Custom design system',
			'Clean, hand-coded build tailored to the project',
			'Schema and GEO foundations',
			'Cloudflare deploy',
			'2 rounds of revisions',
			'30 days of post-launch support',
		],
	},
	{
		number: '02',
		name: 'Audit & Optimize',
		summary:
			'A 5-dimension audit of your existing site, a prioritized action list, speed and schema fixes, and a local SEO review.',
		duration: '2–3 weeks',
		deliverables: [
			'5-dimension audit',
			'Prioritized action list',
			'Speed optimization',
			'Schema fixes',
			'FAQ structure',
			'Local SEO and Google Business Profile review',
			'1 round of revisions',
		],
	},
	{
		number: '03',
		name: 'Maintenance',
		summary:
			'A monthly retainer: performance and GEO citation reporting, content and build updates, priority response, quarterly strategy review.',
		duration: 'Monthly',
		deliverables: [
			'Monthly performance and GEO citation report',
			'Up to 8 hours of content and build updates',
			'Priority response',
			'Quarterly strategy review',
		],
	},
];

export const PRICING_NOTE = 'Quote after a short discovery call.';

export interface ProcessStep {
	number: string;
	name: string;
	description: string;
	details: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
	{
		number: '01',
		name: 'Audit',
		description: 'The site is analyzed across five dimensions: speed, SEO, GEO, UX, trust.',
		details: ['Speed', 'SEO', 'GEO', 'UX', 'Trust'],
	},
	{
		number: '02',
		name: 'Build',
		description:
			'A fast, hand-coded build with clean code, tailored to the project rather than one fixed stack.',
		details: [
			'Clean code, tailored to the project',
			'Hand-coded, no page builder',
			'Cloudflare Pages deploy',
			'Served from a global CDN',
		],
	},
	{
		number: '03',
		name: 'Rank',
		description: 'Schema markup, FAQ structure, local SEO from day one.',
		details: ['Schema markup', 'FAQ structure', 'Local SEO from day one'],
	},
];

export interface FaqItem {
	question: string;
	answer: string;
}

export const SERVICES_FAQ: FaqItem[] = [
	{
		question: 'How much does a project cost?',
		answer:
			'Every project starts with a short discovery call, then a fixed quote based on scope. No hourly guessing, no surprise invoices.',
	},
	{
		question: 'How long does a New Build take?',
		answer:
			'A New Build typically takes 4–6 weeks from discovery to launch, including 2 rounds of revisions and 30 days of post-launch support.',
	},
	{
		question: 'How long does an Audit & Optimize take?',
		answer:
			'An Audit & Optimize engagement runs 2–3 weeks: a 5-dimension audit followed by a prioritized action list you can act on immediately.',
	},
	{
		question: "What's included in the 5-dimension audit?",
		answer:
			'Every audit examines five dimensions: speed, SEO, GEO (how AI tools like ChatGPT and Perplexity surface your site), UX, and trust.',
	},
	{
		question: 'What happens after launch?',
		answer:
			'New Build projects include 30 days of post-launch support. After that, ongoing Maintenance is available as a monthly retainer.',
	},
	{
		question: 'Who is this for?',
		answer:
			'Service businesses (clinics, studios, professional practices) where speed, trust, and local or AI-driven visibility directly drive inquiries.',
	},
];

export const PROOF_POINTS = ['53+ websites shipped', 'Sub-1s load times', 'GEO + SEO baked in'];

export const LAST_SHIPPED = 'June 2026';

export interface ResultStat {
	value: string;
	label: string;
}

export const RESULT_STATS: ResultStat[] = [
	{ value: '53+', label: 'Websites shipped' },
	{ value: '<1s', label: 'Typical load time' },
	{ value: '90+', label: 'Lighthouse score we aim for' },
	{ value: '0', label: 'Agencies in between' },
];

export interface CaseStudySection {
	heading: string;
	body: string;
}

import type { ImageMetadata } from 'astro';
import decksImage from '../assets/work/decks-and-stories.png';
import tvortekaImage from '../assets/work/tvorteka.png';
import blumuImage from '../assets/work/blumu.png';
import eventsAgencyImage from '../assets/work/events-agency.png';
import renginiuLabImage from '../assets/work/renginiu-lab.png';

export interface WorkProject {
	slug: string;
	name: string;
	category: string;
	role: string;
	year: string;
	/** Public URL, omitted for private/anonymized projects. */
	url?: string;
	/** Short blurb reused on the index card and the case study hero. */
	summary: string;
	context: string;
	whatIDid: string;
	/** Qualitative only, no speed/performance numbers. */
	highlights: string[];
	stack: string[];
	/** Optimized project image (astro:assets). */
	image: ImageMetadata;
	/** Alt text for the project image. */
	imageAlt: string;
}

export const WORK_PROJECTS: WorkProject[] = [
	{
		slug: 'blumu',
		name: 'Blumu',
		category: 'Product',
		role: 'Web Developer & Designer',
		year: '2026',
		url: 'https://blumu.eu',
		summary:
			'A conversion-focused marketing site for a services-marketplace app that connects clients with verified local pros in real time. A clean, benefit-led launch page built to drive early sign-ups.',
		context:
			'A geolocation-based mobile marketplace connecting people who need help with verified local professionals: 0% commission, direct in-app chat, ratings. The site is the app’s launch and acquisition page.',
		whatIDid:
			'Built the marketing landing that positions the product and drives downloads and sign-ups. Structured it as a value ladder: hero promise, "what is it", benefits grid, transparent pricing, FAQ, contact. Each section ends in a clear CTA.',
		highlights: [
			'Benefit-led architecture serving two audiences: clients and pros',
			'Transparent free-trial-to-paid pricing block',
			'Objection-handling FAQ',
			'Responsive, image-optimized layout with dual app-store entry points',
		],
		stack: ['Next.js', 'Optimized responsive images', 'Component-based sections'],
		image: blumuImage,
		imageAlt: 'Blumu website homepage for the local-services marketplace app',
	},
	{
		slug: 'tvorteka',
		name: 'Tvorteka',
		category: 'Service business',
		role: 'Web Developer & Designer',
		year: '2026',
		url: 'https://tvorteka.lt',
		summary:
			'A premium website for a fence and gate manufacturer: a clean, multi-page build with a product catalogue, an interactive price calculator, and structured content designed to get found and convert local customers.',
		context:
			'A Lithuanian manufacturer of premium sheet-metal fences, gates and gate automation, producing in-house and installing nationwide. The site needs to communicate craftsmanship and trust, present a full product range, and turn local searches into quote requests.',
		whatIDid:
			'Designed and built a multi-page site (Home, Products, Calculator, Services, About, Contact) with a clear conversion path. Structured the product catalogue by profile type with detailed specs, built an interactive price calculator, and organized trust signals, a transparent 3-step process, and an FAQ.',
		highlights: [
			'Interactive price calculator',
			'Structured product catalogue with per-product spec pages',
			'Trust architecture: partners, guarantees, process, stats',
			'FAQ built for search and AI answers',
			'Local-SEO-ready metadata (Open Graph, geo/service targeting for Kaunas + nationwide)',
			'Quote-request form with success/error states',
		],
		stack: [
			'Hand-coded static build',
			'WebP assets',
			'Product catalogue + calculator',
			'Schema-ready structured content',
			'Lithuanian copy',
		],
		image: tvortekaImage,
		imageAlt: 'Tvorteka website homepage with the premium fence and gate hero',
	},
	{
		slug: 'events-agency',
		name: 'inSpotlight',
		category: 'Agency',
		role: 'Web Developer',
		year: '2025–2026',
		url: 'https://inspotlight.lt',
		summary:
			'A cinematic website for inSpotlight, an established communications and events agency: a full-screen video hero and a portfolio organized by event type, built to sell craft and a decade of experience.',
		context:
			'inSpotlight is an agency creating B2B conferences, brand launches, and private and public events. It needed a site that conveys premium craft while organizing a broad body of work.',
		whatIDid:
			'Delivered a cinematic first impression and a clear portfolio structure: a full-screen video hero, positioning story, portfolio segmented by event type, an editorial "behind the scenes" section, and contact.',
		highlights: [
			'Full-screen video hero with controls',
			'Portfolio organized into clear service categories',
			'Editorial content to humanize the brand and support SEO',
			'Complete contact and social presence',
		],
		stack: ['WordPress (theme-based build + customization)', 'Video hero'],
		image: eventsAgencyImage,
		imageAlt: 'inSpotlight communications and events agency website homepage',
	},
	{
		slug: 'renginiu-lab',
		name: 'Renginių LAB',
		category: 'Service business',
		role: 'Web Developer & Designer',
		year: '2026',
		url: 'https://renginiulab.lt',
		summary:
			'A website for a full-service event venue in Kaunas that turns local searches into booking inquiries. Organized by occasion, backed by a deep FAQ and local SEO built to get found on Google and AI search.',
		context:
			'Renginių Laboratorija is a full-service event space in Kaunas seating up to 100 guests, hosting corporate events, conferences, weddings, birthdays, and private parties. The site had to convey warmth and trust, present every type of occasion clearly, and capture inquiries the venue answers within 24 hours.',
		whatIDid:
			'Designed and built a conversion-focused site organized by occasion, with a founder story, a clear full-service positioning, a location and contact block, and a deep FAQ that answers the real questions people ask before booking a venue.',
		highlights: [
			'Occasion-based structure: one clear path per event type',
			'Deep FAQ built for Google and AI answers: pricing, capacity, parking, booking',
			'Local SEO for "event space in Kaunas" with address and map',
			'Founder story section that builds trust',
			'Fast static build with warm, inviting imagery',
		],
		stack: [
			'Hand-coded static build',
			'WebP imagery',
			'FAQ + schema-ready content',
			'Local SEO (Kaunas)',
			'Lithuanian copy',
		],
		image: renginiuLabImage,
		imageAlt: 'Renginių LAB website homepage for the Kaunas event venue',
	},
	{
		slug: 'decks-and-stories',
		name: 'Decks&Stories',
		category: 'Platform',
		role: 'Creative Tech & Digital Lead',
		year: '2025–2026',
		url: 'https://decksandstories.com',
		summary:
			'A global, community-driven electronic music platform where every DJ mix comes with the human story behind it. A fast static build with a custom audio player and content that scales as the series grows, featuring artists from 26+ countries.',
		context:
			'An independent, collaboration-first electronic music platform where any DJ can share their sound and story regardless of following. The site is the platform’s home: episodes, studio sessions, an interactive "Pick a Question" series, a gallery, and submission funnels.',
		whatIDid:
			'Led creative-tech and digital direction end to end: architecture, front-end build, and content structure. Designed a multi-section experience with a custom audio player, newsletter capture, a community question form, and a "featured countries" tracker.',
		highlights: [
			'Custom-built audio player instead of a heavy embed',
			'Optimized WebP/AVIF image pipeline',
			'Full SEO/social layer: canonical, Open Graph, Twitter cards, descriptive alt text',
			'Content architecture that scales with every new episode',
		],
		stack: ['Hand-coded static HTML/CSS/JS', 'WebP/AVIF assets', 'Custom JS audio player'],
		image: decksImage,
		imageAlt: 'Decks&Stories website homepage with the platform logo',
	},
];

export const SITE = {
	name: 'Made by Justas',
	domain: 'madebyjustas.dev',
	url: 'https://madebyjustas.dev',
	author: 'Justas Aksamitauskas',
	jobTitle: 'Independent web developer',
	email: 'info@madebyjustas.dev',
	linkedin: 'https://www.linkedin.com/in/justas-aksamitauskas-196133279/',
	title: 'Justas Aksamitauskas · I can make your Pinterest dreams come true',
	description:
		'Saved a website you love on Pinterest? I design and hand-code it for your business in 1–2 weeks: fast, beautiful, and built to be found on Google and in ChatGPT.',
	ogImage: '/og.jpg',
} as const;

export interface NavLink {
	label: string;
	href: string;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Work', href: '#work' },
	{ label: 'Services', href: '#services' },
	{ label: 'About', href: '#about' },
];

// Formspree handles the contact form; no backend of our own to maintain.
export const FORM_ENDPOINT = 'https://formspree.io/f/mbdqzggq';

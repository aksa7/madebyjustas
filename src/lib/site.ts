export const SITE = {
	name: 'madebyjustas.dev',
	url: 'https://madebyjustas.dev',
	author: 'Justas Aksamitauskas',
	email: 'info@madebyjustas.dev',
	linkedin: 'https://www.linkedin.com/in/justas-aksamitauskas-196133279/',
	defaultDescription: 'Fast, AI-optimized websites for service businesses.',
	defaultOgImage: '/og-default.jpg',
} as const;

export interface NavLink {
	label: string;
	href: string;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/work' },
	{ label: 'Services', href: '/services' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Audits', href: '/audits' },
];

// Forms submit to Formspree (https://formspree.io). The same project endpoint
// handles both the contact and audit forms; a hidden `_subject`/`formType`
// field distinguishes them in the inbox. No backend of our own to maintain.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqevyble';
export const CONTACT_FORM_ENDPOINT = FORMSPREE_ENDPOINT;
export const AUDIT_FORM_ENDPOINT = FORMSPREE_ENDPOINT;

/** Media queries shared by every animation module (and mirrored in CSS). */
export const MQ = {
	/** Full choreography: pinned scenes, the 3D work reel. */
	desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
	/** Lighter choreography for tablets and phones. */
	compact: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
	reduced: '(prefers-reduced-motion: reduce)',
	finePointer: '(hover: hover) and (pointer: fine)',
} as const;

export const prefersReducedMotion = (): boolean => window.matchMedia(MQ.reduced).matches;

/** GSAP equivalents of the CSS motion tokens. */
export const EASE = {
	cinema: 'expo.out',
	settle: 'power3.out',
	soft: 'power2.inOut',
} as const;

export const DUR = {
	fast: 0.35,
	base: 0.7,
	slow: 1.2,
	cinematic: 1.8,
} as const;

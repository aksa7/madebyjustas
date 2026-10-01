import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';

/**
 * Lenis drives the page scroll and feeds ScrollTrigger from GSAP's ticker, so
 * every scrubbed scene reads the same, smoothed scroll position. With reduced
 * motion we keep the browser's native scrolling.
 */
export function createSmoothScroll(): Lenis | null {
	if (prefersReducedMotion()) return null;

	const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1, touchMultiplier: 1.5 });
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
	return lenis;
}

/** In-page links glide to their section and move keyboard focus there. */
export function initAnchorLinks(lenis: Lenis | null): void {
	document.addEventListener('click', (event) => {
		if (!(event.target instanceof Element)) return;
		const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
		if (!link) return;

		const id = link.getAttribute('href')?.slice(1);
		const target = id ? document.getElementById(id) : null;
		if (!target) return;

		event.preventDefault();
		const focusTarget = () => {
			if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
			target.focus({ preventScroll: true });
			history.replaceState(null, '', `#${id}`);
		};

		if (lenis) {
			lenis.scrollTo(target, { duration: 1.6, onComplete: focusTarget });
		} else {
			target.scrollIntoView();
			focusTarget();
		}
	});
}

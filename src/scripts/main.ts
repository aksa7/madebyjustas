import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { initMagnetic } from '../lib/motion/magnetic';
import { initDust } from '../lib/motion/dust';
import { initHeroScroll, prepareHeroIntro } from '../lib/motion/hero';
import { runPreloader } from '../lib/motion/preloader';
import {
	initCounters,
	initManifesto,
	initNavTheme,
	initPins,
	initProjectTypeLinks,
	initReveals,
	initSignetDraw,
	initSpotlights,
	initStickyCta,
} from '../lib/motion/scenes';
import { initShowcase } from '../lib/motion/showcase';
import { createSmoothScroll, initAnchorLinks } from '../lib/motion/smooth-scroll';

/** Fonts decide where SplitText breaks lines, but never hold the page hostage. */
const FONT_WAIT_MS = 3000;

gsap.registerPlugin(ScrollTrigger, SplitText);

async function start(): Promise<void> {
	// Tells the preloader's failsafe that the intro is in our hands now.
	document.documentElement.dataset.intro = 'running';

	// The intro always opens on the hero (or on the section a link pointed to).
	if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
	const hashTarget = location.hash ? document.getElementById(location.hash.slice(1)) : null;
	if (!hashTarget) window.scrollTo(0, 0);

	const lenis = createSmoothScroll();
	lenis?.stop();

	// The curtain starts immediately; everything below is prepared behind it.
	const intro = runPreloader();

	initAnchorLinks(lenis);
	initProjectTypeLinks();
	initMagnetic();
	initDust();

	await Promise.race([
		document.fonts.ready,
		new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
	]);

	const playHero = prepareHeroIntro();
	initHeroScroll();
	initManifesto();
	initShowcase(lenis);
	initReveals();
	initPins();
	initCounters();
	initSignetDraw();
	initSpotlights();
	initStickyCta();
	initNavTheme();
	ScrollTrigger.refresh();

	// Old URLs redirect to /#section: land there once the scenes have their final height.
	if (hashTarget) {
		const y = hashTarget.getBoundingClientRect().top + window.scrollY;
		window.scrollTo(0, y);
		// Lenis still knows the old page height until its observer fires.
		lenis?.resize();
		lenis?.scrollTo(y, { immediate: true, force: true });
	}

	await intro;
	lenis?.start();
	playHero?.();
}

start();

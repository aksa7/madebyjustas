import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DUR, EASE, MQ } from './env';

interface HeroParts {
	section: HTMLElement;
	copy: HTMLElement;
	title: HTMLElement;
	reveals: HTMLElement[];
	media: HTMLElement;
	mediaInner: HTMLElement;
	dark: HTMLElement;
	beam: HTMLElement | null;
	cue: HTMLElement | null;
	video: HTMLVideoElement | null;
}

function getParts(): HeroParts | null {
	const section = document.querySelector<HTMLElement>('[data-hero]');
	if (!section) return null;
	const q = <T extends Element>(sel: string) => section.querySelector<T>(sel);
	const copy = q<HTMLElement>('[data-hero-copy]');
	const title = q<HTMLElement>('[data-hero-title]');
	const media = q<HTMLElement>('[data-hero-media]');
	const mediaInner = q<HTMLElement>('[data-hero-media-inner]');
	const dark = q<HTMLElement>('[data-hero-dark]');
	if (!copy || !title || !media || !mediaInner || !dark) return null;
	return {
		section,
		copy,
		title,
		reveals: Array.from(section.querySelectorAll<HTMLElement>('[data-hero-reveal]')),
		media,
		mediaInner,
		dark,
		beam: q<HTMLElement>('[data-hero-beam]'),
		cue: q<HTMLElement>('[data-hero-cue]'),
		video: q<HTMLVideoElement>('[data-hero-video]'),
	};
}

/** Hides the hero's entrance elements while the preloader still covers them. */
export function prepareHeroIntro(): (() => void) | null {
	const parts = getParts();
	if (!parts || window.matchMedia(MQ.reduced).matches) return null;

	const split = SplitText.create(parts.title, {
		type: 'lines',
		mask: 'lines',
		linesClass: 'hero-line',
	});
	gsap.set(split.lines, { yPercent: 110 });
	gsap.set(parts.reveals, { autoAlpha: 0, y: 24 });
	gsap.set(parts.mediaInner, { scale: 1.14 });

	return () => {
		gsap
			.timeline({ defaults: { ease: EASE.cinema } })
			.to(parts.mediaInner, { scale: 1, duration: 2.6 }, 0)
			.to(split.lines, { yPercent: 0, duration: DUR.cinematic, stagger: 0.12 }, 0.1)
			.to(parts.reveals, { autoAlpha: 1, y: 0, duration: DUR.slow, stagger: 0.1 }, 0.55)
			.add(() => split.revert());
	};
}

/** Scrolling pushes the camera into the deepest fold until it goes dark. */
export function initHeroScroll(): void {
	const parts = getParts();
	if (!parts) return;

	// The video only plays while the hero can be seen.
	if (parts.video) {
		const video = parts.video;
		ScrollTrigger.create({
			trigger: parts.section,
			start: 'top bottom',
			end: 'bottom top',
			onToggle: (self) => {
				if (self.isActive) video.play().catch(() => undefined);
				else video.pause();
			},
		});
	}

	const mm = gsap.matchMedia();
	mm.add({ desktop: MQ.desktop, compact: MQ.compact }, (context) => {
		const { desktop } = context.conditions as { desktop: boolean };
		const timeline = gsap.timeline({
			defaults: { ease: 'none' },
			scrollTrigger: { trigger: parts.section, start: 'top top', end: 'bottom bottom', scrub: 1 },
		});
		timeline
			.to(parts.copy, { yPercent: -18, autoAlpha: 0, duration: 0.32 }, 0)
			.to(parts.cue, { autoAlpha: 0, duration: 0.08 }, 0)
			.to(parts.media, { scale: desktop ? 3.4 : 1.9, duration: 0.85, ease: 'power1.in' }, 0.08)
			.to(parts.dark, { opacity: 1, duration: 0.32 }, 0.6);
		if (parts.beam)
			timeline.fromTo(parts.beam, { autoAlpha: 0 }, { autoAlpha: 0.55, duration: 0.3 }, 0.7);
	});
}

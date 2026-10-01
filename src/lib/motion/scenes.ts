import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DUR, EASE, MQ } from './env';

/** The manifesto lights up word by word as you scroll through it. */
export function initManifesto(): void {
	const section = document.querySelector<HTMLElement>('[data-manifesto]');
	const text = section?.querySelector<HTMLElement>('[data-manifesto-text]');
	if (!section || !text) return;

	const mm = gsap.matchMedia();
	mm.add(`${MQ.desktop}, ${MQ.compact}`, () => {
		const split = SplitText.create(text, { type: 'words', wordsClass: 'manifesto-word' });
		gsap.set(split.words, { opacity: 0.14 });
		gsap.to(split.words, {
			opacity: 1,
			ease: 'none',
			stagger: 0.08,
			scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
		});

		const beam = section.querySelector<HTMLElement>('[data-manifesto-beam]');
		if (beam) {
			gsap.fromTo(
				beam,
				{ autoAlpha: 0.15, xPercent: -6 },
				{
					autoAlpha: 0.6,
					xPercent: 0,
					ease: 'none',
					scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: 1 },
				},
			);
		}
		return () => split.revert();
	});
}

/** Content rises gently into place the first time it scrolls into view. */
export function initReveals(): void {
	const mm = gsap.matchMedia();
	mm.add(`${MQ.desktop}, ${MQ.compact}`, () => {
		gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
			gsap.from(el, {
				autoAlpha: 0,
				y: 40,
				duration: DUR.slow,
				ease: EASE.cinema,
				scrollTrigger: { trigger: el, start: 'top 88%', once: true },
			});
		});
		gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
			gsap.from(group.children, {
				autoAlpha: 0,
				y: 32,
				duration: DUR.slow,
				ease: EASE.cinema,
				stagger: 0.12,
				scrollTrigger: { trigger: group, start: 'top 85%', once: true },
			});
		});
		gsap.utils.toArray<HTMLElement>('[data-draw-line]').forEach((line) => {
			gsap.fromTo(
				line,
				{ scaleX: 0 },
				{
					scaleX: 1,
					ease: 'none',
					scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 35%', scrub: 0.8 },
				},
			);
		});
	});
}

/**
 * The compact "Let's talk" pill appears once the hero has passed and steps
 * aside when the contact section (which has its own form) is on screen.
 */
export function initStickyCta(): void {
	const cta = document.querySelector<HTMLElement>('[data-sticky-cta]');
	const hero = document.querySelector<HTMLElement>('[data-hero]');
	const contact = document.querySelector<HTMLElement>('#contact');
	if (!cta || !hero || !contact) return;

	let pastHero = false;
	let atContact = false;
	const update = () => {
		const visible = pastHero && !atContact;
		cta.dataset.visible = String(visible);
		cta.toggleAttribute('inert', !visible);
	};

	ScrollTrigger.create({
		trigger: hero,
		start: 'bottom 80%',
		end: 'max',
		onToggle: (self) => {
			pastHero = self.isActive;
			update();
		},
	});
	ScrollTrigger.create({
		trigger: contact,
		start: 'top 70%',
		end: 'bottom top',
		onToggle: (self) => {
			atContact = self.isActive;
			update();
		},
	});
	update();
}

/** The header switches to dark ink while it floats over the bone finale. */
export function initNavTheme(): void {
	const nav = document.querySelector<HTMLElement>('[data-nav]');
	if (!nav) return;
	document.querySelectorAll<HTMLElement>('[data-theme="light"]').forEach((section) => {
		ScrollTrigger.create({
			trigger: section,
			start: 'top 40px',
			end: 'bottom 40px',
			onToggle: (self) => {
				nav.dataset.theme = self.isActive ? 'light' : 'dark';
			},
		});
	});
	ScrollTrigger.create({
		start: 80,
		end: 'max',
		onToggle: (self) => {
			nav.dataset.scrolled = String(self.isActive);
		},
	});
}

/** The mood board: pins settle onto the board as the section scrolls into view. */
export function initPins(): void {
	const section = document.querySelector<HTMLElement>('[data-pins]');
	const pins = section ? gsap.utils.toArray<HTMLElement>('[data-pin]', section) : [];
	if (!section || pins.length === 0) return;

	const mm = gsap.matchMedia();
	mm.add(MQ.desktop, () => {
		// Each pin starts tossed off to the side with a slight twist, then lands flat.
		gsap.set(pins, {
			x: (i) => (i % 2 === 0 ? -140 : 140),
			y: (i) => 120 + (i % 3) * 40,
			rotation: (i) => (i % 2 === 0 ? -9 : 7),
			autoAlpha: 0,
		});
		gsap.to(pins, {
			x: 0,
			y: 0,
			rotation: (i) => (i % 2 === 0 ? -1.5 : 1.2),
			autoAlpha: 1,
			ease: 'none',
			stagger: 0.12,
			scrollTrigger: { trigger: section, start: 'top 80%', end: 'center 45%', scrub: 0.8 },
		});
		// Hovering lifts a pin, as if you picked it up.
		const cleanups = pins.map((pin) => {
			const lift = gsap.quickTo(pin, 'y', { duration: 0.5, ease: EASE.settle });
			const onEnter = () => lift(-8);
			const onLeave = () => lift(0);
			pin.addEventListener('pointerenter', onEnter);
			pin.addEventListener('pointerleave', onLeave);
			return () => {
				pin.removeEventListener('pointerenter', onEnter);
				pin.removeEventListener('pointerleave', onLeave);
			};
		});
		return () => cleanups.forEach((cleanup) => cleanup());
	});
	mm.add(MQ.compact, () => {
		gsap.from(pins, {
			y: 36,
			autoAlpha: 0,
			duration: DUR.slow,
			ease: EASE.cinema,
			stagger: 0.08,
			scrollTrigger: {
				trigger: section.querySelector('.pins-board'),
				start: 'top 85%',
				once: true,
			},
		});
	});
}

/** Numbers count up the first time they are seen. */
export function initCounters(): void {
	const mm = gsap.matchMedia();
	mm.add(`${MQ.desktop}, ${MQ.compact}`, () => {
		gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
			const target = Number(el.dataset.count);
			const suffix = el.dataset.suffix ?? '';
			if (Number.isNaN(target)) return;
			const state = { value: 0 };
			gsap.to(state, {
				value: target,
				duration: DUR.cinematic,
				ease: 'power3.out',
				onUpdate: () => {
					el.textContent = `${Math.round(state.value)}${suffix}`;
				},
				scrollTrigger: { trigger: el, start: 'top 85%', once: true },
			});
		});
	});
}

/** The MJ signet in the About section draws itself in as you scroll past. */
export function initSignetDraw(): void {
	const svg = document.querySelector<SVGSVGElement>('[data-signet-draw] svg');
	if (!svg) return;
	const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path'));
	if (paths.length === 0) return;

	const mm = gsap.matchMedia();
	mm.add(MQ.desktop, () => {
		paths.forEach((path) => {
			const length = path.getTotalLength();
			gsap.set(path, {
				fillOpacity: 0,
				stroke: 'currentColor',
				strokeWidth: 8,
				strokeDasharray: length,
				strokeDashoffset: length,
			});
		});
		const timeline = gsap.timeline({
			scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 45%', scrub: 1 },
		});
		timeline
			.to(paths, { strokeDashoffset: 0, ease: 'none', stagger: 0.2, duration: 1 })
			.to(paths, { fillOpacity: 1, strokeWidth: 0, duration: 0.4 });
		return () => {
			gsap.set(paths, {
				clearProps: 'fillOpacity,stroke,strokeWidth,strokeDasharray,strokeDashoffset',
			});
		};
	});
}

/** A soft light follows the pointer across service rows. */
export function initSpotlights(): void {
	const mm = gsap.matchMedia();
	mm.add(`${MQ.desktop} and ${MQ.finePointer}`, () => {
		const cleanups = gsap.utils.toArray<HTMLElement>('[data-spotlight]').map((el) => {
			const onMove = (event: PointerEvent) => {
				const box = el.getBoundingClientRect();
				el.style.setProperty('--mx', `${((event.clientX - box.left) / box.width) * 100}%`);
				el.style.setProperty('--my', `${((event.clientY - box.top) / box.height) * 100}%`);
			};
			el.addEventListener('pointermove', onMove, { passive: true });
			return () => {
				el.removeEventListener('pointermove', onMove);
				el.style.removeProperty('--mx');
				el.style.removeProperty('--my');
			};
		});
		return () => cleanups.forEach((cleanup) => cleanup());
	});
}

/**
 * CTAs can carry a project type: clicking one preselects it in the contact
 * form, so people land on a form that already says what they came for.
 */
export function initProjectTypeLinks(): void {
	const select = document.querySelector<HTMLSelectElement>('#contact-type');
	if (!select) return;
	document.addEventListener('click', (event) => {
		if (!(event.target instanceof Element)) return;
		const link = event.target.closest<HTMLElement>('[data-project-type]');
		const type = link?.dataset.projectType;
		if (!type) return;
		const option = Array.from(select.options).find((item) => item.value === type);
		if (!option) return;
		select.value = type;
		select.dispatchEvent(new Event('input', { bubbles: true }));
	});
}

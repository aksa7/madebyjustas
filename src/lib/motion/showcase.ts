import type Lenis from 'lenis';
import { gsap } from 'gsap';
import { DUR, EASE, MQ } from './env';

const REEL_ANGLE = 50; // degrees between neighbouring cards on the reel
const IDLE_ADVANCE_MS = 7000;

interface Showcase {
	section: HTMLElement;
	pin: HTMLElement;
	reel: HTMLElement;
	screen: HTMLElement;
	cards: HTMLElement[];
	texts: HTMLElement[];
	count: HTMLElement | null;
	prev: HTMLButtonElement | null;
	next: HTMLButtonElement | null;
	pause: HTMLButtonElement | null;
	sweep: HTMLElement | null;
}

function getShowcase(): Showcase | null {
	const section = document.querySelector<HTMLElement>('[data-work]');
	if (!section) return null;
	const q = <T extends Element>(sel: string) => section.querySelector<T>(sel);
	const reel = q<HTMLElement>('[data-work-reel]');
	const screen = q<HTMLElement>('[data-work-screen]');
	if (!reel || !screen) return null;
	return {
		section,
		pin: q<HTMLElement>('[data-work-pin]') ?? section,
		reel,
		screen,
		cards: Array.from(section.querySelectorAll<HTMLElement>('[data-work-card]')),
		texts: Array.from(section.querySelectorAll<HTMLElement>('[data-work-text]')),
		count: q<HTMLElement>('[data-work-count]'),
		prev: q<HTMLButtonElement>('[data-work-prev]'),
		next: q<HTMLButtonElement>('[data-work-next]'),
		pause: q<HTMLButtonElement>('[data-work-pause]'),
		sweep: q<HTMLElement>('[data-work-sweep]'),
	};
}

const clamp = gsap.utils.clamp(0, 1);
const pad = (n: number) => String(n).padStart(2, '0');

export function initShowcase(lenis: Lenis | null): void {
	const s = getShowcase();
	if (!s || s.cards.length === 0) return;
	const total = s.cards.length;
	let active = -1;
	let paused = false;
	let goTo: (index: number) => void = () => undefined;

	// Captions: only the active project's text is shown (all of it stays in the DOM).
	s.section.dataset.caption = 'on';

	const setActive = (index: number, animate: boolean) => {
		if (index === active) return;
		const previous = active;
		active = index;
		s.texts.forEach((text, i) => {
			const isActive = i === index;
			text.toggleAttribute('inert', !isActive);
			text.setAttribute('aria-hidden', String(!isActive));
			if (!animate) {
				gsap.set(text, { autoAlpha: isActive ? 1 : 0 });
				return;
			}
			if (isActive) {
				gsap.set(text, { autoAlpha: 1 });
				gsap.fromTo(
					text.querySelectorAll('[data-work-line]'),
					{ autoAlpha: 0, y: 18 },
					{
						autoAlpha: 1,
						y: 0,
						duration: DUR.base,
						ease: EASE.cinema,
						stagger: 0.06,
						overwrite: true,
					},
				);
			} else if (i === previous) {
				gsap.to(text, { autoAlpha: 0, duration: DUR.fast, ease: EASE.soft, overwrite: true });
			} else {
				gsap.set(text, { autoAlpha: 0 });
			}
		});
		if (s.count) s.count.textContent = pad(index + 1);
		s.prev?.setAttribute('aria-disabled', String(index === 0));
		s.next?.setAttribute('aria-disabled', String(index === total - 1));
	};

	const flash = () => {
		if (!s.sweep) return;
		gsap.fromTo(
			s.sweep,
			{ xPercent: -120, autoAlpha: 0 },
			{
				xPercent: 120,
				keyframes: { autoAlpha: [0, 0.55, 0] },
				duration: 1.1,
				ease: 'power2.inOut',
				overwrite: true,
			},
		);
	};

	s.prev?.addEventListener('click', () => {
		if (active > 0) goTo(active - 1);
	});
	s.next?.addEventListener('click', () => {
		if (active < total - 1) goTo(active + 1);
	});
	s.pause?.addEventListener('click', () => {
		paused = !paused;
		s.pause?.setAttribute('aria-pressed', String(paused));
		const label = s.pause?.querySelector('[data-pause-label]');
		if (label) label.textContent = paused ? 'Play' : 'Pause';
	});

	setActive(0, false);

	// Decode every screenshot shortly before the section arrives, so turning
	// the reel never waits on an image.
	const warmUp = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;
			warmUp.disconnect();
			s.section.querySelectorAll<HTMLImageElement>('[data-work-card] img').forEach((img) => {
				img.loading = 'eager';
				img.decode().catch(() => undefined);
			});
		},
		{ rootMargin: '100% 0px' },
	);
	warmUp.observe(s.section);

	const mm = gsap.matchMedia();

	// Desktop: a 3D reel that scrolling turns through the screen.
	mm.add(MQ.desktop, () => {
		document.documentElement.dataset.reel = 'on';
		const state = { p: 0 };
		let radius = 0;

		const layout = () => {
			const width = s.screen.offsetWidth;
			radius = (width / 2 / Math.tan(((REEL_ANGLE / 2) * Math.PI) / 180)) * 1.08;
			s.cards.forEach((card, i) => {
				card.style.transform = `rotateY(${i * REEL_ANGLE}deg) translate3d(0, 0, ${radius}px)`;
			});
			render();
		};

		const render = () => {
			s.reel.style.transform = `translate3d(0, 0, ${-radius}px) rotateY(${-state.p * REEL_ANGLE}deg)`;
			s.cards.forEach((card, i) => {
				const distance = Math.abs(i - state.p);
				const visibility = clamp(1 - (distance - 0.3) / 0.65);
				card.style.opacity = String(visibility);
				card.style.visibility = visibility === 0 ? 'hidden' : 'visible';
				card.style.setProperty('--dim', String(Math.min(distance * 0.9, 0.75)));
			});
			const index = Math.round(state.p);
			if (index !== active) {
				setActive(index, true);
				flash();
			}
		};

		layout();
		const resizeObserver = new ResizeObserver(layout);
		resizeObserver.observe(s.screen);

		const tween = gsap.to(state, {
			p: total - 1,
			ease: 'none',
			onUpdate: render,
			scrollTrigger: {
				trigger: s.pin,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 0.9,
				snap: {
					// Settle on the nearest project: no direction bias, no fling after a fast scroll.
					snapTo: (value: number) => Math.round(value * (total - 1)) / (total - 1),
					inertia: false,
					duration: { min: 0.35, max: 0.85 },
					delay: 0.12,
					ease: 'power2.inOut',
				},
			},
		});
		const trigger = tween.scrollTrigger;

		goTo = (index) => {
			if (!trigger) return;
			const target = trigger.start + ((trigger.end - trigger.start) * index) / (total - 1);
			if (lenis) lenis.scrollTo(target, { duration: 1.5 });
			else window.scrollTo({ top: target });
		};

		// A gentle tilt towards the pointer makes the screen feel physical.
		const tiltX = gsap.quickTo(s.screen, 'rotationX', { duration: 0.9, ease: EASE.settle });
		const tiltY = gsap.quickTo(s.screen, 'rotationY', { duration: 0.9, ease: EASE.settle });
		const onPointerMove = (event: PointerEvent) => {
			const box = s.screen.getBoundingClientRect();
			tiltY(((event.clientX - box.left) / box.width - 0.5) * 6);
			tiltX(((event.clientY - box.top) / box.height - 0.5) * -4);
		};
		const onPointerLeave = () => {
			tiltX(0);
			tiltY(0);
		};
		s.screen.addEventListener('pointermove', onPointerMove);
		s.screen.addEventListener('pointerleave', onPointerLeave);

		// Idle auto-advance: only while the reel is on screen and nobody is interacting.
		let idleTimer = 0;
		const scheduleAdvance = () => {
			window.clearTimeout(idleTimer);
			idleTimer = window.setTimeout(() => {
				if (
					!paused &&
					trigger?.isActive &&
					active < total - 1 &&
					document.visibilityState === 'visible'
				) {
					goTo(active + 1);
				}
				scheduleAdvance();
			}, IDLE_ADVANCE_MS);
		};
		const interactionEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
		interactionEvents.forEach((type) =>
			window.addEventListener(type, scheduleAdvance, { passive: true }),
		);
		scheduleAdvance();

		return () => {
			delete document.documentElement.dataset.reel;
			resizeObserver.disconnect();
			window.clearTimeout(idleTimer);
			interactionEvents.forEach((type) => window.removeEventListener(type, scheduleAdvance));
			s.screen.removeEventListener('pointermove', onPointerMove);
			s.screen.removeEventListener('pointerleave', onPointerLeave);
			gsap.set(s.screen, { clearProps: 'transform' });
			s.reel.style.transform = '';
			s.cards.forEach((card) => {
				card.style.transform = '';
				card.style.opacity = '';
				card.style.visibility = '';
				card.style.removeProperty('--dim');
			});
		};
	});

	// Tablets and phones: the section pins and vertical scroll pushes the strip sideways.
	mm.add(MQ.compact, () => {
		document.documentElement.dataset.track = 'on';
		const viewport = s.reel.parentElement as HTMLElement;
		const state = { p: 0 };
		let step = 0;
		let centre = 0;

		const render = () => {
			s.reel.style.transform = `translate3d(${centre - state.p * step}px, 0, 0)`;
			s.cards.forEach((card, i) => {
				card.style.setProperty('--dim', String(Math.min(Math.abs(i - state.p) * 0.7, 0.6)));
			});
			const index = Math.round(state.p);
			if (index !== active) {
				setActive(index, true);
				flash();
			}
		};
		const layout = () => {
			const first = s.cards[0];
			const second = s.cards[1];
			if (!first) return;
			step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
			centre = (viewport.clientWidth - first.offsetWidth) / 2;
			render();
		};
		layout();
		const resizeObserver = new ResizeObserver(layout);
		resizeObserver.observe(viewport);

		const tween = gsap.to(state, {
			p: total - 1,
			ease: 'none',
			onUpdate: render,
			scrollTrigger: {
				trigger: s.pin,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 0.6,
				snap: {
					snapTo: (value: number) => Math.round(value * (total - 1)) / (total - 1),
					inertia: false,
					duration: { min: 0.3, max: 0.7 },
					delay: 0.1,
					ease: 'power2.inOut',
				},
			},
		});
		const trigger = tween.scrollTrigger;

		goTo = (index) => {
			if (!trigger) return;
			const target = trigger.start + ((trigger.end - trigger.start) * index) / (total - 1);
			if (lenis) lenis.scrollTo(target, { duration: 1.2 });
			else window.scrollTo({ top: target, behavior: 'smooth' });
		};

		return () => {
			delete document.documentElement.dataset.track;
			resizeObserver.disconnect();
			s.reel.style.transform = '';
			s.cards.forEach((card) => card.style.removeProperty('--dim'));
		};
	});

	// Reduced motion: a plain native swipe track, nothing moves on its own.
	mm.add(MQ.reduced, () => {
		const step = () =>
			s.cards[1] ? s.cards[1].offsetLeft - s.cards[0].offsetLeft : s.reel.clientWidth;

		goTo = (index) => {
			s.reel.scrollTo({ left: step() * index });
		};

		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const index = Math.min(total - 1, Math.max(0, Math.round(s.reel.scrollLeft / step())));
				setActive(index, false);
			});
		};
		s.reel.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			s.reel.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(frame);
		};
	});
}

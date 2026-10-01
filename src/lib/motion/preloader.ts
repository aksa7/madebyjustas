import { gsap } from 'gsap';
import { DUR, EASE, prefersReducedMotion } from './env';

const SEEN_KEY = 'mj-intro-seen';
const MAX_WAIT_MS = 6000;

function readSeen(): boolean {
	try {
		return sessionStorage.getItem(SEEN_KEY) === '1';
	} catch {
		return false;
	}
}

function markSeen(): void {
	try {
		sessionStorage.setItem(SEEN_KEY, '1');
	} catch {
		/* storage can be blocked; the long intro just plays again */
	}
}

function waitForVideo(video: HTMLVideoElement): Promise<void> {
	// No matching <source> (phones) means nothing loads: nothing to wait for.
	if (!video.currentSrc && !video.querySelector('source')) return Promise.resolve();
	if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return Promise.resolve();
	return new Promise((resolve) => {
		const done = () => resolve();
		video.addEventListener('canplay', done, { once: true });
		video.addEventListener('error', done, { once: true });
	});
}

async function decodeImage(img: HTMLImageElement): Promise<void> {
	await img.decode().catch(() => undefined);
}

/** Every asset the first real frame needs, decoded before the curtain lifts. */
function collectHeroAssets(): Promise<void>[] {
	const tasks: Promise<void>[] = [document.fonts.ready.then(() => undefined)];
	document
		.querySelectorAll<HTMLImageElement>('[data-preload-image]')
		.forEach((img) => tasks.push(decodeImage(img)));
	const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
	if (video && getComputedStyle(video).display !== 'none') tasks.push(waitForVideo(video));
	return tasks;
}

/**
 * Plays the projector-beam intro while hero assets load, then lifts the
 * curtain. Resolves the moment the reveal starts so the hero can follow.
 */
export function runPreloader(): Promise<void> {
	const root = document.querySelector<HTMLElement>('[data-preloader]');
	const finish = () => {
		document.documentElement.classList.remove('is-loading');
		markSeen();
	};
	if (!root) {
		finish();
		return Promise.resolve();
	}

	if (prefersReducedMotion()) {
		return new Promise((resolve) => {
			Promise.all(collectHeroAssets()).then(() => {
				gsap.to(root, {
					autoAlpha: 0,
					duration: DUR.base,
					onComplete: () => {
						root.remove();
						finish();
					},
				});
				resolve();
			});
		});
	}

	const quick = readSeen();
	const minMs = quick ? 700 : 2600;
	const beam = root.querySelector<HTMLElement>('[data-pl-beam]');
	const markWrap = root.querySelector<HTMLElement>('[data-pl-mark]');
	const mark = markWrap?.querySelector<SVGSVGElement>('svg') ?? null;
	const paths = mark ? Array.from(mark.querySelectorAll<SVGPathElement>('path')) : [];
	const line = root.querySelector<HTMLElement>('[data-pl-line]');
	const caption = root.querySelector<HTMLElement>('[data-pl-caption]');

	// The signet "draws" itself: outline first, then the ink fills in.
	paths.forEach((path) => {
		const length = path.getTotalLength();
		gsap.set(path, {
			fillOpacity: 0,
			stroke: 'currentColor',
			strokeWidth: 6,
			strokeDasharray: length,
			strokeDashoffset: length,
		});
	});

	// CSS keeps the mark hidden until its outline is ready to draw.
	if (markWrap) gsap.set(markWrap, { autoAlpha: 1 });

	const intro = gsap.timeline();
	if (beam) {
		// A projector warming up: a couple of soft flickers, then steady light.
		intro.fromTo(
			beam,
			{ autoAlpha: 0 },
			{
				keyframes: [
					{ autoAlpha: 0.25, duration: 0.18 },
					{ autoAlpha: 0.08, duration: 0.14 },
					{ autoAlpha: 0.55, duration: 0.5 },
				],
				ease: 'none',
			},
			quick ? 0 : 0.2,
		);
	}
	intro
		.to(
			paths,
			{ strokeDashoffset: 0, duration: quick ? 0.6 : 1.5, ease: EASE.soft, stagger: 0.12 },
			quick ? 0 : 0.5,
		)
		.to(paths, { fillOpacity: 1, strokeWidth: 0, duration: 0.6, ease: EASE.settle }, '-=0.3')
		.fromTo(
			caption,
			{ autoAlpha: 0, y: 8 },
			{ autoAlpha: 1, y: 0, duration: DUR.base, ease: EASE.settle },
			'<',
		);

	const tasks = collectHeroAssets();
	let loaded = 0;
	const setProgress = () => {
		gsap.to(line, { scaleX: loaded / tasks.length, duration: 0.6, ease: EASE.settle });
	};
	tasks.forEach((task) =>
		task.then(() => {
			loaded += 1;
			setProgress();
		}),
	);

	const ready = Promise.race([
		Promise.all([Promise.all(tasks), new Promise((r) => setTimeout(r, minMs))]),
		new Promise((r) => setTimeout(r, MAX_WAIT_MS)),
	]);

	return new Promise((resolve) => {
		ready.then(() => {
			intro.progress(1);
			gsap
				.timeline({
					onComplete: () => {
						root.remove();
					},
				})
				.to([mark, caption, line], {
					autoAlpha: 0,
					y: -16,
					duration: DUR.base,
					ease: EASE.soft,
					stagger: 0.06,
				})
				.to(
					root,
					{ clipPath: 'inset(0% 0% 100% 0%)', duration: DUR.slow, ease: 'expo.inOut' },
					'-=0.25',
				)
				.add(() => {
					finish();
					resolve();
				}, '<0.15');
		});
	});
}

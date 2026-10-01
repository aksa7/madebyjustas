import { MQ, prefersReducedMotion } from './env';

interface Mote {
	x: number;
	y: number;
	r: number;
	vx: number;
	vy: number;
	phase: number;
	alpha: number;
}

const MAX_DPR = 1.5;

/**
 * Dust drifting through the projector beam. Each canvas animates only while
 * it is on screen; with reduced motion it is never started (the beam still
 * shows as a still image).
 */
export function initDust(): void {
	if (prefersReducedMotion()) return;
	document.querySelectorAll<HTMLCanvasElement>('[data-dust]').forEach((canvas) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const density = window.matchMedia(MQ.desktop).matches ? 1 : 0.4;
		let width = 0;
		let height = 0;
		let motes: Mote[] = [];
		let frame = 0;
		let running = false;

		const seed = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.round(((width * height) / 14000) * density);
			motes = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				r: 0.4 + Math.random() * 1.5,
				vx: (Math.random() - 0.3) * 0.12,
				vy: -0.05 - Math.random() * 0.16,
				phase: Math.random() * Math.PI * 2,
				alpha: 0.12 + Math.random() * 0.45,
			}));
		};

		const draw = (time: number) => {
			ctx.clearRect(0, 0, width, height);
			for (const mote of motes) {
				mote.x += mote.vx;
				mote.y += mote.vy;
				if (mote.y < -4) mote.y = height + 4;
				if (mote.x > width + 4) mote.x = -4;
				if (mote.x < -4) mote.x = width + 4;
				const twinkle = 0.55 + 0.45 * Math.sin(time * 0.0012 + mote.phase);
				ctx.globalAlpha = mote.alpha * twinkle;
				ctx.fillStyle = '#e8dfd0';
				ctx.beginPath();
				ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
				ctx.fill();
			}
			frame = requestAnimationFrame(draw);
		};

		const start = () => {
			if (running) return;
			running = true;
			frame = requestAnimationFrame(draw);
		};
		const stop = () => {
			running = false;
			cancelAnimationFrame(frame);
		};

		seed();
		new ResizeObserver(seed).observe(canvas);
		new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop())).observe(
			canvas,
		);
		document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
	});
}

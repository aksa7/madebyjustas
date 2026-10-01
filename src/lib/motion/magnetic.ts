import { gsap } from 'gsap';
import { MQ } from './env';

/** Primary buttons lean slightly towards the pointer. */
export function initMagnetic(): void {
	const mm = gsap.matchMedia();
	mm.add(`${MQ.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
		const cleanups = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]')).map(
			(el) => {
				const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
				const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
				const onMove = (event: PointerEvent) => {
					const box = el.getBoundingClientRect();
					x((event.clientX - (box.left + box.width / 2)) * 0.28);
					y((event.clientY - (box.top + box.height / 2)) * 0.32);
				};
				const onLeave = () => {
					x(0);
					y(0);
				};
				el.addEventListener('pointermove', onMove);
				el.addEventListener('pointerleave', onLeave);
				return () => {
					el.removeEventListener('pointermove', onMove);
					el.removeEventListener('pointerleave', onLeave);
					gsap.set(el, { clearProps: 'transform' });
				};
			},
		);
		return () => cleanups.forEach((cleanup) => cleanup());
	});
}

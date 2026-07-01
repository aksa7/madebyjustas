export function initScrollReveal(): void {
	const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
	if (elements.length === 0) return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		elements.forEach((el) => {
			el.dataset.visible = 'true';
		});
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					(entry.target as HTMLElement).dataset.visible = 'true';
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
	);

	elements.forEach((el) => observer.observe(el));
}

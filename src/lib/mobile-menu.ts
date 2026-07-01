const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

export function initMobileMenu(): void {
	const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
	const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
	const backdrop = document.querySelector<HTMLElement>('[data-menu-backdrop]');

	if (!toggle || !panel) return;

	let outsideClickHandler: ((event: MouseEvent) => void) | null = null;
	let keydownHandler: ((event: KeyboardEvent) => void) | null = null;

	const setState = (state: 'open' | 'closed') => {
		toggle.dataset.state = state;
		panel.dataset.state = state;
		if (backdrop) backdrop.dataset.state = state;
	};

	const trapFocus = (event: KeyboardEvent) => {
		const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	const closeMenu = ({ restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
		setState('closed');
		toggle.setAttribute('aria-expanded', 'false');
		panel.setAttribute('aria-hidden', 'true');
		panel.setAttribute('inert', '');
		document.body.style.overflow = '';

		if (outsideClickHandler) {
			document.removeEventListener('click', outsideClickHandler);
			outsideClickHandler = null;
		}
		if (keydownHandler) {
			document.removeEventListener('keydown', keydownHandler);
			keydownHandler = null;
		}

		if (restoreFocus) toggle.focus();
	};

	const openMenu = () => {
		setState('open');
		toggle.setAttribute('aria-expanded', 'true');
		panel.setAttribute('aria-hidden', 'false');
		panel.removeAttribute('inert');
		document.body.style.overflow = 'hidden';

		outsideClickHandler = (event) => {
			const target = event.target as Node;
			if (!panel.contains(target) && !toggle.contains(target)) {
				closeMenu({ restoreFocus: false });
			}
		};
		keydownHandler = (event) => {
			if (event.key === 'Escape') {
				closeMenu();
			} else if (event.key === 'Tab') {
				trapFocus(event);
			}
		};

		document.addEventListener('click', outsideClickHandler);
		document.addEventListener('keydown', keydownHandler);

		panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
	};

	toggle.addEventListener('click', () => {
		const isOpen = toggle.getAttribute('aria-expanded') === 'true';
		if (isOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	panel.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
	});

	closeMenu({ restoreFocus: false });
}

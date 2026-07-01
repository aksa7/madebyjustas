export const BUTTON_BASE_CLASS =
	'inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-medium transition-colors duration-base ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400';

export const BUTTON_VARIANT_CLASS = {
	primary: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
	secondary:
		'border border-neutral-300 text-neutral-900 hover:border-neutral-900 active:bg-neutral-100',
} as const;

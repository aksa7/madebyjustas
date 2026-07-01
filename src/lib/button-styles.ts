export const BUTTON_BASE_CLASS =
	'inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-fast ease-standard active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500';

export const BUTTON_VARIANT_CLASS = {
	primary:
		'bg-accent-500 text-white shadow-sm hover:bg-accent-600 hover:shadow-md active:bg-accent-700 active:shadow-sm',
	secondary:
		'border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100',
} as const;

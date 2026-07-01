/**
 * Inline SVG noise texture (feTurbulence), used as a very low-opacity
 * background layer for subtle grain. No network request, no extra build
 * asset — just a data URI, applied via an inline style since the raw
 * data URI can't safely round-trip through Tailwind's arbitrary-value
 * class syntax (commas/quotes collide with class parsing).
 */
export const GRAIN_BACKGROUND =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

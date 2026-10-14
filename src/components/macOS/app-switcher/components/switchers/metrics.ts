// Shared by both switchers, so the liquid canvas and the CSS glass match
export const ICON_SIZE = 120;
export const GAP = 4;
export const PADDING_HORIZONTAL = 28;
export const PADDING_VERTICAL = 22;
export const CORNER_RADIUS = 52;

export function switcherSize(count: number) {
	return {
		height: ICON_SIZE + PADDING_VERTICAL * 2,
		width: ICON_SIZE * count + GAP * (count - 1) + PADDING_HORIZONTAL * 2,
	};
}

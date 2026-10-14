import { TintedGlass } from "@/components/macOS/ui/tinted-glass";
import { CORNER_RADIUS, switcherSize } from "./metrics";

/** App switcher rendered with the react-bits CSS glass. */
export function FallbackAppSwitcher({
	children,
	count,
}: {
	children: React.ReactNode;
	count: number;
}) {
	const { height, width } = switcherSize(count);
	return (
		<TintedGlass borderRadius={CORNER_RADIUS} height={height} width={width}>
			{children}
		</TintedGlass>
	);
}

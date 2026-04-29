import { useCallback, useState } from "react";
import { DockTooltip } from "../components/dock-tooltip";
export function useAppTooltip({ isDockResizing }: { isDockResizing: boolean }) {
	const [tooltipData, setTooltipData] = useState<{
		name: string;
		x: number;
		y: number;
		width: number;
	} | null>(null);

	if (isDockResizing && tooltipData) {
		setTooltipData(null);
	}

	const showTooltip = (el: HTMLElement | null, name: string) => {
		if (!el) {
			setTooltipData(null);
			return;
		}
		const rect = el.getBoundingClientRect();
		setTooltipData({
			name,
			width: rect.width,
			x: rect.left,
			y: rect.top,
		});
	};
	const Tooltip = useCallback(
		() =>
			tooltipData ? (
				<DockTooltip {...tooltipData}>{tooltipData.name}</DockTooltip>
			) : null,
		[tooltipData],
	);

	return { showTooltip, Tooltip };
}

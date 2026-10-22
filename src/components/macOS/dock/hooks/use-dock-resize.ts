import { useEffect, useRef, useState } from "react";

export const DOCK_MIN_HEIGHT = 75;
export const DOCK_MAX_HEIGHT = 125;
// Gap between the dock and the bottom of the screen
export const DOCK_MARGIN_BOTTOM = 6;
// Windows are centered above the biggest dock, so resizing it doesn't move them
export const DOCK_AREA_HEIGHT = DOCK_MAX_HEIGHT + DOCK_MARGIN_BOTTOM;
// Marks the dock, so windows can stop at its current top
export const DOCK_ATTRIBUTE = "data-dock";

// ---------------------------------------------------------------
// ↕️ Dock resize
export function useDockResize({ initialHeight }: { initialHeight: number }) {
	const [height, setHeight] = useState(initialHeight);
	const [isDockResizing, setisDockResizing] = useState(false);
	const startYRef = useRef<number>(0);
	const startHeightRef = useRef<number>(0);

	const resize = (e: React.MouseEvent) => {
		e.preventDefault();
		setisDockResizing(true);
		startYRef.current = e.clientY;
		startHeightRef.current = height;
	};

	useEffect(() => {
		if (!isDockResizing) return;
		document.body.style.cursor = "ns-resize";

		const handleMouseMove = (e: MouseEvent) => {
			const deltaY = startYRef.current - e.clientY;
			const newHeight = Math.min(
				DOCK_MAX_HEIGHT,
				Math.max(DOCK_MIN_HEIGHT, startHeightRef.current + deltaY),
			);
			setHeight(newHeight);
		};

		const controller = new AbortController();
		const { signal } = controller;

		const handleMouseUp = () => {
			setisDockResizing(false);
		};

		window.addEventListener("mousemove", handleMouseMove, {
			signal,
		});
		window.addEventListener("mouseup", handleMouseUp, { signal });

		const cleanUp = () => {
			controller.abort();
			document.body.style.cursor = "";
		};
		return cleanUp;
	}, [isDockResizing]);

	return { height, isDockResizing, resize };
}

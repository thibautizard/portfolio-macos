import { useEffect, useRef, useState } from "react";

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
				125,
				Math.max(75, startHeightRef.current + deltaY),
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

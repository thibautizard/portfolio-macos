import { domToBlob } from "modern-screenshot";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

// Marks the switcher so it's left out of its own backdrop
export const APP_SWITCHER_ATTRIBUTE = "data-app-switcher";

// Frames for the liquid canvas to redraw the new backdrop before it's shown
const PAINT_FRAMES = 5;

// ---------------------------------------------------------------
// 📸 Freezes the desktop, so the liquid glass refracts the real screen
// (windows included) instead of the bare wallpaper.
// `isCapturing` stays true until the new image is painted.
export function useDesktopSnapshot(
	desktopRef: React.RefObject<HTMLElement | null>,
) {
	const [snapshot, setSnapshot] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const latestRef = useRef(0);
	const urlRef = useRef<string | null>(null);

	const capture = useCallback(async () => {
		const desktop = desktopRef.current;
		if (!desktop) return;
		const id = ++latestRef.current;
		const isLatest = () => id === latestRef.current;
		setIsCapturing(true);
		try {
			const blob = await domToBlob(desktop, {
				filter: (node) =>
					!(
						node instanceof Element &&
						(node.hasAttribute(APP_SWITCHER_ATTRIBUTE) ||
							// Reading back the liquid canvases (dock, menus) disturbs their WebGPU
							// rendering: the dock glitches. The wallpaper shows in their place.
							node instanceof HTMLCanvasElement)
					),
				scale: 1,
				// The root's brightness opacity also applies to the switcher: don't bake it in twice
				style: { opacity: "1" },
			});
			if (!blob || !isLatest()) return;

			// Decode before swapping, or the backdrop goes blank for a frame
			const url = URL.createObjectURL(blob);
			const image = new Image();
			image.src = url;
			await image.decode();
			if (!isLatest()) {
				URL.revokeObjectURL(url);
				return;
			}

			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
			urlRef.current = url;
			// Commit now, so the frames below are counted from the new backdrop
			flushSync(() => setSnapshot(url));
			await waitFrames(PAINT_FRAMES);
		} catch (error) {
			console.warn("App switcher snapshot failed", error);
		} finally {
			if (isLatest()) setIsCapturing(false);
		}
	}, [desktopRef]);

	useEffect(
		() => () => {
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
		},
		[],
	);

	return { capture, isCapturing, snapshot };
}

function waitFrames(count: number) {
	return new Promise<void>((resolve) => {
		const step = (left: number) =>
			left === 0 ? resolve() : requestAnimationFrame(() => step(left - 1));
		step(count);
	});
}

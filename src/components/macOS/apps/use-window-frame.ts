import { useDragControls, useMotionValue } from "motion/react";
import { type RefObject, useCallback, useEffect, useRef } from "react";
import { DOCK_ATTRIBUTE } from "@/components/macOS/dock/hooks/use-dock-resize";

export type ResizeEdge =
	| "top"
	| "right"
	| "bottom"
	| "left"
	| "top-left"
	| "top-right"
	| "bottom-right"
	| "bottom-left";

export const RESIZE_CURSORS: Record<ResizeEdge, string> = {
	bottom: "ns-resize",
	"bottom-left": "nesw-resize",
	"bottom-right": "nwse-resize",
	left: "ew-resize",
	right: "ew-resize",
	top: "ns-resize",
	"top-left": "nwse-resize",
	"top-right": "nesw-resize",
};

// ---------------------------------------------------------------
// 🪟 Moves a window and resizes it from any edge or corner, like macOS:
// the grabbed edge follows the pointer and the opposite one stays put.
// The size is written straight to the element, so the layout position
// can be read back right away (`offsetLeft` ignores the drag transform).
export function useWindowFrame({
	minHeight,
	minWidth,
	parentRef,
	windowRef,
}: {
	minHeight: number;
	minWidth: number;
	parentRef: RefObject<HTMLElement | null>;
	windowRef: RefObject<HTMLElement | null>;
}) {
	// Shared with motion's drag, so moving and resizing stay in sync
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const stopRef = useRef<() => void>(undefined);

	useEffect(() => () => stopRef.current?.(), []);

	// ✋ Drag bounds as plain offsets, measured when a drag starts.
	// With a ref, motion re-centers the window within it on every resize.
	const dragControls = useDragControls();
	const dragConstraints = useRef({
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
	}).current;

	const startDrag = useCallback(
		(e: React.PointerEvent<HTMLElement>) => {
			const element = windowRef.current;
			const parent = parentRef.current;
			if (!element || !parent) return;
			const bounds = desktopBounds(parent);
			const rect = element.getBoundingClientRect();
			Object.assign(dragConstraints, {
				bottom: y.get() + bounds.bottom - rect.bottom,
				left: x.get() - (rect.left - bounds.left),
				right: x.get() + bounds.right - rect.right,
				top: y.get() - (rect.top - bounds.top),
			});
			dragControls.start(e);
		},
		[dragConstraints, dragControls, parentRef, windowRef, x, y],
	);

	const startResize = useCallback(
		(edge: ResizeEdge, e: React.PointerEvent<HTMLElement>) => {
			const element = windowRef.current;
			const parent = parentRef.current;
			if (!element || !parent || e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();

			const handle = e.currentTarget;
			handle.setPointerCapture(e.pointerId);

			const start = {
				height: element.offsetHeight,
				left: element.offsetLeft + x.get(),
				pointerX: e.clientX,
				pointerY: e.clientY,
				top: element.offsetTop + y.get(),
				width: element.offsetWidth,
			};
			// How far each edge can go before leaving the desktop
			const bounds = desktopBounds(parent);
			const rect = element.getBoundingClientRect();
			const maxWidth = {
				left: rect.right - bounds.left,
				right: bounds.right - rect.left,
			};
			const maxHeight = {
				bottom: bounds.bottom - rect.top,
				top: rect.bottom - bounds.top,
			};
			const grabsLeft = edge.includes("left");
			const grabsRight = edge.includes("right");
			const grabsTop = edge.includes("top");
			const grabsBottom = edge.includes("bottom");

			const handleMove = (event: PointerEvent) => {
				const dx = event.clientX - start.pointerX;
				const dy = event.clientY - start.pointerY;

				let width = start.width;
				if (grabsRight)
					width = clamp(start.width + dx, minWidth, maxWidth.right);
				if (grabsLeft) width = clamp(start.width - dx, minWidth, maxWidth.left);
				let height = start.height;
				if (grabsBottom) {
					height = clamp(start.height + dy, minHeight, maxHeight.bottom);
				}
				if (grabsTop)
					height = clamp(start.height - dy, minHeight, maxHeight.top);

				element.style.width = `${width}px`;
				element.style.height = `${height}px`;

				// The layout may re-center the window when its size changes:
				// offset it so the edges that aren't grabbed stay where they were
				const left = grabsLeft ? start.left + start.width - width : start.left;
				const top = grabsTop ? start.top + start.height - height : start.top;
				x.set(left - element.offsetLeft);
				y.set(top - element.offsetTop);
			};

			const controller = new AbortController();
			const { signal } = controller;
			const stop = () => {
				controller.abort();
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				stopRef.current = undefined;
			};
			stopRef.current = stop;

			document.body.style.cursor = RESIZE_CURSORS[edge];
			document.body.style.userSelect = "none";
			handle.addEventListener("pointermove", handleMove, { signal });
			handle.addEventListener("pointerup", stop, { signal });
			handle.addEventListener("pointercancel", stop, { signal });
			handle.addEventListener("lostpointercapture", stop, { signal });
		},
		[minHeight, minWidth, parentRef, windowRef, x, y],
	);

	// 🫸 When the dock grows into the window, push it up, then shrink it
	// if there's no room left above (never below its min height)
	const keepAboveDock = useCallback(() => {
		const element = windowRef.current;
		const parent = parentRef.current;
		// Hidden windows are fitted when they open
		if (!element?.offsetParent || !parent) return;
		const bounds = desktopBounds(parent);
		const parentTop = parent.getBoundingClientRect().top;
		const top = parentTop + element.offsetTop + y.get();
		const overlap = top + element.offsetHeight - bounds.bottom;
		if (overlap <= 0) return;

		const shift = Math.min(overlap, Math.max(0, top - bounds.top));
		const height = Math.max(
			minHeight,
			element.offsetHeight - (overlap - shift),
		);
		element.style.height = `${height}px`;
		// Read after the size change: the layout may re-center the window
		const nextY = top - shift - parentTop - element.offsetTop;
		y.set(nextY);
		// Motion renders on the next frame: apply now so the dock never covers it
		element.style.transform = `translateX(${x.get()}px) translateY(${nextY}px)`;
	}, [minHeight, parentRef, windowRef, x, y]);

	useEffect(() => {
		const dock = document.querySelector(`[${DOCK_ATTRIBUTE}]`);
		if (!dock) return;
		const observer = new ResizeObserver(keepAboveDock);
		observer.observe(dock);
		return () => observer.disconnect();
	}, [keepAboveDock]);

	return {
		dragConstraints,
		dragControls,
		keepAboveDock,
		startDrag,
		startResize,
		x,
		y,
	};
}

// Never below the minimum, even if the window already overflows the desktop
function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, Math.max(min, max)));
}

// 🖥️ The desktop down to the dock's current top: windows never go behind it,
// and get the room it frees when it shrinks
function desktopBounds(parent: HTMLElement) {
	const { bottom, left, right, top } = parent.getBoundingClientRect();
	const dock = document.querySelector(`[${DOCK_ATTRIBUTE}]`);
	return {
		bottom: dock ? Math.min(bottom, dock.getBoundingClientRect().top) : bottom,
		left,
		right,
		top,
	};
}

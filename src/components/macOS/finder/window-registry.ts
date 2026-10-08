import { useSyncExternalStore } from "react";

export const WINDOW_CLASSNAME =
	"rounded-3xl bg-[#1F212D] border border-[#4D5057] shadow-2xl";

// 🪟 Mounted window elements, so canvas backdrops can mirror them.
let windows: HTMLElement[] = [];
const listeners = new Set<() => void>();

export function registerWindow(element: HTMLElement) {
	windows = [...windows, element];
	for (const listener of listeners) listener();
	return () => {
		windows = windows.filter((window) => window !== element);
		for (const listener of listeners) listener();
	};
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function useWindows() {
	return useSyncExternalStore(
		subscribe,
		() => windows,
		() => windows,
	);
}

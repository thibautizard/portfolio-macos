import { useEffect, useEffectEvent, useState } from "react";

// ---------------------------------------------------------------
// ⌥⇥ App switcher: opens on Option + Tab, stays open while Option is held
// (Command + Tab is taken by macOS and Control + Tab by the browser).
// Every Tab moves the focus to the next app, Shift + Tab to the previous one.
// `onPrepare` fires as soon as Option goes down, to get ready before Tab.
export function useAppSwitcherShortcut({
	count,
	onPrepare,
}: {
	count: number;
	onPrepare?: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(0);
	const prepare = useEffectEvent(() => onPrepare?.());

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Alt" && !e.repeat) prepare();
			if (e.key !== "Tab" || !e.altKey) return;
			e.preventDefault();
			const step = e.shiftKey ? -1 : 1;
			// Like macOS, the opening Tab already moves off the current app (index 0)
			setFocusedIndex((index) => (index + step + count) % count);
			setIsOpen(true);
		};

		const close = () => {
			setIsOpen(false);
			setFocusedIndex(0);
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === "Alt") close();
		};

		window.addEventListener("keydown", handleKeyDown, { signal });
		window.addEventListener("keyup", handleKeyUp, { signal });
		// The Option keyup never arrives if the window loses focus while held
		window.addEventListener("blur", close, { signal });

		return () => controller.abort();
	}, [count]);

	return { focusedIndex, isOpen };
}

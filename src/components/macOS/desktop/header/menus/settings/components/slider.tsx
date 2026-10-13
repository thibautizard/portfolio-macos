import { cn } from "cn";
import { useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";

export function Slider() {
	const { isDarkMode } = useDarkMode();
	const trackRef = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState(100);
	const [isDragging, setIsDragging] = useState(false);

	const updateFromPointer = (clientX: number) => {
		const track = trackRef.current;
		if (!track) return;
		const { left, width } = track.getBoundingClientRect();
		if (!width) return;
		setValue(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
	};

	// 👆 Moves are read on window: in the liquid menu only the press is forwarded
	// to the slider, the moves land on the canvas and bubble up from there
	const handlePointerDown = (event: React.PointerEvent) => {
		event.preventDefault();
		updateFromPointer(event.clientX);
		setIsDragging(true);
		const controller = new AbortController();
		const { signal } = controller;
		const stop = () => {
			setIsDragging(false);
			controller.abort();
		};
		window.addEventListener(
			"pointermove",
			(move) => updateFromPointer(move.clientX),
			{ signal },
		);
		window.addEventListener("pointerup", stop, { signal });
		window.addEventListener("pointercancel", stop, { signal });
	};

	return (
		// Taller than the track so it's easy to grab
		<div
			className="grow py-1.5 -my-1.5 touch-none"
			data-slider=""
			onPointerDown={handlePointerDown}
		>
			<div
				className={cn("h-1 relative rounded-md", isDarkMode && "bg-[#173FAF]")}
				ref={trackRef}
			>
				<div
					className="bg-white rounded-md h-full"
					style={{ width: `${value}%` }}
				/>
				<div
					className={cn(
						"hidden",
						"group-hover:block group-data-hovered:block",
						isDragging && "block",
						"absolute -translate-y-1/2 top-1/2",
						"w-5 rounded-full h-3.5 bg-white",
					)}
					// Keeps the handle inside the track at both ends
					style={{
						cornerShape: "superellipse(1.3)",
						left: `calc((100% - 1.25rem) * ${value / 100})`,
					}}
				/>
			</div>
		</div>
	);
}

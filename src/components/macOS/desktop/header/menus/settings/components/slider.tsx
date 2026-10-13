import { cn } from "cn";
import { useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";

export function Slider({
	onChange,
	value,
}: {
	onChange: (value: number) => void;
	value: number;
}) {
	const { isDarkMode } = useDarkMode();
	const trackRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const updateFromPointer = (clientX: number) => {
		if (!trackRef.current) return;
		const { left, width } = trackRef.current.getBoundingClientRect();
		onChange(Math.min(1, Math.max(0, (clientX - left) / width)));
	};

	// Moves are read on window: the liquid menu only forwards the press
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
					style={{ width: `${value * 100}%` }}
				/>
				<div
					className={cn(
						"hidden",
						"group-hover:block group-data-hovered:block",
						isDragging && "block",
						"absolute -translate-y-1/2 top-1/2",
						"w-5 rounded-full h-3.5 bg-white",
					)}
					style={{
						cornerShape: "superellipse(1.3)",
						left: `calc((100% - 1.25rem) * ${value})`,
					}}
				/>
			</div>
		</div>
	);
}

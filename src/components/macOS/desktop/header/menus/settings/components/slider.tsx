import { cn } from "cn";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { useDarkMode, useResizeObserver } from "usehooks-ts";

export function Slider() {
	const { isDarkMode } = useDarkMode();
	const sliderRef = useRef<HTMLDivElement>(null);
	const handlerRef = useRef<HTMLDivElement>(null);

	const [value, setValue] = useState(100);
	const x = useMotionValue(0);

	// Observed rather than measured once: inside liquid-dom's <Html>, the slider
	// mounts in a detached host and only gets its real size a frame later.
	const { width: sliderWidth = 0 } = useResizeObserver({
		box: "border-box",
		ref: sliderRef as RefObject<HTMLDivElement>,
	});
	const { width: handlerWidth = 0 } = useResizeObserver({
		box: "border-box",
		ref: handlerRef as RefObject<HTMLDivElement>,
	});
	const maxRight = sliderWidth - handlerWidth;

	useLayoutEffect(() => {
		let initialX = (value * sliderWidth) / 100;
		if (initialX > maxRight) initialX = maxRight;
		x.set(initialX);
	}, [sliderWidth, value, x, maxRight]);

	useMotionValueEvent(x, "change", (latest) => {
		if (sliderWidth) {
			let newValue = (latest / sliderWidth) * 100;
			if (newValue < 0) newValue = 0;
			if (newValue > 100) newValue = 100;
			setValue(newValue);
		}
	});

	return (
		<div
			className={cn(
				"h-1 relative rounded-md grow",
				isDarkMode && "bg-[#173FAF]",
			)}
			ref={sliderRef}
		>
			<div
				className="bg-white rounded-md h-full"
				style={{ width: `${value}%` }}
			/>
			<motion.button
				className={cn(
					"hidden",
					"group-hover:block",
					"absolute",
					"-translate-y-1/2 top-1/2",
				)}
				drag="x"
				dragConstraints={{ left: 0, right: maxRight }}
				dragElastic={0}
				dragMomentum={false}
				style={{ x }}
				type="button"
			>
				<div
					className="w-5 rounded-full h-3.5 bg-white"
					ref={handlerRef}
					style={{
						cornerShape: "superellipse(1.3)",
					}}
				/>
			</motion.button>
		</div>
	);
}

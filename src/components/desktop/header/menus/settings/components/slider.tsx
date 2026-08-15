import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { cn } from "@/lib/utils";

export function Slider() {
	const { isDarkMode } = useDarkMode();
	const sliderRef = useRef<HTMLDivElement>(null);
	const handlerRef = useRef<HTMLDivElement>(null);

	const [value, setValue] = useState(100);
	const x = useMotionValue(0);

	const [sliderWidth, setSliderWidth] = useState(0);
	const [handlerWidth, setHandlerWidth] = useState(0);
	const maxRight = sliderWidth - handlerWidth;

	useLayoutEffect(() => {
		if (sliderRef.current) {
			setSliderWidth(sliderRef.current.offsetWidth);
		}
		if (handlerRef.current) {
			setHandlerWidth(handlerRef.current.offsetWidth);
		}

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

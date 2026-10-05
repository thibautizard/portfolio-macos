import { cn } from "cn";
import { motion } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsFinderOpen } from "@/store/slices/app-slice";
import { Sidebar } from "./components/sidebar";
import { registerWindow, WINDOW_CLASSNAME } from "./window-registry";

export function Finder({
	parentRef,
}: {
	parentRef: RefObject<HTMLDivElement | null>;
}) {
	const isOpen = useAppSelector(selectIsFinderOpen);
	return (
		<Window isOpen={isOpen} parentRef={parentRef}>
			<Sidebar />
		</Window>
	);
}

// 📦
export function Window({
	children,
	isOpen,
	parentRef,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	parentRef: RefObject<HTMLDivElement | null>;
}) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ref.current) return registerWindow(ref.current);
	}, []);

	return (
		<motion.div
			className={cn(
				isOpen ? "flex" : "hidden",
				"h-200 w-300",
				"p-1.5",
				WINDOW_CLASSNAME,
			)}
			drag
			dragConstraints={parentRef}
			dragElastic={0}
			dragMomentum={false}
			ref={ref}
		>
			{children}
		</motion.div>
	);
}

import { cn } from "cn";
import { motion } from "motion/react";
import type { RefObject } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsFinderOpen } from "@/store/slices/app-slice";
import { Sidebar } from "./components/sidebar";

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
	return (
		<motion.div
			className={cn(
				isOpen ? "flex" : "hidden",
				"h-200 w-300",
				"p-1.5",
				"rounded-3xl",
				"bg-[#1F212D]",
				"border-[#4D5057] border",
				"shadow-2xl",
			)}
			drag
			dragConstraints={parentRef}
			dragElastic={0}
			dragMomentum={false}
		>
			{children}
		</motion.div>
	);
}

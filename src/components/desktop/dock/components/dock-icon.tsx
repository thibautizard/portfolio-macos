import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function DockIcon({
	src,
	alt,
	className,
	onHover,
	name,
}: {
	src: string;
	alt: string;
	className?: string;
	onHover?: (el: HTMLElement | null, name: string) => void;
	name?: string;
}) {
	const ref = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (!name) return;
		if (!ref.current) return;
		onHover?.(ref.current, name);
	}, [name, onHover]);
	return (
		<button
			className={cn(
				"group",
				"h-full relative bg-transparent border-none p-0 cursor-default",
				"focus-within:outline-none",
				className,
			)}
			onMouseEnter={() => name && onHover?.(ref.current, name)}
			// onMouseLeave={() => name && onHover?.(null, name)}
			ref={ref}
			type="button"
		>
			{/* 🟥 */}
			<AppIcon alt={alt} src={src} />
			{/* ⚪ */}
			<DotBottom active={false} />
		</button>
	);
}

// 🟥
function AppIcon({ alt, src }: { alt: string; src: string }) {
	return (
		<img alt={alt} className="h-full group-active:brightness-50 " src={src} />
	);
}

// ⚪
function DotBottom({ active }: { active: boolean }) {
	return (
		<div
			className={cn(
				"absolute -bottom-0.5",
				"size-1",
				"rounded-full",
				"left-1/2 -translate-x-1/2",
				"bg-transparent",
				active && "bg-white/50",
			)}
		/>
	);
}

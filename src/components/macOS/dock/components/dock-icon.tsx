import { cn } from "cn";
import { useRef } from "react";

export function DockIcon({
	src,
	alt,
	className,
	isActive = false,
	onHover,
	onClick,
	name,
}: {
	src: string;
	alt: string;
	className?: string;
	onHover?: (el: HTMLElement | null, name: string) => void;
	onClick?: () => void;
	name?: string;
	isActive?: boolean;
}) {
	const ref = useRef<HTMLButtonElement>(null);
	return (
		<button
			className={cn(
				"group",
				"shrink-0",
				"h-full relative bg-transparent border-none p-0 cursor-default",
				"focus-within:outline-none",
				className,
			)}
			onClick={onClick}
			onMouseEnter={() => name && onHover?.(ref.current, name)}
			// onMouseLeave={() => name && onHover?.(null, name)}
			ref={ref}
			type="button"
		>
			{/* 🟥 */}
			<AppIcon alt={alt} src={src} />
			{/* ⚪ */}
			<DotBottom active={isActive} />
		</button>
	);
}

// 🟥
function AppIcon({ alt, src }: { alt: string; src: string }) {
	return (
		<img
			alt={alt}
			// data-pressed: set by the liquid dock, whose canvas swallows :active
			className="h-full group-active:brightness-50 group-data-pressed:brightness-50"
			src={src}
		/>
	);
}

// ⚪
function DotBottom({ active }: { active: boolean }) {
	return (
		<div
			className={cn(
				"absolute -bottom-[3px]",
				"size-1",
				"rounded-full",
				"left-1/2 -translate-x-1/2",
				"bg-transparent",
				active && "bg-black",
			)}
		/>
	);
}

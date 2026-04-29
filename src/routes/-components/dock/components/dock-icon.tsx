import { useRef } from "react";
import { cn } from "@/lib/utils";

export function DockIcon({
	src,
	alt,
	className,
	active = false,
	onHover,
	name,
}: {
	src: string;
	alt: string;
	className?: string;
	active?: boolean;
	onHover?: (el: HTMLElement | null, name: string) => void;
	name?: string;
}) {
	const ref = useRef<HTMLButtonElement>(null);

	return (
		<button
			className={cn(
				"h-full relative bg-transparent border-none p-0 cursor-default",
				"active:brightness-50 focus-within:outline-none",
				className,
			)}
			onMouseEnter={() => name && onHover?.(ref.current, name)}
			onMouseLeave={() => name && onHover?.(null, name)}
			ref={ref}
			type="button"
		>
			<img alt={alt} className="h-full" src={src} />
			<div
				className={cn(
					"absolute -bottom-0.5 size-1 rounded-full left-1/2 -translate-x-1/2",
					"bg-transparent",
					active && "bg-white/50",
				)}
			/>
		</button>
	);
}

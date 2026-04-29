import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";

// ℹ️
export function DockTooltip({
	x,
	y,
	width,
	children,
}: {
	x: number;
	y: number;
	width: number;
	children: React.ReactNode;
}) {
	return (
		<div
			className="fixed z-50 pointer-events-none"
			style={{
				left: x + width / 2,
				top: y - 45, // Position above the icon
				transform: "translateX(-50%)",
			}}
		>
			<Glass>
				<div
					className={cn(
						"border-t-[0.5px] border-l-[0.5px] border-white/30",
						"px-3 py-0.75 text-sm text-white/90",
						"backdrop-blur-md rounded-full shadow-xl",
						"bg-white/60 text-black",
					)}
				>
					{children}
				</div>
			</Glass>
			{/* ⬇️ Arrow */}
			<div
				className={cn(
					"absolute size-2.5 border-r border-b border-white/10 rotate-45 left-1/2 -translate-x-1/2 bottom-[-4.5px]",
					"bg-white/60",
				)}
				style={{
					clipPath: "polygon(100% 100%, 0% 100%, 100% 0%)", // Only show bottom right half for border correctness
				}}
			/>
		</div>
	);
}

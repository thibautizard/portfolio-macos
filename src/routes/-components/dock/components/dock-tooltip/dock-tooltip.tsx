// import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";
import s from "./style.module.css";

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
			{/*<Glass>*/}
			<div
				className={cn(
					"border-t-[0.5px] border-l-[0.5px] border-white/30",
					"px-3 text-sm text-white/90",
					"shadow-xl",
					"bg-white/60 text-black",
					s.tooltip,
				)}
			>
				<span className={s.tooltipContent}>{children}</span>
			</div>
			{/*</Glass>*/}
		</div>
	);
}

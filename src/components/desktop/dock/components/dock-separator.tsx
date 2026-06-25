import { useDarkMode } from "usehooks-ts";
import { cn } from "@/lib/utils";
export function DockSeparator({
	onMouseDown,
}: {
	onMouseDown: (e: React.MouseEvent) => void;
}) {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<button
			className="h-full px-2 flex items-center cursor-ns-resize touch-none outline-none bg-transparent border-none"
			onMouseDown={onMouseDown}
			type="button"
		>
			<div
				className={cn(
					"h-[87%] w-px",
					isLightMode && "bg-black/30",
					isDarkMode && "bg-white/20",
				)}
			/>
		</button>
	);
}

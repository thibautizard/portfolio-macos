import { cn } from "cn";
import { TintedGlass } from "@/components/macOS/ui/tinted-glass";
import { useIsLiquidGlass } from "./liquid-glass";
import "./settings-glass.css";

// Full backdrop colour; lower it (e.g. 0.8) for a grayer look
const SATURATION = 1;

export function GlassSquare({ children }: { children: React.ReactNode }) {
	const isLiquidGlass = useIsLiquidGlass();
	if (isLiquidGlass) {
		return (
			<div className="flex items-center justify-center size-full p-2 py-4 text-white">
				{children}
			</div>
		);
	}
	return (
		<TintedGlass
			borderRadius={30}
			className={cn("settings-glass", "py-2", "h-full! w-full!", "text-white")}
			saturation={SATURATION}
			style={{
				cornerShape: "superellipse(1.5)",
			}}
		>
			{children}
		</TintedGlass>
	);
}

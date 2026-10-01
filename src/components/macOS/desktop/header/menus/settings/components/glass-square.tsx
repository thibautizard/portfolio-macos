import { cn } from "cn";
import GlassSurface from "@/components/react-bits/glass-surface";
import { useIsLiquidGlass } from "./liquid-glass";

const BACKGROUND_OPACITY = 0.17;

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
		<GlassSurface
			backgroundOpacity={BACKGROUND_OPACITY}
			borderRadius={42}
			className={cn(
				"py-2",
				"h-full! w-full!",
				"text-white",
				"border-white/15 border",
			)}
			style={{
				cornerShape: "superellipse(1.5)",
			}}
		>
			{children}
		</GlassSurface>
	);
}

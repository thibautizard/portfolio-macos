import GlassSurface from "@/components/react-bits/glass-surface";
import { cn } from "@/lib/utils";

const BACKGROUND_OPACITY = 0.17;

export function GlassSquare({ children }: { children: React.ReactNode }) {
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

import { cn } from "cn";
import GlassSurface from "@/components/react-bits/glass-surface";
import { useIsLiquidGlass } from "./liquid-glass";

const BACKGROUND_OPACITY = 0.17;

export function GlassLong({
	children,
	name,
}: {
	children: React.ReactNode;
	name: string;
}) {
	const isLiquidGlass = useIsLiquidGlass();

	const content = (
		<div className="text-[12.5px] font-bold flex flex-col gap-y-2 justify-start w-full">
			<div>{name}</div>
			{children}
		</div>
	);

	if (isLiquidGlass) {
		return (
			<div className="group flex items-center size-full px-4 py-0 text-white">
				{content}
			</div>
		);
	}
	return (
		<div className="col-span-2 group row-span-4">
			<GlassSurface
				backgroundOpacity={BACKGROUND_OPACITY}
				borderRadius={36}
				className={cn(
					"px-2 py-1",
					"h-full! w-full!",
					"text-white",
					"border-white/15 border",
				)}
				style={{
					cornerShape: "superellipse(1.5)",
				}}
			>
				{content}
			</GlassSurface>
		</div>
	);
}

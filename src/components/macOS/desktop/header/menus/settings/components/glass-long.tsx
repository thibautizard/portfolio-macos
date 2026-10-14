import { cn } from "cn";
import { TintedGlass } from "@/components/macOS/ui/tinted-glass";
import { useIsLiquidGlass } from "./liquid-glass";
import "./settings-glass.css";

// Full backdrop colour; lower it (e.g. 0.8) for a grayer look
const SATURATION = 1;

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

	// CHROME
	if (isLiquidGlass) {
		return (
			<div className="group flex items-center size-full px-4 py-0 text-white">
				{content}
			</div>
		);
	}
	return (
		<div className="col-span-2 group row-span-4">
			<TintedGlass
				borderRadius={24}
				className={cn(
					"settings-glass",
					"px-2 py-1",
					"h-full! w-full!",
					"text-white",
				)}
				saturation={SATURATION}
				style={{
					cornerShape: "superellipse(1.5)",
				}}
			>
				{content}
			</TintedGlass>
		</div>
	);
}

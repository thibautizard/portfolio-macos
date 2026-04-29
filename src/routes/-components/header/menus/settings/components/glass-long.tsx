import GlassSurface from "@/components/react-bits/glass-surface";
import { cn } from "@/lib/utils";

const BACKGROUND_OPACITY = 0.17;

export function GlassLong({
	children,
	name,
}: {
	children: React.ReactNode;
	name: string;
}) {
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
					// @ts-expect-error
					cornerShape: "superellipse(1.5)",
				}}
			>
				<div className="text-[12.5px] font-bold flex flex-col gap-y-2 justify-start w-full">
					<div>{name}</div>
					{children}
				</div>
			</GlassSurface>
		</div>
	);
}

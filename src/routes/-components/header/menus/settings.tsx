import { SunDimIcon, SunIcon } from "lucide-react";
import PlayIcon from "@/assets/icons/play.tsx";
import settingsIconsSrc from "@/assets/icons/settings.svg";
import GlassSurface from "@/components/GlassSurface";
import { cn } from "@/lib/utils";

export function Settings() {
	return (
		<div>
			<img
				alt="Settings"
				className={"size-[15px] relative invert"}
				src={settingsIconsSrc}
			/>
			<div
				className={cn(
					"grid grid-cols-[repeat(2,140px)] grid-rows-[repeat(auto-fit,10px)] gap-4 p-6",
					"fixed right-0",
					"backdrop-blur-3xl",
					"mask-x-from-90% mask-x-to-100% mask-y-from-90% mask-y-to-100% ",
				)}
			>
				<MusicPlayer />
				<MusicPlayer />
				<div className="col-span-2 row-span-4">
					<GlassSurface
						backgroundOpacity={0.15}
						borderRadius={36}
						className="px-2 py-1 w-full! h-full! text-white border-blue-400/30 border"
						style={{
							cornerShape: "superellipse(1.5)",
						}}
					>
						<div className="text-[12.5px] font-bold flex flex-col gap-y-2 justify-start w-full">
							<div>Display</div>
							<div className="flex gap-x-2 items-center">
								<SunDimIcon fill="white" size={20} />
								<div className="h-1 rounded-md grow bg-white" />
								<SunIcon fill="white" size={20} />
							</div>
						</div>
					</GlassSurface>
				</div>
			</div>
		</div>
	);
}

// -----------------------------------------
function MusicPlayer() {
	return (
		<div className="hover:bg-white/3 col-span-1 row-span-9 bg-transparent transition">
			<GlassSurface
				backgroundOpacity={0.15}
				borderRadius={42}
				className="py-2 h-full! w-full! text-white border-blue-400/30 border"
				style={{
					cornerShape: "superellipse(1.5)",
				}}
			>
				<div className="flex w-full px-1 flex-col justify-between h-full">
					<div className="size-10 rounded-md bg-white/20" />
					<div className="font-bold block text-xs">Not Playing</div>
					<div className="flex items-center self-center gap-x-4">
						<div className="flex scale-x-[-1] opacity-30">
							<PlayIcon className="size-4" />
							<PlayIcon className="-ml-[3px] size-4" />
						</div>
						<PlayIcon className="opacity-80" />
						<div className="flex opacity-30">
							<PlayIcon className="size-4" />
							<PlayIcon className="-ml-[3px] size-4" />
						</div>
					</div>
				</div>
			</GlassSurface>
		</div>
	);
}

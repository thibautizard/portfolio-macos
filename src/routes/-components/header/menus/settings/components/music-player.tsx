import PlayIcon from "@/assets/icons/play.tsx";
import { GlassSquare } from "./glass-square";
export function MusicPlayer() {
	return (
		<div className="hover:bg-white/3 col-span-1 row-span-9 bg-transparent transition opacity-100">
			<GlassSquare>
				<div className="flex w-full px-1 flex-col justify-between h-full">
					<div className="size-10 rounded-md bg-white/20" />
					<div className="font-bold block text-xs">Not Playing</div>
					<div className="flex items-center self-center gap-x-4">
						<div className="flex scale-x-[-1] opacity-30">
							<PlayIcon className="size-4" />
							<PlayIcon className="-ml-0.75 size-4" />
						</div>
						<PlayIcon className="opacity-80" />
						<div className="flex opacity-30">
							<PlayIcon className="size-4" />
							<PlayIcon className="-ml-0.75 size-4" />
						</div>
					</div>
				</div>
			</GlassSquare>
		</div>
	);
}

import { cn } from "cn";
import { DisplaySlider } from "../display-slider";
import { MusicPlayer } from "../music-player";
import { VolumeSlider } from "../volume-slider";

export function FallbackMenu({ isOpened }: { isOpened: boolean }) {
	return (
		<Menu isOpened={isOpened}>
			<Background />
			<MusicPlayer />
			<MusicPlayer />
			<DisplaySlider />
			<VolumeSlider />
		</Menu>
	);
}

// 📦
export function Menu({
	children,
	isOpened,
}: {
	children: React.ReactNode;
	isOpened: boolean;
}) {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(2,140px)] grid-rows-[repeat(auto-fit,10px)] gap-4",
				"fixed right-0 -z-1",
				"transition-all duration-300",
				"p-6",
				isOpened ? "opacity-100 scale-100" : "opacity-0 scale-102",
			)}
		>
			{children}
		</div>
	);
}

function Background() {
	return (
		<div className="size-full absolute inset-0">
			{/* 🌫️ Blur */}
			<div
				className={cn(
					"absolute inset-0",
					"backdrop-blur-xs",
					"mask-y-from-80 mask-x-from-80",
				)}
			/>
			{/* ⚫ Black */}
			<div
				className={cn(
					"absolute inset-0",
					"scale-200",
					"backdrop-blur-3xl",
					"bg-linear-to-r from-black/40 to-black/40",
					"mask-x-from-50 mask-y-from-50",
				)}
			/>
		</div>
	);
}

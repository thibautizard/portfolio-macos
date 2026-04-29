import { useState } from "react";
import settingsIconsSrc from "@/assets/icons/settings.svg";
import { cn } from "@/lib/utils";
import { DisplaySlider } from "./components/display-slider";
import { MusicPlayer } from "./components/music-player";
import { VolumeSlider } from "./components/volume-slider";

export function Settings() {
	const [isOpened, setIsOpened] = useState(false);
	return (
		<div>
			<button
				className="size-fit grid place-items-center"
				onClick={() => setIsOpened((o) => !o)}
				type="button"
			>
				<SettingsIcon />
			</button>
			<div
				className={cn(
					"grid grid-cols-[repeat(2,140px)] grid-rows-[repeat(auto-fit,10px)] gap-4",
					"p-6",
					"fixed right-0 -z-1",
					//🤹 Animation
					"transition-all",
					"duration-300",
					isOpened ? "opacity-100 scale-100" : "opacity-0 scale-102",
				)}
			>
				<Background />
				<MusicPlayer />
				<MusicPlayer />
				<DisplaySlider />
				<VolumeSlider />
			</div>
		</div>
	);
}

// ----------------------------------------
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

// ----------------------------------------
function SettingsIcon() {
	return (
		<img
			alt="Settings"
			className={cn("size-3.75 relative invert")}
			src={settingsIconsSrc}
		/>
	);
}

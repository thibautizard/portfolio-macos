import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import appleIcon from "@/assets/icons/apple.svg";
import modeIcon from "@/assets/icons/mode.svg";
import wifiIcon from "@/assets/icons/wifi.svg";
import wallpaperTahoeDark from "@/assets/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/wallpapers/wallpaper_tahoe_light.avif";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/")({ component: App });

function App() {
	const { isDarkMode } = useDarkMode();
	return (
		<div
			className="w-screen font-sf-pro text-sm text-white h-screen bg-cover bg-center"
			style={{
				backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
			}}
		>
			<Header />
		</div>
	);
}

function Header() {
	return (
		<header className="relative">
			<HeaderBackground />
			<div className="px-3.5 select-none text-[13.5px] font-medium py-2.5 text-shadow-2xs relative z-1 items-center flex justify-between">
				{/* Left part */}
				<div className="gap-x-5 flex items-center">
					<AppleIcon />
					<div className="font-bold text-white">Safari</div>
					<div>File</div>
					<div>Edit</div>
					<div>View</div>
					<div>History</div>
				</div>
				{/* Right part */}
				<div className="gap-x-5 flex items-center">
					<WifiIcon />
					<ModeIcon />
					<HeaderDate />
				</div>
			</div>
		</header>
	);
}

function HeaderBackground() {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<div
			className={cn(
				"w-full h-[250px] absolute top-0",
				isLightMode &&
					"bg-linear-to-b z-0 from-[#00729fa0] via-transparent to-transparent",
				isDarkMode && "bg-transparent",
			)}
		></div>
	);
}

function AppleIcon() {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<img
			alt="Apple logo"
			className={cn(
				"size-[16px]",
				isDarkMode && "invert",
				isLightMode && "invert",
			)}
			src={appleIcon}
		/>
	);
}

function ModeIcon() {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<img
			alt="Mode logo"
			className={cn(
				"size-[15.5px]",
				isDarkMode && "invert",
				isLightMode && "invert",
			)}
			src={modeIcon}
		/>
	);
}

function WifiIcon() {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<img
			alt="Wifi logo"
			className={cn(
				"size-[18px]",
				isDarkMode && "invert",
				isLightMode && "invert",
			)}
			src={wifiIcon}
		/>
	);
}

function formatDate(date: Date) {
	const formatterDate = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		weekday: "short",
	});

	const formatterTime = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hourCycle: "h24",
		minute: "numeric",
	});

	const formattedDate = formatterDate.format(date);
	const formattedTime = formatterTime.format(date);

	return {
		formattedDate,
		formattedTime,
	};
}
function HeaderDate() {
	const [date, setDate] = useState(new Date());
	const { formattedDate, formattedTime } = formatDate(date);
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 1000 * 60);
		return () => clearInterval(timer);
	}, []);
	return (
		<div className="flex items-center gap-x-2">
			<div className="capitalize">{formattedDate}</div>
			<div>{formattedTime}</div>
		</div>
	);
}

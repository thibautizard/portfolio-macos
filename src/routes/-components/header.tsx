import { useRef, useState } from "react";
import { useDarkMode, useOnClickOutside } from "usehooks-ts";
import appleIcon from "@/assets/icons/apple.svg";
import modeIcon from "@/assets/icons/mode.svg";
import wifiIcon from "@/assets/icons/wifi.svg";
import { useLiveDate } from "@/hooks/use-live-date";
import { cn } from "@/lib/utils";
import { formatDateForHeader } from "@/routes/-utils/format-date-for-header";

export function Header() {
	return (
		<header className="relative">
			<HeaderBackground />
			<div
				className={cn(
					"relative z-1 items-center flex justify-between",

					"px-3.5 py-2.5 gap-x-5",
					"text-[13.5px] font-medium text-shadow-2xs",
					"select-none",
				)}
			>
				{/* ⬅️ Left part */}
				<div className="flex gap-x-5 items-center">
					<AppleIcon />
					<MenuLinks />
				</div>
				{/* ➡️ Right part */}
				<div className="flex gap-x-5 items-center">
					<BatteryIcon />
					<WifiIcon />
					<ModeIcon />
					<HeaderDate />
				</div>
			</div>
		</header>
	);
}

// ----------------------------------------------------------------

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

// ----------------------------------------------------------------
const menuLinks = ["Safari", "File", "Edit", "View", "History"];
function MenuLinks() {
	return (
		<>
			{menuLinks.map((link, index) => (
				<div className={cn(index === 0 && "font-bold text-white")} key={link}>
					{link}
				</div>
			))}
		</>
	);
}

// ----------------------------------------------------------------

function AppleIcon() {
	return (
		<HeaderIcon alt="Apple logo" className="size-[16px]" src={appleIcon} />
	);
}

function ModeIcon() {
	return (
		<HeaderIcon alt="Mode logo" className="size-[15.5px]" src={modeIcon} />
	);
}

function WifiIcon() {
	return <HeaderIcon alt="Wifi logo" className="size-[18px]" src={wifiIcon} />;
}

async function BatteryIcon() {
	const battery = await navigator?.getBattery();
	const batteryLevel = battery.level;
	const baseWidthFull = 290;
	const fillWidth = baseWidthFull * (batteryLevel ?? 1);

	return (
		<svg
			className="size-6.5"
			fill="none"
			height="175"
			viewBox="0 0 367 175"
			width="367"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Battery</title>
			<rect fill="white" height="126" rx="15" width={fillWidth} x="26" y="25" />
			<rect
				height="159"
				rx="32"
				stroke="white"
				stroke-opacity={0.5}
				stroke-width="16"
				width="323"
				x="8"
				y="8"
			/>
			<path
				d="M347 115.439V58C358 58 366.5 75.6902 366.5 87.5C366.5 98.773 359.5 115.439 347 115.439Z"
				fill="white"
				fill-opacity={0.5}
			/>
		</svg>
	);
}

function HeaderDate() {
	const { liveDate } = useLiveDate();
	const { formattedDate, formattedTime } = formatDateForHeader(liveDate);

	return (
		<div className="flex items-center gap-x-2">
			<div className="capitalize">{formattedDate}</div>
			<div>{formattedTime}</div>
		</div>
	);
}

function HeaderIcon({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isClicked, setIsClicked] = useState(false);
	useOnClickOutside<HTMLButtonElement>(buttonRef, () => setIsClicked(false));

	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<button
			className={cn(
				"relative",
				"before:opacity-0 before:inset-0 before:top-1/2 before:-translate-y-1/2 before:w-[40px] before:h-[24px] before:left-1/2 before:-translate-x-1/2",
				"before:content-[''] before:absolute before:bg-white/15",
				"before:rounded-full",
				isClicked && "before:opacity-100",
			)}
			onClick={() => setIsClicked((prev) => !prev)}
			ref={buttonRef}
			type="button"
		>
			<img
				alt={alt}
				className={cn(
					"size-[18px] relative",
					className,
					isDarkMode && "invert",
					isLightMode && "invert",
				)}
				src={src}
			/>
		</button>
	);
}

import { useEffect, useRef, useState } from "react";
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
		<HeaderIcon
			alt="Apple logo"
			className="size-[16px] -translate-y-px"
			src={appleIcon}
		/>
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

// ----------------------------------------------------------------
// 🔋 Battery

function BatteryIcon() {
	const { battery, batteryCharging, batteryLevel } = useBattery();
	if (!battery) return null;

	const baseWidthFull = 278;
	const fillWidth = baseWidthFull * (batteryLevel ?? 1);

	// ⚡
	const Lightning = (
		<svg
			className="absolute z-10 top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2 size-[16px]"
			fill="none"
			height="108"
			viewBox="0 0 76 108"
			width="76"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Lightning</title>
			<path
				d="M59.2785 2.44485C59.9191 2.81362 60.4148 3.38723 60.6847 4.07195C60.9545 4.75667 60.9826 5.51203 60.7643 6.21463L48.9763 44.2505H70.7261C71.3653 44.2502 71.9905 44.4358 72.5247 44.7844C73.0588 45.133 73.4785 45.6293 73.7319 46.212C73.9853 46.7947 74.0612 47.4384 73.9505 48.0635C73.8397 48.6886 73.547 49.2678 73.1085 49.7297L20.7468 104.977C20.2402 105.512 19.566 105.86 18.8341 105.966C18.1023 106.072 17.3559 105.928 16.7167 105.559C16.0775 105.19 15.5832 104.616 15.3142 103.932C15.0453 103.248 15.0176 102.493 15.2357 101.792L27.0237 63.7494H5.27392C4.63474 63.7496 4.00949 63.564 3.47533 63.2154C2.94117 62.8668 2.5215 62.3705 2.26812 61.7878C2.01475 61.2051 1.93875 60.5615 2.04952 59.9363C2.1603 59.3112 2.45298 58.732 2.89146 58.2702L55.2532 3.02331C55.7592 2.48904 56.4324 2.14046 57.1632 2.03425C57.894 1.92805 58.6395 2.07047 59.2785 2.43835V2.44485Z"
				fill="white"
				stroke="#2D84B1"
				stroke-width="7"
			/>
		</svg>
	);

	// 🔋
	const Battery = (
		<svg
			className="size-6.5"
			fill="none"
			height="175"
			viewBox="0 0 367 175"
			width="367"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Battery</title>
			<rect fill="white" height="120" rx="23" width={fillWidth} x="31" y="28" />
			<rect
				height="159"
				rx="35"
				stroke="white"
				stroke-opacity={0.5}
				stroke-width="19"
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

	return (
		<div className="relative">
			{batteryCharging ? Lightning : null}
			{Battery}
		</div>
	);
}

function useBattery() {
	const [battery, setBattery] = useState<BatteryManager | null>(null);
	const [batteryLevel, setBatteryLevel] = useState(1);
	const [batteryCharging, setBatteryCharging] = useState(false);

	useEffect(() => {
		const nav = navigator as NavigatorWithBattery;
		if (!nav.getBattery) return;

		nav.getBattery().then((bat) => {
			setBattery(bat);
			setBatteryLevel(bat.level);
			setBatteryCharging(bat.charging);

			const handleLevelChange = () => setBatteryLevel(bat.level);
			const handleChargingChange = () => setBatteryCharging(bat.charging);

			bat.addEventListener("levelchange", handleLevelChange);
			bat.addEventListener("chargingchange", handleChargingChange);

			// Cleanup listeners when component unmounts or battery changes (though battery instance is stable usually)
			// We can attach cleanup to the return of this effect, but we need to keep reference to 'bat'
			return () => {
				bat.removeEventListener("levelchange", handleLevelChange);
				bat.removeEventListener("chargingchange", handleChargingChange);
			};
		});
	}, []);

	return { battery, batteryCharging, batteryLevel };
}

interface BatteryManager extends EventTarget {
	charging: boolean;
	level: number;
	addEventListener(
		type: "chargingchange" | "levelchange",
		listener: (this: BatteryManager, ev: Event) => void,
	): void;
	removeEventListener(
		type: "chargingchange" | "levelchange",
		listener: (this: BatteryManager, ev: Event) => void,
	): void;
}

interface NavigatorWithBattery extends Navigator {
	getBattery?: () => Promise<BatteryManager>;
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

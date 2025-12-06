import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
	Menu,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuSeparator,
	MenuTrigger,
} from "./menu";

export function Battery() {
	const { batteryLevel } = useBattery();
	const { isDarkMode } = useDarkMode();

	return (
		<div>
			<Menu>
				<MenuTrigger>
					<div className="size-6">
						<BatteryIcon />
					</div>
				</MenuTrigger>
				<MenuPopup>
					{/* 🔋 Battery */}
					<div className="flex flex-col my-2 mx-2">
						<div className="text-[.82rem] mb-1.5 flex justify-between">
							<span
								className={cn(
									"font-bold tracking-tight",
									"text-black",
									isDarkMode && "text-white",
								)}
							>
								Battery
							</span>
							<span
								className={cn("text-gray-600", isDarkMode && "text-gray-300")}
							>
								{batteryLevel * 100} %
							</span>
						</div>
						<div className={cn("text-gray-600", isDarkMode && "text-gray-300")}>
							Power source: Battery
						</div>
					</div>

					<MenuSeparator className="mx-2" />

					{/* ⚡ Energy mode */}
					<MenuGroup>
						<MenuGroupLabel>Energy Mode</MenuGroupLabel>
						<MenuItem>
							<div
								className={cn(
									"size-[26px] p-0.5 rounded-full grid place-items-center",
									"bg-black/10",
									isDarkMode && "bg-white/10",
								)}
							>
								<BatteryForPowerMode />
							</div>
							<span className="text-[.82rem]">Low Power</span>
						</MenuItem>
					</MenuGroup>

					{/* <MenuSeparator className="mx-2" />

					<div>No app using significant energy</div> */}

					<MenuSeparator className="my-1" />

					{/* ⚙️ Battery settings */}
					<MenuItem className="text-[.82rem] font-medium">
						Battery Settings...
					</MenuItem>
				</MenuPopup>
			</Menu>
		</div>
	);
}

// ----------------------------------------------------------------
// 🔋 Battery

function BatteryIcon({
	value = undefined,
	strokeWidthLight = 7,
	strokeWidthBattery = 19,
	color = "white",
}: {
	value?: number;
	strokeWidthLight?: number;
	strokeWidthBattery?: number;
	color?: string;
}) {
	const { battery, batteryCharging, batteryLevel } = useBattery();
	if (!battery) return null;

	const baseWidthFull = 278;
	const fillWidth = baseWidthFull * (value ?? batteryLevel ?? 1);

	// ⚡
	const Lightning = (
		<svg
			className="absolute z-10 top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2 size-[14px]"
			fill="none"
			height="108"
			viewBox="0 0 76 108"
			width="76"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Lightning</title>
			<path
				d="M59.2785 2.44485C59.9191 2.81362 60.4148 3.38723 60.6847 4.07195C60.9545 4.75667 60.9826 5.51203 60.7643 6.21463L48.9763 44.2505H70.7261C71.3653 44.2502 71.9905 44.4358 72.5247 44.7844C73.0588 45.133 73.4785 45.6293 73.7319 46.212C73.9853 46.7947 74.0612 47.4384 73.9505 48.0635C73.8397 48.6886 73.547 49.2678 73.1085 49.7297L20.7468 104.977C20.2402 105.512 19.566 105.86 18.8341 105.966C18.1023 106.072 17.3559 105.928 16.7167 105.559C16.0775 105.19 15.5832 104.616 15.3142 103.932C15.0453 103.248 15.0176 102.493 15.2357 101.792L27.0237 63.7494H5.27392C4.63474 63.7496 4.00949 63.564 3.47533 63.2154C2.94117 62.8668 2.5215 62.3705 2.26812 61.7878C2.01475 61.2051 1.93875 60.5615 2.04952 59.9363C2.1603 59.3112 2.45298 58.732 2.89146 58.2702L55.2532 3.02331C55.7592 2.48904 56.4324 2.14046 57.1632 2.03425C57.894 1.92805 58.6395 2.07047 59.2785 2.43835V2.44485Z"
				fill={color}
				stroke="#2D84B1"
				stroke-width={strokeWidthLight}
			/>
		</svg>
	);

	// 🔋
	const BaseBatteryIcon = (
		<svg
			className="aspect-square w-full h-full"
			fill="none"
			height="175"
			viewBox="0 0 367 175"
			width="367"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Battery</title>
			<rect fill={color} height="120" rx="23" width={fillWidth} x="31" y="28" />
			<rect
				height="159"
				rx="35"
				stroke={color}
				stroke-opacity={0.5}
				stroke-width={strokeWidthBattery}
				width="323"
				x="8"
				y="8"
			/>
			<path
				d="M347 115.439V58C358 58 366.5 75.6902 366.5 87.5C366.5 98.773 359.5 115.439 347 115.439Z"
				fill={color}
				fill-opacity={0.5}
			/>
		</svg>
	);

	return (
		<>
			{batteryCharging ? Lightning : null}
			{BaseBatteryIcon}
		</>
	);
}

function BatteryForPowerMode() {
	const { isDarkMode } = useDarkMode();
	const batteryLevel = 0.3;
	const baseWidthFull = 278;
	const fillWidth = baseWidthFull * batteryLevel;
	const batteryColor = isDarkMode
		? "var(--color-gray-300)"
		: "var(--color-gray-600)";
	return (
		<svg
			className="aspect-square w-full h-full"
			fill="none"
			height="175"
			viewBox="0 0 367 175"
			width="367"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Battery</title>
			<rect
				fill={batteryColor}
				height="100"
				rx="23"
				width={fillWidth}
				x="40"
				y="36"
			/>
			<rect
				height="159"
				rx="35"
				stroke={batteryColor}
				stroke-opacity={0.5}
				stroke-width={25}
				width="323"
				x="8"
				y="8"
			/>
			<path
				d="M347 115.439V58C358 58 366.5 75.6902 366.5 87.5C366.5 98.773 359.5 115.439 347 115.439Z"
				fill={batteryColor}
				fill-opacity={0.5}
			/>
		</svg>
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

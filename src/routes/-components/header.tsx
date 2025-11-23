import { useDarkMode } from "usehooks-ts";
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
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<img
			alt={alt}
			className={cn(
				"size-[18px]",
				className,
				isDarkMode && "invert",
				isLightMode && "invert",
			)}
			src={src}
		/>
	);
}

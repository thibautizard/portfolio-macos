import { useDarkMode } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Apple } from "./menus/apple";
import { Battery } from "./menus/battery";
import { Settings } from "./menus/settings";
import { Time } from "./menus/time";
import { Wifi } from "./menus/wifi";

export function Header() {
	return (
		<header className="relative">
			<Background />
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
					<Apple />
					<MenuLinks />
				</div>
				{/* ➡️ Right part */}
				<div className="flex gap-x-5 items-center">
					<Battery />
					<Wifi />
					<Settings />
					<Time />
				</div>
			</div>
		</header>
	);
}

// ----------------------------------------------------------------

function Background() {
	const { isDarkMode } = useDarkMode();
	return (
		<div
			className={cn(
				"w-full h-[250px] absolute top-0",
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

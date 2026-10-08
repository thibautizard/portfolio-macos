// import { Wifi } from "./menus/wifi";
import { cn } from "cn";
import { Apple } from "./menus/apple";
import { Battery } from "./menus/battery";
import { Settings } from "./menus/settings";
import { Time } from "./menus/time";
export function Header() {
	return (
		<header className="relative">
			<div
				className={cn(
					"relative z-1 items-center flex justify-between",
					"px-3.5 py-3 gap-x-5",
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
					{/* <Wifi /> */}
					<Settings />
					<Time />
				</div>
			</div>
		</header>
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

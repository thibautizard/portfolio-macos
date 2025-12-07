import { useDarkMode } from "usehooks-ts";
import PlayIcon from "@/assets/icons/play.tsx";
// import { Wifi } from "./menus/wifi";
import GlassSurface from "@/components/GlassSurface";
import { cn } from "@/lib/utils";
import { Apple } from "./menus/apple";
import { Battery } from "./menus/battery";
import { Settings } from "./menus/settings";
import { Time } from "./menus/time";
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
					{/* <Wifi /> */}
					<Settings />
					<Time />
					<div className="hover:bg-white/3 bg-transparent transition rounded-[36px]">
						<GlassSurface
							backgroundOpacity={0.1}
							borderRadius={36}
							className="p-2 text-white border-blue-400/30 border"
							height={150}
							width={150}
						>
							<div className="flex flex-col justify-between h-full">
								<div className="size-10 rounded-md bg-white/20" />
								<div className="font-bold block text-xs">Not Playing</div>
								<div className="flex items-center gap-x-4">
									<div className="flex scale-x-[-1] opacity-30">
										<PlayIcon className="size-4" />
										<PlayIcon className="-ml-[3px] size-4" />
									</div>
									<PlayIcon className="opacity-80" />
									<div className="flex opacity-30">
										<PlayIcon className="size-4" />
										<PlayIcon className="-ml-[3px] size-4" />
									</div>
								</div>
							</div>
						</GlassSurface>
					</div>
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

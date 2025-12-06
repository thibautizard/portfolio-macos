import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/wallpapers/wallpaper_tahoe_light.avif";
import { Dock } from "./dock";
import { Header } from "./header/header";

export function Layout() {
	const { isDarkMode } = useDarkMode();
	return (
		<div
			className="w-screen font-sf-pro text-sm text-white flex flex-col h-screen bg-cover bg-center"
			style={{
				backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
			}}
		>
			<Header />
			<main className="relative grow">
				<div className="fixed flex justify-center w-full bottom-1">
					<Dock />
				</div>
			</main>
		</div>
	);
}

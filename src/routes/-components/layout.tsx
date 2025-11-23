import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/wallpapers/wallpaper_tahoe_light.avif";
import { Header } from "./header";

export function Layout() {
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

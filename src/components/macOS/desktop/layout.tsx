import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import { Dock } from "@/components/macOS/dock";
import { Header } from "./header/header";
import { Finder } from "../finder";
export function Layout() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className="w-screen font-sf-pro text-sm text-white flex flex-col h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
      }}
    >
      {/* ⬆️ */}
      <Header />
      {/* 🖥️ */}
      <main className="relative grow">
        <Dock />
        <Finder />
      </main>
    </div>
  );
}

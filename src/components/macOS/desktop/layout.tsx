import { useRef } from "react";
import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import { AppSwitcher } from "@/components/macOS/app-switcher/app-switcher";
import { Dock } from "@/components/macOS/dock";
import { DOCK_AREA_HEIGHT } from "@/components/macOS/dock/hooks/use-dock-resize";
import { useAppSelector } from "@/store/hooks";
import { selectBrightness } from "@/store/slices/app-slice";
import { Finder } from "../apps/finder";
import { Header } from "./header/header";

export function Layout() {
  const { isDarkMode } = useDarkMode();
  const parentRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const brightness = useAppSelector(selectBrightness);

  return (
    <div
      className="w-screen font-sf-pro text-sm text-white flex flex-col h-screen bg-cover bg-center"
      ref={desktopRef}
      style={{
        backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
        opacity: Math.max(brightness, 0.1),
      }}
    >
      {/* ⬆️ */}
      <Header />
      {/* 🖥️ */}
      <main className="relative grow min-h-0 flex flex-col">
        <Content ref={parentRef}>
          <Finder parentRef={parentRef} />
        </Content>
        <AppSwitcher desktopRef={desktopRef} />
        <Dock />
      </main>
    </div>
  );
}

// 📦
// ==============================
export function Content({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      // min-h-0 (here and on <main>): a tall window must not stretch the desktop
      // and push the dock down
      className="relative grow min-h-0 grid place-items-center"
      ref={ref}
      // Windows are centered above the dock, whatever its size
      style={{ paddingBottom: DOCK_AREA_HEIGHT }}
    >
      {children}
    </div>
  );
}

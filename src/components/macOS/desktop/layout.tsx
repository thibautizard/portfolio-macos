import { useRef } from "react";
import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import { Dock } from "@/components/macOS/dock";
import { Finder } from "../finder";
import { Header } from "./header/header";

export function Layout() {
  const { isDarkMode } = useDarkMode();
  const parentRef = useRef<HTMLDivElement>(null);

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
      <main className="relative grow flex flex-col">
        <Content ref={parentRef}>
          <Finder parentRef={parentRef} />
        </Content>
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
    <div className="relative grow grid place-items-center" ref={ref}>
      {children}
    </div>
  );
}

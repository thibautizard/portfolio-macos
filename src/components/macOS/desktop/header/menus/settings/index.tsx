import { cn } from "cn";
import { useState } from "react";
import settingsIconsSrc from "@/assets/macOS/icons/settings.svg";
import { supportsLiquidGlass } from "./components/liquid-glass";
import { FallbackMenu } from "./components/menus/fallback-menu";
import { LiquidMenu } from "./components/menus/liquid-menu";

export function Settings() {
  const [isOpened, setIsOpened] = useState(false);
  const Menu = supportsLiquidGlass ? (
    <LiquidMenu isOpened={isOpened} />
  ) : (
    <FallbackMenu isOpened={isOpened} />
  );

  return (
    <Container>
      <SettingsButton onClick={() => setIsOpened((o) => !o)} />
      {Menu}
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// ⏹️
function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="size-fit grid place-items-center"
      onClick={onClick}
      type="button"
    >
      <SettingsIcon />
    </button>
  );
}

function SettingsIcon() {
  return (
    <img
      alt="Settings"
      className={cn("size-3.75 relative invert")}
      src={settingsIconsSrc}
    />
  );
}

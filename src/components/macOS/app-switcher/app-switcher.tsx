import { cn } from "cn";
import { supportsLiquidGlass } from "@/components/macOS/desktop/header/menus/settings/components/liquid-glass";
import { regularApps } from "@/components/macOS/dock/types/dock-types";
import {
  APP_SWITCHER_INDEX_ATTRIBUTE,
  AppSwitcherIcons,
} from "./components/app-switcher-icons";
import { FallbackAppSwitcher } from "./components/app-switchers/fallback-app-switcher";
import { LiquidAppSwitcher } from "./components/app-switchers/liquid-app-switcher";
import { useAppSwitcherShortcut } from "./hooks/use-app-switcher-shortcut";
import {
  APP_SWITCHER_ATTRIBUTE,
  useDesktopSnapshot,
} from "./hooks/use-desktop-snapshot";
import { useGlobalCursor } from "./hooks/use-global-cursor";

// TODO: only list the running apps
const apps = regularApps;

export function AppSwitcher({
  desktopRef,
}: {
  desktopRef: React.RefObject<HTMLElement | null>;
}) {
  const { capture, isCapturing, snapshot } = useDesktopSnapshot(desktopRef);
  const { focus, focusedIndex, isOpen } = useAppSwitcherShortcut({
    count: apps.length,
    onPrepare: supportsLiquidGlass ? capture : undefined,
  });
  const icons = <AppSwitcherIcons apps={apps} focusedIndex={focusedIndex} />;
  const isVisible = isOpen && !isCapturing;
  useGlobalCursor("pointer", isVisible);

  return (
    <>
      {isVisible && <ClickShield />}
      <Container
        isOpen={isVisible}
        onPointerMove={(e) => {
          const index = appIndexAt(e);
          if (index !== undefined) focus(index);
        }}
      >
        {supportsLiquidGlass ? (
          <LiquidAppSwitcher count={apps.length} snapshot={snapshot}>
            {icons}
          </LiquidAppSwitcher>
        ) : (
          <FallbackAppSwitcher count={apps.length}>{icons}</FallbackAppSwitcher>
        )}
      </Container>
    </>
  );
}

// 🛡️ Covers the screen under the switcher, so the rest can't be clicked or hovered.
// Above everything (menus, dock tooltip are z-50), the switcher comes next on top.
function ClickShield() {
  return (
    <div
      {...{ [APP_SWITCHER_ATTRIBUTE]: "" }}
      className="fixed inset-0 z-1000"
    />
  );
}

// 📦 Stays mounted while hidden, so the liquid canvas doesn't restart on every open
function Container({
  children,
  isOpen,
  onPointerMove,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onPointerMove: React.PointerEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      {...{ [APP_SWITCHER_ATTRIBUTE]: "" }}
      className={cn(
        "fixed top-1/2 left-1/2 z-1000 -translate-x-1/2 -translate-y-1/2",
        !isOpen && "pointer-events-none invisible",
      )}
      onPointerMove={onPointerMove}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------------------------------
// 🎯 The liquid canvas receives the pointer, not the icons drawn inside it:
// hit-test them by hand
function appIndexAt(e: React.PointerEvent<HTMLElement>) {
  // Opening under a still pointer can fire a move: only real moves focus
  if (e.movementX === 0 && e.movementY === 0) return;
  const icons = e.currentTarget.querySelectorAll<HTMLElement>(
    `[${APP_SWITCHER_INDEX_ATTRIBUTE}]`,
  );
  const icon = Array.from(icons).find((el) => {
    const { bottom, left, right, top } = el.getBoundingClientRect();
    return (
      e.clientX >= left &&
      e.clientX <= right &&
      e.clientY >= top &&
      e.clientY <= bottom
    );
  });
  if (icon) return Number(icon.getAttribute(APP_SWITCHER_INDEX_ATTRIBUTE));
}

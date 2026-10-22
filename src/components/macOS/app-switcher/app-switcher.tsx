import { cn } from "cn";
import { supportsLiquidGlass } from "@/components/macOS/desktop/header/menus/settings/components/liquid-glass";
import { regularApps } from "@/components/macOS/dock/types/dock-types";
import { AppSwitcherIcons } from "./components/app-switcher-icons";
import { FallbackAppSwitcher } from "./components/switchers/fallback-app-switcher";
import { LiquidAppSwitcher } from "./components/switchers/liquid-app-switcher";
import { useAppSwitcherShortcut } from "./hooks/use-app-switcher-shortcut";
import {
	APP_SWITCHER_ATTRIBUTE,
	useDesktopSnapshot,
} from "./hooks/use-desktop-snapshot";

// TODO: only list the running apps
const apps = regularApps;

export function AppSwitcher({
	desktopRef,
}: {
	desktopRef: React.RefObject<HTMLElement | null>;
}) {
	const { capture, isCapturing, snapshot } = useDesktopSnapshot(desktopRef);
	const { isOpen, focusedIndex } = useAppSwitcherShortcut({
		count: apps.length,
		// The CSS glass blurs the live page by itself: no snapshot needed
		onPrepare: supportsLiquidGlass ? capture : undefined,
	});
	const icons = <AppSwitcherIcons apps={apps} focusedIndex={focusedIndex} />;

	return (
		<Container isOpen={isOpen && !isCapturing}>
			{supportsLiquidGlass ? (
				<LiquidAppSwitcher count={apps.length} snapshot={snapshot}>
					{icons}
				</LiquidAppSwitcher>
			) : (
				<FallbackAppSwitcher count={apps.length}>{icons}</FallbackAppSwitcher>
			)}
		</Container>
	);
}

// 📦 Stays mounted while hidden, so the liquid canvas doesn't restart on every open
function Container({
	children,
	isOpen,
}: {
	children: React.ReactNode;
	isOpen: boolean;
}) {
	return (
		<div
			{...{ [APP_SWITCHER_ATTRIBUTE]: "" }}
			className={cn(
				"fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
				"pointer-events-none",
				!isOpen && "invisible",
			)}
		>
			{children}
		</div>
	);
}

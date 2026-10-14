import { cn } from "cn";
import { supportsLiquidGlass } from "@/components/macOS/desktop/header/menus/settings/components/liquid-glass";
import { regularApps } from "@/components/macOS/dock/types/dock-types";
import { AppSwitcherIcons } from "./components/app-switcher-icons";
import { FallbackAppSwitcher } from "./components/switchers/fallback-app-switcher";
import { LiquidAppSwitcher } from "./components/switchers/liquid-app-switcher";
import { useAppSwitcherShortcut } from "./hooks/use-app-switcher-shortcut";

// TODO: only list the running apps
const apps = regularApps;

export function AppSwitcher() {
	const { isOpen, focusedIndex } = useAppSwitcherShortcut({
		count: apps.length,
	});
	const Switcher = supportsLiquidGlass
		? LiquidAppSwitcher
		: FallbackAppSwitcher;

	return (
		<Container isOpen={isOpen}>
			<Switcher count={apps.length}>
				<AppSwitcherIcons apps={apps} focusedIndex={focusedIndex} />
			</Switcher>
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

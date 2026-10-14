import { TintedGlass } from "@/components/macOS/ui/tinted-glass";
import { useDockContext } from "../../contexts/dock-context";
import "./fallback-dock.css";

export function FallbackDock({ children }: { children: React.ReactNode }) {
	return <DockGlass>{children}</DockGlass>;
}

function DockGlass({ children }: { children: React.ReactNode }) {
	const { height } = useDockContext();
	return (
		<TintedGlass
			blur={200}
			borderRadius={24}
			className="dock-glass"
			height={height}
			width="auto"
		>
			{children}
		</TintedGlass>
	);
}

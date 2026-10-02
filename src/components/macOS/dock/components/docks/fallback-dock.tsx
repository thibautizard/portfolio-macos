import { cn } from "cn";
import { useDarkMode } from "usehooks-ts";
import { Glass } from "@/components/seraui/liquid-glass";
import { useDockContext } from "../../contexts/dock-context";

export function FallbackDock({ children }: { children: React.ReactNode }) {
	return (
		<DockGlass>
			<Inner>{children}</Inner>
		</DockGlass>
	);
}

// 📦⬇️
function Inner({ children }: { children: React.ReactNode }) {
	const { isDarkMode } = useDarkMode();

	return (
		<div
			className={cn("h-full w-fit", isDarkMode ? "bg-black/10" : "bg-white/20")}
		>
			{children}
		</div>
	);
}

function DockGlass({ children }: { children: React.ReactNode }) {
	const { height } = useDockContext();
	return <Glass height={height}>{children}</Glass>;
}

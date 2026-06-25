import { useDarkMode } from "usehooks-ts";
import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";
import { DockIcon } from "./components/dock-icon";
import { DockSeparator } from "./components/dock-separator";
import { regularApps, trashApp } from "./dock-types";
import { useAppTooltip } from "./hooks/use-app-tooltip";
import { useResizeDock } from "./hooks/use-resize-dock";

const INITIAL_DOCK_HEIGHT = 105;

export function Dock() {
	const { isDarkMode } = useDarkMode();

	const { height, resize, isDockResizing } = useResizeDock({
		initialHeight: INITIAL_DOCK_HEIGHT,
	});

	const { showTooltip, Tooltip } = useAppTooltip({ isDockResizing });
	return (
		<>
			<Tooltip />
			<div
				className={cn("overflow-hidden", "squircle")}
				style={{ height: `${height}px` }}
			>
				<Glass className="h-full!">
					<div
						className={cn(
							"h-full border ",
							"bg-white/20 border-white/20",
							isDarkMode && "bg-black/10",
						)}
					>
						{/* 🟧🟥🟨 | 🚮 */}
						<div className="flex items-center h-full gap-x-2 p-1.5 px-2.5">
							{/* 🟧🟥🟨 */}
							<RegularApps onHover={showTooltip} />
							{/* | */}
							<DockSeparator onMouseDown={resize} />
							{/* 🚮 */}
							<TrashApp onHover={showTooltip} />
						</div>
					</div>
				</Glass>
			</div>
		</>
	);
}

// ----------------------------------------------------------------
// 🟧🟥🟨
function RegularApps({
	onHover,
}: {
	onHover: (el: HTMLElement | null, name: string) => void;
}) {
	return regularApps.map((app) => (
		<DockIcon
			alt={app.name}
			key={app.id}
			name={app.name}
			onHover={onHover}
			src={app.icon}
		/>
	));
}

// 🚮
function TrashApp({
	onHover,
}: {
	onHover: (el: HTMLElement | null, name: string) => void;
}) {
	return (
		<DockIcon
			alt="Trash"
			className="py-1.5"
			key={trashApp.id}
			name={trashApp.name}
			onHover={onHover}
			src={trashApp.icon}
		/>
	);
}

import { cn } from "cn";
import type { App } from "@/components/macOS/dock/types/dock-types";
import { GAP, ICON_SIZE } from "./switchers/metrics";

export function AppSwitcherIcons({
	apps,
	focusedIndex,
}: {
	apps: App[];
	focusedIndex: number;
}) {
	return (
		<div className="flex" style={{ gap: GAP }}>
			{apps.map(({ id, name, icon }, index) => (
				<AppSwitcherIcon
					icon={icon}
					isFocused={index === focusedIndex}
					key={id}
					name={name}
				/>
			))}
		</div>
	);
}

// 🟥
function AppSwitcherIcon({
	icon,
	isFocused,
	name,
}: {
	icon: string;
	isFocused: boolean;
	name: string;
}) {
	return (
		<div
			className={cn("shrink-0 p-0 rounded-[30px]", isFocused && "bg-white/25")}
			style={{ height: ICON_SIZE, width: ICON_SIZE }}
		>
			<img alt={name} className="size-full" src={icon} />
		</div>
	);
}

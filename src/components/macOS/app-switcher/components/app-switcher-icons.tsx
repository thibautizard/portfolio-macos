import type { App } from "@/components/macOS/dock/types/dock-types";
import { GAP } from "./app-switchers/metrics";
import { AppSwitcherIcon } from "./app-switcher-icon";

// Lets the switcher find which app is under the pointer
export const APP_SWITCHER_INDEX_ATTRIBUTE = "data-app-switcher-index";

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
          index={index}
          isFocused={index === focusedIndex}
          key={id}
          name={name}
        />
      ))}
    </div>
  );
}

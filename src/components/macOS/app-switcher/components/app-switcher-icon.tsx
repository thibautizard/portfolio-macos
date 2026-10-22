import { cn } from "cn";
import { ICON_SIZE } from "./app-switchers/metrics";

// Lets the switcher find which app is under the pointer
export const APP_SWITCHER_INDEX_ATTRIBUTE = "data-app-switcher-index";

// 🟥
export function AppSwitcherIcon({
  icon,
  index,
  isFocused,
  name,
}: {
  icon: string;
  index: number;
  isFocused: boolean;
  name: string;
}) {
  return (
    <div>
      <IconContainer index={index} isFocused={isFocused}>
        <Icon icon={icon} name={name} />
      </IconContainer>
      <AppTitle>{name}</AppTitle>
    </div>
  );
}

// 🆎
export function AppTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-center mt-0.5 font-semibold">{children}</div>;
}

// 📦🖼️
export function IconContainer({
  children,
  index,
  isFocused,
}: {
  children: React.ReactNode;
  index: number;
  isFocused: boolean;
}) {
  return (
    <div
      className={cn(
        "shrink-0 p-0 rounded-[30px]",
        "bg-transparent",
        isFocused && "bg-white/25",
      )}
      {...{ [APP_SWITCHER_INDEX_ATTRIBUTE]: index }}
      style={{ height: ICON_SIZE, width: ICON_SIZE }}
    >
      {children}
    </div>
  );
}

// 🖼️
export function Icon({ icon, name }: { icon: string; name: string }) {
  return <img alt={name} className="size-full" src={icon} />;
}

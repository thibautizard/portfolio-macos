import { cn } from "cn";
import { useDarkMode } from "usehooks-ts";
import { useDockContext } from "../contexts/dock-context";

// ↔️ Space on each side of the line, scaled with the dock
const PADDING_RATIO = 0.2;

export function DockSeparator({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  const { isDarkMode } = useDarkMode();
  const { height } = useDockContext();
  const isLightMode = !isDarkMode;
  return (
    <button
      className="h-full flex items-center cursor-ns-resize touch-none outline-none bg-transparent border-none"
      data-dock-separator
      onMouseDown={onMouseDown}
      style={{ paddingInline: height * PADDING_RATIO }}
      type="button"
    >
      <div
        className={cn(
          "h-[87%] w-px",
          isLightMode && "bg-black",
          isDarkMode && "bg-white/20",
        )}
      />
    </button>
  );
}

import { cn } from "cn";
import { useDarkMode } from "usehooks-ts";
export function DockSeparator({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  const { isDarkMode } = useDarkMode();
  const isLightMode = !isDarkMode;
  return (
    <button
      className="h-full px-8 flex items-center cursor-ns-resize touch-none outline-none bg-transparent border-none"
      data-dock-separator
      onMouseDown={onMouseDown}
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

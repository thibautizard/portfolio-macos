import { createContext, use } from "react";
import { useDockResize } from "../hooks/use-dock-resize";
import { useDockTooltip } from "../hooks/use-dock-tooltip";

const INITIAL_DOCK_HEIGHT = 125;

type DockContextType = ReturnType<typeof useDockResize> &
  ReturnType<typeof useDockTooltip>;

const DockContext = createContext<DockContextType>({
  height: INITIAL_DOCK_HEIGHT,
  isDockResizing: false,
  resize: () => undefined,
  showTooltip: () => undefined,
  tooltipData: null,
});

export function DockContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resize, isDockResizing, height } = useDockResize({
    initialHeight: INITIAL_DOCK_HEIGHT,
  });

  const { tooltipData, showTooltip } = useDockTooltip({ isDockResizing });

  return (
    <DockContext.Provider
      value={{ height, isDockResizing, resize, showTooltip, tooltipData }}
    >
      {children}
    </DockContext.Provider>
  );
}

export function useDockContext() {
  const context = use(DockContext);
  if (!context) console.log("⚠️ Should be wrapped inside a Dock context !");
  return context;
}

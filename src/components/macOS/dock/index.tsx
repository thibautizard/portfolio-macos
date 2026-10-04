import { supportsLiquidGlass } from "@/components/macOS/desktop/header/menus/settings/components/liquid-glass";
import { useAppDispatch } from "@/store/hooks";
import { openFinder } from "@/store/slices/app-slice";
import { DockIcon } from "./components/dock-icon";
import { DockSeparator } from "./components/dock-separator";
import { DockTooltip } from "./components/dock-tooltip";
import { FallbackDock } from "./components/docks/fallback-dock";
import { LiquidDock } from "./components/docks/liquid-dock";
import { DockContextProvider, useDockContext } from "./contexts/dock-context";
import { regularApps, trashApp } from "./types/dock-types";
export function Dock() {
  const Dock = supportsLiquidGlass ? LiquidDock : FallbackDock;
  return (
    <DockContextProvider>
      <Container>
        <DockTooltip />
        <Dock>
          <Apps />
        </Dock>
      </Container>
    </DockContextProvider>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  const centerFixedBottom = "relative mx-auto mb-1.5 w-max";
  return <div className={centerFixedBottom}>{children}</div>;
}

// ----------------------------------------------------------------
// 🟧🟥🟨

function Apps() {
  const { resize, showTooltip } = useDockContext();
  const flexCentered = "flex items-center h-full gap-x-2 p-1.5 px-2.5";
  return (
    <div className={flexCentered}>
      <FinderApp onHover={showTooltip} />
      <RegularApps onHover={showTooltip} />
      <DockSeparator onMouseDown={resize} />
      <TrashApp onClick={() => {}} onHover={showTooltip} />
    </div>
  );
}

function RegularApps({
  onHover,
}: {
  onHover: (el: HTMLElement | null, name: string) => void;
}) {
  const otherApps = regularApps.filter(({ id }) => id !== "finder");
  return otherApps.map(({ id, name, icon }) => (
    <DockIcon alt={name} key={id} name={name} onHover={onHover} src={icon} />
  ));
}

// 📂
function FinderApp({
  onHover,
}: {
  onHover: (el: HTMLElement | null, name: string) => void;
}) {
  const dispatch = useAppDispatch();

  const finderApp = regularApps.find((app) => app.id === "finder");
  if (!finderApp) return null;
  const { id, name, icon } = finderApp;

  return (
    <DockIcon
      alt={name}
      key={id}
      name={name}
      onClick={() => dispatch(openFinder())}
      onHover={onHover}
      src={icon}
    />
  );
}

// 🚮
function TrashApp({
  onHover,
  onClick,
}: {
  onHover: (el: HTMLElement | null, name: string) => void;
  onClick: () => void;
}) {
  const { id, name, icon } = trashApp;
  return (
    <DockIcon
      alt="Trash"
      className="py-1.5"
      key={id}
      name={name}
      onClick={onClick}
      onHover={onHover}
      src={icon}
    />
  );
}

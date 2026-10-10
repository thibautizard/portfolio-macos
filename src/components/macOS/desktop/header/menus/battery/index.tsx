import { cn } from "cn";
import { useSelector } from "react-redux";
import { useDarkMode } from "usehooks-ts";
import { useAppDispatch } from "@/store/hooks";
import { selectIsPowerMode, togglePowerMode } from "@/store/slices/app-slice";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "../menu";
import {
  Battery0Percent,
  Battery25Percent,
  Battery50Percent,
  Battery75Percent,
  Battery100Percent,
} from "./components/batteries";
import {
  BatteryContextProvider,
  useBatteryContext,
} from "./contexts/battery-context";

export function Battery() {
  return (
    <BatteryContextProvider>
      <Menu>
        <BatteryTrigger />
        <BatteryPopup />
      </Menu>
    </BatteryContextProvider>
  );
}

// 🔋 Battery icon
function BatteryTrigger() {
  const { battery } = useBatteryContext();
  const isPowerMode = useSelector(selectIsPowerMode);

  if (!battery) return null;

  const roundedBatteryLevel = Math.round(battery.percent / 25) * 25;
  const yellowPowerMode = "#FFD600";
  const fill = isPowerMode ? yellowPowerMode : "white";
  return (
    <MenuTrigger className="flex gap-x-1 items-center">
      <span className="text-xs leading-none!">{battery.percent} %</span>
      <div className="size-6.5 h-fit">
        {roundedBatteryLevel === 100 && <Battery100Percent fill={fill} />}
        {roundedBatteryLevel === 75 && <Battery75Percent fill={fill} />}
        {roundedBatteryLevel === 50 && <Battery50Percent fill={fill} />}
        {roundedBatteryLevel === 25 && <Battery25Percent fill={fill} />}
        {roundedBatteryLevel === 0 && <Battery0Percent fill={fill} />}
      </div>
    </MenuTrigger>
  );
}

// 🪟
function BatteryPopup() {
  const { battery } = useBatteryContext();

  if (!battery) return null;

  return (
    <MenuPopup>
      {/* 🔋 */}
      <div className="flex flex-col my-2 mx-2">
        <BatteryAndPercent />
        <PowerSource />
      </div>
      <MenuSeparator className="mx-2" />
      {/* 🔌 */}
      <EnergyMode />
      <MenuSeparator className="my-1" />
      {/* ⚙️ */}
      <BatterySettings />
    </MenuPopup>
  );
}

function BatteryAndPercent() {
  const { battery } = useBatteryContext();
  const { isDarkMode } = useDarkMode();

  if (!battery) return null;
  return (
    <div className="text-[.80rem] mb-1.5 flex justify-between">
      <span
        className={cn(
          "font-bold tracking-tight",
          "text-black",
          isDarkMode && "text-white",
        )}
      >
        Battery
      </span>
      <span className={cn("text-gray-600", isDarkMode && "text-gray-300")}>
        {battery.percent} %
      </span>
    </div>
  );
}

function PowerSource() {
  const { isDarkMode } = useDarkMode();
  const { battery } = useBatteryContext();

  if (!battery) return null;
  const label = battery.charging
    ? "Power source: Power Adapter"
    : "Power source: Battery";

  return (
    <div className={cn("text-gray-600", isDarkMode && "text-gray-300")}>
      {label}
    </div>
  );
}

function EnergyMode() {
  const { isDarkMode } = useDarkMode();
  const dispatch = useAppDispatch();
  const isPowerMode = useSelector(selectIsPowerMode);

  const bluePowerMode = "#0091FF";
  return (
    <MenuGroup>
      <MenuGroupLabel>Energy Mode</MenuGroupLabel>
      <MenuItem
        className="group"
        closeOnClick={false}
        nativeButton
        onClick={() => dispatch(togglePowerMode())}
      >
        <div
          className={cn(
            "group-active:opacity-70",
            "size-6.5 rounded-full grid place-items-center",
            "bg-black/10",
            isDarkMode && "bg-white/10",
          )}
          style={isPowerMode ? { backgroundColor: bluePowerMode } : {}}
        >
          <Battery25Percent
            fill={
              isPowerMode
                ? "white"
                : isDarkMode
                  ? "var(--color-gray-300)"
                  : "#1e2939"
            }
          />
          {/*<BatteryForPowerMode />*/}
        </div>
        <span className="text-[.82rem] font-medium group-active:opacity-70">
          Low Power
        </span>
      </MenuItem>
    </MenuGroup>
  );
}

function BatterySettings() {
  return (
    <MenuItem className="text-[.82rem] font-medium">
      Battery Settings...
    </MenuItem>
  );
}

// function BatteryForPowerMode() {
// 	const { isDarkMode } = useDarkMode();
// 	const batteryLevel = 0.3;
// 	const baseWidthFull = 278;
// 	const fillWidth = baseWidthFull * batteryLevel;
// 	const batteryColor = isDarkMode
// 		? "var(--color-gray-300)"
// 		: "var(--color-gray-600)";
// 	return (
// 		<svg
// 			className="aspect-square w-full h-full"
// 			fill="none"
// 			height="175"
// 			viewBox="0 0 367 175"
// 			width="367"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<title>Battery</title>
// 			<rect
// 				fill={batteryColor}
// 				height="100"
// 				rx="23"
// 				width={fillWidth}
// 				x="40"
// 				y="36"
// 			/>
// 			<rect
// 				height="159"
// 				rx="35"
// 				stroke={batteryColor}
// 				strokeOpacity={0.5}
// 				strokeWidth={25}
// 				width="323"
// 				x="8"
// 				y="8"
// 			/>
// 			<path
// 				d="M347 115.439V58C358 58 366.5 75.6902 366.5 87.5C366.5 98.773 359.5 115.439 347 115.439Z"
// 				fill={batteryColor}
// 				fillOpacity={0.5}
// 			/>
// 		</svg>
// 	);
// }

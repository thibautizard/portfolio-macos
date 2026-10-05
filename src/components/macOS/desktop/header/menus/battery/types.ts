export interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  addEventListener(
    type: "chargingchange" | "levelchange",
    listener: (this: BatteryManager, ev: Event) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: "chargingchange" | "levelchange",
    listener: (this: BatteryManager, ev: Event) => void,
    options?: boolean | EventListenerOptions,
  ): void;
}

export interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

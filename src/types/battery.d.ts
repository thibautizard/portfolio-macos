declare global {
	interface Navigator {
		getBattery?: () => Promise<BatteryManager>;
	}

	interface BatteryManager extends EventTarget {
		readonly charging: boolean;
		readonly chargingTime: number;
		readonly dischargingTime: number;
		readonly level: number;
		onchargingchange: ((this: BatteryManager, ev: Event) => unknown) | null;
		onchargingtimechange: ((this: BatteryManager, ev: Event) => unknown) | null;
		ondischargingtimechange:
			| ((this: BatteryManager, ev: Event) => unknown)
			| null;
		onlevelchange: ((this: BatteryManager, ev: Event) => unknown) | null;
	}
}

export {};

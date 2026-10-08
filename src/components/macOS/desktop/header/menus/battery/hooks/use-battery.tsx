import { useSyncExternalStore } from "react";

let snapshot: { charging: boolean; percent: number } | null = null;
const listeners = new Set<() => void>();

// Resolved once at module level: useSyncExternalStore needs sync subscribe/getSnapshot
window.navigator.getBattery?.().then((battery) => {
	const update = () => {
		const percent = Math.round(battery.level * 100);
		if (snapshot?.percent === percent && snapshot.charging === battery.charging)
			return;
		snapshot = { charging: battery.charging, percent };
		for (const listener of listeners) listener();
	};
	update();
	battery.addEventListener("levelchange", update);
	battery.addEventListener("chargingchange", update);
});

function subscribe(callback: () => void) {
	listeners.add(callback);
	return () => listeners.delete(callback);
}

function getSnapshot() {
	return snapshot;
}

export function useBattery() {
	const battery = useSyncExternalStore(subscribe, getSnapshot);
	return battery;
}

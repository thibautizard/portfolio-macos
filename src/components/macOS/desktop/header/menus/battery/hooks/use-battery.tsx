import { useEffect, useState } from "react";
import type { BatteryManager, NavigatorWithBattery } from "../types";

export function useBattery() {
  const [battery, setBattery] = useState<BatteryManager | null>(null);
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [batteryCharging, setBatteryCharging] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return;

    const controller = new AbortController();
    const { signal } = controller;

    nav.getBattery().then((bat) => {
      if (signal.aborted) return;

      setBattery(bat);
      setBatteryLevel(roundLevel(bat.level));
      setBatteryCharging(bat.charging);

      const handleLevelChange = () => setBatteryLevel(roundLevel(bat.level));
      const handleChargingChange = () => setBatteryCharging(bat.charging);

      bat.addEventListener("levelchange", handleLevelChange, {
        signal,
      });
      bat.addEventListener("chargingchange", handleChargingChange, {
        signal,
      });
    });

    return () => controller.abort();
  }, []);

  return { battery, batteryCharging, batteryLevel };
}

function roundLevel(value: number): number {
  return Math.round(value * 100) / 100;
}

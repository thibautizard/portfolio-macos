import { createContext, use } from "react";
import { useBattery } from "../hooks/use-battery";

const batteryContext = createContext<{
	battery: ReturnType<typeof useBattery>;
}>({
	battery: null,
});

export const BatteryContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const battery = useBattery();
	if (!battery) return null;
	return (
		<batteryContext.Provider value={{ battery }}>
			{children}
		</batteryContext.Provider>
	);
};

export const useBatteryContext = () => {
	const context = use(batteryContext);
	if (!context) console.log("⚠️ Should be wrapped inside a Battery context !");
	return context;
};

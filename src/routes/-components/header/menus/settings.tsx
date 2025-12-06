import settingsIconsSrc from "@/assets/icons/settings.svg";

export function Settings() {
	return (
		<img
			alt="Settings"
			className={"size-[15px] relative invert"}
			src={settingsIconsSrc}
		/>
	);
}

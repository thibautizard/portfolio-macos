import { cn } from "cn";
import srcAppleIcon from "@/assets/macOS/icons/apple.svg";

export function Apple() {
	return (
		<img
			alt="Apple icon"
			className={cn("size-[16px] relative -translate-y-px", "invert")}
			src={srcAppleIcon}
		/>
	);
}

import srcAppleIcon from "@/assets/icons/apple.svg";
import { cn } from "@/lib/utils";

export function Apple() {
	return (
		<img
			alt="Apple icon"
			className={cn("size-[16px] relative -translate-y-px", "invert")}
			src={srcAppleIcon}
		/>
	);
}

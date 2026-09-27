import srcAppleIcon from "@/assets/macOS/icons/apple.svg";
import { cn } from "cn";

export function Apple() {
  return (
    <img
      alt="Apple icon"
      className={cn("size-[16px] relative -translate-y-px", "invert")}
      src={srcAppleIcon}
    />
  );
}

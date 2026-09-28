import { cn } from "cn";
import { motion } from "motion/react";
import type { RefObject } from "react";
import { Sidebar } from "./components/sidebar";

export function Finder({
  mainRef,
}: {
  mainRef: RefObject<HTMLElement | null>;
}) {
  return (
    <Window mainRef={mainRef}>
      <Sidebar />
    </Window>
  );
}

// 📦
export function Window({
  children,
  mainRef,
}: {
  children: React.ReactNode;
  mainRef: RefObject<HTMLElement | null>;
}) {
  return (
    <motion.div
      className={cn(
        "absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2",
        "h-200 w-300",
        "p-1.5",
        "rounded-3xl",
        "bg-[#1F212D]",
        "border-[#4D5057] border",
        "shadow-2xl",
        "flex flex-row",
      )}
      drag
      dragConstraints={mainRef}
      dragElastic={0}
      dragMomentum={false}
    >
      {children}
    </motion.div>
  );
}

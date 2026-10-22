import { cn } from "cn";
import { motion } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";
import { registerWindow, WINDOW_CLASSNAME } from "./window-registry";

export function Window({
  children,
  className,
  isOpen,
  parentRef,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  parentRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) return registerWindow(ref.current);
  }, []);

  return (
    <motion.div
      className={cn(
        isOpen ? "flex" : "hidden",

        WINDOW_CLASSNAME,
        className,
      )}
      drag
      dragConstraints={parentRef}
      dragElastic={0}
      dragMomentum={false}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}

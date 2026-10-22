import { cn } from "cn";
import { motion } from "motion/react";
import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";
import {
  RESIZE_CURSORS,
  type ResizeEdge,
  useWindowFrame,
} from "./use-window-frame";
import { registerWindow, WINDOW_CLASSNAME } from "./window-registry";

export function Window({
  children,
  className,
  isOpen,
  minHeight = 260,
  minWidth = 400,
  parentRef,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  minHeight?: number;
  minWidth?: number;
  parentRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) return registerWindow(ref.current);
  }, []);

  const {
    dragConstraints,
    dragControls,
    keepAboveDock,
    startDrag,
    startResize,
    x,
    y,
  } = useWindowFrame({
    minHeight,
    minWidth,
    parentRef,
    windowRef: ref,
  });

  // The dock may have grown while the window was closed
  useLayoutEffect(() => {
    if (isOpen) keepAboveDock();
  }, [isOpen, keepAboveDock]);

  return (
    <motion.div
      className={cn(
        isOpen ? "flex" : "hidden",
        "relative",
        WINDOW_CLASSNAME,
        className,
      )}
      drag
      dragConstraints={dragConstraints}
      dragControls={dragControls}
      dragElastic={0}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={startDrag}
      ref={ref}
      style={{ x, y }}
    >
      {children}
      <ResizeHandles onStart={startResize} />
    </motion.div>
  );
}

// ------------------------------------------------------------------------------
// ↘️ Invisible grab zones straddling the border; corners come last to sit on top
const EDGE = 8;
const CORNER = 16;
const OUTSET = -EDGE / 2;

const HANDLES: { edge: ResizeEdge; style: React.CSSProperties }[] = [
  {
    edge: "top",
    style: { height: EDGE, left: CORNER, right: CORNER, top: OUTSET },
  },
  {
    edge: "right",
    style: { bottom: CORNER, right: OUTSET, top: CORNER, width: EDGE },
  },
  {
    edge: "bottom",
    style: { bottom: OUTSET, height: EDGE, left: CORNER, right: CORNER },
  },
  {
    edge: "left",
    style: { bottom: CORNER, left: OUTSET, top: CORNER, width: EDGE },
  },
  {
    edge: "top-left",
    style: { height: CORNER, left: OUTSET, top: OUTSET, width: CORNER },
  },
  {
    edge: "top-right",
    style: { height: CORNER, right: OUTSET, top: OUTSET, width: CORNER },
  },
  {
    edge: "bottom-right",
    style: { bottom: OUTSET, height: CORNER, right: OUTSET, width: CORNER },
  },
  {
    edge: "bottom-left",
    style: { bottom: OUTSET, height: CORNER, left: OUTSET, width: CORNER },
  },
];

function ResizeHandles({
  onStart,
}: {
  onStart: (edge: ResizeEdge, e: React.PointerEvent<HTMLElement>) => void;
}) {
  return HANDLES.map(({ edge, style }) => (
    <div
      className="absolute touch-none"
      key={edge}
      onPointerDown={(e) => onStart(edge, e)}
      style={{ cursor: RESIZE_CURSORS[edge], ...style }}
    />
  ));
}

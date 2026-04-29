import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------
// ↕️ Dock resize
export function useResizeDock({ initialHeight }: { initialHeight: number }) {
  const [height, setHeight] = useState(initialHeight);
  const [isDockResizing, setisDockResizing] = useState(false);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);

  const resize = (e: React.MouseEvent) => {
    e.preventDefault();
    setisDockResizing(true);
    startYRef.current = e.clientY;
    startHeightRef.current = height;
  };

  useEffect(() => {
    if (!isDockResizing) return;

    document.body.style.cursor = "ns-resize";

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY;
      const newHeight = Math.min(
        125,
        Math.max(75, startHeightRef.current + deltaY),
      );
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setisDockResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };
  }, [isDockResizing]);

  return { height, isDockResizing, resize };
}

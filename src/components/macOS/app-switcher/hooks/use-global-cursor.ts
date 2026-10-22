import { useEffect } from "react";

// ---------------------------------------------------------------
// 👆 Forces one cursor on the whole page while `isActive`, over any
// element's own cursor (windows' resize edges, the dock separator…)
export function useGlobalCursor(cursor: string, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;
    const style = document.createElement("style");
    style.textContent = `* { cursor: ${cursor} !important; }`;
    document.head.append(style);
    return () => style.remove();
  }, [cursor, isActive]);
}

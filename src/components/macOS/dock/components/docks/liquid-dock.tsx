/** biome-ignore-all lint/a11y/noStaticElementInteractions: exception */
import {
  Glass,
  GlassContainer,
  Html,
  LiquidCanvas,
  ZStack,
} from "@liquid-dom/react";
import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import { useDockContext } from "../../contexts/dock-context";

const CORNER_RADIUS = 25;
const CORNER_SMOOTHING = 0.6;
const CANVAS_STYLE = { display: "block", height: "100%", width: "100%" };

/** Dock rendered with liquid-dom (WebGPU + HTML-in-Canvas only). */
export function LiquidDock({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const { height, resize } = useDockContext();
  const hostRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  // ↔️ The canvas hugs the icons: measure their natural width
  // (callback ref: the content only mounts once the canvas renderer is ready)
  const measureContent = useCallback((content: HTMLDivElement | null) => {
    if (!content) return;
    const measure = () => setWidth(content.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  // 📍 Where the dock sits on screen, to line the backdrop up with the wallpaper
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const locate = () => {
      const { left, top } = host.getBoundingClientRect();
      setOffset({ left, top });
    };
    locate();
    // Moves when the dock resizes (it's centered) or the window does
    const observer = new ResizeObserver(locate);
    observer.observe(host);
    const { signal } = new AbortController();

    window.addEventListener("resize", locate, { signal });
    return () => observer.disconnect();
  }, []);

  return (
    <Container
      onMouseDown={(e) => isOverSeparator(e) && resize(e)}
      onMouseMove={(e) => {
        e.currentTarget.style.cursor = isOverSeparator(e) ? "ns-resize" : "";
      }}
      ref={hostRef}
      width={width}
    >
      <LiquidCanvas canvasStyle={CANVAS_STYLE} className="size-full">
        <ZStack>
          {/* 🖼️ The glass only refracts what's in the canvas */}
          <Html sizing="fill">
            <Backdrop {...offset} />
          </Html>
          {/* 🫧 */}
          <GlassContainer
            blur={6}
            tint={
              isDarkMode
                ? { a: 0.1, b: 0, g: 0, r: 0 }
                : { a: 0.2, b: 1, g: 1, r: 1 }
            }
          >
            {/* Intrinsic: liquid-dom measures the icons itself, so the glass
                never depends on a DOM size it hides (0-size HTML isn't mounted) */}
            <Glass
              cornerRadius={CORNER_RADIUS}
              cornerSmoothing={CORNER_SMOOTHING}
            >
              <Html sizing="intrinsic">
                <div className="w-max" ref={measureContent} style={{ height }}>
                  {children}
                </div>
              </Html>
            </Glass>
          </GlassContainer>
        </ZStack>
      </LiquidCanvas>
    </Container>
  );
}

export function Container({
  children,
  ref,
  width,
  onMouseDown,
  onMouseMove,
}: {
  children: React.ReactNode;
  ref: RefObject<HTMLDivElement | null>;
  width: number;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { height } = useDockContext();
  return (
    <div
      className="overflow-hidden rounded-[11px]"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      ref={ref}
      style={{
        height,
        width: width || undefined,
      }}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------------------------------
// ↕️ The canvas receives the mouse events, not the HTML drawn inside it:
// hit-test the separator by hand
function isOverSeparator(e: React.MouseEvent<HTMLElement>) {
  const separator = e.currentTarget.querySelector("[data-dock-separator]");
  if (!separator) return false;
  const { left, right, top, bottom } = separator.getBoundingClientRect();
  return (
    e.clientX >= left &&
    e.clientX <= right &&
    e.clientY >= top &&
    e.clientY <= bottom
  );
}

// ------------------------------------------------------------------------------
// 🖼️
function Backdrop({ left, top }: { left: number; top: number }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="relative size-full overflow-hidden">
      <div
        className="absolute w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
          left: -left,
          top: -top,
        }}
      />
    </div>
  );
}

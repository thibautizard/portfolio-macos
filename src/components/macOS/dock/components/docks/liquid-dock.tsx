/** biome-ignore-all lint/a11y/noStaticElementInteractions: exception */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: keyboard reaches the real buttons directly, only pointer clicks hit the canvas */
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
const ICON_SELECTOR = "button:not([data-dock-separator])";

/** Dock rendered with liquid-dom (WebGPU + HTML-in-Canvas only). */
export function LiquidDock({ children }: { children: React.ReactNode }) {
	const { isDarkMode } = useDarkMode();
	const { height, resize } = useDockContext();
	const hostRef = useRef<HTMLDivElement>(null);
	const hoveredRef = useRef<HTMLElement>(undefined);

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
			onClick={forwardClick}
			onMouseDown={(e) => isOverSeparator(e) && resize(e)}
			onMouseLeave={() => {
				hoveredRef.current = undefined;
			}}
			onMouseMove={(e) => {
				e.currentTarget.style.cursor = isOverSeparator(e) ? "ns-resize" : "";
				forwardHover(e, hoveredRef);
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
	onClick,
	onMouseDown,
	onMouseLeave,
	onMouseMove,
}: {
	children: React.ReactNode;
	ref: RefObject<HTMLDivElement | null>;
	width: number;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
	onMouseDown: React.MouseEventHandler<HTMLDivElement>;
	onMouseMove: React.MouseEventHandler<HTMLDivElement>;
}) {
	const { height } = useDockContext();
	return (
		<div
			className="overflow-hidden rounded-[11px]"
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseLeave}
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
// 🎯 The canvas receives the mouse events, not the HTML drawn inside it:
// hit-test its children by hand
function elementAt(e: React.MouseEvent<HTMLElement>, selector: string) {
	const elements = e.currentTarget.querySelectorAll<HTMLElement>(selector);
	return Array.from(elements).find((el) => {
		const { left, right, top, bottom } = el.getBoundingClientRect();
		return (
			e.clientX >= left &&
			e.clientX <= right &&
			e.clientY >= top &&
			e.clientY <= bottom
		);
	});
}

// ↕️
function isOverSeparator(e: React.MouseEvent<HTMLElement>) {
	return elementAt(e, "[data-dock-separator]") !== undefined;
}

// 🖱️ Re-dispatch the click on the icon under the pointer
// (only when it hit the canvas, so the forwarded click doesn't loop back here)
function forwardClick(e: React.MouseEvent<HTMLElement>) {
	if (!(e.target instanceof HTMLCanvasElement)) return;
	elementAt(e, ICON_SELECTOR)?.click();
}

// 🫳 Re-dispatch a mouseover when the pointer reaches a new icon
// (React derives onMouseEnter from mouseover + relatedTarget)
function forwardHover(
	e: React.MouseEvent<HTMLElement>,
	hoveredRef: RefObject<HTMLElement | undefined>,
) {
	const icon = elementAt(e, ICON_SELECTOR);
	if (icon === hoveredRef.current) return;
	const previous = hoveredRef.current ?? e.target;
	hoveredRef.current = icon;
	icon?.dispatchEvent(
		new MouseEvent("mouseover", {
			bubbles: true,
			clientX: e.clientX,
			clientY: e.clientY,
			relatedTarget: previous,
		}),
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

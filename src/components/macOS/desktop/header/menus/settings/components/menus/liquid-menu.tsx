import {
	Frame,
	Glass,
	GlassContainer,
	HStack,
	Html,
	LiquidCanvas,
	Padding,
	VStack,
	ZStack,
} from "@liquid-dom/react";
import { cn } from "cn";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import {
	useWindows,
	WINDOW_CLASSNAME,
} from "@/components/macOS/finder/window-registry";
import { DisplaySlider } from "../display-slider";
import { LiquidGlassProvider } from "../liquid-glass";
import { MusicPlayer } from "../music-player";
import { VolumeSlider } from "../volume-slider";

// Same metrics as the CSS grid menu (2 × 140px columns, gap-4, p-6)
const GAP = 16;
const PADDING = 24;
const SQUARE = { height: 138, width: 140 };
const LONG = { height: 64, width: SQUARE.width * 2 + GAP };
const WIDTH = LONG.width + PADDING * 2;
const HEIGHT = SQUARE.height + LONG.height * 2 + GAP * 2 + PADDING * 2;
const CANVAS_STYLE = { display: "block", height: "100%", width: "100%" };

/** Settings menu rendered with liquid-dom (WebGPU + HTML-in-Canvas only). */
export function LiquidMenu({ isOpened }: { isOpened: boolean }) {
	const hostRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState({ left: 0, top: 0 });
	const { isDarkMode } = useDarkMode();

	// 📍 Where the menu sits on screen, to line the backdrop up with the wallpaper.
	useLayoutEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		const locate = () => {
			const { left, top } = host.getBoundingClientRect();
			setOffset({ left, top });
		};
		locate();
		const controller = new AbortController();
		window.addEventListener("resize", locate, { signal: controller.signal });
		return () => controller.abort();
	}, []);

	// 🔍 Scale only while opening/closing, so the menu stays at scale 1 at rest
	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const scales = isOpened ? ["1.02", "1"] : ["1", "1.02"];
		hostRef.current?.animate(
			scales.map((scale) => ({ scale })),
			{ duration: 300, easing: "ease" },
		);
	}, [isOpened]);

	return (
		<div
			className={cn(
				"fixed right-0 -z-1",
				"transition-opacity duration-300",
				isOpened ? "opacity-100" : "opacity-0 pointer-events-none",
			)}
			ref={hostRef}
			style={{ height: HEIGHT, width: WIDTH }}
		>
			{/* The canvas needs a CSS size, or it grows by DPR every frame */}
			<LiquidCanvas
				canvasStyle={CANVAS_STYLE}
				style={{ height: "100%", width: "100%" }}
			>
				<ZStack>
					{/* 🖼️ The glass only refracts what's in the canvas */}
					<Html sizing="fill">
						<Backdrop {...offset} isOpened={isOpened} />
					</Html>
					{/* 🫧 */}
					<GlassContainer
						blur={6}
						spacing={GAP}
						tint={
							isDarkMode
								? { a: 0.2, b: 0.3, g: 0.3, r: 0.3 }
								: { a: 0.4, b: 0.3, g: 0.3, r: 0.3 }
						}
					>
						<Padding insets={PADDING}>
							<LiquidGlassProvider value={true}>
								<VStack spacing={GAP}>
									<HStack spacing={GAP}>
										<Tile {...SQUARE} cornerRadius={42}>
											<MusicPlayer />
										</Tile>
										<Tile {...SQUARE} cornerRadius={42}>
											<MusicPlayer />
										</Tile>
									</HStack>
									<Tile {...LONG} cornerRadius={29}>
										<DisplaySlider />
									</Tile>
									<Tile {...LONG} cornerRadius={29}>
										<VolumeSlider />
									</Tile>
								</VStack>
							</LiquidGlassProvider>
						</Padding>
					</GlassContainer>
				</ZStack>
			</LiquidCanvas>
		</div>
	);
}
// ----------------------------------------
// ▭
function Tile({
	children,
	cornerRadius,
	height,
	width,
}: {
	children: React.ReactNode;
	cornerRadius: number;
	height: number;
	width: number;
}) {
	return (
		<Frame height={height} width={width}>
			<Glass cornerRadius={cornerRadius} cornerSmoothing={0.25}>
				<Html sizing="fill">{children}</Html>
			</Glass>
		</Frame>
	);
}

// ------------------------------------------------------------------------------
/** The page wallpaper, cropped to the area behind the menu so it lines up. */
function Backdrop({
	isOpened,
	left,
	top,
}: {
	isOpened: boolean;
	left: number;
	top: number;
}) {
	const { isDarkMode } = useDarkMode();
	const windows = useWindows();
	return (
		<div className="relative size-full overflow-hidden">
			<div
				className="absolute w-screen h-screen bg-cover bg-center"
				style={{
					backgroundImage: `url(${isDarkMode ? wallpaperTahoeDark : wallpaperTahoeLight})`,
					left: -left,
					top: -top,
				}}
			>
				{/* 🪟 The canvas can't see the DOM behind it, so windows are mirrored */}
				{windows.map((window, index) => (
					<WindowProxy
						isOpened={isOpened}
						// biome-ignore lint/suspicious/noArrayIndexKey: windows have no id yet
						key={index}
						window={window}
					/>
				))}
			</div>
			{/* ⚫ Same dimming as the CSS menu */}
			<div className="absolute inset-0 bg-black/10 mask-x-from-50 mask-y-from-50" />
		</div>
	);
}

/** A copy of a window's surface that follows it on screen, frame by frame. */
function WindowProxy({
	isOpened,
	window,
}: {
	isOpened: boolean;
	window: HTMLElement;
}) {
	const proxyRef = useRef<HTMLDivElement>(null);

	// 🔁 Write styles directly: re-rendering React on every drag frame is wasteful
	useEffect(() => {
		const proxy = proxyRef.current;
		if (!proxy || !isOpened) return;
		let previous = "";
		let frame = requestAnimationFrame(function sync() {
			const { height, left, top, width } = window.getBoundingClientRect();
			const next = `${left},${top},${width},${height}`;
			// Only touch the DOM on change, every mutation repaints the canvas
			if (next !== previous) {
				previous = next;
				Object.assign(proxy.style, {
					display: width ? "block" : "none",
					height: `${height}px`,
					transform: `translate(${left}px, ${top}px)`,
					width: `${width}px`,
				});
			}
			frame = requestAnimationFrame(sync);
		});
		return () => cancelAnimationFrame(frame);
	}, [isOpened, window]);

	return (
		<div
			className={cn("absolute top-0 left-0 hidden", WINDOW_CLASSNAME)}
			ref={proxyRef}
		/>
	);
}

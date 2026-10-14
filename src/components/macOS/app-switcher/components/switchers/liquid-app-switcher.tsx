import {
	Frame,
	Glass,
	GlassContainer,
	Html,
	LiquidCanvas,
	ZStack,
} from "@liquid-dom/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import wallpaperTahoeDark from "@/assets/macOS/wallpapers/wallpaper_tahoe_dark.avif";
import wallpaperTahoeLight from "@/assets/macOS/wallpapers/wallpaper_tahoe_light.avif";
import { CORNER_RADIUS, switcherSize } from "./metrics";

const CORNER_SMOOTHING = 0.6;
const CANVAS_STYLE = { display: "block", height: "100%", width: "100%" };

const BLUR = 6;
const TINT_DARK = { a: 0.08, b: 0, g: 0, r: 0 };
const TINT_LIGHT = { a: 0.1, b: 0, g: 0, r: 0 };
const THICKNESS = 25;

/** App switcher rendered with liquid-dom (WebGPU + HTML-in-Canvas only). */
export function LiquidAppSwitcher({
	children,
	count,
}: {
	children: React.ReactNode;
	count: number;
}) {
	const { isDarkMode } = useDarkMode();
	const hostRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState({ left: 0, top: 0 });
	const { height, width } = switcherSize(count);

	// 📍 Where the switcher sits on screen, to line the backdrop up with the wallpaper.
	// Followed every frame: it can be dragged, and moves when the window resizes.
	useLayoutEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		let frame = requestAnimationFrame(function locate() {
			const { left, top } = host.getBoundingClientRect();
			// Same values keep the same object: React skips the re-render
			setOffset((previous) =>
				previous.left === left && previous.top === top
					? previous
					: { left, top },
			);
			frame = requestAnimationFrame(locate);
		});
		return () => cancelAnimationFrame(frame);
	}, []);

	return (
		<div
			className="overflow-hidden"
			ref={hostRef}
			style={{
				borderRadius: CORNER_RADIUS,
				height,
				width,
			}}
		>
			{/* The canvas needs a CSS size, or it grows by DPR every frame */}
			<LiquidCanvas
				canvasStyle={CANVAS_STYLE}
				style={{ height: "100%", width: "100%" }}
			>
				<ZStack>
					{/* 🖼️ The glass only refracts what's in the canvas */}
					<Html sizing="fill">
						<Backdrop {...offset} />
					</Html>
					{/* 🫧 */}
					<GlassContainer
						blur={BLUR}
						thickness={THICKNESS}
						tint={isDarkMode ? TINT_DARK : TINT_LIGHT}
					>
						<Frame height={height} width={width}>
							<Glass
								cornerRadius={CORNER_RADIUS}
								cornerSmoothing={CORNER_SMOOTHING}
							>
								<Html sizing="fill">
									<div className="grid size-full place-items-center">
										{children}
									</div>
								</Html>
							</Glass>
						</Frame>
					</GlassContainer>
				</ZStack>
			</LiquidCanvas>
		</div>
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

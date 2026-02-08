import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useId, useRef } from "react";
import "./glass-surface.css";

interface GlassSurfaceProps {
	children?: ReactNode;
	width?: number | string;
	height?: number | string;
	borderRadius?: number;
	borderWidth?: number;
	brightness?: number;
	opacity?: number;
	blur?: number;
	displace?: number;
	backgroundOpacity?: number;
	saturation?: number;
	distortionScale?: number;
	redOffset?: number;
	greenOffset?: number;
	blueOffset?: number;
	xChannel?: "R" | "G" | "B" | "A";
	yChannel?: "R" | "G" | "B" | "A";
	mixBlendMode?: CSSProperties["mixBlendMode"];
	className?: string;
	style?: CSSProperties;
}

const GlassSurface = ({
	children,
	width = 200,
	height = 80,
	borderRadius = 20,
	borderWidth = 0.07,
	brightness = 50,
	opacity = 0.93,
	blur = 11,
	displace = 0,
	backgroundOpacity = 0,
	saturation = 1,
	distortionScale = -180,
	redOffset = 0,
	greenOffset = 10,
	blueOffset = 20,
	xChannel = "R",
	yChannel = "G",
	mixBlendMode = "difference",
	className = "",
	style = {},
}: GlassSurfaceProps) => {
	const uniqueId = useId().replace(/:/g, "-");
	const filterId = `glass-filter-${uniqueId}`;
	const redGradId = `red-grad-${uniqueId}`;
	const blueGradId = `blue-grad-${uniqueId}`;

	const containerRef = useRef<HTMLDivElement>(null);
	const feImageRef = useRef<SVGFEImageElement>(null);
	const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
	const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
	const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
	const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

	const generateDisplacementMap = useCallback(() => {
		const rect = containerRef.current?.getBoundingClientRect();
		const actualWidth = rect?.width || 400;
		const actualHeight = rect?.height || 200;
		const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

		const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

		return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
	}, [
		borderRadius,
		borderWidth,
		brightness,
		opacity,
		blur,
		mixBlendMode,
		redGradId,
		blueGradId,
	]);

	const updateDisplacementMap = useCallback(() => {
		feImageRef.current?.setAttribute("href", generateDisplacementMap());
	}, [generateDisplacementMap]);

	useEffect(() => {
		updateDisplacementMap();
		[
			{ offset: redOffset, ref: redChannelRef },
			{ offset: greenOffset, ref: greenChannelRef },
			{ offset: blueOffset, ref: blueChannelRef },
		].forEach(({ ref, offset }) => {
			if (ref.current) {
				ref.current.setAttribute(
					"scale",
					(distortionScale + offset).toString(),
				);
				ref.current.setAttribute("xChannelSelector", xChannel);
				ref.current.setAttribute("yChannelSelector", yChannel);
			}
		});

		gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		displace,
		distortionScale,
		redOffset,
		greenOffset,
		blueOffset,
		xChannel,
		yChannel,
		updateDisplacementMap,
	]);

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setTimeout(updateDisplacementMap, 0);
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateDisplacementMap]);

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setTimeout(updateDisplacementMap, 0);
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateDisplacementMap]);

	useEffect(() => {
		setTimeout(updateDisplacementMap, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateDisplacementMap]);

	const supportsSVGFilters = () => {
		const isWebkit =
			/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
		const isFirefox = /Firefox/.test(navigator.userAgent);

		if (isWebkit || isFirefox) {
			return false;
		}

		const div = document.createElement("div");
		div.style.backdropFilter = `url(#${filterId})`;
		return div.style.backdropFilter !== "";
	};

	const containerStyle = {
		...style,
		"--filter-id": `url(#${filterId})`,
		"--glass-frost": backgroundOpacity,
		"--glass-saturation": saturation,
		borderRadius: `${borderRadius}px`,
		height: typeof height === "number" ? `${height}px` : height,
		width: typeof width === "number" ? `${width}px` : width,
	};

	return (
		<div
			className={`glass-surface ${supportsSVGFilters() ? "glass-surface--svg" : "glass-surface--fallback"} ${className}`}
			ref={containerRef}
			style={containerStyle}
		>
			<svg
				aria-hidden="true"
				className="glass-surface__filter"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<filter
						colorInterpolationFilters="sRGB"
						height="100%"
						id={filterId}
						width="100%"
						x="0%"
						y="0%"
					>
						<feImage
							height="100%"
							preserveAspectRatio="none"
							ref={feImageRef}
							result="map"
							width="100%"
							x="0"
							y="0"
						/>

						<feDisplacementMap
							in="SourceGraphic"
							in2="map"
							ref={redChannelRef}
							result="dispRed"
						/>
						<feColorMatrix
							in="dispRed"
							result="red"
							type="matrix"
							values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
						/>

						<feDisplacementMap
							in="SourceGraphic"
							in2="map"
							ref={greenChannelRef}
							result="dispGreen"
						/>
						<feColorMatrix
							in="dispGreen"
							result="green"
							type="matrix"
							values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
						/>

						<feDisplacementMap
							in="SourceGraphic"
							in2="map"
							ref={blueChannelRef}
							result="dispBlue"
						/>
						<feColorMatrix
							in="dispBlue"
							result="blue"
							type="matrix"
							values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
						/>

						<feBlend in="red" in2="green" mode="screen" result="rg" />
						<feBlend in="rg" in2="blue" mode="screen" result="output" />
						<feGaussianBlur
							in="output"
							ref={gaussianBlurRef}
							stdDeviation="0.7"
						/>
					</filter>
				</defs>
			</svg>

			<div className="glass-surface__content">{children}</div>
		</div>
	);
};

export default GlassSurface;

import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDarkMode } from "usehooks-ts";
const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

const GLASS_PRESETS = {
	bold: {
		backgroundOpacity: 0.18,
		blueOffset: 24,
		blur: 12,
		brightness: 60,
		displace: 0.8,
		distortionScale: -240,
		greenOffset: 12,
		mixBlendMode: "screen",
		redOffset: 6,
		saturation: 1.8,
	},
	default: {
		backgroundOpacity: 0.1,
		blueOffset: 16,
		blur: 10,
		brightness: 55,
		displace: 0.5,
		distortionScale: -160,
		greenOffset: 8,
		mixBlendMode: "difference",
		redOffset: 0,
		saturation: 1.4,
	},
	ghost: {
		backgroundOpacity: 0,
		blueOffset: 0,
		blur: 6,
		brightness: 55,
		displace: 0,
		distortionScale: 0,
		greenOffset: 0,
		mixBlendMode: "difference",
		redOffset: 0,
		saturation: 1,
	},
	subtle: {
		backgroundOpacity: 0.06,
		blueOffset: 12,
		blur: 8,
		brightness: 55,
		displace: 0.3,
		distortionScale: -80,
		greenOffset: 6,
		mixBlendMode: "difference",
		redOffset: -2,
		saturation: 1.1,
	},
};

type GlassVariant = keyof typeof GLASS_PRESETS;

const GLASS_DEFAULTS = {
	borderRadius: 20,
	borderWidth: 0.07,
	height: "auto",
	opacity: 0.93,
	width: "auto",
	xChannel: "R",
	yChannel: "G",
};

interface GlassProps {
	variant?: GlassVariant;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
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
	mixBlendMode?: string;
}

export const Glass = (rawProps: GlassProps) => {
	const {
		// new
		variant = "default",
		// core
		children,
		className = "",
		style = {},
		width,
		height,
		borderRadius,
		borderWidth,
		brightness,
		opacity,
		blur,
		displace,
		backgroundOpacity,
		saturation,
		distortionScale,
		redOffset,
		greenOffset,
		blueOffset,
		xChannel,
		yChannel,
		mixBlendMode,
	} = rawProps;

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

	const isDarkMode = useDarkMode();

	const v = useMemo(() => {
		const p = GLASS_PRESETS[variant] ?? GLASS_PRESETS.default;
		return {
			...GLASS_DEFAULTS,
			...p,
			...(width !== undefined && { width }),
			...(height !== undefined && { height }),
			...(borderRadius !== undefined && { borderRadius }),
			...(borderWidth !== undefined && { borderWidth }),
			...(brightness !== undefined && { brightness }),
			...(opacity !== undefined && { opacity }),
			...(blur !== undefined && { blur }),
			...(displace !== undefined && { displace }),
			...(backgroundOpacity !== undefined && { backgroundOpacity }),
			...(saturation !== undefined && { saturation }),
			...(distortionScale !== undefined && { distortionScale }),
			...(redOffset !== undefined && { redOffset }),
			...(greenOffset !== undefined && { greenOffset }),
			...(blueOffset !== undefined && { blueOffset }),
			...(xChannel !== undefined && { xChannel }),
			...(yChannel !== undefined && { yChannel }),
			...(mixBlendMode !== undefined && { mixBlendMode }),
		};
	}, [
		variant,
		width,
		height,
		borderRadius,
		borderWidth,
		brightness,
		opacity,
		blur,
		displace,
		backgroundOpacity,
		saturation,
		distortionScale,
		redOffset,
		greenOffset,
		blueOffset,
		xChannel,
		yChannel,
		mixBlendMode,
	]);

	const generateDisplacementMap = () => {
		const rect = containerRef.current?.getBoundingClientRect();
		const actualWidth = rect?.width || 400;
		const actualHeight = rect?.height || 200;
		const edgeSize =
			Math.min(actualWidth, actualHeight) * (v.borderWidth * 0.5);

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
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${v.mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${
					actualWidth - edgeSize * 2
				}" height="${
					actualHeight - edgeSize * 2
				}" rx="${v.borderRadius}" fill="hsl(0 0% ${v.brightness}% / ${
					v.opacity
				})" style="filter:blur(${v.blur}px)" />
      </svg>
    `;

		return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
	};

	const updateDisplacementMap = () => {
		if (feImageRef.current) {
			feImageRef.current.setAttribute("href", generateDisplacementMap());
		}
	};

	useEffect(() => {
		updateDisplacementMap();
		[
			{ offset: v.redOffset, ref: redChannelRef },
			{ offset: v.greenOffset, ref: greenChannelRef },
			{ offset: v.blueOffset, ref: blueChannelRef },
		].forEach(({ ref, offset }) => {
			if (ref.current) {
				ref.current.setAttribute(
					"scale",
					(v.distortionScale + offset).toString(),
				);
				ref.current.setAttribute("xChannelSelector", v.xChannel);
				ref.current.setAttribute("yChannelSelector", v.yChannel);
			}
		});

		if (gaussianBlurRef.current) {
			gaussianBlurRef.current.setAttribute(
				"stdDeviation",
				v.displace.toString(),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		v.width,
		v.height,
		v.borderRadius,
		v.borderWidth,
		v.brightness,
		v.opacity,
		v.blur,
		v.displace,
		v.distortionScale,
		v.redOffset,
		v.greenOffset,
		v.blueOffset,
		v.xChannel,
		v.yChannel,
		v.mixBlendMode,
		variant,
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
	}, []);

	useEffect(() => {
		setTimeout(updateDisplacementMap, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [v.width, v.height]);

	const [svgFilterSupported, setSvgFilterSupported] = useState(true);
	const [backdropFilterSupported, setBackdropFilterSupported] = useState(true);

	useEffect(() => {
		const checkSupport = () => {
			const isWebkit =
				/Safari/.test(navigator.userAgent) &&
				!/Chrome/.test(navigator.userAgent);
			const isFirefox = /Firefox/.test(navigator.userAgent);
			setSvgFilterSupported(!isWebkit && !isFirefox);
			setBackdropFilterSupported(CSS.supports("backdrop-filter", "blur(10px)"));
		};
		checkSupport();
	}, [filterId]);

	const getContainerStyles = (): React.CSSProperties => {
		const baseStyles = {
			...style,
			"--glass-frost": v.backgroundOpacity,
			"--glass-saturation": v.saturation,
			borderRadius: `${v.borderRadius}px`,
			height: typeof v.height === "number" ? `${v.height}px` : v.height,
			width: typeof v.width === "number" ? `${v.width}px` : v.width,
		};

		if (svgFilterSupported) {
			return {
				...baseStyles,
				backdropFilter: `url(#${filterId}) saturate(${v.saturation})`,
				background: isDarkMode
					? `hsl(0 0% 0% / ${v.backgroundOpacity})`
					: `hsl(0 0% 100% / ${v.backgroundOpacity})`,
			};
		} else {
			if (isDarkMode) {
				if (!backdropFilterSupported) {
					return {
						...baseStyles,
						background: "rgba(0, 0, 0, 0.4)",
					};
				} else {
					return {
						...baseStyles,
						backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
						background: "rgba(255, 255, 255, 0.1)",
						WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
					};
				}
			} else {
				if (!backdropFilterSupported) {
					return {
						...baseStyles,
						background: "rgba(255, 255, 255, 0.4)",
					};
				} else {
					return {
						...baseStyles,
						backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
						background: "rgba(255, 255, 255, 0.25)",
						WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
					};
				}
			}
		}
	};

	const glassClasses =
		"relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out";
	const focusVisibleClasses = isDarkMode
		? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
		: "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";

	return (
		<div
			className={cn(glassClasses, focusVisibleClasses, className)}
			ref={containerRef}
			style={getContainerStyles()}
		>
			<svg
				className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
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
							href={
								generateDisplacementMap() ||
								"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"
							}
							preserveAspectRatio="none"
							ref={feImageRef}
							result="map"
							width="100%"
							x="0"
							y="0"
						/>

						<feDisplacementMap
							id="redchannel"
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
							id="greenchannel"
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
							id="bluechannel"
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
			{children}
		</div>
	);
};

const glassButtonSizes = cva("rounded-[inherit]", {
	defaultVariants: {
		size: "md",
	},
	variants: {
		size: {
			icon: "p-2 size-10",
			lg: "px-6 py-3 text-lg",
			md: "px-4 py-2",
			sm: "px-3 py-1.5 text-sm",
		},
	},
});

type GlassButtonProps = {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	variant?: GlassVariant;
	size?: "sm" | "md" | "lg" | "icon";
	textClassName?: string;
	disabled?: boolean;
} & Omit<GlassProps, "children" | "variant" | "className" | "style">;

export const GlassButton: React.FC<GlassButtonProps> = ({
	children,
	onClick,
	className = "",
	variant = "default",
	size = "md",
	textClassName = "text-white font-semibold",
	disabled,
	...surfaceOverrides
}) => {
	return (
		<button
			className={cn(
				"relative inline-flex items-center justify-center cursor-pointer select-none",
				"transform active:scale-95 transition-transform duration-150 ease-in-out",
				"focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
				className,
			)}
			disabled={disabled}
			onClick={onClick}
		>
			<Glass
				className={cn(glassButtonSizes({ size }))}
				variant={variant}
				{...surfaceOverrides}
			>
				<span className={cn(textClassName)}>{children}</span>
			</Glass>
		</button>
	);
};

import { useCallback, useEffect, useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import BinAppIcon from "@/assets/appIcons/bin.png";
import CalendarAppIcon from "@/assets/appIcons/calendar.png";
import ContactAppIcon from "@/assets/appIcons/contact.png";
import FinderAppIcon from "@/assets/appIcons/finder.png";
import PhotosAppIcon from "@/assets/appIcons/photos.png";
import SafariAppIcon from "@/assets/appIcons/safari.png";
import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";

const INITIAL_DOCK_HEIGHT = 105;

export function Dock() {
	const { isDarkMode } = useDarkMode();

	const { height, resize, isDockResizing } = useResizeDock({
		initialHeight: INITIAL_DOCK_HEIGHT,
	});

	const { showTooltip, Tooltip } = useAppTooltip({ isDockResizing });
	return (
		<>
			<Tooltip />
			{/* Dock container */}
			<div
				className="overflow-hidden squircle-dock"
				style={{ height: `${height}px` }}
			>
				<Glass className="h-full!">
					<div
						className={cn("h-full", "bg-white/30", isDarkMode && "bg-black/10")}
					>
						{/*Apps */}
						<div className="flex items-center h-full gap-x-2 p-1.5 px-2.5">
							<RegularApps onHover={showTooltip} />
							<DockSeparator onMouseDown={resize} />
							<TrashApp onHover={showTooltip} />
						</div>
					</div>
				</Glass>
			</div>
		</>
	);
}

// ----------------------------------------------------------------
// 🖼️ Dock icons
type App = {
	id: string;
	name: string;
	icon: string;
};

const regularApps: App[] = [
	{ icon: FinderAppIcon, id: "finder", name: "Finder" },
	{ icon: SafariAppIcon, id: "safari", name: "Safari" },
	{ icon: CalendarAppIcon, id: "calendar", name: "Calendar" },
	{ icon: ContactAppIcon, id: "contact", name: "Contact" },
	{ icon: PhotosAppIcon, id: "photos", name: "Photos" },
];

const trashApp: App = {
	icon: BinAppIcon,
	id: "trash",
	name: "Trash",
};

function RegularApps({
	onHover,
}: {
	onHover: (el: HTMLElement | null, name: string) => void;
}) {
	return regularApps.map((app) => (
		<DockIcon
			alt={app.name}
			key={app.id}
			name={app.name}
			onHover={onHover}
			src={app.icon}
		/>
	));
}

function TrashApp({
	onHover,
}: {
	onHover: (el: HTMLElement | null, name: string) => void;
}) {
	return (
		<DockIcon
			alt="Trash"
			className="py-1.5"
			key={trashApp.id}
			name={trashApp.name}
			onHover={onHover}
			src={trashApp.icon}
		/>
	);
}

function DockIcon({
	src,
	alt,
	className,
	active = false,
	onHover,
	name,
}: {
	src: string;
	alt: string;
	className?: string;
	active?: boolean;
	onHover?: (el: HTMLElement | null, name: string) => void;
	name?: string;
}) {
	const ref = useRef<HTMLButtonElement>(null);

	return (
		<button
			className={cn(
				"h-full relative bg-transparent border-none p-0 cursor-default",
				"active:brightness-50 focus-within:outline-none",
				className,
			)}
			onMouseEnter={() => name && onHover?.(ref.current, name)}
			onMouseLeave={() => name && onHover?.(null, name)}
			ref={ref}
			type="button"
		>
			<img alt={alt} className="h-full" src={src} />
			<div
				className={cn(
					"absolute -bottom-[2px] w-[4px] h-[4px] rounded-full left-1/2 -translate-x-1/2",
					"bg-transparent",
					active && "bg-white/50",
				)}
			/>
		</button>
	);
}

// ----------------------------------------------------------------
// ℹ️ Dock tooltip

function DockTooltip({
	x,
	y,
	width,
	children,
}: {
	x: number;
	y: number;
	width: number;
	children: React.ReactNode;
}) {
	return (
		<div
			className="fixed z-50 pointer-events-none"
			style={{
				left: x + width / 2,
				top: y - 45, // Position above the icon
				transform: "translateX(-50%)",
			}}
		>
			<Glass>
				<div
					className={cn(
						"border-t-[0.5px] border-l-[0.5px] border-white/30",
						"px-3 py-[3px] text-sm text-white/90",
						"backdrop-blur-md rounded-full shadow-xl",
						"bg-white/60 text-black",
					)}
				>
					{children}
				</div>
			</Glass>
			{/* ⬇️ Arrow */}
			<div
				className={cn(
					"absolute size-2.5 border-r border-b border-white/10 rotate-45 left-1/2 -translate-x-1/2 -bottom-[4.5px]",
					"bg-white/60",
				)}
				style={{
					clipPath: "polygon(100% 100%, 0% 100%, 100% 0%)", // Only show bottom right half for border correctness
				}}
			/>
		</div>
	);
}

function useAppTooltip({ isDockResizing }: { isDockResizing: boolean }) {
	const [tooltipData, setTooltipData] = useState<{
		name: string;
		x: number;
		y: number;
		width: number;
	} | null>(null);

	if (isDockResizing && tooltipData) {
		setTooltipData(null);
	}

	const showTooltip = (el: HTMLElement | null, name: string) => {
		if (!el) {
			setTooltipData(null);
			return;
		}
		const rect = el.getBoundingClientRect();
		setTooltipData({
			name,
			width: rect.width,
			x: rect.left,
			y: rect.top,
		});
	};
	const Tooltip = useCallback(
		() =>
			tooltipData ? (
				<DockTooltip {...tooltipData}>{tooltipData.name}</DockTooltip>
			) : null,
		[tooltipData],
	);

	return { showTooltip, Tooltip };
}

// ----------------------------------------------------------------
// | Dock separator
function DockSeparator({
	onMouseDown,
}: {
	onMouseDown: (e: React.MouseEvent) => void;
}) {
	const { isDarkMode } = useDarkMode();
	const isLightMode = !isDarkMode;
	return (
		<button
			className="h-full px-2 flex items-center cursor-ns-resize touch-none outline-none bg-transparent border-none"
			onMouseDown={onMouseDown}
			type="button"
		>
			<div
				className={cn(
					"h-[87%] w-px",
					isLightMode && "bg-black/30",
					isDarkMode && "bg-white/20",
				)}
			/>
		</button>
	);
}

// ---------------------------------------------------------------
// ↕️ Dock resize
function useResizeDock({ initialHeight }: { initialHeight: number }) {
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

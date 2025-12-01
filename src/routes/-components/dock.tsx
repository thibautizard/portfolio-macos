import { useEffect, useRef, useState } from "react";
import BinAppIcon from "@/assets/appIcons/bin.png";
import CalendarAppIcon from "@/assets/appIcons/calendar.png";
import ContactAppIcon from "@/assets/appIcons/contact.png";
import FinderAppIcon from "@/assets/appIcons/finder.png";
import PhotosAppIcon from "@/assets/appIcons/photos.png";
import SafariAppIcon from "@/assets/appIcons/safari.png";
import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";

export function Dock() {
	const { height, handleMouseDown } = useResizeDock();

	return (
		<div
			className="overflow-hidden squircle-dock"
			style={{ height: `${height}px` }}
		>
			<Glass className="h-full!">
				<div className="flex items-center h-full gap-x-2 p-1.5 px-3">
					<DockIcon alt="Finder" src={FinderAppIcon} />
					<DockIcon alt="Safari" src={SafariAppIcon} />
					<DockIcon alt="Calendar" src={CalendarAppIcon} />
					<DockIcon alt="Contact" src={ContactAppIcon} />
					<DockIcon alt="Photos" src={PhotosAppIcon} />
					<DockSeparator onMouseDown={handleMouseDown} />
					<DockIcon alt="Trash" className="py-1.5" src={BinAppIcon} />
				</div>
			</Glass>
		</div>
	);
}

// ----------------------------------------------------------------
function DockIcon({
	src,
	alt,
	className,
	active = false,
}: {
	src: string;
	alt: string;
	className?: string;
	active?: boolean;
}) {
	return (
		<div className={cn("h-full relative", className)}>
			<img alt={alt} className="h-full" src={src} />
			<div
				className={cn(
					"absolute -bottom-[2px] w-[4px] h-[4px] rounded-full left-1/2 -translate-x-1/2",
					"bg-transparent",
					active && "bg-white/50",
				)}
			/>
		</div>
	);
}

// ----------------------------------------------------------------
function DockSeparator({
	onMouseDown,
}: {
	onMouseDown: (e: React.MouseEvent) => void;
}) {
	return (
		<button
			className="h-full px-2 flex items-center cursor-ns-resize touch-none outline-none bg-transparent border-none"
			onMouseDown={onMouseDown}
			type="button"
		>
			<div className="h-[85%] w-px bg-white/20" />
		</button>
	);
}

// ---------------------------------------------------------------
function useResizeDock() {
	const [height, setHeight] = useState(95);
	const [isResizing, setIsResizing] = useState(false);
	const startYRef = useRef<number>(0);
	const startHeightRef = useRef<number>(0);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsResizing(true);
		startYRef.current = e.clientY;
		startHeightRef.current = height;
	};

	useEffect(() => {
		if (!isResizing) return;

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
			setIsResizing(false);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			document.body.style.cursor = "";
		};
	}, [isResizing]);

	return { handleMouseDown, height };
}

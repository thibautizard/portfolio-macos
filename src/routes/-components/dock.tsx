import CalendarAppIcon from "@/assets/appIcons/calendar.png";
import ContactAppIcon from "@/assets/appIcons/contact.png";
import FinderAppIcon from "@/assets/appIcons/finder.png";
import PhotosAppIcon from "@/assets/appIcons/photos.png";
import SafariAppIcon from "@/assets/appIcons/safari.png";
import TrashAppIcon from "@/assets/appIcons/trash.png";
import { Glass } from "@/components/seraui/liquid-glass";
import { cn } from "@/lib/utils";

export function Dock() {
	return (
		<div className="h-[100px] overflow-hidden squircle-dock border border-white/10">
			<Glass className="h-full!">
				<div className="flex items-center h-full gap-x-2 p-1.5 px-3">
					<DockIcon alt="Finder" src={FinderAppIcon} />
					<DockIcon alt="Safari" src={SafariAppIcon} />
					<DockIcon alt="Calendar" src={CalendarAppIcon} />
					<DockIcon alt="Contact" src={ContactAppIcon} />
					<DockIcon alt="Photos" src={PhotosAppIcon} />
					<div className="h-[85%] mx-2 w-px bg-white/20" />
					<DockIcon alt="Trash" className="py-1" src={TrashAppIcon} />
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

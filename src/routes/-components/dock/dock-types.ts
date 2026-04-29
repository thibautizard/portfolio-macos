import BinAppIcon from "@/assets/appIcons/bin.png";
import CalendarAppIcon from "@/assets/appIcons/calendar.png";
import ContactAppIcon from "@/assets/appIcons/contact.png";
import FinderAppIcon from "@/assets/appIcons/finder.png";
import PhotosAppIcon from "@/assets/appIcons/photos.png";
import SafariAppIcon from "@/assets/appIcons/safari.png";

export const regularApps: App[] = [
	{ icon: FinderAppIcon, id: "finder", name: "Finder" },
	{ icon: SafariAppIcon, id: "safari", name: "Safari" },
	{ icon: CalendarAppIcon, id: "calendar", name: "Calendar" },
	{ icon: ContactAppIcon, id: "contact", name: "Contact" },
	{ icon: PhotosAppIcon, id: "photos", name: "Photos" },
];

export type App = {
	id: string;
	name: string;
	icon: string;
};

export const trashApp: App = {
	icon: BinAppIcon,
	id: "trash",
	name: "Trash",
};

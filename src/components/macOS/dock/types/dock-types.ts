import BinAppIcon from "@/assets/macOS/appIcons/bin.png";
import CalendarAppIcon from "@/assets/macOS/appIcons/calendar.png";
import ContactAppIcon from "@/assets/macOS/appIcons/contact.png";
import FinderAppIcon from "@/assets/macOS/appIcons/finder.png";
import PhotosAppIcon from "@/assets/macOS/appIcons/photos.png";
import SafariAppIcon from "@/assets/macOS/appIcons/safari.png";

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

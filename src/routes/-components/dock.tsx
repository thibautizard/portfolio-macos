import ContactAppIcon from "@/assets/appIcons/contact.png";
import FinderAppIcon from "@/assets/appIcons/finder.png";
import PhotosAppIcon from "@/assets/appIcons/photos.png";
import SafariAppIcon from "@/assets/appIcons/safari.png";
import TrashAppIcon from "@/assets/appIcons/trash.png";
import { Glass } from "@/components/seraui/liquid-glass";
export function Dock() {
	return (
		<div className="h-[100px] overflow-hidden squircle-dock">
			<Glass className="h-full!">
				<div className="flex items-center h-full gap-x-2 p-1.5 px-3">
					<img alt="Finder" className="h-full" src={FinderAppIcon} />
					<img alt="Safari" className="h-full" src={SafariAppIcon} />
					<img alt="Contact" className="h-full" src={ContactAppIcon} />
					<img alt="Photos" className="h-full" src={PhotosAppIcon} />
					<img alt="Trash" className="h-full py-1" src={TrashAppIcon} />
				</div>
			</Glass>
		</div>
	);
}

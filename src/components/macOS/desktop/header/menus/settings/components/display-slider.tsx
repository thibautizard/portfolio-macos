import { SunDimIcon, SunIcon } from "lucide-react";
import { GlassLong } from "./glass-long";
import { Slider } from "./slider";
export function DisplaySlider() {
	return (
		<GlassLong name="Display">
			<div className="flex gap-x-2 items-center">
				<SunDim />
				<Slider />
				<Sun />
			</div>
		</GlassLong>
	);
}

function SunDim() {
	return <SunDimIcon fill="white" size={20} />;
}
function Sun() {
	return <SunIcon fill="white" size={20} />;
}

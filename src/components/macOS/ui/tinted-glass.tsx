import { cn } from "cn";
import GlassSurface, {
	type GlassSurfaceProps,
} from "@/components/react-bits/glass-surface";
import "./tinted-glass.css";

const SATURATION = 0.8;

export function TintedGlass({ className, ...props }: GlassSurfaceProps) {
	return (
		<GlassSurface
			saturation={SATURATION}
			{...props}
			className={cn("tinted-glass", className)}
		/>
	);
}

import { cn } from "cn";
import type { RefObject } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsFinderOpen } from "@/store/slices/app-slice";
import { Window } from "../window";
import { Sidebar } from "./components/sidebar";

export function Finder({
	parentRef,
}: {
	parentRef: RefObject<HTMLDivElement | null>;
}) {
	const isOpen = useAppSelector(selectIsFinderOpen);

	return (
		<Window
			className={cn("h-200 w-300", "p-1.5")}
			isOpen={isOpen}
			parentRef={parentRef}
		>
			<Sidebar />
		</Window>
	);
}

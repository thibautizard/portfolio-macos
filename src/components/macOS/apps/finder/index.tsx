import type { RefObject } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsFinderOpen } from "@/store/slices/app-slice";
import { Sidebar } from "./components/sidebar";
import { Window } from "../window";
import { cn } from "cn";

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

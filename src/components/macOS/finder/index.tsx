import { cn } from "cn";
import { Sidebar } from "./components/sidebar";
export function Finder() {
  return (
    <Window>
      <Sidebar />
    </Window>
  );
}

// 📦
export function Window({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2",
        "h-200 w-300",
        "p-1.5",
        "rounded-3xl",
        "bg-[#1F212D]",
        "border-[#4D5057] border",
        "shadow-2xl",
        "flex flex-row",
      )}
    >
      {children}
    </div>
  );
}

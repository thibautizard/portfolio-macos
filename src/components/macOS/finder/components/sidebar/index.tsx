import { cn } from "cn";
import { ActionButtons } from "../action-buttons";
export function Sidebar() {
  return <Container>t</Container>;
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-[#1B1D25]",
        "border-[0.5px] border-neutral-600",
        "p-3",
        "w-50",
        "rounded-2xl",
      )}
    >
      <ActionButtons />
      {children}
    </div>
  );
}

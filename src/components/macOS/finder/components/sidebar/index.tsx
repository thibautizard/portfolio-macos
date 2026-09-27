import { cn } from "cn";

export function Sidebar() {
  return <Container>t</Container>;
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-[#1B1D25]",
        "border-[0.5px] border-[#72737A]",
        "p-3",
        "w-50",
        "rounded-2xl",
      )}
    >
      <TopButtons />
      {children}
    </div>
  );
}

function TopButtons() {
  return (
    <div className="flex gap-x-2.5 mb-4">
      <TopButton backgroundColor="#FF5C5F" onClick={() => {}} />
      <TopButton backgroundColor="#FAC800" onClick={() => {}} />
      <TopButton backgroundColor="#34C759" onClick={() => {}} />
    </div>
  );
}

function TopButton({
  onClick,
  backgroundColor,
}: {
  onClick: () => void;
  backgroundColor: string;
}) {
  return (
    <button
      type="button"
      className={cn("rounded-full bg-red-900 size-3.5")}
      style={{ backgroundColor }}
      onClick={onClick}
    ></button>
  );
}

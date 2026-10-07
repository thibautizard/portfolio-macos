import { cn } from "cn";
import { ActionButtons } from "../action-buttons";

export function Sidebar() {
  return (
    <Container>
      <Group>
        <GroupTitle>Favourites</GroupTitle>
        <GroupItems>
          <Item Icon={<DocumentIcon />}>Documents</Item>
        </GroupItems>
      </Group>
    </Container>
  );
}

// 📦
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

// 📦🆎
export function Group({ children }: { children: React.ReactNode }) {
  return <div className={cn("space-y-1.5")}>{children}</div>;
}

// 🆎
export function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("text-[#9799A0] font-bold text-[0.65rem]")}>
      {children}
    </div>
  );
}

export function GroupItems({ children }: { children: React.ReactNode }) {
  return <div className={cn("")}>{children}</div>;
}

// 🔠
export function Item({
  children,
  Icon,
}: {
  children: React.ReactNode;
  Icon: React.ReactNode;
}) {
  return (
    <div className={cn("flex gap-x-1.5 items-center")}>
      <div className="size-4.5">{Icon}</div>
      <span className="font-medium text-[0.82rem]">{children}</span>
      <div className="ml-auto size-5">
        <CloudIcon />
      </div>
    </div>
  );
}

// 📄
function DocumentIcon() {
  return (
    <svg
      className="size-full"
      height="512"
      viewBox="0 0 512 512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Document icon</title>
      <path
        d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M256 56v120a32 32 0 0 0 32 32h120"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}

// ☁️
function CloudIcon() {
  return (
    <svg
      className="size-full"
      fill="transparent"
      height="29"
      strokeWidth={3}
      viewBox="-10 -10 58 42"
      width="45"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cloud icon</title>
      <path
        d="M37.6019 28.498H7.53865C6.71866 28.498 0.929398 26.5335 0.519413 20.1326C0.191424 15.0118 4.1009 12.5124 6.09663 11.9028C5.90814 11.2551 5.99202 9.52534 7.83554 7.78795C10.1399 5.6162 13.1512 5.6162 15.4132 7.02354C18.9193 0.165411 25.856 0.0511045 28.6458 0.8155C31.6312 1.41321 37.6019 4.35887 37.3899 12.8172C39.3408 12.6315 44.706 14.5675 44.4939 21.3542C44.321 26.8852 38.7541 28.498 37.6019 28.498Z"
        stroke="#5C6069"
      />
    </svg>
  );
}

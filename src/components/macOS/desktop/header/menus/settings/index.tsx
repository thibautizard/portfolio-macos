import { cn } from "cn";
import { type RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { supportsLiquidGlass } from "./components/liquid-glass";
import { FallbackMenu } from "./components/menus/fallback-menu";
import { LiquidMenu } from "./components/menus/liquid-menu";

export function Settings() {
  const [isOpened, setIsOpened] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => setIsOpened(false);

  useOnClickOutside(
    containerRef as RefObject<HTMLDivElement>,
    handleClickOutside,
  );

  const Menu = supportsLiquidGlass ? (
    <LiquidMenu isOpened={isOpened} />
  ) : (
    <FallbackMenu isOpened={isOpened} />
  );

  return (
    <Container ref={containerRef}>
      <SettingsButton onClick={() => setIsOpened((o) => !o)} />
      {Menu}
    </Container>
  );
}

// 📦
export function Container({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return <div ref={ref}>{children}</div>;
}

// ⏹️
function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="size-fit grid place-items-center"
      onClick={onClick}
      type="button"
    >
      <SettingsIcon />
    </button>
  );
}

function SettingsIcon() {
  return (
    <div className={cn("size-3.5")}>
      <svg
        version="1.1"
        viewBox="0 0 18.619 18.4645"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>switch.2</title>
        <g>
          <rect height="18.4645" opacity="0" width="18.619" x="0" y="0" />
          <path
            d="M4.17281 18.4331L14.4379 18.4331C16.7529 18.4331 18.619 16.8156 18.619 14.4222C18.619 12.0288 16.7529 10.4114 14.4379 10.4114L4.17281 10.4114C1.85568 10.4114 0 12.0288 0 14.4222C0 16.8156 1.85568 18.4331 4.17281 18.4331ZM11.6064 16.9407C10.1666 16.9407 9.00083 15.9245 9.00083 14.4119C9.00083 12.9096 10.1666 11.8934 11.6064 11.8934L14.5976 11.8934C16.0498 11.8934 17.2031 12.9096 17.2031 14.4222C17.2031 15.9245 16.0498 16.9407 14.5976 16.9407Z"
            fill="white"
            fillOpacity="0.85"
          />
          <path
            d="M4.60261 8.90697L14.0081 8.90697C16.5635 8.90697 18.619 7.10877 18.619 4.45348C18.619 1.79819 16.5635 0 14.0081 0L4.60261 0C2.05756 0 0 1.79819 0 4.45348C0 7.10877 2.05756 8.90697 4.60261 8.90697ZM4.60261 7.42943C2.90713 7.42943 1.52929 6.2364 1.52929 4.45348C1.52929 2.67057 2.90713 1.47754 4.60261 1.47754L14.0081 1.47754C15.7118 1.47754 17.0814 2.67268 17.0814 4.45348C17.0814 6.23429 15.7118 7.42943 14.0081 7.42943Z"
            fill="white"
            fillOpacity="0.85"
          />
          <path
            d="M4.60261 6.76498L7.45104 6.76498C8.76657 6.76498 9.83921 5.83363 9.83921 4.45348C9.83921 3.06299 8.76657 2.13164 7.45104 2.13164L4.60261 2.13164C3.28497 2.13164 2.21444 3.06299 2.21444 4.44313C2.21444 5.83363 3.28497 6.76498 4.60261 6.76498Z"
            fill="white"
            fillOpacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}

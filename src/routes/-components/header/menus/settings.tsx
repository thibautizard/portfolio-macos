import { SunDimIcon, SunIcon } from "lucide-react";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import PlayIcon from "@/assets/icons/play.tsx";
import settingsIconsSrc from "@/assets/icons/settings.svg";
import GlassSurface from "@/components/react-bits/glass-surface";
import { cn } from "@/lib/utils";

const BACKGROUND_OPACITY = 0.17;

export function Settings() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <button
        className="size-fit grid place-items-center"
        onClick={() => setIsOpened((o) => !o)}
        type="button"
      >
        <SettingsIcon />
      </button>
      <div
        className={cn(
          "grid grid-cols-[repeat(2,140px)] grid-rows-[repeat(auto-fit,10px)] gap-4",
          "p-6",
          "fixed right-0 -z-1",
          //🤹 Animation
          "transition-all",
          "duration-300",
          isOpened ? "opacity-100 scale-100" : "opacity-0 scale-102",
        )}
      >
        <Background />
        <MusicPlayer />
        <MusicPlayer />
        <DisplaySlider />
        <VolumeSlider />
      </div>
    </div>
  );
}

// ----------------------------------------
function Background() {
  return (
    <div className="size-full absolute inset-0">
      {/* 🌫️ Blur */}
      <div
        className={cn(
          "absolute inset-0",
          "backdrop-blur-xs",
          "mask-y-from-80 mask-x-from-80",
        )}
      />
      {/* ⚫ Black */}
      <div
        className={cn(
          "absolute inset-0",
          "scale-200",
          "backdrop-blur-3xl",
          "bg-linear-to-r from-black/40 to-black/40",
          "mask-x-from-50 mask-y-from-50",
        )}
      />
    </div>
  );
}

// ----------------------------------------
function SettingsIcon() {
  return (
    <img
      alt="Settings"
      className={cn("size-3.75 relative invert")}
      src={settingsIconsSrc}
    />
  );
}
// -----------------------------------------
function MusicPlayer() {
  return (
    <div className="hover:bg-white/3 col-span-1 row-span-9 bg-transparent transition opacity-100">
      <GlassSquare>
        <div className="flex w-full px-1 flex-col justify-between h-full">
          <div className="size-10 rounded-md bg-white/20" />
          <div className="font-bold block text-xs">Not Playing</div>
          <div className="flex items-center self-center gap-x-4">
            <div className="flex scale-x-[-1] opacity-30">
              <PlayIcon className="size-4" />
              <PlayIcon className="-ml-0.75 size-4" />
            </div>
            <PlayIcon className="opacity-80" />
            <div className="flex opacity-30">
              <PlayIcon className="size-4" />
              <PlayIcon className="-ml-0.75 size-4" />
            </div>
          </div>
        </div>
      </GlassSquare>
    </div>
  );
}

// -----------------------------------------
function DisplaySlider() {
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

// -----------------------------------------
function VolumeSlider() {
  return (
    <GlassLong name="Sound">
      <div className="flex gap-x-2 items-center">
        <SoundEmpty />
        <div className="h-1 rounded-md grow bg-white" />
        <SoundFull />
      </div>
    </GlassLong>
  );
}

// -----------------------------------------
function GlassSquare({ children }: { children: React.ReactNode }) {
  return (
    <GlassSurface
      backgroundOpacity={BACKGROUND_OPACITY}
      borderRadius={42}
      className={cn(
        "py-2",
        "h-full! w-full!",
        "text-white",
        "border-white/15 border",
      )}
      style={{
        cornerShape: "superellipse(1.5)",
      }}
    >
      {children}
    </GlassSurface>
  );
}

// -----------------------------------------
function GlassLong({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <div className="col-span-2 group row-span-4">
      <GlassSurface
        backgroundOpacity={BACKGROUND_OPACITY}
        borderRadius={36}
        className={cn(
          "px-2 py-1",
          "h-full! w-full!",
          "text-white",
          "border-white/15 border",
        )}
        style={{
          cornerShape: "superellipse(1.5)",
        }}
      >
        <div className="text-[12.5px] font-bold flex flex-col gap-y-2 justify-start w-full">
          <div>{name}</div>
          {children}
        </div>
      </GlassSurface>
    </div>
  );
}

// -----------------------------------------
function Slider() {
  const { isDarkMode } = useDarkMode();
  const sliderRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(100);
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [handlerWidth, setHandlerWidth] = useState(0);
  const maxRight = sliderWidth - handlerWidth;

  useLayoutEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
    if (handlerRef.current) {
      setHandlerWidth(handlerRef.current.offsetWidth);
    }

    let initialX = (value * sliderWidth) / 100;
    if (initialX > maxRight) initialX = maxRight;
    x.set(initialX);
  }, [sliderWidth, value, x, maxRight]);

  useMotionValueEvent(x, "change", (latest) => {
    if (sliderWidth) {
      let newValue = (latest / sliderWidth) * 100;
      if (newValue < 0) newValue = 0;
      if (newValue > 100) newValue = 100;
      setValue(newValue);
    }
  });

  return (
    <div
      className={cn(
        "h-1 relative rounded-md grow",
        isDarkMode && "bg-[#173FAF]",
      )}
      ref={sliderRef}
    >
      <div
        className="bg-white rounded-md h-full"
        style={{ width: `${value}%` }}
      />
      <motion.button
        className={cn(
          "hidden",
          "group-hover:block",
          "absolute",
          "-translate-y-1/2 top-1/2",
        )}
        drag="x"
        dragConstraints={{ left: 0, right: maxRight }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        type="button"
      >
        <div
          className="w-5 rounded-full h-3.5 bg-white"
          ref={handlerRef}
          style={{
            cornerShape: "superellipse(1.3)",
          }}
        />
      </motion.button>
    </div>
  );
}

// -----------------------------------------
function SoundEmpty() {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sound Empty</title>
      <g fill="none">
        <path
          d="M4.158 13.93a3.75 3.75 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938S12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

// -----------------------------------------
function SoundFull() {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sound Full</title>
      <g fill="none">
        <path
          d="M4.158 13.93a3.75 3.75 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L9.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938S12 5.572 12 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L7.1 15.122a.45.45 0 0 0-.257-.153L5.15 14.63a1.5 1.5 0 0 1-.993-.7"
          fill="currentColor"
        />
        <path
          d="M14.536 8.464a5 5 0 0 1 .027 7.044m4.094-9.165a8 8 0 0 1 .044 11.27"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1"
        />
      </g>
    </svg>
  );
}

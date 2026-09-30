import { cn } from "cn";

export function ActionButtons() {
	return (
		<div className="group flex gap-x-2 mb-4">
			<CloseButton />
			<ReduceButton />
			<ExpandButton />
		</div>
	);
}

// 🚫
function CloseButton() {
	const accentColor = "#992128";
	const backgroundColor = "#FF5C5F";
	return (
		<TopButton
			accentColor={accentColor}
			backgroundColor={backgroundColor}
			Icon={<CloseIcon color={accentColor} />}
			onClick={() => {}}
		/>
	);
}

function CloseIcon({ color }: { color: string }) {
	return (
		<svg
			fill="none"
			height="8"
			viewBox="0 0 8 8"
			width="8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Close icon</title>
			<path
				d="M1 1L7 7M7 1L1 7"
				stroke={color}
				stroke-linecap="round"
				stroke-width="2"
			/>
		</svg>
	);
}

// ➖

function ReduceButton() {
	const accentColor = "#986700";
	const backgroundColor = "#FAC800";

	return (
		<TopButton
			accentColor={accentColor}
			backgroundColor={backgroundColor}
			Icon={<ReduceIcon color={accentColor} />}
			onClick={() => {}}
		/>
	);
}

function ReduceIcon({ color }: { color: string }) {
	return (
		<svg
			fill="none"
			height="2"
			viewBox="0 0 8 2"
			width="8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Reduce icon</title>
			<path d="M0 1H8" stroke={color} stroke-width="2" />
		</svg>
	);
}

function ExpandButton() {
	const accentColor = "#187039";
	const backgroundColor = "#34C759";
	return (
		<TopButton
			accentColor={accentColor}
			backgroundColor={backgroundColor}
			Icon={<ExpandIcon color={accentColor} />}
			onClick={() => {}}
		/>
	);
}

function ExpandIcon({ color }: { color: string }) {
	return (
		<svg
			fill="none"
			height="7"
			viewBox="0 0 7 7"
			width="7"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Expand icon</title>
			<path
				d="M5.1819 5.16941L3.76953 5.1709L5.18042 3.75704L5.1819 5.16941Z"
				stroke={color}
				stroke-linecap="round"
				stroke-width="2.5"
			/>
			<path
				d="M1.25561 1.26506L2.66797 1.26025L1.26042 2.67743L1.25561 1.26506Z"
				stroke={color}
				stroke-linecap="round"
				stroke-width="2.5"
			/>
		</svg>
	);
}

function TopButton({
	onClick,
	backgroundColor,
	accentColor,
	Icon,
}: {
	onClick: () => void;
	backgroundColor: string;
	accentColor: string;
	Icon: React.ReactNode;
}) {
	return (
		<button
			className={cn(
				"rounded-full size-4 border-[0.5px] grid place-items-center",
			)}
			onClick={onClick}
			style={{ backgroundColor, borderColor: accentColor }}
			type="button"
		>
			<div className="hidden group-hover:block">{Icon}</div>
		</button>
	);
}

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
	color?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({
	color = "currentColor",
	...props
}) => (
	<svg
		height="24"
		viewBox="0 0 24 24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Play</title>
		<path
			d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
			fill={color}
		/>
	</svg>
);

export default PlayIcon;

import { formatDateForHeader } from "@/components/macOS/desktop/header/utils";
import { useLiveDate } from "@/hooks/use-live-date";

export function Time() {
	const { liveDate } = useLiveDate();
	const { formattedDate, formattedTime } = formatDateForHeader(liveDate);

	return (
		<div className="flex items-center gap-x-2">
			<div className="capitalize">{formattedDate}</div>
			<div>{formattedTime}</div>
		</div>
	);
}

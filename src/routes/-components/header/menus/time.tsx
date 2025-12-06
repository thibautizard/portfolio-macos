import { useLiveDate } from "@/hooks/use-live-date";
import { formatDateForHeader } from "@/routes/-utils/format-date-for-header";

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

export function formatDateForHeader(date: Date) {
	const formatterDate = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		weekday: "short",
	});

	const formatterTime = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		hourCycle: "h24",
		minute: "numeric",
	});

	const formattedDate = formatterDate.format(date);
	const formattedTime = formatterTime.format(date);

	return {
		formattedDate,
		formattedTime,
	};
}

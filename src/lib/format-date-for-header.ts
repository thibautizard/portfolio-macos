export function formatDateForHeader(date: Date) {
	const locale =
		typeof navigator !== "undefined" ? navigator.language : undefined;

	const weekdayFormatter = new Intl.DateTimeFormat(locale, {
		weekday: "short",
	});
	const dayFormatter = new Intl.DateTimeFormat(locale, { day: "numeric" });
	const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });

	const formatterTime = new Intl.DateTimeFormat(locale, {
		hour: "numeric",
		hourCycle: "h24",
		minute: "numeric",
	});

	const formattedDate = `${weekdayFormatter.format(date)} ${dayFormatter.format(date)} ${monthFormatter.format(date)}`;
	const formattedTime = formatterTime.format(date);

	return {
		formattedDate,
		formattedTime,
	};
}

export function formatDateForHeader(date: Date) {
  const locale =
    typeof navigator !== "undefined" ? navigator.language : undefined;

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
  });
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });

  const formatterTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    hourCycle: "h24",
    minute: "numeric",
  });

  const weekDayFormatted = removePointAtTheEnd(weekdayFormatter.format(date));
  const dayFormatted = removePointAtTheEnd(dayFormatter.format(date));
  const monthFormatted = removePointAtTheEnd(monthFormatter.format(date));

  const formattedDate = `${weekDayFormatted} ${dayFormatted} ${monthFormatted}`;
  const formattedTime = formatterTime.format(date);

  return {
    formattedDate,
    formattedTime,
  };
}

function removePointAtTheEnd(str: string) {
  return str.replace(/\.$/, "");
}

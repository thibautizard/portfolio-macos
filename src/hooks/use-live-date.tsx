import { useEffect, useState } from "react";

const ONE_MINUTE = 1000 * 60;
export function useLiveDate() {
	const [liveDate, setLiveDate] = useState(new Date());

	useEffect(() => {
		const nextMinute = new Date();
		nextMinute.setMinutes(nextMinute.getMinutes() + 1, 0, 0);
		const delta = nextMinute.getTime() - Date.now();

		let timeoutId: ReturnType<typeof setTimeout>;
		let intervalId: ReturnType<typeof setInterval>;

		function addOneMinute() {
			setLiveDate((prevDate) => {
				const newDate = new Date(prevDate);
				newDate.setMinutes(newDate.getMinutes() + 1);
				return newDate;
			});
		}

		timeoutId = setTimeout(() => {
			addOneMinute();
			intervalId = setInterval(addOneMinute, ONE_MINUTE);
		}, delta);

		return () => {
			clearTimeout(timeoutId);
			clearInterval(intervalId);
		};
	}, []);
	return { liveDate };
}

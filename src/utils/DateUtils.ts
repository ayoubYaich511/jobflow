// Date utility functions
import { differenceInYears, format } from "date-fns";

export class DateUtils {
	static getAge(birthDate: Date, currentDate: Date): number {
		return differenceInYears(currentDate, birthDate);
	}

	static formatToMMDDYYYY(date: Date): string {
		return format(date, "MM/dd/yyyy");
	}

	static formatToDDMMYYYY(date: Date): string {
		return format(date, "dd/MM/yyyy");
	}

	static formatToYYYYMMDD(date: Date): string {
		return format(date, "yyyy-MM-dd");
	}

	static isToday(date: Date): boolean {
		const today = new Date();
		return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
	}

	static isTomorrow(date: Date): boolean {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return format(date, "yyyy-MM-dd") === format(tomorrow, "yyyy-MM-dd");
	}

	static isYesterday(date: Date): boolean {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return format(date, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd");
	}

	static getRelativeTime(date: Date): string {
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60),
		);

		if (diffInMinutes < 1) {
			return "just now";
		} else if (diffInMinutes < 60) {
			return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
		} else if (diffInMinutes < 1440) {
			const hours = Math.floor(diffInMinutes / 60);
			return `${hours} hour${hours === 1 ? "" : "s"} ago`;
		} else {
			const days = Math.floor(diffInMinutes / 1440);
			return `${days} day${days === 1 ? "" : "s"} ago`;
		}
	}
}


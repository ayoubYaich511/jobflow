// Mock i18n setup
import { translations } from "@/config/translations";

export const useTranslation = () => {
	const t = (key: string, options?: Record<string, any>) => {
		const keys = key.split(".");
		let value: any = translations.en;

		for (const k of keys) {
			value = value?.[k];
		}

		if (typeof value === "string" && options) {
			return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
				return options[key] || match;
			});
		}

		return value || key;
	};

	return {
		t,
		i18n: {
			language: "en",
		},
	};
};


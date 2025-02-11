import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en-US/translation.json";
import translationZh from "./locales/zh-HK/translation.json";

export const loadLanguage = (language: string) => {
	const resources = {
		"en-US": { translation: translationEn },
		"zh-HK": { translation: translationZh }
	};

	i18n.use(initReactI18next).init({
		// compatibilityJSON: "v3",
		resources,
		lng: language,
		fallbackLng: "zh-HK",
		interpolation: {
			escapeValue: false, 
		},
	});
};

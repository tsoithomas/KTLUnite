import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-US/translation.json";
import translationZh from "./locales/zh-HK/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "zh-HK": { translation: translationZh }
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    // compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "zh-HK",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
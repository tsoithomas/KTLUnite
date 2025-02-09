import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadLanguage } from "./loadLangage";

const initI18n = async () => {
	let language = await AsyncStorage.getItem("language");
	loadLanguage(language ?? 'Localization.locale');
};

initI18n();

export default i18n;
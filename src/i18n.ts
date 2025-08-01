import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import enTranslation from "./translator/en.json";
import viTranslation from "./translator/vi.json";

const resources = {
    en: {
        translation: enTranslation,
    },
    vi: {
        translation: viTranslation,
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

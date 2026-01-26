import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export const supportedLngs = ["br", "en", "es", "fr", "de", "it", "jp"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "br",
    supportedLngs: supportedLngs,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupLocalStorage: "language",
      caches: [],

      convertDetectedLanguage: (lng) => {
        const code = lng.toLowerCase();
        if (code.startsWith("pt")) return "br";
        if (code.startsWith("en")) return "en";
        if (code.startsWith("es")) return "es";
        if (code.startsWith("fr")) return "fr";
        if (code.startsWith("it")) return "it";
        if (code.startsWith("de")) return "de";
        if (code.startsWith("ja")) return "jp";
        return code;
      },
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;

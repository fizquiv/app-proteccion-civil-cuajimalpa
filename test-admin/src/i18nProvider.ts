import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "./spanishMessages";

export const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "es") return spanishMessages;
    return spanishMessages; // fallback
  },
  "es", // idioma por defecto
);

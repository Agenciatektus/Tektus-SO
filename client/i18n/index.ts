import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "./locales/pt-BR/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "pt-BR": { translation: ptBR },
      en: { translation: en },
    },
    lng: "pt-BR", // ✅ força o idioma padrão
    fallbackLng: "pt-BR", // ✅ fallback também é pt-BR
    detection: {
      order: ["localStorage", "navigator"],
      caches: [], // ✅ desativa o cache para garantir pt-BR fixo
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

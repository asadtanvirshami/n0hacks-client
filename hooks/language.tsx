"use client";

import React, { createContext, useContext, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

import en from "../public/locales/en.json";
import es from "../public/locales/es.json";
import fr from "../public/locales/fr.json";

type SupportedLanguage = "en" | "es" | "fr";

const flagMap: Record<SupportedLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
};

const messages = {
  en,
  es,
  fr,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  flag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") as SupportedLanguage | null;
      if (storedLang && messages[storedLang]) {
        return storedLang;
      }

      const browserLang = (navigator.language || "en").slice(0, 2) as SupportedLanguage;
      if (messages[browserLang]) {
        return browserLang;
      }
    }

    return "en";
  });

  const setLanguage = (lang: SupportedLanguage) => {
    localStorage.setItem("lang", lang);
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    flag: flagMap[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      <NextIntlClientProvider locale={language} messages={messages[language]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

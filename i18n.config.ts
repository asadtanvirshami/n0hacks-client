export const i18nConfig = {
  locales: ["en", "es", "fr"],
  defaultLocale: "en",
  localeDetection: true,
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

type MessagesLoader = () => Promise<Record<string, any>>;

export const dictionaries: { [K in Locale]: MessagesLoader } = {
  en: () => import("@/public/locales/en.json").then((module) => module.default),
  es: () => import("@/public/locales/es.json").then((module) => module.default),
  fr: () => import("@/public/locales/fr.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

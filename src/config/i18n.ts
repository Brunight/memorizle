export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const localeNames = {
  en: "English",
  pt: "Português",
} as const;

// Used for og/twitter metadata
export const localeLabels = {
  en: "en_US",
  pt: "pt_BR",
} as const;

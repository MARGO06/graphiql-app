export type Locale = (typeof locales)[number];

export const locales = ['en', 'es', 'pl', 'fr', 'it'] as const;
export const defaultLocale: Locale = 'en';

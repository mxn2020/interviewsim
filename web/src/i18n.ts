// i18n configuration for InterviewSim
const translations = {
    en: { appName: 'InterviewSim', description: 'Simulates job interviews with custom Q and As' },
    de: { appName: 'InterviewSim', description: 'Simulates job interviews with custom Q and As (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations

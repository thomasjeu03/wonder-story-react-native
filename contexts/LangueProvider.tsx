import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../languages/en.json';
import fr from '../languages/fr.json';
import de from '../languages/de.json';
import it from '../languages/it.json';

// Define the shape of translations
interface Translations {
    en: Record<string, string>;
    fr: Record<string, string>;
    de: Record<string, string>;
    it: Record<string, string>;
}

// Define available translations
// @ts-ignore
const translations: Translations = { en, fr, de, it };

// Initialize i18n
const i18n = new I18n(translations);
i18n.enableFallback = true;

// Set the locale, default to 'en' if no match is found
const preferredLocale = getLocales()[0]?.languageCode || 'en';
i18n.locale = preferredLocale in translations ? preferredLocale as keyof Translations : 'en';

interface TranslationContextType {
    t: (key: string) => string; // Function signature for translation
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
    children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
    const value = useMemo(() => ({
        t: (key: string) => i18n.translate(key.toLowerCase()),
    }), []);

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
};

// Custom hook to use the translations context
export const useTranslations = (): TranslationContextType => {
    const context = useContext(TranslationContext);

    if (!context) {
        throw new Error('useTranslations must be used within a TranslationProvider');
    }

    return context;
};
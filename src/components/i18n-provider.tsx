
'use client';

import { createContext, useState, useCallback, ReactNode } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

type Locale = 'en' | 'es';

type Translations = { [key: string]: string };

const translations: { [key in Locale]: Translations } = {
  en,
  es,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

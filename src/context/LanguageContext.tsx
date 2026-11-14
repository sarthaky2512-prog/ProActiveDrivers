import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTranslations } from '../i18n/translations';
import type { ConfigurableBenefit, Language, SiteLocationConfig } from '../types/site';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ReturnType<typeof getTranslations>;
  siteLocation: SiteLocationConfig;
  benefits: ConfigurableBenefit[];
  configLoaded: boolean;
}

const DEFAULT_LOCATION: SiteLocationConfig = {
  name: 'Proactive Drivers United Legal Help — National Support Hub',
  address: 'San Antonio, TX 78205, United States',
  lat: 29.4241,
  lng: -98.4936,
  phone: '800-791-8385',
  whatsapp: '210-361-0296',
  email: 'unite@proactivedrivers.com',
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('pdlh_lang');
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'en';
  });

  const [siteLocation, setSiteLocation] = useState<SiteLocationConfig>(DEFAULT_LOCATION);
  const [benefits, setBenefits] = useState<ConfigurableBenefit[]>([]);
  const [configLoaded, setConfigLoaded] = useState(false);

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pdlh_lang', next);
      document.documentElement.lang = next;
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    let active = true;
    fetch('/api/site-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.ok) return;
        if (data.location) setSiteLocation(data.location);
        if (Array.isArray(data.benefits)) setBenefits(data.benefits);
        setConfigLoaded(true);
      })
      .catch(() => {
        if (active) setConfigLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const t = getTranslations(lang);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, siteLocation, benefits, configLoaded }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

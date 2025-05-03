
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'ar' | 'en';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Common translations used across the site
const translations: Translations = {
  home: {
    ar: 'الرئيسية',
    en: 'Home'
  },
  movies: {
    ar: 'الأفلام',
    en: 'Movies'
  },
  series: {
    ar: 'المسلسلات',
    en: 'Series'
  },
  categories: {
    ar: 'التصنيفات',
    en: 'Categories'
  },
  search: {
    ar: 'بحث',
    en: 'Search'
  },
  login: {
    ar: 'تسجيل الدخول',
    en: 'Login'
  },
  register: {
    ar: 'إنشاء حساب',
    en: 'Register'
  },
  watchNow: {
    ar: 'شاهد الآن',
    en: 'Watch Now'
  },
  download: {
    ar: 'تحميل',
    en: 'Download'
  },
  latestMovies: {
    ar: 'أحدث الأفلام',
    en: 'Latest Movies'
  },
  featuredMovies: {
    ar: 'أفلام مميزة',
    en: 'Featured Movies'
  },
  topRated: {
    ar: 'الأعلى تقييماً',
    en: 'Top Rated'
  },
  year: {
    ar: 'السنة',
    en: 'Year'
  },
  genre: {
    ar: 'النوع',
    en: 'Genre'
  },
  rating: {
    ar: 'التقييم',
    en: 'Rating'
  },
  language: {
    ar: 'اللغة',
    en: 'Language'
  },
  quality: {
    ar: 'الجودة',
    en: 'Quality'
  },
  duration: {
    ar: 'المدة',
    en: 'Duration'
  },
  cast: {
    ar: 'طاقم العمل',
    en: 'Cast'
  },
  director: {
    ar: 'المخرج',
    en: 'Director'
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  const isRTL = language === 'ar';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

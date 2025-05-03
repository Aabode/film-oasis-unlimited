
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Menu, X, Film, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-dark-charcoal/80 border-b border-white/10",
      isRTL ? "font-arabic" : "font-sans"
    )}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <Film size={24} className="text-primary-purple" />
          <span className="text-xl font-semibold">Film Oasis</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={cn(
          "hidden md:flex items-center gap-6",
          isRTL ? "font-arabic" : "font-sans",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          <Link to="/" className="text-white hover:text-primary-purple transition-colors">
            {t('home')}
          </Link>
          <Link to="/movies" className="text-white hover:text-primary-purple transition-colors">
            {t('movies')}
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-white hover:text-primary-purple transition-colors">
              {t('categories')}
              <ChevronDown size={16} />
            </button>
            <div className="absolute top-full -left-4 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-dark-purple border border-white/10 rounded-md shadow-lg p-2 backdrop-blur-lg">
                <Link to="/categories/action" className="block px-4 py-2 text-sm hover:bg-primary-purple/20 rounded">
                  {language === 'en' ? 'Action' : 'أكشن'}
                </Link>
                <Link to="/categories/drama" className="block px-4 py-2 text-sm hover:bg-primary-purple/20 rounded">
                  {language === 'en' ? 'Drama' : 'دراما'}
                </Link>
                <Link to="/categories/comedy" className="block px-4 py-2 text-sm hover:bg-primary-purple/20 rounded">
                  {language === 'en' ? 'Comedy' : 'كوميديا'}
                </Link>
                <Link to="/categories" className="block px-4 py-2 text-sm font-medium text-primary-purple hover:bg-primary-purple/20 rounded">
                  {language === 'en' ? 'View All' : 'عرض الكل'}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className={cn(
          "flex items-center gap-4",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          {/* Search button */}
          <button 
            onClick={toggleSearch}
            className="p-2 text-white hover:text-primary-purple transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          {/* Language toggle */}
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 text-sm border border-white/10 rounded-full text-white hover:border-primary-purple/50 hover:text-primary-purple transition-all"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          
          {/* Login button - desktop */}
          <Link 
            to="/login" 
            className="hidden md:block px-4 py-1.5 bg-primary-purple hover:bg-primary-purple/90 text-white rounded-md transition-colors"
          >
            {t('login')}
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-primary-purple transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-dark-charcoal/95 backdrop-blur-lg",
        isOpen ? "block" : "hidden",
        isRTL ? "font-arabic text-right" : "font-sans text-left"
      )}>
        <nav className="container mx-auto px-4 py-3 flex flex-col gap-2">
          <Link 
            to="/"
            className="py-2 text-white hover:text-primary-purple border-b border-white/10"
            onClick={() => setIsOpen(false)}
          >
            {t('home')}
          </Link>
          <Link 
            to="/movies"
            className="py-2 text-white hover:text-primary-purple border-b border-white/10"
            onClick={() => setIsOpen(false)}
          >
            {t('movies')}
          </Link>
          <Link 
            to="/categories"
            className="py-2 text-white hover:text-primary-purple border-b border-white/10"
            onClick={() => setIsOpen(false)}
          >
            {t('categories')}
          </Link>
          <Link 
            to="/login"
            className="py-2 text-white hover:text-primary-purple border-b border-white/10"
            onClick={() => setIsOpen(false)}
          >
            {t('login')}
          </Link>
        </nav>
      </div>

      {/* Search overlay */}
      <div className={cn(
        "absolute inset-x-0 top-16 bg-dark-charcoal/95 backdrop-blur-lg transition-all duration-300 overflow-hidden border-b border-white/10",
        isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
      )}>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative w-full" dir={isRTL ? "rtl" : "ltr"}>
            <input
              type="text"
              placeholder={t('search')}
              className={cn(
                "w-full bg-dark-purple/50 border border-white/10 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple/50",
                isRTL ? "pr-10" : "pl-10"
              )}
            />
            <Search 
              size={16} 
              className={cn(
                "absolute text-white/60 top-1/2 -translate-y-1/2",
                isRTL ? "right-3" : "left-3"
              )} 
            />
            <button 
              onClick={toggleSearch}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-white/60 hover:text-white",
                isRTL ? "left-3" : "right-3"
              )}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

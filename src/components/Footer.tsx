
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const { t, language, isRTL } = useLanguage();
  
  return (
    <footer className={cn(
      "bg-dark-purple/50 backdrop-blur-sm border-t border-white/10 pt-12 pb-6",
      isRTL ? "font-arabic" : "font-sans"
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-4 gap-8 mb-10",
          isRTL && "text-right"
        )}>
          {/* Logo and about */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-4" dir={isRTL ? "rtl" : "ltr"}>
              <Film size={24} className="text-primary-purple" />
              <span className="text-xl font-semibold">Film Oasis</span>
            </Link>
            <p className="text-white/70 text-sm mb-4">
              {language === 'en' 
                ? 'Your ultimate destination for free movie streaming and downloads with multiple language support.'
                : 'وجهتك النهائية لبث وتنزيل الأفلام المجانية مع دعم متعدد اللغات.'
              }
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-dark-charcoal/70 text-white/80 hover:text-primary-purple rounded-full transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-dark-charcoal/70 text-white/80 hover:text-primary-purple rounded-full transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-dark-charcoal/70 text-white/80 hover:text-primary-purple rounded-full transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-dark-charcoal/70 text-white/80 hover:text-primary-purple rounded-full transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className={cn(
              "space-y-2",
              isRTL && "text-right"
            )}>
              <li>
                <Link to="/" className="text-white/70 hover:text-primary-purple transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-white/70 hover:text-primary-purple transition-colors">
                  {t('movies')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-white/70 hover:text-primary-purple transition-colors">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-primary-purple transition-colors">
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white/70 hover:text-primary-purple transition-colors">
                  {t('register')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">
              {language === 'en' ? 'Categories' : 'التصنيفات'}
            </h3>
            <ul className={cn(
              "space-y-2",
              isRTL && "text-right"
            )}>
              <li>
                <Link to="/categories/action" className="text-white/70 hover:text-primary-purple transition-colors">
                  {language === 'en' ? 'Action' : 'أكشن'}
                </Link>
              </li>
              <li>
                <Link to="/categories/comedy" className="text-white/70 hover:text-primary-purple transition-colors">
                  {language === 'en' ? 'Comedy' : 'كوميديا'}
                </Link>
              </li>
              <li>
                <Link to="/categories/drama" className="text-white/70 hover:text-primary-purple transition-colors">
                  {language === 'en' ? 'Drama' : 'دراما'}
                </Link>
              </li>
              <li>
                <Link to="/categories/scifi" className="text-white/70 hover:text-primary-purple transition-colors">
                  {language === 'en' ? 'Science Fiction' : 'خيال علمي'}
                </Link>
              </li>
              <li>
                <Link to="/categories/horror" className="text-white/70 hover:text-primary-purple transition-colors">
                  {language === 'en' ? 'Horror' : 'رعب'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </h3>
            <ul className={cn(
              "space-y-3",
              isRTL && "text-right"
            )}>
              <li className={cn(
                "flex gap-2 text-white/70",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}>
                <Mail size={18} className="text-primary-purple shrink-0" />
                <span>support@filmoasis.com</span>
              </li>
              <li className={cn(
                "flex gap-2 text-white/70",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}>
                <Phone size={18} className="text-primary-purple shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className={cn(
                "flex gap-2 text-white/70",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}>
                <MapPin size={18} className="text-primary-purple shrink-0" />
                <span>
                  {language === 'en' 
                    ? '123 Movie Street, Cinema City'
                    : '١٢٣ شارع الأفلام، مدينة السينما'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center text-white/60 text-sm">
          <p>
            {language === 'en' 
              ? '© 2024 Film Oasis. All rights reserved.'
              : '© ٢٠٢٤ واحة الأفلام. جميع الحقوق محفوظة.'
            }
          </p>
          <p className="mt-2">
            {language === 'en'
              ? 'Disclaimer: All content and materials are property of their respective owners.'
              : 'تنويه: جميع المحتويات والمواد هي ملك لأصحابها المعنيين.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
}

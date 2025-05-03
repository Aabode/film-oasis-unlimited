import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-4">
          <div className="text-primary-purple text-9xl font-bold mb-4">404</div>
          <h1 className={cn(
            "text-3xl font-bold text-white mb-6",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === 'en' ? 'Oops! Page not found' : 'عفواً! الصفحة غير موجودة'}
          </h1>
          <p className={cn(
            "text-white/70 max-w-md mx-auto mb-8",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === 'en' 
              ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
              : 'الصفحة التي تبحث عنها قد تمت إزالتها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتًا.'
            }
          </p>
          <Link 
            to="/" 
            className="primary-button inline-flex items-center justify-center"
          >
            {language === 'en' ? 'Return to Home' : 'العودة للصفحة الرئيسية'}
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

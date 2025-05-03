
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/data/mockMovies';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export function MovieSection({ title, movies, viewAllLink }: MovieSectionProps) {
  const { isRTL } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRTL ? 300 : -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRTL ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between mb-6",
          isRTL && "flex-row-reverse"
        )}>
          <h2 className={cn(
            "text-2xl font-bold text-white",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {title}
          </h2>
          
          <div className={cn(
            "flex items-center gap-4",
            isRTL && "flex-row-reverse"
          )}>
            {viewAllLink && (
              <Link 
                to={viewAllLink} 
                className="text-sm text-primary-purple hover:text-primary-purple/80"
              >
                {isRTL ? 'عرض الكل' : 'View All'}
              </Link>
            )}
            
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft} 
                className="p-2 rounded-full bg-dark-purple/70 hover:bg-primary-purple/30 text-white transition-colors"
                aria-label={isRTL ? "Next" : "Previous"}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={scrollRight} 
                className="p-2 rounded-full bg-dark-purple/70 hover:bg-primary-purple/30 text-white transition-colors"
                aria-label={isRTL ? "Previous" : "Next"}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          ref={scrollRef} 
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              className="min-w-[180px] md:min-w-[220px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

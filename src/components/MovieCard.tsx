import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const { language, t, isRTL } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={cn(
        "movie-card group block relative overflow-hidden transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {/* Poster Image */}
        <img 
          src={movie.posterUrl} 
          alt={language === 'en' ? movie.titleEn : movie.titleAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/80 via-transparent to-transparent opacity-100" />
        
        {/* Year Badge */}
        <div className="absolute top-2 right-2 bg-primary-purple/90 text-white text-xs font-semibold py-1 px-2 rounded">
          {movie.year}
        </div>
        
        {/* Rating */}
        <div className="absolute top-2 left-2 flex items-center bg-dark-charcoal/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded">
          <Star size={12} className="text-yellow-400 mr-1" />
          <span>{movie.rating}</span>
        </div>

        {/* Info at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-3 z-10">
          <h3 className={cn(
            "text-white font-semibold mb-1 line-clamp-1",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === 'en' ? movie.titleEn : movie.titleAr}
          </h3>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 items-center">
            {(language === 'en' ? movie.genresEn : movie.genresAr).slice(0, 2).map((genre, idx) => (
              <span key={idx} className="text-white/80 text-xs">
                {genre}{idx < Math.min(2, (language === 'en' ? movie.genresEn : movie.genresAr).length) - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </div>
        
        {/* Play Button Overlay (appears on hover) */}
        <div className={cn(
          "absolute inset-0 bg-dark-purple/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="w-12 h-12 rounded-full bg-primary-purple flex items-center justify-center neon-glow">
            <Play size={24} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

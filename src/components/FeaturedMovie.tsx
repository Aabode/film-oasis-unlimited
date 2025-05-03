
import { Link } from 'react-router-dom';
import { Play, Clock, Star, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import type { Movie } from '@/data/mockMovies';

interface FeaturedMovieProps {
  movie: Movie;
}

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
  const { language, t, isRTL } = useLanguage();
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl movie-card-featured">
      {/* Backdrop Image */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img 
          src={movie.backdropUrl} 
          alt={language === 'en' ? movie.titleEn : movie.titleAr}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-dark-charcoal/70 to-transparent" />
      </div>
      
      {/* Content overlay */}
      <div 
        className={cn(
          "absolute bottom-0 inset-x-0 p-6 md:p-10",
          isRTL ? "text-right" : "text-left"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Poster */}
            <div className="hidden md:block w-48 h-72 rounded-lg overflow-hidden shadow-xl flex-shrink-0">
              <img 
                src={movie.posterUrl} 
                alt={language === 'en' ? movie.titleEn : movie.titleAr}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded bg-primary-purple/90 text-white text-xs font-bold">
                  {movie.quality[movie.quality.length - 1]} • {movie.year}
                </span>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} className="mr-1" />
                  <span className="text-sm font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{movie.duration}</span>
                </div>
              </div>
              
              <h1 className={cn(
                "text-4xl md:text-5xl font-bold text-white mb-4 leading-tight",
                isRTL ? "font-arabic" : "font-sans"
              )}>
                {language === 'en' ? movie.titleEn : movie.titleAr}
              </h1>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {(language === 'en' ? movie.genresEn : movie.genresAr).map((genre, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-full bg-dark-purple/50 text-white/90 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className={cn(
                "text-white/80 mb-6 max-w-2xl line-clamp-3",
                isRTL ? "font-arabic" : "font-sans"
              )}>
                {language === 'en' ? movie.descriptionEn : movie.descriptionAr}
              </p>
              
              <div className={cn(
                "flex gap-4",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}>
                <Link 
                  to={`/movie/${movie.id}`} 
                  className="primary-button flex items-center gap-2"
                >
                  <Play size={18} />
                  <span>{t('watchNow')}</span>
                </Link>
                <Link 
                  to={`/movie/${movie.id}/download`} 
                  className="secondary-button flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>{t('download')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

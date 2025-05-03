import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { cn } from '@/lib/utils';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Movie, transformAPIMovie } from '@/types/movie';

export default function MoviesPage() {
  const { language, t, isRTL } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        const transformedMovies = data.map((movie: any) => transformAPIMovie(movie));
        setMovies(transformedMovies);
        setFilteredMovies(transformedMovies);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  
  const resetFilters = () => {
    setSelectedGenre('');
    setSelectedYear(null);
    setSelectedQuality('');
    setSortBy('latest');
    setFilteredMovies([...movies]);
  };
  
  const applyFilters = () => {
    let result = [...movies];
    
    // Apply genre filter
    if (selectedGenre) {
      result = result.filter(movie => 
        language === 'en' 
          ? movie.genresEn.includes(selectedGenre)
          : movie.genresAr.includes(selectedGenre)
      );
    }
    
    // Apply year filter
    if (selectedYear) {
      result = result.filter(movie => movie.year === selectedYear);
    }
    
    // Apply quality filter
    if (selectedQuality) {
      result = result.filter(movie => movie.quality.includes(selectedQuality));
    }
    
    // Apply sorting
    if (sortBy === 'latest') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredMovies(result);
    // Close filter sidebar on mobile after applying
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-white">
            {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between mb-8",
            isRTL && "flex-row-reverse"
          )}>
            <h1 className={cn(
              "text-3xl font-bold text-white",
              isRTL ? "font-arabic" : "font-sans"
            )}>
              {t('movies')}
            </h1>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-3 py-2 bg-dark-purple rounded-md text-white"
            >
              <Filter size={18} />
              <span>{language === 'en' ? 'Filters' : 'فلترة'}</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className={cn(
              "w-full md:w-64 bg-dark-purple/80 backdrop-blur-sm rounded-lg p-4 border border-white/10 h-fit sticky top-24",
              "md:block transition-all duration-300 z-20",
              isRTL ? "font-arabic text-right" : "font-sans",
              isFilterOpen ? "block absolute inset-x-0 mx-4" : "hidden"
            )}>
              <div className={cn(
                "flex items-center justify-between mb-4",
                isRTL && "flex-row-reverse"
              )}>
                <h2 className="text-lg font-semibold text-white">
                  {language === 'en' ? 'Filters' : 'فلترة'}
                </h2>
                
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="md:hidden text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Genre Filter */}
              <div className="mb-4">
                <label className="block text-white/90 mb-2">
                  {t('genre')}
                </label>
                <div className="relative">
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={cn(
                      "w-full bg-dark-charcoal border border-white/10 text-white rounded-md p-2 appearance-none",
                      isRTL && "text-right"
                    )}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{language === 'en' ? 'All Genres' : 'جميع الأنواع'}</option>
                    {Array.from(new Set(movies.flatMap(movie => 
                      language === 'en' ? movie.genresEn : movie.genresAr
                    ))).map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-white/50",
                    isRTL ? "left-2" : "right-2"
                  )} />
                </div>
              </div>
              
              {/* Year Filter */}
              <div className="mb-4">
                <label className="block text-white/90 mb-2">
                  {t('year')}
                </label>
                <div className="relative">
                  <select
                    value={selectedYear || ''}
                    onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                    className={cn(
                      "w-full bg-dark-charcoal border border-white/10 text-white rounded-md p-2 appearance-none",
                      isRTL && "text-right"
                    )}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{language === 'en' ? 'All Years' : 'جميع السنوات'}</option>
                    {Array.from(new Set(movies.map(movie => movie.year))).sort((a, b) => b - a).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-white/50",
                    isRTL ? "left-2" : "right-2"
                  )} />
                </div>
              </div>
              
              {/* Quality Filter */}
              <div className="mb-4">
                <label className="block text-white/90 mb-2">
                  {t('quality')}
                </label>
                <div className="relative">
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className={cn(
                      "w-full bg-dark-charcoal border border-white/10 text-white rounded-md p-2 appearance-none",
                      isRTL && "text-right"
                    )}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{language === 'en' ? 'All Qualities' : 'جميع الجودات'}</option>
                    {Array.from(new Set(movies.flatMap(movie => movie.quality))).map((quality) => (
                      <option key={quality} value={quality}>
                        {quality}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-white/50",
                    isRTL ? "left-2" : "right-2"
                  )} />
                </div>
              </div>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-white/90 mb-2">
                  {language === 'en' ? 'Sort By' : 'ترتيب حسب'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSortBy('latest')}
                    className={cn(
                      "py-2 px-3 rounded border text-sm",
                      sortBy === 'latest'
                        ? "bg-primary-purple/20 border-primary-purple text-white"
                        : "bg-dark-charcoal border-white/10 text-white/70"
                    )}
                  >
                    {language === 'en' ? 'Latest' : 'الأحدث'}
                  </button>
                  <button
                    onClick={() => setSortBy('rating')}
                    className={cn(
                      "py-2 px-3 rounded border text-sm",
                      sortBy === 'rating'
                        ? "bg-primary-purple/20 border-primary-purple text-white"
                        : "bg-dark-charcoal border-white/10 text-white/70"
                    )}
                  >
                    {language === 'en' ? 'Rating' : 'التقييم'}
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={applyFilters}
                  className="primary-button flex-1"
                >
                  {language === 'en' ? 'Apply' : 'تطبيق'}
                </button>
                <button
                  onClick={resetFilters}
                  className="secondary-button flex-1"
                >
                  {language === 'en' ? 'Reset' : 'إعادة ضبط'}
                </button>
              </div>
            </aside>
            
            {/* Movies Grid */}
            <div className="flex-1">
              {filteredMovies.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-white/70 text-lg">
                    {language === 'en' ? 'No movies found. Try different filters.' : 'لم يتم العثور على أفلام. جرب فلاتر مختلفة.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

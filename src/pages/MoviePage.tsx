import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieSection } from '@/components/MovieSection';
import { cn } from '@/lib/utils';
import { Movie, transformAPIMovie } from '@/types/movie';
import { 
  Play, 
  Download, 
  Clock, 
  Star, 
  Calendar, 
  Film,
  Languages,
  Check,
  Share2,
  Heart,
  BookmarkPlus
} from 'lucide-react';

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { language, t, isRTL } = useLanguage();
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [activeTab, setActiveTab] = useState<'about' | 'download' | 'watch'>('about');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        // Fetch the specific movie
        const response = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        
        // تحويل البيانات مباشرة بدون إضافة روابط اختبار
        const transformedMovie = transformAPIMovie(data);
        console.log('Movie data:', transformedMovie);
        setMovie(transformedMovie);

        // Fetch all movies to find similar ones
        const allMoviesResponse = await fetch('http://localhost:3000/api/movies');
        if (!allMoviesResponse.ok) {
          throw new Error('Failed to fetch movies');
        }
        const allMoviesData = await allMoviesResponse.json();
        const allMovies = allMoviesData.map(transformAPIMovie);
        
        // Find similar movies based on genre
        const similar = allMovies.filter(m => 
          m.id !== transformedMovie.id && 
        (language === 'en' 
            ? m.genresEn.some(g => transformedMovie.genresEn.includes(g))
            : m.genresAr.some(g => transformedMovie.genresAr.includes(g))
          )
        );
        
        setSimilarMovies(similar);
      } catch (error) {
        console.error('Error:', error);
        setError(language === 'en' 
          ? 'Failed to load movie' 
          : 'فشل في تحميل الفيلم'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, language]);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);
  
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

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">
              {language === 'en' ? 'Movie not found' : 'لم يتم العثور على الفيلم'}
            </h1>
            <Link to="/movies" className="primary-button inline-block">
              {language === 'en' ? 'Browse Movies' : 'تصفح الأفلام'}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative w-full">
          {/* Backdrop Image */}
          <div className="relative w-full h-[300px] md:h-[500px]">
            <img 
              src={movie.backdropUrl} 
              alt={language === 'en' ? movie.titleEn : movie.titleAr}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-dark-charcoal/70 to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-purple flex items-center justify-center neon-glow">
                <Play size={32} className="text-white" />
              </button>
            </div>
          </div>
        </section>
        
        {/* Movie Details */}
        <section className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-8" dir={isRTL ? "rtl" : "ltr"}>
            {/* Poster */}
            <div className="md:w-1/4 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-xl border border-white/10">
                <img 
                  src={movie.posterUrl} 
                  alt={language === 'en' ? movie.titleEn : movie.titleAr}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button className="p-2 bg-dark-purple hover:bg-dark-purple/80 text-white rounded flex items-center justify-center">
                  <Share2 size={20} />
                </button>
                <button className="p-2 bg-dark-purple hover:bg-dark-purple/80 text-white rounded flex items-center justify-center">
                  <Heart size={20} />
                </button>
                <button className="p-2 bg-dark-purple hover:bg-dark-purple/80 text-white rounded flex items-center justify-center">
                  <BookmarkPlus size={20} />
                </button>
              </div>
            </div>
            
            {/* Info */}
            <div className="md:w-3/4">
              <h1 className={cn(
                "text-3xl md:text-4xl font-bold text-white mb-2 leading-tight",
                isRTL ? "font-arabic" : "font-sans"
              )}>
                {language === 'en' ? movie.titleEn : movie.titleAr}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star size={18} className="mr-1" />
                  <span className="font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock size={18} className="mr-1" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Calendar size={18} className="mr-1" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Film size={18} className="mr-1" />
                  <span>{(language === 'en' ? movie.genresEn : movie.genresAr).join(', ')}</span>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="mb-6">
                <div className="flex gap-2 border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={cn(
                      "py-2 px-4 text-sm font-medium",
                      activeTab === 'about' 
                        ? "text-primary-purple border-b-2 border-primary-purple"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {language === 'en' ? 'About' : 'عن الفيلم'}
                  </button>
                  <button
                    onClick={() => setActiveTab('watch')}
                    className={cn(
                      "py-2 px-4 text-sm font-medium",
                      activeTab === 'watch'
                        ? "text-primary-purple border-b-2 border-primary-purple"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {language === 'en' ? 'Watch' : 'مشاهدة'}
                  </button>
                  <button
                    onClick={() => setActiveTab('download')}
                    className={cn(
                      "py-2 px-4 text-sm font-medium",
                      activeTab === 'download' 
                        ? "text-primary-purple border-b-2 border-primary-purple"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {language === 'en' ? 'Download' : 'تحميل'}
                  </button>
                </div>
              </div>
              
              {/* About Tab */}
              <div className={activeTab === 'about' ? 'block' : 'hidden'}>
                <p className={cn(
                  "text-white/80 mb-6",
                  isRTL ? "font-arabic" : "font-sans"
                )}>
                  {language === 'en' ? movie.descriptionEn : movie.descriptionAr}
                </p>
              </div>

              {/* Watch Tab */}
              <div className={activeTab === 'watch' ? 'block' : 'hidden'}>
                {movie.watch_links && movie.watch_links.length > 0 ? (
                  <div className="space-y-4">
                    {movie.watch_links.map((link, index) => (
                      <div 
                        key={index}
                        className="bg-dark-purple/30 rounded-lg p-4 border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-purple/20 flex items-center justify-center">
                            <Play size={20} className="text-primary-purple" />
                      </div>
                          <div>
                            <p className="text-white font-medium">
                              {link.server}
                            </p>
                            <p className="text-white/60 text-sm">
                              {link.quality}
                            </p>
                    </div>
                  </div>
                  
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="primary-button flex items-center gap-2"
                        >
                          <Play size={16} />
                          <span>{language === 'en' ? 'Watch Now' : 'شاهد الآن'}</span>
                        </a>
                      </div>
                      ))}
                    </div>
                ) : (
                  <div className="text-white/70">
                    {language === 'en' ? 'Watch options coming soon...' : 'خيارات المشاهدة قريباً...'}
                  </div>
                )}
              </div>
              
              {/* Download Tab */}
              <div className={activeTab === 'download' ? 'block' : 'hidden'}>
                {movie.download_links && movie.download_links.length > 0 ? (
                  <div className="space-y-4">
                    {movie.download_links.map((link, index) => (
                      <div 
                        key={index}
                        className="bg-dark-purple/30 rounded-lg p-4 border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-purple/20 flex items-center justify-center">
                            <Download size={20} className="text-primary-purple" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {link.quality} {language === 'en' ? 'Quality' : 'جودة'}
                            </p>
                            <p className="text-white/60 text-sm">
                              {link.size}
                            </p>
                          </div>
                        </div>
                        
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="primary-button flex items-center gap-2"
                        >
                          <Download size={16} />
                          <span>{t('download')}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-white/70">
                    {language === 'en' ? 'Download options coming soon...' : 'خيارات التحميل قريباً...'}
                </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <MovieSection 
            title={language === 'en' ? 'Similar Movies' : 'أفلام مشابهة'}
            movies={similarMovies}
            viewAllLink="/movies"
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

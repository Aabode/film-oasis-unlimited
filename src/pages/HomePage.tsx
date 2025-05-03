import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FeaturedMovie } from '@/components/FeaturedMovie';
import { MovieSection } from '@/components/MovieSection';
import { getMovies } from '@/api/movies';
import { setApiLanguage } from '@/api';
import { Movie, transformAPIMovie } from '../types/movie';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // تحديث لغة API عندما تتغير اللغة
  useEffect(() => {
    setApiLanguage(language);
  }, [language]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.map(transformAPIMovie));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
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
        <main className="flex-grow flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter movies for different sections
  const latestMovies = [...movies].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );
  
  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating);
  
  const actionMovies = movies.filter(movie => 
    movie.genres.includes('Action') || movie.genres.includes('أكشن')
  );
  
  const dramaMovies = movies.filter(movie => 
    movie.genres.includes('Drama') || movie.genres.includes('دراما')
  );

  // Get featured movie (first movie or first from latest)
  const featuredMovie = movies.find(movie => movie.tmdb_backdrop_path) || latestMovies[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        {/* Hero/Featured Section */}
        {featuredMovie && (
          <section className="w-full overflow-hidden">
            <FeaturedMovie movie={featuredMovie} />
          </section>
        )}
        
        {/* Latest Movies */}
        {latestMovies.length > 0 && (
          <MovieSection 
            title={t('latestMovies')} 
            movies={latestMovies}
            viewAllLink="/movies"
          />
        )}
        
        {/* Top Rated */}
        {topRatedMovies.length > 0 && (
          <MovieSection 
            title={t('topRated')} 
            movies={topRatedMovies}
            viewAllLink="/movies?sort=rating"
          />
        )}
        
        {/* Action Movies */}
        {actionMovies.length > 0 && (
          <MovieSection 
            title={language === 'en' ? 'Action Movies' : 'أفلام أكشن'} 
            movies={actionMovies}
            viewAllLink="/categories/action"
          />
        )}
        
        {/* Drama Movies */}
        {dramaMovies.length > 0 && (
          <MovieSection 
            title={language === 'en' ? 'Drama Movies' : 'أفلام دراما'} 
            movies={dramaMovies}
            viewAllLink="/categories/drama"
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

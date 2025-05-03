import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  Film, 
  Search, 
  Plus, 
  ExternalLink, 
  Download, 
  Eye, 
  Info, 
  X, 
  Check,
  Globe,
  CircleAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import api from "@/api";

// TMDB API constants
const TMDB_API_KEY = "4f66a33efa74e90d8be5a88a20fef509";
const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieToAdd {
  tmdbId: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string | null;
  releaseDate: string;
  rating: number;
  downloadLinks: { label: string; url: string }[];
  watchLinks: { label: string; url: string }[];
  genres: string[];
}

const TMDBManager = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [movieToAdd, setMovieToAdd] = useState<MovieToAdd | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language === "en" ? "en-US" : "ar-SA");
  
  // For adding custom links
  const [newDownloadLink, setNewDownloadLink] = useState({ label: "", url: "" });
  const [newWatchLink, setNewWatchLink] = useState({ label: "", url: "" });

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&language=${selectedLanguage}&query=${encodeURIComponent(searchTerm)}&page=1&include_adult=false`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
      toast({
        variant: "destructive",
        title: language === "en" ? "Error" : "خطأ",
        description: language === "en" ? "Failed to search movies" : "فشل في البحث عن الأفلام",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  const viewMovieDetails = async (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    
    try {
      // Get additional movie details with full genres
      const response = await fetch(
        `${TMDB_API_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=${selectedLanguage}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setMovieToAdd({
        tmdbId: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.svg",
        backdropUrl: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : null,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        downloadLinks: [],
        watchLinks: [],
        genres: data.genres.map((genre: { id: number; name: string }) => genre.name),
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      toast({
        variant: "destructive",
        title: language === "en" ? "Error" : "خطأ",
        description: language === "en" ? "Failed to fetch movie details" : "فشل في جلب تفاصيل الفيلم",
      });
    }
  };

  const addDownloadLink = () => {
    if (!newDownloadLink.label || !newDownloadLink.url) return;
    
    if (!movieToAdd) return;
    
    setMovieToAdd({
      ...movieToAdd,
      downloadLinks: [...movieToAdd.downloadLinks, { ...newDownloadLink }],
    });
    
    setNewDownloadLink({ label: "", url: "" });
  };

  const removeDownloadLink = (index: number) => {
    if (!movieToAdd) return;
    
    const updatedLinks = [...movieToAdd.downloadLinks];
    updatedLinks.splice(index, 1);
    
    setMovieToAdd({
      ...movieToAdd,
      downloadLinks: updatedLinks,
    });
  };

  const addWatchLink = () => {
    if (!newWatchLink.label || !newWatchLink.url) return;
    
    if (!movieToAdd) return;
    
    setMovieToAdd({
      ...movieToAdd,
      watchLinks: [...movieToAdd.watchLinks, { ...newWatchLink }],
    });
    
    setNewWatchLink({ label: "", url: "" });
  };

  const removeWatchLink = (index: number) => {
    if (!movieToAdd) return;
    
    const updatedLinks = [...movieToAdd.watchLinks];
    updatedLinks.splice(index, 1);
    
    setMovieToAdd({
      ...movieToAdd,
      watchLinks: updatedLinks,
    });
  };

  const updateMovieField = (field: string, value: string | number) => {
    if (!movieToAdd) return;
    
    setMovieToAdd({
      ...movieToAdd,
      [field]: value,
    });
  };

  const handleAddMovie = async () => {
    if (!movieToAdd) return;
    
    try {
      // تحضير البيانات للإرسال
      const movieData = {
        tmdb_id: movieToAdd.tmdbId,
        title: movieToAdd.title,
        title_ar: movieToAdd.title, // سيتم تحديثه لاحقاً مع الترجمة العربية
        description: movieToAdd.overview,
        description_ar: movieToAdd.overview, // سيتم تحديثه لاحقاً مع الترجمة العربية
        release_date: movieToAdd.releaseDate,
        rating: movieToAdd.rating,
        genres: movieToAdd.genres,
        tmdb_poster_path: movieToAdd.posterUrl.startsWith('http') ? movieToAdd.posterUrl : `${TMDB_IMAGE_BASE_URL}${movieToAdd.posterUrl}`,
        tmdb_backdrop_path: movieToAdd.backdropUrl ? (movieToAdd.backdropUrl.startsWith('http') ? movieToAdd.backdropUrl : `${TMDB_IMAGE_BASE_URL}${movieToAdd.backdropUrl}`) : null
      };

      // إضافة الفيلم
      const response = await api.post('/movies', movieData);
      const newMovie = response.data;
      
      // جلب الروابط الحالية
      const existingLinks = await api.get(`/movies/${newMovie.id}/links`);
      
      // حذف الروابط القديمة
      for (const link of existingLinks.data.download_links) {
        await api.delete(`/movies/${newMovie.id}/links/${link.id}`);
      }
      for (const link of existingLinks.data.watch_links) {
        await api.delete(`/movies/${newMovie.id}/links/${link.id}`);
      }
      
      // إضافة روابط التحميل الجديدة
      for (const link of movieToAdd.downloadLinks) {
        await api.post(`/movies/${newMovie.id}/links`, {
          type: 'download',
          quality: link.label,
          url: link.url,
          size: '2.1 GB' // يمكن إضافة حقل للحجم في النموذج لاحقاً
        });
      }
      
      // إضافة روابط المشاهدة الجديدة
      for (const link of movieToAdd.watchLinks) {
        await api.post(`/movies/${newMovie.id}/links`, {
          type: 'watch',
          quality: link.label,
          url: link.url,
          server: link.label
        });
      }
    
    toast({
        title: language === 'en' ? "Movie Added" : "تمت إضافة الفيلم",
        description: language === 'en' 
        ? `"${movieToAdd.title}" has been added to your movies` 
        : `تمت إضافة "${movieToAdd.title}" إلى أفلامك`,
    });
    
    // Reset the form
    setSelectedMovie(null);
    setMovieToAdd(null);
    } catch (error) {
      console.error('Error adding movie:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to add movie" 
          : "فشل في إضافة الفيلم",
      });
    }
  };

  const changeAPILanguage = (lang: string) => {
    setSelectedLanguage(lang);
    if (searchTerm.trim()) {
      // Re-search with the new language
      searchMovies();
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className={cn(
          "text-3xl font-bold mb-4 md:mb-0",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'TMDB Integration' : 'تكامل TMDB'}
        </h2>
      </div>

      {/* Language selector */}
      <div className="mb-6">
        <Label className={isRTL ? "font-arabic" : ""}>
          {language === "en" ? "API Language" : "لغة واجهة برمجة التطبيقات"}
        </Label>
        <Select
          value={selectedLanguage}
          onValueChange={changeAPILanguage}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English</SelectItem>
            <SelectItem value="ar-SA">العربية</SelectItem>
            <SelectItem value="fr-FR">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search box */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className={cn(
            "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
            isRTL ? "right-3" : "left-3"
          )} />
          <Input
            placeholder={language === 'en' ? "Search for movies..." : "البحث عن أفلام..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className={cn(
              "w-full",
              isRTL ? "pr-9 text-right" : "pl-9"
            )}
          />
        </div>
        <Button onClick={searchMovies} disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Search' : 'بحث'}
            </>
          )}
        </Button>
      </div>

      {/* Search results */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {searchResults.map((movie) => (
            <Card key={movie.id} className="overflow-hidden flex flex-col">
              <div className="aspect-[2/3] relative bg-muted">
                {movie.poster_path ? (
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Film className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
                <CardDescription>
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} • 
                  ⭐ {movie.vote_average.toFixed(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-3">{movie.overview || (language === 'en' ? 'No description available' : 'لا يوجد وصف متاح')}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button onClick={() => viewMovieDetails(movie)} className="w-full">
                  <Info className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : searchTerm && !isLoading ? (
        <div className="text-center py-8">
          <CircleAlert className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">
            {language === 'en' ? 'No movies found' : 'لم يتم العثور على أفلام'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Try adjusting your search or try a different language' 
              : 'حاول تعديل البحث أو تجربة لغة مختلفة'}
          </p>
        </div>
      ) : null}

      {/* Movie Details Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Movie Details" : "تفاصيل الفيلم"}
            </DialogTitle>
          </DialogHeader>
          {movieToAdd && (
            <>
                <DialogDescription>
                  {language === 'en' 
                    ? 'Review and edit movie details before adding it to your collection' 
                    : 'مراجعة وتحرير تفاصيل الفيلم قبل إضافته إلى مجموعتك'}
                </DialogDescription>
              
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">
                    {language === 'en' ? 'Details' : 'التفاصيل'}
                  </TabsTrigger>
                  <TabsTrigger value="downloadLinks">
                    {language === 'en' ? 'Download Links' : 'روابط التحميل'}
                  </TabsTrigger>
                  <TabsTrigger value="watchLinks">
                    {language === 'en' ? 'Watch Links' : 'روابط المشاهدة'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <div className="aspect-[2/3] relative bg-muted rounded overflow-hidden mb-2">
                        {movieToAdd.posterUrl !== "/placeholder.svg" ? (
                          <img 
                            src={movieToAdd.posterUrl} 
                            alt={movieToAdd.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        {language === 'en' ? 'Poster Image' : 'صورة الملصق'}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          {language === 'en' ? 'Title' : 'العنوان'}
                        </Label>
                        <Input 
                          id="title"
                          value={movieToAdd.title}
                          onChange={(e) => updateMovieField('title', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="overview">
                          {language === 'en' ? 'Overview' : 'نظرة عامة'}
                        </Label>
                        <Textarea 
                          id="overview"
                          value={movieToAdd.overview}
                          onChange={(e) => updateMovieField('overview', e.target.value)}
                          rows={5}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="releaseDate">
                            {language === 'en' ? 'Release Date' : 'تاريخ الإصدار'}
                          </Label>
                          <Input 
                            id="releaseDate"
                            type="date"
                            value={movieToAdd.releaseDate}
                            onChange={(e) => updateMovieField('releaseDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="rating">
                            {language === 'en' ? 'Rating' : 'التقييم'}
                          </Label>
                          <Input 
                            id="rating"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={movieToAdd.rating}
                            onChange={(e) => updateMovieField('rating', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Genres' : 'الأنواع'}
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {movieToAdd.genres.map((genre, index) => (
                            <div 
                              key={index}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                            >
                              {genre}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="downloadLinks" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {language === 'en' ? 'Download Links' : 'روابط التحميل'}
                    </h3>
                    
                    {movieToAdd.downloadLinks.length > 0 ? (
                      <div className="space-y-2">
                        {movieToAdd.downloadLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{link.label}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                                  {link.url}
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeDownloadLink(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        {language === 'en' 
                          ? 'No download links added yet' 
                          : 'لم تتم إضافة روابط تحميل بعد'}
                      </div>
                    )}
                    
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="font-medium">
                        {language === 'en' ? 'Add New Download Link' : 'إضافة رابط تحميل جديد'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="downloadLinkLabel">
                            {language === 'en' ? 'Label (e.g. 1080p, 720p)' : 'التسمية (مثل 1080p، 720p)'}
                          </Label>
                          <Input 
                            id="downloadLinkLabel"
                            value={newDownloadLink.label}
                            onChange={(e) => setNewDownloadLink({...newDownloadLink, label: e.target.value})}
                            placeholder={language === 'en' ? 'HD 1080p' : 'دقة عالية 1080p'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="downloadLinkUrl">
                            {language === 'en' ? 'URL' : 'الرابط'}
                          </Label>
                          <Input 
                            id="downloadLinkUrl"
                            value={newDownloadLink.url}
                            onChange={(e) => setNewDownloadLink({...newDownloadLink, url: e.target.value})}
                            placeholder="https://"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={addDownloadLink}
                        disabled={!newDownloadLink.label || !newDownloadLink.url}
                        className="mt-2"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Add Link' : 'إضافة رابط'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="watchLinks" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {language === 'en' ? 'Watch Links' : 'روابط المشاهدة'}
                    </h3>
                    
                    {movieToAdd.watchLinks.length > 0 ? (
                      <div className="space-y-2">
                        {movieToAdd.watchLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{link.label}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                                  {link.url}
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeWatchLink(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        {language === 'en' 
                          ? 'No watch links added yet' 
                          : 'لم تتم إضافة روابط مشاهدة بعد'}
                      </div>
                    )}
                    
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="font-medium">
                        {language === 'en' ? 'Add New Watch Link' : 'إضافة رابط مشاهدة جديد'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="watchLinkLabel">
                            {language === 'en' ? 'Label (e.g. Server 1)' : 'التسمية (مثل السيرفر 1)'}
                          </Label>
                          <Input 
                            id="watchLinkLabel"
                            value={newWatchLink.label}
                            onChange={(e) => setNewWatchLink({...newWatchLink, label: e.target.value})}
                            placeholder={language === 'en' ? 'Server 1' : 'السيرفر 1'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="watchLinkUrl">
                            {language === 'en' ? 'URL' : 'الرابط'}
                          </Label>
                          <Input 
                            id="watchLinkUrl"
                            value={newWatchLink.url}
                            onChange={(e) => setNewWatchLink({...newWatchLink, url: e.target.value})}
                            placeholder="https://"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={addWatchLink}
                        disabled={!newWatchLink.label || !newWatchLink.url}
                        className="mt-2"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Add Link' : 'إضافة رابط'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setSelectedMovie(null)}>
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
                <Button onClick={handleAddMovie}>
                  <Check className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Add Movie' : 'إضافة الفيلم'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TMDBManager;

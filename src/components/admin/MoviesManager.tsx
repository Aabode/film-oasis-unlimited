import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Film, PlusCircle, Search, Edit, Trash2, X, Plus, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Movie, getMovies, deleteMovie, searchMovies } from "@/api/movies";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieLink {
  id?: number;
  quality: string;
  url: string;
  size?: string;
  server?: string;
}

const MoviesManager = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    release_date: "",
    rating: 0,
    genres: [] as string[]
  });
  const [downloadLinks, setDownloadLinks] = useState<MovieLink[]>([]);
  const [watchLinks, setWatchLinks] = useState<MovieLink[]>([]);
  const [newDownloadLink, setNewDownloadLink] = useState<MovieLink>({ quality: '', url: '', size: '' });
  const [newWatchLink, setNewWatchLink] = useState<MovieLink>({ quality: '', url: '', server: '' });

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    if (editingMovie) {
      setEditForm({
        title: editingMovie.title,
        title_ar: editingMovie.title_ar,
        description: editingMovie.description,
        description_ar: editingMovie.description_ar,
        release_date: editingMovie.release_date,
        rating: editingMovie.rating,
        genres: editingMovie.genres
      });
    }
  }, [editingMovie]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to load movies" 
          : "فشل في تحميل الأفلام",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    try {
      if (value.trim()) {
        const results = await searchMovies(value);
        setMovies(results);
      } else {
        await loadMovies();
      }
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to search movies" 
          : "فشل في البحث عن الأفلام",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMovie(id);
    setMovies(movies.filter(movie => movie.id !== id));
    toast({
        title: language === 'en' ? "Success" : "نجاح",
        description: language === 'en' 
          ? "Movie deleted successfully" 
          : "تم حذف الفيلم بنجاح",
      });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to delete movie" 
          : "فشل في حذف الفيلم",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (movie: Movie) => {
    setEditingMovie(movie);
    try {
      const response = await api.get(`/movies/${movie.id}/links`);
      setDownloadLinks(response.data.download_links || []);
      setWatchLinks(response.data.watch_links || []);
    } catch (error) {
    toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Failed to load movie links" : "فشل في تحميل روابط الفيلم",
      });
    }
  };

  const handleAddDownloadLink = () => {
    if (!newDownloadLink.quality || !newDownloadLink.url) return;
    setDownloadLinks([...downloadLinks, newDownloadLink]);
    setNewDownloadLink({ quality: '', url: '', size: '' });
  };

  const handleAddWatchLink = () => {
    if (!newWatchLink.quality || !newWatchLink.url) return;
    setWatchLinks([...watchLinks, newWatchLink]);
    setNewWatchLink({ quality: '', url: '', server: '' });
  };

  const handleRemoveDownloadLink = (index: number) => {
    const updatedLinks = [...downloadLinks];
    updatedLinks.splice(index, 1);
    setDownloadLinks(updatedLinks);
  };

  const handleRemoveWatchLink = (index: number) => {
    const updatedLinks = [...watchLinks];
    updatedLinks.splice(index, 1);
    setWatchLinks(updatedLinks);
  };

  const handleEditSubmit = async () => {
    if (!editingMovie) return;

    try {
      // Update movie information first
      await api.put(`/movies/${editingMovie.id}`, editForm);
      
      // Get existing links
      const existingLinks = await api.get(`/movies/${editingMovie.id}/links`);
      
      // Delete old links one by one to avoid race conditions
      for (const link of existingLinks.data.download_links) {
        if (link && link.id) {
          try {
            await api.delete(`/movies/${editingMovie.id}/links/${link.id}`);
          } catch (error) {
            console.error(`Failed to delete download link ${link.id}:`, error);
          }
        }
      }
      
      for (const link of existingLinks.data.watch_links) {
        if (link && link.id) {
          try {
            await api.delete(`/movies/${editingMovie.id}/links/${link.id}`);
          } catch (error) {
            console.error(`Failed to delete watch link ${link.id}:`, error);
          }
        }
      }

      // Add new download links one by one
      for (const link of downloadLinks) {
        try {
          await api.post(`/movies/${editingMovie.id}/links`, {
            type: 'download',
            quality: link.quality,
            url: link.url,
            size: link.size
          });
        } catch (error) {
          console.error('Failed to add download link:', error);
        }
      }

      // Add new watch links one by one
      for (const link of watchLinks) {
        try {
          await api.post(`/movies/${editingMovie.id}/links`, {
            type: 'watch',
            quality: link.quality,
            url: link.url,
            server: link.server
          });
        } catch (error) {
          console.error('Failed to add watch link:', error);
        }
      }

      // Update UI state
      const updatedMovies = movies.map(movie => 
        movie.id === editingMovie.id 
          ? { ...movie, ...editForm }
          : movie
      );
      setMovies(updatedMovies);
      
      // Reset state and close dialog
      setEditingMovie(null);
      setDownloadLinks([]);
      setWatchLinks([]);
      setNewDownloadLink({ quality: '', url: '', size: '' });
      setNewWatchLink({ quality: '', url: '', server: '' });
      
      toast({
        title: language === 'en' ? "Success" : "نجاح",
        description: language === 'en' 
          ? "Movie updated successfully" 
          : "تم تحديث الفيلم بنجاح",
      });

      // Refresh movies list
      await loadMovies();
    } catch (error) {
      console.error('Error updating movie:', error);
    toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to update movie" 
          : "فشل في تحديث الفيلم",
      });
    }
  };

  const handleEditFormChange = (field: string, value: string | number | string[]) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className={cn(
          "text-3xl font-bold mb-4 md:mb-0",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'Movies Management' : 'إدارة الأفلام'}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? "Search movies..." : "البحث عن أفلام..."}
              value={searchTerm}
              onChange={handleSearch}
              className={cn("pl-9 w-full sm:w-[250px]", isRTL && "text-right pr-9 pl-3")}
            />
          </div>
          
          <Button 
            className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
          >
            <PlusCircle className="h-4 w-4" />
            <span className={isRTL ? "font-arabic" : ""}>
              {language === 'en' ? 'Add Movie' : 'إضافة فيلم'}
            </span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Movie' : 'الفيلم'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Year' : 'السنة'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Genre' : 'النوع'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Rating' : 'التقييم'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'en' ? 'Actions' : 'الإجراءات'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
                </TableCell>
              </TableRow>
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className={cn("font-medium", isRTL && "text-right")}>
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{language === 'en' ? movie.title : movie.title_ar}</div>
                        <div className="text-sm text-muted-foreground">
                          {movie.tmdb_id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>
                    {new Date(movie.release_date).getFullYear()}
                  </TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>
                    {movie.genres.join(', ')}
                  </TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>
                    {movie.rating.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(movie)}
                        title={language === 'en' ? 'Edit' : 'تعديل'}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(movie.id)}
                        title={language === 'en' ? 'Delete' : 'حذف'}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <span className={isRTL ? "font-arabic" : ""}>
                    {language === 'en' ? 'No movies found.' : 'لم يتم العثور على أفلام.'}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Movie Dialog */}
      <Dialog open={!!editingMovie} onOpenChange={(open) => !open && setEditingMovie(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Edit Movie' : 'تعديل الفيلم'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Make changes to the movie information below.' 
                : 'قم بإجراء التغييرات على معلومات الفيلم أدناه.'}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">
                {language === 'en' ? 'Details' : 'التفاصيل'}
              </TabsTrigger>
              <TabsTrigger value="download">
                {language === 'en' ? 'Download Links' : 'روابط التحميل'}
              </TabsTrigger>
              <TabsTrigger value="watch">
                {language === 'en' ? 'Watch Links' : 'روابط المشاهدة'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      {language === 'en' ? 'English Title' : 'العنوان بالإنجليزية'}
                    </Label>
                    <Input
                      id="title"
                      value={editForm.title}
                      onChange={(e) => handleEditFormChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title_ar">
                      {language === 'en' ? 'Arabic Title' : 'العنوان بالعربية'}
                    </Label>
                    <Input
                      id="title_ar"
                      value={editForm.title_ar}
                      onChange={(e) => handleEditFormChange('title_ar', e.target.value)}
                      className={isRTL ? "text-right" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {language === 'en' ? 'English Description' : 'الوصف بالإنجليزية'}
                    </Label>
                    <Textarea
                      id="description"
                      value={editForm.description}
                      onChange={(e) => handleEditFormChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description_ar">
                      {language === 'en' ? 'Arabic Description' : 'الوصف بالعربية'}
                    </Label>
                    <Textarea
                      id="description_ar"
                      value={editForm.description_ar}
                      onChange={(e) => handleEditFormChange('description_ar', e.target.value)}
                      className={isRTL ? "text-right" : ""}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="release_date">
                      {language === 'en' ? 'Release Date' : 'تاريخ الإصدار'}
                    </Label>
                    <Input
                      id="release_date"
                      type="date"
                      value={editForm.release_date}
                      onChange={(e) => handleEditFormChange('release_date', e.target.value)}
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
                      value={editForm.rating}
                      onChange={(e) => handleEditFormChange('rating', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="download">
              <div className="space-y-4">
                {downloadLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{link.quality}</div>
                        <div className="text-sm text-muted-foreground">{link.url}</div>
                        {link.size && (
                          <div className="text-sm text-muted-foreground">{link.size}</div>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveDownloadLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-medium">
                    {language === 'en' ? 'Add New Download Link' : 'إضافة رابط تحميل جديد'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="downloadQuality">
                        {language === 'en' ? 'Quality' : 'الجودة'}
                      </Label>
                      <Input
                        id="downloadQuality"
                        value={newDownloadLink.quality}
                        onChange={(e) => setNewDownloadLink({...newDownloadLink, quality: e.target.value})}
                        placeholder="1080p"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downloadSize">
                        {language === 'en' ? 'Size' : 'الحجم'}
                      </Label>
                      <Input
                        id="downloadSize"
                        value={newDownloadLink.size}
                        onChange={(e) => setNewDownloadLink({...newDownloadLink, size: e.target.value})}
                        placeholder="2.1 GB"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downloadUrl">
                        {language === 'en' ? 'URL' : 'الرابط'}
                      </Label>
                      <Input
                        id="downloadUrl"
                        value={newDownloadLink.url}
                        onChange={(e) => setNewDownloadLink({...newDownloadLink, url: e.target.value})}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddDownloadLink}
                    disabled={!newDownloadLink.quality || !newDownloadLink.url}
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Add Link' : 'إضافة رابط'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="watch">
              <div className="space-y-4">
                {watchLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{link.quality}</div>
                        <div className="text-sm text-muted-foreground">{link.url}</div>
                        {link.server && (
                          <div className="text-sm text-muted-foreground">{link.server}</div>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveWatchLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-medium">
                    {language === 'en' ? 'Add New Watch Link' : 'إضافة رابط مشاهدة جديد'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="watchQuality">
                        {language === 'en' ? 'Quality' : 'الجودة'}
                      </Label>
                      <Input
                        id="watchQuality"
                        value={newWatchLink.quality}
                        onChange={(e) => setNewWatchLink({...newWatchLink, quality: e.target.value})}
                        placeholder="1080p"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="watchServer">
                        {language === 'en' ? 'Server' : 'السيرفر'}
                      </Label>
                      <Input
                        id="watchServer"
                        value={newWatchLink.server}
                        onChange={(e) => setNewWatchLink({...newWatchLink, server: e.target.value})}
                        placeholder="Server 1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="watchUrl">
                        {language === 'en' ? 'URL' : 'الرابط'}
                      </Label>
                      <Input
                        id="watchUrl"
                        value={newWatchLink.url}
                        onChange={(e) => setNewWatchLink({...newWatchLink, url: e.target.value})}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddWatchLink}
                    disabled={!newWatchLink.quality || !newWatchLink.url}
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Add Link' : 'إضافة رابط'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMovie(null)}>
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button onClick={handleEditSubmit}>
              {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoviesManager;

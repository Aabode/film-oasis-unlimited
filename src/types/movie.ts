// نوع بيانات رابط التحميل
interface DownloadLink {
    quality: string;
    size: string;
    url: string;
}

// نوع بيانات رابط المشاهدة
interface WatchLink {
    quality: string;
    server: string;
    url: string;
}

// نوع البيانات المشترك للأفلام
export interface Movie {
    // خصائص API
    id: number;
    tmdb_id: number;
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    release_date: string;
    rating: number;
    genres: string[];
    tmdb_poster_path: string;
    tmdb_backdrop_path: string;
    local_poster_path?: string;
    local_backdrop_path?: string;
    download_links?: DownloadLink[];
    watch_links?: WatchLink[];

    // خصائص واجهة المستخدم
    titleEn: string;
    titleAr: string;
    posterUrl: string;
    backdropUrl: string;
    year: number;
    genresEn: string[];
    genresAr: string[];
    duration: string;
    descriptionEn: string;
    descriptionAr: string;
    quality: string[];
    languageAudio: string[];
    languageSubtitles: string[];
}

// دالة لتحويل فيلم API إلى فيلم واجهة المستخدم
export function transformAPIMovie(apiMovie: any): Movie {
    return {
        ...apiMovie,
        titleEn: apiMovie.title,
        titleAr: apiMovie.title_ar,
        posterUrl: apiMovie.tmdb_poster_path || apiMovie.local_poster_path || '/placeholder.jpg',
        backdropUrl: apiMovie.tmdb_backdrop_path || apiMovie.local_backdrop_path || '/placeholder-backdrop.jpg',
        year: new Date(apiMovie.release_date).getFullYear(),
        genresEn: apiMovie.genres,
        genresAr: apiMovie.genres,
        descriptionEn: apiMovie.description || '',
        descriptionAr: apiMovie.description_ar || '',
        duration: '2h', // قيمة افتراضية
        quality: ['1080p'], // قيمة افتراضية
        languageAudio: ['English', 'Arabic'], // قيمة افتراضية
        languageSubtitles: ['English', 'Arabic'], // قيمة افتراضية
        download_links: apiMovie.download_links || [], // روابط التحميل
        watch_links: apiMovie.watch_links || [] // روابط المشاهدة
    };
} 
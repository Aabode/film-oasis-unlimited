import api from './index';

// أنواع البيانات
export interface Movie {
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
}

// الحصول على جميع الأفلام
export const getMovies = async () => {
    const response = await api.get<Movie[]>('/movies');
    return response.data;
};

// الحصول على فيلم بواسطة ID
export const getMovieById = async (id: number) => {
    const response = await api.get<Movie>(`/movies/${id}`);
    return response.data;
};

// إضافة فيلم جديد
export const addMovie = async (movie: Omit<Movie, 'id'>) => {
    const response = await api.post<Movie>('/movies', movie);
    return response.data;
};

// تحديث فيلم
export const updateMovie = async (id: number, movie: Partial<Movie>) => {
    const response = await api.put<Movie>(`/movies/${id}`, movie);
    return response.data;
};

// حذف فيلم
export const deleteMovie = async (id: number) => {
    await api.delete(`/movies/${id}`);
};

// البحث عن أفلام
export const searchMovies = async (query: string) => {
    const response = await api.get<Movie[]>(`/movies/search?q=${query}`);
    return response.data;
}; 
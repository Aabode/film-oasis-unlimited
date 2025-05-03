import pool from '../config/database';

// وظائف الأفلام
export const movieService = {
    // إضافة فيلم جديد
    async addMovie(movieData: any) {
        const query = `
            INSERT INTO movies (
                tmdb_id, title, title_ar, description, description_ar,
                release_date, rating, genres, tmdb_poster_path, tmdb_backdrop_path
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `;
        const values = [
            movieData.tmdb_id,
            movieData.title,
            movieData.title_ar,
            movieData.description,
            movieData.description_ar,
            movieData.release_date,
            movieData.rating,
            movieData.genres,
            movieData.tmdb_poster_path,
            movieData.tmdb_backdrop_path
        ];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    },

    // الحصول على فيلم بواسطة ID
    async getMovieById(id: number) {
        const query = 'SELECT * FROM movies WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    // الحصول على فيلم بواسطة TMDB ID
    async getMovieByTmdbId(tmdbId: number) {
        const query = 'SELECT * FROM movies WHERE tmdb_id = $1';
        const result = await pool.query(query, [tmdbId]);
        return result.rows[0];
    },

    // تحديث معلومات الفيلم
    async updateMovie(id: number, movieData: any) {
        const query = `
            UPDATE movies SET
                title = $1,
                title_ar = $2,
                description = $3,
                description_ar = $4,
                release_date = $5,
                rating = $6,
                genres = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
        `;
        const values = [
            movieData.title,
            movieData.title_ar,
            movieData.description,
            movieData.description_ar,
            movieData.release_date,
            movieData.rating,
            movieData.genres,
            id
        ];
        await pool.query(query, values);
    },

    // حذف فيلم
    async deleteMovie(id: number) {
        const query = 'DELETE FROM movies WHERE id = $1';
        await pool.query(query, [id]);
    }
};

// وظائف روابط الأفلام
export const movieLinkService = {
    // إضافة رابط جديد
    async addLink(movieId: number, linkData: any) {
        const query = `
            INSERT INTO movie_links (movie_id, quality, type, url)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const values = [
            movieId,
            linkData.quality,
            linkData.type,
            linkData.url
        ];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    },

    // الحصول على روابط الفيلم
    async getMovieLinks(movieId: number) {
        const query = 'SELECT * FROM movie_links WHERE movie_id = $1';
        const result = await pool.query(query, [movieId]);
        return result.rows;
    },

    // حذف رابط
    async deleteLink(id: number) {
        const query = 'DELETE FROM movie_links WHERE id = $1';
        await pool.query(query, [id]);
    }
};

// وظائف المستخدمين
export const userService = {
    // إضافة مستخدم جديد
    async addUser(userData: any) {
        const query = `
            INSERT INTO users (username, email, password_hash, is_admin)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const values = [
            userData.username,
            userData.email,
            userData.password_hash,
            userData.is_admin || false
        ];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    },

    // الحصول على مستخدم بواسطة البريد الإلكتروني
    async getUserByEmail(email: string) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    // تحديث معلومات المستخدم
    async updateUser(id: number, userData: any) {
        const query = `
            UPDATE users SET
                username = $1,
                email = $2,
                password_hash = $3,
                is_admin = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
        `;
        const values = [
            userData.username,
            userData.email,
            userData.password_hash,
            userData.is_admin,
            id
        ];
        await pool.query(query, values);
    }
}; 
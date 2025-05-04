import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/film_oasis',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// اختبار الاتصال
pool.connect((err, client, release) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err);
        process.exit(1);
    }
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    release();
});

// المسار الافتراضي
app.get('/', (req, res) => {
    res.json({ message: 'مرحباً بك في Film Oasis API' });
});

// مسارات الأفلام
app.get('/api/movies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM movies ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// مسار البحث
app.get('/api/movies/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const searchTerm = `%${q}%`;
        
        const result = await pool.query(
            'SELECT * FROM movies WHERE title ILIKE $1 OR title_ar ILIKE $1 OR description ILIKE $1 OR description_ar ILIKE $1 ORDER BY created_at DESC',
            [searchTerm]
        );
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// مسار فيلم محدد
app.get('/api/movies/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const movieResult = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        
        if (movieResult.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        const movie = movieResult.rows[0];
        
        // جلب الروابط
        const linksResult = await pool.query(
            'SELECT * FROM movie_links WHERE movie_id = $1 ORDER BY created_at DESC',
            [id]
        );
        
        // تنظيم الروابط
        movie.download_links = linksResult.rows
            .filter(link => link.type === 'download')
            .map(link => ({
                id: link.id,
                quality: link.quality,
                size: link.size || '',
                url: link.url
            }));
            
        movie.watch_links = linksResult.rows
            .filter(link => link.type === 'watch')
            .map(link => ({
                id: link.id,
                server: link.server || 'Server 1',
                quality: link.quality,
                url: link.url
            }));
        
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/movies', async (req, res) => {
    try {
        const { 
            tmdb_id, title, title_ar, description, description_ar,
            release_date, rating, genres, tmdb_poster_path, tmdb_backdrop_path
        } = req.body;

        const result = await pool.query(
            `INSERT INTO movies (
                tmdb_id, title, title_ar, description, description_ar,
                release_date, rating, genres, tmdb_poster_path, tmdb_backdrop_path
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                tmdb_id, title, title_ar, description, description_ar,
                release_date, rating, genres, tmdb_poster_path, tmdb_backdrop_path
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            title, title_ar, description, description_ar,
            release_date, rating, genres
        } = req.body;

        const result = await pool.query(
            `UPDATE movies SET
                title = $1,
                title_ar = $2,
                description = $3,
                description_ar = $4,
                release_date = $5,
                rating = $6,
                genres = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *`,
            [title, title_ar, description, description_ar, release_date, rating, genres, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// مسارات روابط الأفلام
app.get('/api/movies/:movieId([0-9]+)/links', async (req, res) => {
    try {
        const { movieId } = req.params;
        
        // التحقق من وجود الفيلم
        const movieExists = await pool.query('SELECT id FROM movies WHERE id = $1', [movieId]);
        if (movieExists.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        const result = await pool.query(
            'SELECT * FROM movie_links WHERE movie_id = $1 ORDER BY created_at DESC',
            [movieId]
        );
        
        // تنظيم الروابط حسب نوعها
        const links = {
            download_links: result.rows
                .filter(link => link.type === 'download')
                .map(link => ({
                    id: link.id,
                    quality: link.quality,
                    size: link.size || '',
                    url: link.url
                })),
            watch_links: result.rows
                .filter(link => link.type === 'watch')
                .map(link => ({
                    id: link.id,
                    server: link.server || 'Server 1',
                    quality: link.quality,
                    url: link.url
                }))
        };
        
        res.json(links);
    } catch (error) {
        console.error('Error fetching movie links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// إضافة رابط جديد
app.post('/api/movies/:movieId([0-9]+)/links', async (req, res) => {
    try {
        const { movieId } = req.params;
        const { type, quality, url, size, server } = req.body;

        // التحقق من وجود الفيلم
        const movieExists = await pool.query('SELECT id FROM movies WHERE id = $1', [movieId]);
        if (movieExists.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const result = await pool.query(
            'INSERT INTO movie_links (movie_id, type, quality, url, size, server) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [movieId, type, quality, url, size, server]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding movie link:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// حذف رابط
app.delete('/api/movies/:movieId([0-9]+)/links/:linkId([0-9]+)', async (req, res) => {
    try {
        const { movieId, linkId } = req.params;
        
        // التحقق من وجود الفيلم
        const movieExists = await pool.query('SELECT id FROM movies WHERE id = $1', [movieId]);
        if (movieExists.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const result = await pool.query(
            'DELETE FROM movie_links WHERE id = $1 AND movie_id = $2 RETURNING *',
            [linkId, movieId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }
        
        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie link:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// مسارات الإحصائيات
app.get('/api/statistics', async (req, res) => {
    try {
        // جلب إحصائيات الأفلام
        const moviesCount = await pool.query('SELECT COUNT(*) FROM movies');
        const totalMovies = moviesCount.rows[0].count;

        // جلب إحصائيات المستخدمين
        const usersCount = await pool.query('SELECT COUNT(*) FROM users');
        const totalUsers = usersCount.rows[0].count;

        // جلب إحصائيات المشاهدات
        const viewsCount = await pool.query('SELECT COUNT(*) FROM watch_history');
        const totalViews = viewsCount.rows[0].count;

        // جلب متوسط وقت المشاهدة
        const avgWatchTime = await pool.query('SELECT AVG(duration) FROM watch_history');
        const avgTime = avgWatchTime.rows[0].avg || 0;

        // جلب إحصائيات الشهر الحالي
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const monthlyStats = await pool.query(`
            SELECT 
                EXTRACT(MONTH FROM watch_time) as month,
                COUNT(*) as views,
                COUNT(DISTINCT user_id) as users,
                COUNT(DISTINCT movie_id) as movies
            FROM watch_history
            WHERE EXTRACT(YEAR FROM watch_time) = $1
            GROUP BY EXTRACT(MONTH FROM watch_time)
            ORDER BY month
        `, [currentYear]);

        // جلب إحصائيات الأسبوع الحالي
        const weeklyStats = await pool.query(`
            SELECT 
                EXTRACT(DOW FROM watch_time) as day,
                COUNT(*) as views
            FROM watch_history
            WHERE watch_time >= CURRENT_DATE - INTERVAL '7 days'
            GROUP BY EXTRACT(DOW FROM watch_time)
            ORDER BY day
        `);

        res.json({
            kpis: {
                totalMovies,
                totalUsers,
                totalViews,
                avgWatchTime: Math.round(avgTime / 60) // تحويل إلى دقائق
            },
            monthlyData: monthlyStats.rows.map(row => ({
                name: new Date(2000, row.month - 1).toLocaleString('default', { month: 'short' }),
                viewers: parseInt(row.views),
                members: parseInt(row.users),
                downloads: parseInt(row.movies)
            })),
            weeklyData: weeklyStats.rows.map(row => ({
                name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][row.day],
                views: parseInt(row.views)
            }))
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
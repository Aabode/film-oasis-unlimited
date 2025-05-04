import { Pool } from 'pg';

// تكوين الاتصال بقاعدة البيانات
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'film_oasis',
    password: 'abode1290',
    port: 5432,
});

// اختبار الاتصال
pool.connect((err, client, release) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    release();
});

export default pool; 
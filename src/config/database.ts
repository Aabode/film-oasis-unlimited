import { Pool } from 'pg';

// تكوين الاتصال بقاعدة البيانات Supabase
const pool = new Pool({
    user: 'postgres',
    host: 'db.cuenixylzravencpaoio.supabase.co',
    database: 'postgres',
    password: 'Abode1290',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
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
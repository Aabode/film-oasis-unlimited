import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'film_oasis',
    password: 'abode1290',
    port: 5432,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
        
        // اختبار استعلام بسيط
        const result = await client.query('SELECT NOW()');
        console.log('✅ وقت الخادم:', result.rows[0].now);
        
        client.release();
    } catch (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
    } finally {
        await pool.end();
    }
}

testConnection(); 
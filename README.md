# Film Oasis Unlimited

موقع متكامل لمشاهدة وتحميل الأفلام والمسلسلات مع لوحة تحكم للمشرفين.

## المميزات

- 🎬 عرض الأفلام والمسلسلات
- 🌐 واجهة مستخدم متجاوبة
- 🌍 دعم اللغتين (العربية والإنجليزية)
- 💬 نظام تعليقات
- 📊 إحصائيات المشاهدة
- 👨‍💼 لوحة تحكم للمشرفين
- 🔍 بحث متقدم
- 📱 تصميم متجاوب

## المتطلبات

- Node.js (v14 أو أحدث)
- PostgreSQL
- حساب Supabase
- حساب Koyeb
- حساب TMDB API

## التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/Aabode/film-oasis-unlimited.git
   cd film-oasis-unlimited
   ```

2. **تثبيت التبعيات**
   ```bash
   npm install
   ```

3. **إعداد قاعدة البيانات**
   - إنشاء حساب على Supabase
   - إنشاء مشروع جديد
   - نسخ معلومات الاتصال

4. **تكوين المتغيرات البيئية**
   إنشاء ملف `.env` في المجلد الرئيسي:
   ```
   PORT=3000
   DATABASE_URL=postgres://postgres:your_password@your_host:5432/postgres
   TMDB_API_KEY=your_tmdb_api_key
   ```

5. **تشغيل التطبيق محلياً**
   ```bash
   npm run dev
   ```

## النشر على Koyeb

1. **إنشاء حساب Koyeb**
   - زيارة [Koyeb](https://koyeb.com)
   - إنشاء حساب جديد
   - تأكيد البريد الإلكتروني

2. **إعداد المشروع**
   - رفع المشروع إلى GitHub
   - إنشاء مستودع جديد
   - رفع الكود

3. **تكوين Koyeb**
   - إنشاء تطبيق جديد
   - ربط المستودع
   - تكوين متغيرات البيئة

4. **إعداد قاعدة البيانات Supabase**
   - إنشاء مشروع جديد
   - نسخ معلومات الاتصال
   - تحديث DATABASE_URL

5. **تشغيل التطبيق**
   - Koyeb سيقوم تلقائياً بتشغيل التطبيق
   - يمكنك مراقبة السجلات في لوحة التحكم

## هيكل المشروع

```
film-oasis-unlimited/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── common/
│   │   └── layout/
│   ├── pages/
│   ├── services/
│   └── utils/
├── public/
├── server/
└── package.json
```

## المساهمة

1. Fork المشروع
2. إنشاء فرع جديد
3. إجراء التغييرات
4. إرسال Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الدعم

للمساعدة والدعم، يرجى فتح issue في GitHub.

---

# Film Oasis Unlimited

A website for watching and downloading movies and TV shows.

## System Requirements

- Node.js (Version 18 or later)
- PostgreSQL (Version 12 or later)
- npm or yarn

## Installation Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Create a new PostgreSQL database named `film_oasis`
   - Run the `database.sql` file to create required tables:
   ```bash
   psql -U postgres -d film_oasis -f database.sql
   ```

3. **Configure .env File**:
   - Create a `.env` file in the root directory
   - Add the following variables:
   ```
   PORT=3000
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/film_oasis
   TMDB_API_KEY=your_tmdb_api_key
   ```

## Free Deployment Options

### 1. Railway (Free with limits)
- [Railway](https://railway.app) provides a free plan with:
  - 500 hours of runtime per month
  - 1GB storage
  - Free PostgreSQL database
- Deployment steps:
  1. Create Railway account
  2. Connect GitHub account
  3. Select project
  4. Add environment variables
  5. Automatic deployment

### 2. Cyclic (Free)
- [Cyclic](https://cyclic.sh) offers:
  - Unlimited free deployments
  - Free MongoDB database
  - Automatic updates
- Deployment steps:
  1. Create Cyclic account
  2. Connect GitHub account
  3. Select project
  4. Configure environment

### 3. Fly.io (Free with limits)
- [Fly.io](https://fly.io) provides:
  - 3 free applications
  - 256MB memory per app
  - Free PostgreSQL database
- Deployment steps:
  1. Install Fly CLI
  2. Login
  3. Create new app
  4. Configure database

### 4. Supabase (Free)
- [Supabase](https://supabase.com) offers:
  - Free PostgreSQL database
  - File storage
  - User authentication
- Deployment steps:
  1. Create new project
  2. Import database schema
  3. Configure API
  4. Connect with application

## Running Locally

1. **Start Server**:
   ```bash
   npm run dev:server
   ```

2. **Start UI**:
   ```bash
npm run dev
```

3. **Open Application**:
   - Open browser at: `http://localhost:8081`

## Project Structure

```
film-oasis-unlimited/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Application pages
│   ├── api/              # API functions
│   ├── types/            # TypeScript definitions
│   └── utils/            # Utility functions
├── public/               # Static files
├── server.ts            # Express server
└── database.sql         # Database schema
```

## Features

- Responsive UI
- Bilingual support (Arabic/English)
- Movie and link management
- Viewing statistics
- Comments system
- User management

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For assistance and support, please open an issue on GitHub.
"# film-oasis-unlimited" 

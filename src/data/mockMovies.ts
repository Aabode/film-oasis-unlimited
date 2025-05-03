
export type Movie = {
  id: number;
  titleEn: string;
  titleAr: string;
  posterUrl: string;
  backdropUrl: string;
  year: number;
  rating: number;
  duration: string;
  genresEn: string[];
  genresAr: string[];
  descriptionEn: string;
  descriptionAr: string;
  quality: string[];
  languageAudio: string[];
  languageSubtitles: string[];
  featured?: boolean;
};

export const movies: Movie[] = [
  {
    id: 1,
    titleEn: "Inception",
    titleAr: "بداية",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&auto=format&fit=crop",
    year: 2010,
    rating: 8.8,
    duration: "2h 28m",
    genresEn: ["Action", "Sci-Fi", "Thriller"],
    genresAr: ["أكشن", "خيال علمي", "إثارة"],
    descriptionEn: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    descriptionAr: "لص يسرق أسرار الشركات من خلال استخدام تكنولوجيا مشاركة الأحلام، يتم تكليفه بالمهمة العكسية وهي زرع فكرة في عقل الرئيس التنفيذي.",
    quality: ["720p", "1080p", "4K"],
    languageAudio: ["English", "Arabic", "French"],
    languageSubtitles: ["English", "Arabic", "French", "Spanish"],
    featured: true
  },
  {
    id: 2,
    titleEn: "The Shawshank Redemption",
    titleAr: "الخلاص من شاوشانك",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=600&auto=format&fit=crop",
    year: 1994,
    rating: 9.3,
    duration: "2h 22m",
    genresEn: ["Drama"],
    genresAr: ["دراما"],
    descriptionEn: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    descriptionAr: "يبني رجلان مسجونان علاقة على مدار عدة سنوات، ويجدان العزاء والخلاص في النهاية من خلال أعمال اللطف المشتركة.",
    quality: ["720p", "1080p", "4K"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "French"],
    featured: true
  },
  {
    id: 3,
    titleEn: "The Dark Knight",
    titleAr: "الفارس الأسود",
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=1200&h=600&auto=format&fit=crop",
    year: 2008,
    rating: 9.0,
    duration: "2h 32m",
    genresEn: ["Action", "Crime", "Drama"],
    genresAr: ["أكشن", "جريمة", "دراما"],
    descriptionEn: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    descriptionAr: "عندما ينشر الخطر المعروف باسم الجوكر الدمار والفوضى على سكان غوثام، يجب على باتمان أن يقبل واحدة من أعظم الاختبارات النفسية والجسدية لقدرته على محاربة الظلم.",
    quality: ["720p", "1080p"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "Spanish"],
    featured: true
  },
  {
    id: 4,
    titleEn: "Pulp Fiction",
    titleAr: "قصة العامة",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&h=600&auto=format&fit=crop",
    year: 1994,
    rating: 8.9,
    duration: "2h 34m",
    genresEn: ["Crime", "Drama"],
    genresAr: ["جريمة", "دراما"],
    descriptionEn: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    descriptionAr: "تتشابك حياة اثنين من قتلة المافيا، وملاكم، وعصابة وزوجته، وزوج من قطاع الطرق في أربع قصص من العنف والخلاص.",
    quality: ["720p", "1080p"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "French"]
  },
  {
    id: 5,
    titleEn: "The Godfather",
    titleAr: "العراب",
    posterUrl: "https://images.unsplash.com/photo-1615416141988-36a895492cfc?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1518462592603-0b6bac106032?w=1200&h=600&auto=format&fit=crop",
    year: 1972,
    rating: 9.2,
    duration: "2h 55m",
    genresEn: ["Crime", "Drama"],
    genresAr: ["جريمة", "دراما"],
    descriptionEn: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    descriptionAr: "الأب المسن لأسرة الجريمة المنظمة ينقل سيطرته على إمبراطوريته السرية إلى ابنه المتردد.",
    quality: ["720p", "1080p", "4K"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "French", "Spanish"],
    featured: true
  },
  {
    id: 6,
    titleEn: "Fight Club",
    titleAr: "نادي القتال",
    posterUrl: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1200&h=600&auto=format&fit=crop",
    year: 1999,
    rating: 8.8,
    duration: "2h 19m",
    genresEn: ["Drama"],
    genresAr: ["دراما"],
    descriptionEn: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    descriptionAr: "يشكل موظف مكتب مصاب بالأرق وصانع صابون متهور نادي قتال سري يتطور إلى شيء أكثر بكثير.",
    quality: ["720p", "1080p"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "French"]
  },
  {
    id: 7,
    titleEn: "Forrest Gump",
    titleAr: "فورست جامب",
    posterUrl: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&auto=format&fit=crop",
    year: 1994,
    rating: 8.8,
    duration: "2h 22m",
    genresEn: ["Drama", "Romance"],
    genresAr: ["دراما", "رومانسية"],
    descriptionEn: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    descriptionAr: "تتكشف رئاسة كينيدي وجونسون، وأحداث فيتنام، ووترغيت، وغيرها من الأحداث التاريخية من منظور رجل ألاباما بمعدل ذكاء 75، الذي يرغب فقط في أن يعود مع حبيبة طفولته.",
    quality: ["720p", "1080p", "4K"],
    languageAudio: ["English", "Arabic"],
    languageSubtitles: ["English", "Arabic", "Spanish"]
  },
  {
    id: 8,
    titleEn: "The Matrix",
    titleAr: "المصفوفة",
    posterUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&auto=format&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&auto=format&fit=crop",
    year: 1999,
    rating: 8.7,
    duration: "2h 16m",
    genresEn: ["Action", "Sci-Fi"],
    genresAr: ["أكشن", "خيال علمي"],
    descriptionEn: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    descriptionAr: "يتعلم قرصان كمبيوتر من متمردين غامضين عن الطبيعة الحقيقية لواقعه ودوره في الحرب ضد مراقبيه.",
    quality: ["720p", "1080p", "4K"],
    languageAudio: ["English", "Arabic", "French"],
    languageSubtitles: ["English", "Arabic", "French", "Spanish"],
    featured: true
  }
];

export const genres = {
  en: [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
    "Drama", "Family", "Fantasy", "History", "Horror", "Music", 
    "Mystery", "Romance", "Science Fiction", "Thriller", "War", "Western"
  ],
  ar: [
    "أكشن", "مغامرة", "رسوم متحركة", "كوميديا", "جريمة", "وثائقي", 
    "دراما", "عائلي", "خيال", "تاريخي", "رعب", "موسيقى", 
    "غموض", "رومانسية", "خيال علمي", "إثارة", "حرب", "غربي"
  ]
};

export const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

export const qualities = ["720p", "1080p", "2K", "4K", "HDR"];

import axios from 'axios';

// تكوين axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // سيتم تغيير هذا لاحقاً
    headers: {
        'Content-Type': 'application/json',
    },
});

// معالج الأخطاء
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// دالة لتحديث لغة الطلبات
export const setApiLanguage = (language: string) => {
    api.defaults.headers['Accept-Language'] = language;
};

export default api; 

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data (in a real app, this would come from your database)
const viewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 2000 },
  { name: "Apr", views: 2780 },
  { name: "May", views: 1890 },
  { name: "Jun", views: 2390 },
  { name: "Jul", views: 3490 },
];

const genreData = [
  { name: "Action", value: 400 },
  { name: "Comedy", value: 300 },
  { name: "Drama", value: 300 },
  { name: "Horror", value: 200 },
  { name: "Sci-Fi", value: 100 },
];

const GENRE_COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

const userActivityData = [
  { name: "Mon", active: 120, new: 20 },
  { name: "Tue", active: 132, new: 25 },
  { name: "Wed", active: 101, new: 18 },
  { name: "Thu", active: 134, new: 22 },
  { name: "Fri", active: 190, new: 35 },
  { name: "Sat", active: 230, new: 48 },
  { name: "Sun", active: 210, new: 40 },
];

const StatisticsManager = () => {
  const { language, isRTL } = useLanguage();
  const [timeRange, setTimeRange] = useState("week");
  
  // In a real app, you would fetch different data based on the time range
  // For this demo, we'll just use the same data
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className={cn(
          "text-3xl font-bold mb-4 md:mb-0",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'Statistics & Analytics' : 'الإحصائيات والتحليلات'}
        </h2>
        
        <div className="flex items-center gap-2">
          <span className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Time Range:' : 'النطاق الزمني:'}
          </span>
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'en' ? "Select range" : "اختر النطاق"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{language === 'en' ? "Last 24 hours" : "آخر 24 ساعة"}</SelectItem>
              <SelectItem value="week">{language === 'en' ? "Last 7 days" : "آخر 7 أيام"}</SelectItem>
              <SelectItem value="month">{language === 'en' ? "Last 30 days" : "آخر 30 يوم"}</SelectItem>
              <SelectItem value="year">{language === 'en' ? "Last 12 months" : "آخر 12 شهر"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Overview' : 'نظرة عامة'}
          </TabsTrigger>
          <TabsTrigger value="users" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Users' : 'المستخدمون'}
          </TabsTrigger>
          <TabsTrigger value="content" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Content' : 'المحتوى'}
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Total Views' : 'إجمالي المشاهدات'}
                </CardTitle>
                <CardDescription className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Across all movies and content' : 'عبر جميع الأفلام والمحتوى'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24,892</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 12%</span> {language === 'en' ? 'from last period' : 'من الفترة السابقة'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Active Users' : 'المستخدمون النشطون'}
                </CardTitle>
                <CardDescription className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Currently active on the platform' : 'نشطون حاليًا على المنصة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 8%</span> {language === 'en' ? 'from last period' : 'من الفترة السابقة'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'New Registrations' : 'التسجيلات الجديدة'}
                </CardTitle>
                <CardDescription className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'New user signups' : 'تسجيلات المستخدمين الجدد'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">258</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-emerald-500">↑ 15%</span> {language === 'en' ? 'from last period' : 'من الفترة السابقة'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Views Trend' : 'اتجاه المشاهدات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={viewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Genre Distribution' : 'توزيع الأنواع'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'User Activity' : 'نشاط المستخدم'}
              </CardTitle>
              <CardDescription className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'Active users and new registrations' : 'المستخدمون النشطون والتسجيلات الجديدة'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name={language === 'en' ? "Active Users" : "المستخدمون النشطون"} fill="#8884d8" />
                    <Bar dataKey="new" name={language === 'en' ? "New Users" : "المستخدمون الجدد"} fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* More user stats could be added here */}
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Top Movies' : 'أفضل الأفلام'}
                </CardTitle>
                <CardDescription className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Most viewed movies' : 'الأفلام الأكثر مشاهدة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">The Shawshank Redemption</p>
                      <p className="text-sm text-muted-foreground">Drama</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">12,345 {language === 'en' ? 'views' : 'مشاهدة'}</p>
                      <p className="text-sm text-emerald-500">↑ 10%</p>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">The Godfather</p>
                      <p className="text-sm text-muted-foreground">Crime</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">10,987 {language === 'en' ? 'views' : 'مشاهدة'}</p>
                      <p className="text-sm text-emerald-500">↑ 8%</p>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">The Dark Knight</p>
                      <p className="text-sm text-muted-foreground">Action</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">9,876 {language === 'en' ? 'views' : 'مشاهدة'}</p>
                      <p className="text-sm text-emerald-500">↑ 12%</p>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pulp Fiction</p>
                      <p className="text-sm text-muted-foreground">Crime</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">8,765 {language === 'en' ? 'views' : 'مشاهدة'}</p>
                      <p className="text-sm text-red-500">↓ 3%</p>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Inception</p>
                      <p className="text-sm text-muted-foreground">Sci-Fi</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">7,654 {language === 'en' ? 'views' : 'مشاهدة'}</p>
                      <p className="text-sm text-emerald-500">↑ 5%</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Content Statistics' : 'إحصائيات المحتوى'}
                </CardTitle>
                <CardDescription className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Overview of content metrics' : 'نظرة عامة على مقاييس المحتوى'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Total Movies' : 'إجمالي الأفلام'}
                    </p>
                    <p className="font-bold">1,234</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Total TV Shows' : 'إجمالي المسلسلات'}
                    </p>
                    <p className="font-bold">567</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Average Rating' : 'متوسط التقييم'}
                    </p>
                    <p className="font-bold">4.7/5</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Comments' : 'التعليقات'}
                    </p>
                    <p className="font-bold">45,678</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Total Hours Watched' : 'إجمالي ساعات المشاهدة'}
                    </p>
                    <p className="font-bold">987,654</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsManager;

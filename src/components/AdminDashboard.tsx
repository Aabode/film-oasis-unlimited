import { useEffect, useState } from "react";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Film, Users, Eye, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";

interface Statistics {
  kpis: {
    totalMovies: number;
    totalUsers: number;
    totalViews: number;
    avgWatchTime: number;
  };
  monthlyData: {
    name: string;
    viewers: number;
    members: number;
    downloads: number;
  }[];
  weeklyData: {
    name: string;
    views: number;
  }[];
}

const AdminDashboard = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await api.get('/statistics');
        setStatistics(response.data);
        setError(null);
      } catch (err) {
        setError(language === 'en' ? 'Failed to load statistics' : 'فشل في تحميل الإحصائيات');
        toast({
          variant: "destructive",
          title: language === 'en' ? "Error" : "خطأ",
          description: language === 'en' ? "Failed to load statistics" : "فشل في تحميل الإحصائيات",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [language, toast]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  // KPI data
  const kpis = [
    {
      title: language === 'en' ? 'Total Movies' : 'إجمالي الأفلام',
      value: statistics.kpis.totalMovies.toLocaleString(),
      change: '+12%', // يمكن إضافة حساب النسبة المئوية للتغيير
      isPositive: true,
      icon: Film,
    },
    {
      title: language === 'en' ? 'Active Users' : 'المستخدمون النشطون',
      value: statistics.kpis.totalUsers.toLocaleString(),
      change: '+25%', // يمكن إضافة حساب النسبة المئوية للتغيير
      isPositive: true,
      icon: Users,
    },
    {
      title: language === 'en' ? 'Total Views' : 'إجمالي المشاهدات',
      value: statistics.kpis.totalViews.toLocaleString(),
      change: '+18%', // يمكن إضافة حساب النسبة المئوية للتغيير
      isPositive: true,
      icon: Eye,
    },
    {
      title: language === 'en' ? 'Avg. Watch Time' : 'متوسط وقت المشاهدة',
      value: `${statistics.kpis.avgWatchTime} min`,
      change: '-5%', // يمكن إضافة حساب النسبة المئوية للتغيير
      isPositive: false,
      icon: Film,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={cn(
          "text-3xl font-bold",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'Dashboard' : 'لوحة المعلومات'}
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  "text-sm font-medium",
                  isRTL ? "font-arabic" : "font-sans"
                )}>
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className={cn(
                "flex items-center text-sm",
                kpi.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {kpi.isPositive ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
                {kpi.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className={cn(
              isRTL ? "font-arabic" : "font-sans"
            )}>
              {language === 'en' ? 'Monthly Performance' : 'الأداء الشهري'}
            </CardTitle>
            <CardDescription className={cn(
              isRTL ? "font-arabic" : "font-sans"
            )}>
              {language === 'en' ? 'Viewing and membership statistics' : 'إحصائيات المشاهدة والعضوية'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={statistics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="viewers" name={language === 'en' ? 'Viewers' : 'المشاهدون'} fill="#8884d8" />
                <Bar dataKey="members" name={language === 'en' ? 'Members' : 'الأعضاء'} fill="#82ca9d" />
                <Bar dataKey="downloads" name={language === 'en' ? 'Downloads' : 'التنزيلات'} fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Views */}
        <Card>
          <CardHeader>
            <CardTitle className={cn(
              isRTL ? "font-arabic" : "font-sans"
            )}>
              {language === 'en' ? 'Weekly Views' : 'المشاهدات الأسبوعية'}
            </CardTitle>
            <CardDescription className={cn(
              isRTL ? "font-arabic" : "font-sans"
            )}>
              {language === 'en' ? 'Daily view count for the past week' : 'عدد المشاهدات اليومية للأسبوع الماضي'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={statistics.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  name={language === 'en' ? 'Views' : 'المشاهدات'} 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

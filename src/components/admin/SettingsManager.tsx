import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  Globe, 
  Moon, 
  Sun, 
  Monitor, 
  Save,
  Bell,
  Mail,
  ShieldCheck,
  Trash2,
  Database,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SettingsManager = () => {
  const { language, isRTL, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [theme, setTheme] = useState("system");
  
  // General settings
  const [siteName, setSiteName] = useState("Film Oasis");
  const [siteDescription, setSiteDescription] = useState("Your ultimate destination for movies and TV shows");
  const [contactEmail, setContactEmail] = useState("contact@filmoasis.com");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newMovieAlerts, setNewMovieAlerts] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  
  // Privacy settings
  const [dataRetentionDays, setDataRetentionDays] = useState("90");
  const [cookieConsent, setCookieConsent] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const handleSaveSettings = (section: string) => {
    toast({
      title: language === 'en' ? "Settings Saved" : "تم حفظ الإعدادات",
      description: language === 'en' 
        ? `${section} settings have been updated successfully` 
        : `تم تحديث إعدادات ${section === 'General' ? 'العامة' : section === 'Appearance' ? 'المظهر' : section === 'Notifications' ? 'الإشعارات' : 'الخصوصية'} بنجاح`,
    });
  };

  const handleChangeTheme = (value: string) => {
    setTheme(value);
    toast({
      title: language === 'en' ? "Theme Updated" : "تم تحديث السمة",
      description: language === 'en' 
        ? `Theme has been set to ${value}` 
        : `تم تعيين السمة إلى ${value === 'light' ? 'الوضع النهاري' : value === 'dark' ? 'الوضع الليلي' : 'إعدادات النظام'}`,
    });
  };

  const handleChangeLanguage = (value: "en" | "ar") => {
    setLanguage(value);
    toast({
      title: value === 'en' ? "Language Updated" : "تم تحديث اللغة",
      description: value === 'en' 
        ? "Language has been set to English" 
        : "تم تعيين اللغة إلى العربية",
    });
  };

  const handleClearCache = () => {
    toast({
      title: language === 'en' ? "Cache Cleared" : "تم مسح ذاكرة التخزين المؤقت",
      description: language === 'en' 
        ? "System cache has been cleared successfully" 
        : "تم مسح ذاكرة التخزين المؤقت للنظام بنجاح",
    });
  };

  const handleBackupData = () => {
    toast({
      title: language === 'en' ? "Backup Created" : "تم إنشاء نسخة احتياطية",
      description: language === 'en' 
        ? "Database backup has been created successfully" 
        : "تم إنشاء نسخة احتياطية من قاعدة البيانات بنجاح",
    });
  };

  return (
    <div className="p-6">
      <h2 className={cn(
        "text-3xl font-bold mb-6",
        isRTL ? "font-arabic" : "font-sans"
      )}>
        {language === 'en' ? 'System Settings' : 'إعدادات النظام'}
      </h2>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="general" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'General' : 'عام'}
          </TabsTrigger>
          <TabsTrigger value="appearance" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Appearance' : 'المظهر'}
          </TabsTrigger>
          <TabsTrigger value="notifications" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Notifications' : 'الإشعارات'}
          </TabsTrigger>
          <TabsTrigger value="privacy" className={isRTL ? "font-arabic" : ""}>
            {language === 'en' ? 'Privacy' : 'الخصوصية'}
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'General Settings' : 'الإعدادات العامة'}
              </CardTitle>
              <CardDescription className={isRTL ? "font-arabic" : ""}>
                {language === 'en' 
                  ? 'Manage your site details and contact information' 
                  : 'إدارة تفاصيل موقعك ومعلومات الاتصال'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Site Name' : 'اسم الموقع'}
                </Label>
                <Input 
                  id="site-name" 
                  value={siteName} 
                  onChange={(e) => setSiteName(e.target.value)} 
                  className={isRTL ? "text-right" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Site Description' : 'وصف الموقع'}
                </Label>
                <Textarea 
                  id="site-description" 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                  className={isRTL ? "text-right" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Contact Email' : 'البريد الإلكتروني للتواصل'}
                </Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  value={contactEmail} 
                  onChange={(e) => setContactEmail(e.target.value)} 
                  className={isRTL ? "text-right" : ""}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="system">
                  <AccordionTrigger className={isRTL ? "font-arabic" : ""}>
                    {language === 'en' ? 'System Maintenance' : 'صيانة النظام'}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          onClick={handleClearCache}
                          className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className={isRTL ? "font-arabic" : ""}>
                            {language === 'en' ? 'Clear Cache' : 'مسح ذاكرة التخزين المؤقت'}
                          </span>
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleBackupData}
                          className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
                        >
                          <Database className="h-4 w-4" />
                          <span className={isRTL ? "font-arabic" : ""}>
                            {language === 'en' ? 'Backup Database' : 'ن��خ قاعدة البيانات'}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('General')}
                className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
              >
                <Save className="h-4 w-4" />
                <span className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Save Settings' : 'حفظ الإعدادات'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'Appearance Settings' : 'إعدادات المظهر'}
              </CardTitle>
              <CardDescription className={isRTL ? "font-arabic" : ""}>
                {language === 'en' 
                  ? 'Customize the look and feel of your site' 
                  : 'تخصيص مظهر وإحساس موقعك'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language-select" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Language' : 'اللغة'}
                </Label>
                <div className="flex items-center gap-4">
                  <Globe className="h-4 w-4" />
                  <Select 
                    value={language} 
                    onValueChange={(value: "en" | "ar") => handleChangeLanguage(value)}
                  >
                    <SelectTrigger id="language-select" className="w-[180px]">
                      <SelectValue placeholder={language === 'en' ? 'Select language' : 'اختر اللغة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme-select" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Theme' : 'السمة'}
                </Label>
                <div className="flex items-center gap-4">
                  {theme === 'light' ? (
                    <Sun className="h-4 w-4" />
                  ) : theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                  <Select 
                    value={theme} 
                    onValueChange={handleChangeTheme}
                  >
                    <SelectTrigger id="theme-select" className="w-[180px]">
                      <SelectValue placeholder={language === 'en' ? 'Select theme' : 'اختر السمة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        {language === 'en' ? 'Light' : 'فاتح'}
                      </SelectItem>
                      <SelectItem value="dark">
                        {language === 'en' ? 'Dark' : 'داكن'}
                      </SelectItem>
                      <SelectItem value="system">
                        {language === 'en' ? 'System' : 'النظام'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rtl-toggle" className={isRTL ? "font-arabic" : ""}>
                    {language === 'en' ? 'Right-to-Left (RTL) Mode' : 'وضع اليمين إلى اليسار'}
                  </Label>
                  <Switch 
                    id="rtl-toggle" 
                    checked={isRTL} 
                    // Note: This is just for demo, it's actually controlled by language context
                    onCheckedChange={(checked) => handleChangeLanguage(checked ? 'ar' : 'en')}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Enable right-to-left text direction for Arabic and other RTL languages' 
                    : 'تمكين اتجاه النص من اليمين إلى اليسار للغة العربية واللغات الأخرى ذات الاتجاه من اليمين إلى اليسار'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('Appearance')}
                className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
              >
                <Save className="h-4 w-4" />
                <span className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Save Settings' : 'حفظ الإعدادات'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}
              </CardTitle>
              <CardDescription className={isRTL ? "font-arabic" : ""}>
                {language === 'en' 
                  ? 'Manage how users are notified about site activities' 
                  : 'إدارة كيفية إخطار المستخدمين بأنشطة الموقع'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="email-notifications" className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Email Notifications' : 'إشعارات البريد الإلكتروني'}
                    </Label>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Send notifications to users via email' 
                    : 'إرسال إشعارات للمستخدمين عبر البريد الإلكتروني'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="new-movie-alerts" className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'New Movie Alerts' : 'تنبيهات الأفلام الجديدة'}
                    </Label>
                  </div>
                  <Switch 
                    id="new-movie-alerts" 
                    checked={newMovieAlerts} 
                    onCheckedChange={setNewMovieAlerts}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Notify users when new movies are added to the platform' 
                    : 'إخطار المستخدمين عند إضافة أفلام جديدة إلى المنصة'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <Label htmlFor="comment-notifications" className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Comment Notifications' : 'إشعارات التعليقات'}
                    </Label>
                  </div>
                  <Switch 
                    id="comment-notifications" 
                    checked={commentNotifications} 
                    onCheckedChange={setCommentNotifications}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Notify users when someone replies to their comments' 
                    : 'إخطار المستخدمين عندما يرد شخص ما على تعليقاتهم'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('Notifications')}
                className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
              >
                <Save className="h-4 w-4" />
                <span className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Save Settings' : 'حفظ الإعدادات'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "font-arabic" : ""}>
                {language === 'en' ? 'Privacy Settings' : 'إعدادات الخصوصية'}
              </CardTitle>
              <CardDescription className={isRTL ? "font-arabic" : ""}>
                {language === 'en' 
                  ? 'Manage data privacy and protection settings' 
                  : 'إدارة إعدادات خصوصية البيانات وحمايتها'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-retention" className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Data Retention Period (days)' : 'فترة الاحتفاظ بالبيانات (أيام)'}
                </Label>
                <div className="flex items-center gap-4">
                  <Database className="h-4 w-4" />
                  <Input 
                    id="data-retention"
                    type="number"
                    value={dataRetentionDays}
                    onChange={(e) => setDataRetentionDays(e.target.value)}
                    min="1"
                    max="365"
                    className="w-[120px]"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Number of days to retain user activity data' 
                    : 'عدد الأيام للاحتفاظ ببيانات نشاط المستخدم'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <Label htmlFor="cookie-consent" className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Cookie Consent Popup' : 'نافذة موافقة ملفات تعريف الارتباط'}
                    </Label>
                  </div>
                  <Switch 
                    id="cookie-consent" 
                    checked={cookieConsent} 
                    onCheckedChange={setCookieConsent}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Show cookie consent popup for new visitors' 
                    : 'عرض نافذة منبثقة للموافقة على ملفات تعريف الارتباط للزوار الجدد'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <Label htmlFor="analytics-enabled" className={isRTL ? "font-arabic" : ""}>
                      {language === 'en' ? 'Analytics Tracking' : 'تتبع التحليلات'}
                    </Label>
                  </div>
                  <Switch 
                    id="analytics-enabled" 
                    checked={analyticsEnabled} 
                    onCheckedChange={setAnalyticsEnabled}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Enable analytics to track user behavior on the site' 
                    : 'تمكين التحليلات لتتبع سلوك المستخدم على الموقع'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSaveSettings('Privacy')}
                className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
              >
                <Save className="h-4 w-4" />
                <span className={isRTL ? "font-arabic" : ""}>
                  {language === 'en' ? 'Save Settings' : 'حفظ الإعدادات'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;

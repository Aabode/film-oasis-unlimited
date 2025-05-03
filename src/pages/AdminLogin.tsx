
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check credentials
      if ((email === "admin@filmoasis.com" && password === "admin123") || 
          (email === "c.ronaldo05075@gmail.com" && password === "abode1290")) {
        toast({
          title: language === 'en' ? "Login Successful" : "تم تسجيل الدخول بنجاح",
          description: language === 'en' ? "Welcome to admin panel" : "مرحبًا بك في لوحة التحكم",
        });
        // Store admin token in localStorage (replace with proper auth token)
        localStorage.setItem("adminToken", "temp-admin-token");
        navigate("/admin");
      } else {
        toast({
          variant: "destructive",
          title: language === 'en' ? "Login Failed" : "فشل تسجيل الدخول",
          description: language === 'en' ? "Invalid credentials" : "بيانات الاعتماد غير صالحة",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Failed to login" : "فشل تسجيل الدخول",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 space-y-8 rounded-xl border border-border/40 shadow-lg bg-card">
        <div className="text-center">
          <h2 className={cn(
            "text-2xl font-bold tracking-tight",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === 'en' ? "Admin Panel Login" : "تسجيل الدخول للوحة التحكم"}
          </h2>
          <p className={cn(
            "text-sm text-muted-foreground mt-2",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === 'en' 
              ? "Enter your credentials to access the admin panel" 
              : "أدخل بيانات الاعتماد للوصول إلى لوحة التحكم"}
          </p>
        </div>
        
        <form onSubmit={handleLogin} className={cn("space-y-6", isRTL && "text-right")}>
          <div className="space-y-2">
            <Label htmlFor="email" className={isRTL ? "font-arabic" : "font-sans"}>
              {language === 'en' ? "Email" : "البريد الإلكتروني"}
            </Label>
            <Input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? "admin@example.com" : "admin@example.com"}
              required
              className={isRTL ? "text-right font-arabic" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className={isRTL ? "font-arabic" : "font-sans"}>
              {language === 'en' ? "Password" : "كلمة المرور"}
            </Label>
            <Input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'en' ? "••••••••" : "••••••••"}
              required
              className={isRTL ? "text-right font-arabic" : ""}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <span className={isRTL ? "font-arabic" : "font-sans"}>
                {language === 'en' ? "Loading..." : "جاري التحميل..."}
              </span>
            ) : (
              <span className={isRTL ? "font-arabic" : "font-sans"}>
                {language === 'en' ? "Sign In" : "تسجيل الدخول"}
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

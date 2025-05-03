
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Film,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Database
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}

export function AdminSidebar({ activePage = "dashboard", setActivePage }: AdminSidebarProps) {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sidebarItems = [
    {
      id: "dashboard",
      title: language === "en" ? "Dashboard" : "لوحة التحكم",
      icon: LayoutDashboard,
    },
    {
      id: "movies",
      title: language === "en" ? "Movies" : "الأفلام",
      icon: Film,
    },
    {
      id: "tmdb",
      title: language === "en" ? "TMDB" : "TMDB",
      icon: Database,
    },
    {
      id: "users",
      title: language === "en" ? "Users" : "المستخدمون",
      icon: Users,
    },
    {
      id: "comments",
      title: language === "en" ? "Comments" : "التعليقات",
      icon: MessageSquare,
    },
    {
      id: "statistics",
      title: language === "en" ? "Statistics" : "الإحصائيات",
      icon: BarChart3,
    },
    {
      id: "settings",
      title: language === "en" ? "Settings" : "الإعدادات",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem("adminToken");
    
    toast({
      title: language === 'en' ? "Logged out" : "تم تسجيل الخروج",
      description: language === 'en' ? "You have been logged out successfully" : "تم تسجيل الخروج بنجاح",
    });
    
    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <Sidebar variant="inset" side={isRTL ? "right" : "left"}>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-center gap-2">
          <Film className="w-6 h-6 text-primary-purple" />
          <h2 className={cn(
            "text-xl font-bold",
            isRTL ? "font-arabic" : "font-sans"
          )}>
            {language === "en" ? "Admin Panel" : "لوحة التحكم"}
          </h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isRTL ? "font-arabic" : "font-sans"}>
            {language === "en" ? "Management" : "الإدارة"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activePage === item.id}
                    className={isRTL ? "flex-row-reverse" : ""}
                    onClick={() => setActivePage(item.id)}
                  >
                    <item.icon className="shrink-0" />
                    <span className={isRTL ? "font-arabic mr-2" : ""}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-md hover:bg-accent text-sm font-medium",
            isRTL ? "flex-row-reverse font-arabic" : ""
          )}
        >
          <LogOut className={cn("w-5 h-5", isRTL ? "ml-2" : "mr-2")} />
          <span>{language === "en" ? "Log Out" : "تسجيل الخروج"}</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

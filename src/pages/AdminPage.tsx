
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import AdminDashboard from "@/components/AdminDashboard";
import MoviesManager from "@/components/admin/MoviesManager";
import UsersManager from "@/components/admin/UsersManager";
import CommentsManager from "@/components/admin/CommentsManager";
import StatisticsManager from "@/components/admin/StatisticsManager";
import SettingsManager from "@/components/admin/SettingsManager";
import TMDBManager from "@/components/admin/TMDBManager";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    
    if (!adminToken) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Please login to access the admin panel",
      });
      navigate("/admin/login");
    } else {
      // In a real app, you would verify the token with your backend
      setLoading(false);
    }
  }, [navigate, toast]);

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />;
      case "movies":
        return <MoviesManager />;
      case "users":
        return <UsersManager />;
      case "comments":
        return <CommentsManager />;
      case "statistics":
        return <StatisticsManager />;
      case "settings":
        return <SettingsManager />;
      case "tmdb":
        return <TMDBManager />;
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-purple"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
        <SidebarInset>
          {renderActivePage()}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;

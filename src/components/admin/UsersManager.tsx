
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Search, UserPlus, Shield, User, Eye, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Sample user data (in a real app, this would come from your database)
const sampleUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin", status: "active", joined: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joined: "2023-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive", joined: "2023-03-10" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "moderator", status: "active", joined: "2023-04-05" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active", joined: "2023-05-12" },
];

const UsersManager = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(sampleUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (id: number, action: 'view' | 'ban' | 'promote') => {
    let title = '';
    let description = '';

    switch (action) {
      case 'view':
        title = language === 'en' ? "View User Details" : "عرض تفاصيل المستخدم";
        description = language === 'en' ? `Viewing user with ID: ${id}` : `عرض المستخدم بمعرف: ${id}`;
        break;
      case 'ban':
        title = language === 'en' ? "User Status Changed" : "تم تغيير حالة المستخدم";
        description = language === 'en' ? `User with ID: ${id} has been banned` : `تم حظر المستخدم بمعرف: ${id}`;
        
        // Update the user status in the state
        setUsers(users.map(user => 
          user.id === id ? {...user, status: user.status === 'active' ? 'inactive' : 'active'} : user
        ));
        break;
      case 'promote':
        title = language === 'en' ? "User Role Changed" : "تم تغيير دور المستخدم";
        description = language === 'en' ? `User with ID: ${id} has been promoted to moderator` : `تمت ترقية المستخدم بمعرف: ${id} إلى مشرف`;
        
        // Update the user role in the state
        setUsers(users.map(user => 
          user.id === id ? {...user, role: user.role === 'user' ? 'moderator' : 'user'} : user
        ));
        break;
    }

    toast({ title, description });
  };

  const handleAddUser = () => {
    toast({
      title: language === 'en' ? "Add User" : "إضافة مستخدم",
      description: language === 'en' ? "Add a new user" : "إضافة مستخدم جديد",
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive" className="capitalize">{role}</Badge>;
      case 'moderator':
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-700 capitalize">{role}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge variant="default" className="bg-green-500 hover:bg-green-700 capitalize">{status}</Badge>
      : <Badge variant="secondary" className="capitalize">{status}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className={cn(
          "text-3xl font-bold mb-4 md:mb-0",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'Users Management' : 'إدارة المستخدمين'}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? "Search users..." : "البحث عن مستخدمين..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn("pl-9 w-full sm:w-[250px]", isRTL && "text-right pr-9 pl-3")}
            />
          </div>
          
          <Button 
            onClick={handleAddUser}
            className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
          >
            <UserPlus className="h-4 w-4" />
            <span className={isRTL ? "font-arabic" : ""}>
              {language === 'en' ? 'Add User' : 'إضافة مستخدم'}
            </span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'User' : 'المستخدم'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Role' : 'الدور'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Status' : 'الحالة'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Joined' : 'تاريخ الانضمام'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'en' ? 'Actions' : 'الإجراءات'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className={cn("font-medium", isRTL && "text-right")}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>
                    {new Date(user.joined).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleUserAction(user.id, 'view')}
                        title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleUserAction(user.id, 'promote')}
                        title={language === 'en' ? 'Change Role' : 'تغيير الدور'}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleUserAction(user.id, 'ban')}
                        title={language === 'en' ? 'Toggle Status' : 'تغيير الحالة'}
                      >
                        <Ban className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <span className={isRTL ? "font-arabic" : ""}>
                    {language === 'en' ? 'No users found.' : 'لم يتم العثور على مستخدمين.'}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersManager;

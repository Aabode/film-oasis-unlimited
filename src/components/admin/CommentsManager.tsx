
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Search, MessageSquare, Check, X, AlertCircle } from "lucide-react";
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

// Sample comment data (in a real app, this would come from your database)
const sampleComments = [
  { 
    id: 1, 
    user: "John Doe", 
    movie: "The Shawshank Redemption", 
    content: "One of the best movies I've ever seen!", 
    date: "2024-03-15", 
    status: "approved" 
  },
  { 
    id: 2, 
    user: "Jane Smith", 
    movie: "The Godfather", 
    content: "A classic masterpiece that everyone should watch.", 
    date: "2024-03-14", 
    status: "pending" 
  },
  { 
    id: 3, 
    user: "Bob Johnson", 
    movie: "The Dark Knight", 
    content: "Heath Ledger's performance was extraordinary!", 
    date: "2024-03-12", 
    status: "approved" 
  },
  { 
    id: 4, 
    user: "Alice Williams", 
    movie: "Pulp Fiction", 
    content: "This movie contains inappropriate content and should be banned!", 
    date: "2024-03-10", 
    status: "flagged" 
  },
  { 
    id: 5, 
    user: "Charlie Brown", 
    movie: "The Matrix", 
    content: "Mind-blowing special effects, even after all these years.", 
    date: "2024-03-08", 
    status: "approved" 
  },
];

const CommentsManager = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [comments, setComments] = useState(sampleComments);
  const [filter, setFilter] = useState("all");

  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      comment.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return filter === "all" ? matchesSearch : (matchesSearch && comment.status === filter);
  });

  const handleCommentAction = (id: number, action: 'approve' | 'reject' | 'flag') => {
    let status: 'approved' | 'rejected' | 'flagged';
    let title: string;
    let description: string;

    switch (action) {
      case 'approve':
        status = 'approved';
        title = language === 'en' ? "Comment Approved" : "تمت الموافقة على التعليق";
        description = language === 'en' ? "The comment has been approved" : "تمت الموافقة على التعليق بنجاح";
        break;
      case 'reject':
        status = 'rejected';
        title = language === 'en' ? "Comment Rejected" : "تم رفض التعليق";
        description = language === 'en' ? "The comment has been rejected" : "تم رفض التعليق بنجاح";
        break;
      case 'flag':
        status = 'flagged';
        title = language === 'en' ? "Comment Flagged" : "تم تمييز التعليق";
        description = language === 'en' ? "The comment has been flagged for review" : "تم تمييز التعليق للمراجعة";
        break;
    }

    setComments(comments.map(comment => 
      comment.id === id ? {...comment, status} : comment
    ));

    toast({ title, description });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-700 capitalize">{status}</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="capitalize">{status}</Badge>;
      case 'flagged':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-700 capitalize">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className={cn(
          "text-3xl font-bold mb-4 md:mb-0",
          isRTL ? "font-arabic" : "font-sans"
        )}>
          {language === 'en' ? 'Comments Management' : 'إدارة التعليقات'}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? "Search comments..." : "البحث في التعليقات..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn("pl-9 w-full sm:w-[250px]", isRTL && "text-right pr-9 pl-3")}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={isRTL ? "font-arabic" : ""}
            >
              {language === 'en' ? 'All' : 'الكل'}
            </Button>
            <Button 
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className={isRTL ? "font-arabic" : ""}
            >
              {language === 'en' ? 'Pending' : 'قيد الانتظار'}
            </Button>
            <Button 
              variant={filter === "flagged" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("flagged")}
              className={isRTL ? "font-arabic" : ""}
            >
              {language === 'en' ? 'Flagged' : 'مميز للمراجعة'}
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Comment' : 'التعليق'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Status' : 'الحالة'}
              </TableHead>
              <TableHead className={isRTL ? "text-right font-arabic" : ""}>
                {language === 'en' ? 'Date' : 'التاريخ'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'en' ? 'Actions' : 'الإجراءات'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className={cn("max-w-md", isRTL && "text-right")}>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{comment.content}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {language === 'en' ? 'By' : 'بواسطة'} {comment.user} {language === 'en' ? 'on' : 'على'} "{comment.movie}"
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>{getStatusBadge(comment.status)}</TableCell>
                  <TableCell className={isRTL ? "text-right" : ""}>
                    {new Date(comment.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {comment.status !== 'approved' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCommentAction(comment.id, 'approve')}
                          title={language === 'en' ? 'Approve' : 'موافقة'}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      {comment.status !== 'rejected' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCommentAction(comment.id, 'reject')}
                          title={language === 'en' ? 'Reject' : 'رفض'}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                      {comment.status !== 'flagged' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCommentAction(comment.id, 'flag')}
                          title={language === 'en' ? 'Flag' : 'تمييز للمراجعة'}
                        >
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <span className={isRTL ? "font-arabic" : ""}>
                    {language === 'en' ? 'No comments found.' : 'لم يتم العثور على تعليقات.'}
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

export default CommentsManager;

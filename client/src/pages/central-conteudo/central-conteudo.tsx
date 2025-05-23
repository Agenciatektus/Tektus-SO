import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit3, Calendar, User, Globe } from "lucide-react";
import { insertContentSchema, type Content, type InsertContent, type Client } from "@shared/schema";
import { z } from "zod";
import { format } from "date-fns";

export default function ContentCenter() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [newContent, setNewContent] = useState<InsertContent>({
    title: "",
    description: "",
    content: "",
    clientId: null,
    authorId: 1, // This will be set from auth context
    status: "draft",
    platform: "",
    scheduledDate: null,
    tags: "",
  });

  const { data: content, isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createContentMutation = useMutation({
    mutationFn: async (contentData: InsertContent) => {
      const res = await apiRequest("POST", "/api/content", contentData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setIsAddDialogOpen(false);
      setNewContent({
        title: "",
        description: "",
        content: "",
        clientId: null,
        authorId: 1,
        status: "draft",
        platform: "",
        scheduledDate: null,
        tags: "",
      });
      toast({
        title: "Success",
        description: "Content created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertContentSchema.parse(newContent);
      await createContentMutation.mutateAsync(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0]?.message || "Please check your input",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "status-completed";
      case "approved":
        return "status-healthy";
      case "review":
        return "status-in-progress";
      case "draft":
        return "status-pending";
      default:
        return "";
    }
  };

  const getPlatformIcon = (platform: string) => {
    const commonPlatforms: { [key: string]: string } = {
      "facebook": "📘",
      "instagram": "📷",
      "twitter": "🐦",
      "linkedin": "💼",
      "youtube": "📺",
      "website": "🌐",
      "blog": "📝",
      "email": "📧",
    };
    
    return commonPlatforms[platform.toLowerCase()] || "📄";
  };

  const filteredContent = content?.filter(item => 
    selectedStatus === "all" || item.status === selectedStatus
  ) || [];

  const statusCounts = {
    all: content?.length || 0,
    draft: content?.filter(c => c.status === "draft").length || 0,
    review: content?.filter(c => c.status === "review").length || 0,
    approved: content?.filter(c => c.status === "approved").length || 0,
    published: content?.filter(c => c.status === "published").length || 0,
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Content Center"
          description="Manage your editorial calendar and content strategy"
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Content</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateContent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newContent.title}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                        placeholder="Content title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select
                        value={newContent.platform || ""}
                        onValueChange={(value) => setNewContent({ ...newContent, platform: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newContent.description || ""}
                      onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                      placeholder="Brief description of the content..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newContent.content || ""}
                      onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                      placeholder="Write your content here..."
                      rows={8}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client (Optional)</Label>
                      <Select
                        value={newContent.clientId?.toString() || ""}
                        onValueChange={(value) => setNewContent({ ...newContent, clientId: value ? parseInt(value) : null })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No client</SelectItem>
                          {clients?.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.name} - {client.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Scheduled Date (Optional)</Label>
                      <Input
                        id="scheduledDate"
                        type="datetime-local"
                        value={newContent.scheduledDate ? new Date(newContent.scheduledDate).toISOString().slice(0, 16) : ""}
                        onChange={(e) => setNewContent({ ...newContent, scheduledDate: e.target.value ? new Date(e.target.value) : null })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={newContent.tags || ""}
                      onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                      placeholder="social media, marketing, promotion (comma separated)"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createContentMutation.isPending}
                    >
                      {createContentMutation.isPending ? "Creating..." : "Create Content"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          }
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Status Filter Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted/30 p-1 rounded-lg w-fit">
            {[
              { key: "all", label: "All Content", count: statusCounts.all },
              { key: "draft", label: "Draft", count: statusCounts.draft },
              { key: "review", label: "Review", count: statusCounts.review },
              { key: "approved", label: "Approved", count: statusCounts.approved },
              { key: "published", label: "Published", count: statusCounts.published },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedStatus === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Edit3 className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-space font-semibold text-foreground mb-2">
                {selectedStatus === "all" ? "No content yet" : `No ${selectedStatus} content`}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {selectedStatus === "all" 
                  ? "Start building your content library by creating your first piece of content."
                  : `You don't have any ${selectedStatus} content at the moment.`
                }
              </p>
              {selectedStatus === "all" && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Content
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => {
                const client = clients?.find(c => c.id === item.clientId);
                return (
                  <Card key={item.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2 flex items-center space-x-2">
                            {item.platform && (
                              <span className="text-lg">
                                {getPlatformIcon(item.platform)}
                              </span>
                            )}
                            <span>{item.title}</span>
                          </CardTitle>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${getStatusBadgeClass(item.status)}`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.content && (
                        <div className="text-sm text-muted-foreground line-clamp-3">
                          {item.content}
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {client && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-2" />
                            {client.name} - {client.company}
                          </div>
                        )}
                        
                        {item.platform && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Globe className="w-4 h-4 mr-2" />
                            {item.platform}
                          </div>
                        )}
                        
                        {item.scheduledDate && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            Scheduled: {format(new Date(item.scheduledDate), "MMM d, yyyy HH:mm")}
                          </div>
                        )}
                        
                        {item.publishedDate && (
                          <div className="flex items-center text-sm text-green-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Published: {format(new Date(item.publishedDate), "MMM d, yyyy HH:mm")}
                          </div>
                        )}
                      </div>
                      
                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.split(',').map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

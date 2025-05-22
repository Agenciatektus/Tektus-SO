import { useState } from "react";
import { FileText, Upload, Download, Eye, Search, Filter, Tag, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'png' | 'jpg';
  category: 'HR' | 'Finance' | 'Legal' | 'Strategy' | 'Marketing' | 'Operations';
  tags: string[];
  uploader: string;
  uploadDate: string;
  fileSize: string;
  accessPermission: 'all' | 'restricted';
  description: string;
  downloadCount: number;
}

const fileTypeIcons = {
  pdf: "📄",
  docx: "📝", 
  xlsx: "📊",
  pptx: "📊",
  png: "🖼️",
  jpg: "🖼️"
};

const categoryColors = {
  HR: "bg-blue-100 text-blue-800",
  Finance: "bg-green-100 text-green-800",
  Legal: "bg-red-100 text-red-800",
  Strategy: "bg-purple-100 text-purple-800",
  Marketing: "bg-orange-100 text-orange-800",
  Operations: "bg-gray-100 text-gray-800"
};

export default function DocumentRepository() {
  const [documents] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Employee Handbook 2025",
      type: "pdf",
      category: "HR",
      tags: ["onboarding", "policies", "procedures"],
      uploader: "Alex Johnson",
      uploadDate: "2025-05-15",
      fileSize: "2.4 MB",
      accessPermission: "all",
      description: "Complete employee handbook including policies, benefits, and procedures",
      downloadCount: 23
    },
    {
      id: "doc-2",
      name: "Q2 Financial Report Template",
      type: "xlsx",
      category: "Finance", 
      tags: ["template", "reporting", "quarterly"],
      uploader: "Alex Johnson",
      uploadDate: "2025-05-10",
      fileSize: "1.8 MB",
      accessPermission: "restricted",
      description: "Standardized template for quarterly financial reporting",
      downloadCount: 12
    },
    {
      id: "doc-3",
      name: "Client Contract Template",
      type: "docx",
      category: "Legal",
      tags: ["contract", "template", "clients"],
      uploader: "Sarah Martinez",
      uploadDate: "2025-05-08",
      fileSize: "456 KB",
      accessPermission: "restricted",
      description: "Standard client service agreement template",
      downloadCount: 18
    },
    {
      id: "doc-4",
      name: "Brand Guidelines 2025",
      type: "pdf",
      category: "Marketing",
      tags: ["brand", "guidelines", "design"],
      uploader: "Emma Silva",
      uploadDate: "2025-05-05",
      fileSize: "5.2 MB", 
      accessPermission: "all",
      description: "Complete brand identity guidelines including logos, colors, and typography",
      downloadCount: 31
    },
    {
      id: "doc-5",
      name: "Agency Growth Strategy",
      type: "pptx",
      category: "Strategy",
      tags: ["strategy", "growth", "planning"],
      uploader: "Mike Chen",
      uploadDate: "2025-05-03",
      fileSize: "3.1 MB",
      accessPermission: "restricted",
      description: "Strategic roadmap for agency expansion and service development",
      downloadCount: 8
    },
    {
      id: "doc-6",
      name: "SOP - Content Creation Process",
      type: "pdf",
      category: "Operations",
      tags: ["sop", "content", "process"],
      uploader: "Emma Silva",
      uploadDate: "2025-04-28",
      fileSize: "1.2 MB",
      accessPermission: "all",
      description: "Standard operating procedures for content creation and approval",
      downloadCount: 15
    },
    {
      id: "doc-7",
      name: "Salary Ladder Framework",
      type: "xlsx",
      category: "HR",
      tags: ["salary", "compensation", "structure"],
      uploader: "Alex Johnson",
      uploadDate: "2025-04-25",
      fileSize: "890 KB",
      accessPermission: "restricted",
      description: "Comprehensive salary structure and progression framework",
      downloadCount: 7
    },
    {
      id: "doc-8",
      name: "Client Onboarding Checklist",
      type: "pdf",
      category: "Operations",
      tags: ["onboarding", "checklist", "clients"],
      uploader: "Mike Chen",
      uploadDate: "2025-04-20",
      fileSize: "678 KB",
      accessPermission: "all",
      description: "Step-by-step checklist for client onboarding process",
      downloadCount: 19
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPermission, setSelectedPermission] = useState("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesPermission = selectedPermission === "all" || doc.accessPermission === selectedPermission;
    
    return matchesSearch && matchesCategory && matchesPermission;
  });

  const handleDownload = (documentId: string) => {
    // In production: implement actual download functionality
    console.log(`Downloading document ${documentId}`);
  };

  const handlePreview = (documentId: string) => {
    // In production: implement document preview
    console.log(`Previewing document ${documentId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-teal-600" />
            Document Repository
          </h1>
          <p className="text-muted-foreground">
            Centralized document management and file sharing
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Legal">Legal</SelectItem>
            <SelectItem value="Strategy">Strategy</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedPermission} onValueChange={setSelectedPermission}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Access" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Access</SelectItem>
            <SelectItem value="all">Public</SelectItem>
            <SelectItem value="restricted">Restricted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(documents.map(doc => doc.category)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restricted Files</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(doc => doc.accessPermission === 'restricted').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{fileTypeIcons[document.type]}</span>
                  <div>
                    <CardTitle className="text-sm line-clamp-2">
                      {document.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {document.fileSize}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={categoryColors[document.category]}
                >
                  {document.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {document.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {document.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {document.uploader}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {document.uploadDate}
                </div>
                <div className="flex items-center justify-between">
                  <span>{document.downloadCount} downloads</span>
                  <Badge 
                    variant={document.accessPermission === 'all' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {document.accessPermission === 'all' ? 'Public' : 'Restricted'}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => handlePreview(document.id)}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => handleDownload(document.id)}
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No documents found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or upload a new document.
          </p>
        </div>
      )}
    </div>
  );
}
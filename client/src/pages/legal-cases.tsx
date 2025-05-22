import { useState } from "react";
import { Scale, FileText, User, Clock, Plus, MessageSquare, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LegalCase {
  id: string;
  title: string;
  client: string;
  internalOwner: string;
  status: 'open' | 'in_review' | 'in_process' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  description: string;
  attachments: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const columns = {
  open: { title: "📋 Open", color: "bg-blue-50 border-blue-200" },
  in_review: { title: "👀 In Review", color: "bg-yellow-50 border-yellow-200" },
  in_process: { title: "⚖️ In Process", color: "bg-orange-50 border-orange-200" },
  resolved: { title: "✅ Resolved", color: "bg-green-50 border-green-200" }
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-red-100 text-red-800"
};

export default function LegalCases() {
  const [legalCases, setLegalCases] = useState<LegalCase[]>([
    {
      id: "case-1",
      title: "CreativeHub Agency Contract Termination",
      client: "CreativeHub Agency",
      internalOwner: "Alex Johnson",
      status: "open",
      priority: "high",
      createdAt: "2025-05-22",
      description: "Client requesting early termination due to budget constraints. Need to review contract terms and negotiate exit conditions.",
      attachments: 3,
      comments: [
        {
          id: "comment-1",
          author: "Alex Johnson",
          text: "Initial contract review shows 30-day notice required. Checking penalty clauses.",
          timestamp: "2025-05-22 10:30"
        }
      ]
    },
    {
      id: "case-2",
      title: "FinanceFlow NDA Dispute",
      client: "FinanceFlow Inc",
      internalOwner: "Sarah Martinez",
      status: "in_review",
      priority: "medium",
      createdAt: "2025-05-20",
      description: "Potential breach of NDA regarding proprietary algorithm details. Legal team reviewing evidence.",
      attachments: 5,
      comments: [
        {
          id: "comment-2",
          author: "Sarah Martinez",
          text: "Gathered evidence, sending to legal counsel for review.",
          timestamp: "2025-05-21 14:15"
        }
      ]
    },
    {
      id: "case-3",
      title: "PropertyPro Service Level Agreement",
      client: "PropertyPro Realty", 
      internalOwner: "Mike Chen",
      status: "in_process",
      priority: "medium",
      createdAt: "2025-05-18",
      description: "Renegotiating SLA terms due to performance concerns. Client requesting penalty waivers.",
      attachments: 2,
      comments: []
    },
    {
      id: "case-4",
      title: "ManufactureTech IP Protection",
      client: "ManufactureTech Co",
      internalOwner: "Emma Silva",
      status: "resolved",
      priority: "low",
      createdAt: "2025-05-15",
      description: "Intellectual property protection for campaign materials. Successfully registered trademarks.",
      attachments: 1,
      comments: [
        {
          id: "comment-3",
          author: "Emma Silva",
          text: "All trademarks successfully registered. Case closed.",
          timestamp: "2025-05-19 16:45"
        }
      ]
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  const handleDragStart = (e: React.DragEvent, caseId: string) => {
    setDraggedItem(caseId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: LegalCase['status']) => {
    e.preventDefault();
    if (!draggedItem) return;

    setLegalCases(prev => 
      prev.map(item => 
        item.id === draggedItem 
          ? { ...item, status: newStatus }
          : item
      )
    );
    setDraggedItem(null);
  };

  const getCasesByStatus = (status: string) =>
    legalCases.filter(item => item.status === status);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-8 w-8 text-teal-600" />
            Legal Cases
          </h1>
          <p className="text-muted-foreground">
            Track and manage legal matters across all clients
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Legal Case
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(columns).map(([status, column]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary">
                {getCasesByStatus(status).length}
              </Badge>
            </div>
            
            <div
              className={`min-h-[500px] rounded-lg border-2 border-dashed p-4 ${column.color}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status as LegalCase['status'])}
            >
              {getCasesByStatus(status).map((legalCase) => (
                <Dialog key={legalCase.id}>
                  <DialogTrigger asChild>
                    <Card
                      className="mb-3 cursor-move transition-all hover:shadow-md"
                      draggable
                      onDragStart={(e) => handleDragStart(e, legalCase.id)}
                      onClick={() => setSelectedCase(legalCase)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-sm font-medium line-clamp-2">
                            {legalCase.title}
                          </CardTitle>
                          <Badge 
                            variant="secondary" 
                            className={priorityColors[legalCase.priority]}
                          >
                            {legalCase.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm font-medium text-teal-600 mb-2">
                          {legalCase.client}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {legalCase.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {legalCase.internalOwner}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {legalCase.createdAt}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              {legalCase.attachments}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {legalCase.comments.length}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-teal-600" />
                        {legalCase.title}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Client:</span> {legalCase.client}
                        </div>
                        <div>
                          <span className="font-medium">Owner:</span> {legalCase.internalOwner}
                        </div>
                        <div>
                          <span className="font-medium">Priority:</span> 
                          <Badge className={`ml-2 ${priorityColors[legalCase.priority]}`}>
                            {legalCase.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {legalCase.createdAt}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{legalCase.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Comments ({legalCase.comments.length})</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {legalCase.comments.map((comment) => (
                            <div key={comment.id} className="border rounded p-3 text-sm">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-muted-foreground">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                        <Textarea 
                          placeholder="Add a comment..."
                          className="mt-2"
                          rows={2}
                        />
                        <Button size="sm" className="mt-2">Add Comment</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
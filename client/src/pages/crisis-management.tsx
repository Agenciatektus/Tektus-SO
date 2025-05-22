import { useState } from "react";
import { AlertTriangle, User, Clock, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrisisItem {
  id: string;
  clientName: string;
  issueSummary: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  responsibleMember: string;
  status: 'in_crisis' | 'resolving' | 'resolved';
  createdAt: string;
  description?: string;
}

const columns = {
  in_crisis: { title: "🚨 In Crisis", color: "bg-red-50 border-red-200" },
  resolving: { title: "🔧 Resolving", color: "bg-yellow-50 border-yellow-200" },
  resolved: { title: "✅ Resolved", color: "bg-green-50 border-green-200" }
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800", 
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
};

export default function CrisisManagement() {
  const [crisisItems, setCrisisItems] = useState<CrisisItem[]>([
    {
      id: "crisis-1",
      clientName: "PropertyPro Realty",
      issueSummary: "Lead generation campaign performing 60% below target",
      priority: "critical",
      responsibleMember: "Sarah Martinez",
      status: "in_crisis",
      createdAt: "2025-05-22",
      description: "Google Ads CTR dropped significantly, needs immediate attention"
    },
    {
      id: "crisis-2", 
      clientName: "EduBright Academy",
      issueSummary: "Client concerned about student enrollment numbers",
      priority: "high",
      responsibleMember: "Mike Chen",
      status: "resolving", 
      createdAt: "2025-05-21",
      description: "Implementing revised content strategy to address concerns"
    },
    {
      id: "crisis-3",
      clientName: "HealthFirst Clinic", 
      issueSummary: "Social media engagement dropped 40% last week",
      priority: "medium",
      responsibleMember: "Emma Silva",
      status: "resolved",
      createdAt: "2025-05-20",
      description: "Algorithm changes addressed, engagement restored"
    },
    {
      id: "crisis-4",
      clientName: "CreativeHub Agency",
      issueSummary: "Budget concerns raised, potential contract termination",
      priority: "critical",
      responsibleMember: "Alex Johnson",
      status: "in_crisis",
      createdAt: "2025-05-19",
      description: "Client struggling financially, need to discuss payment terms"
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: CrisisItem['status']) => {
    e.preventDefault();
    if (!draggedItem) return;

    setCrisisItems(prev => 
      prev.map(item => 
        item.id === draggedItem 
          ? { ...item, status: newStatus }
          : item
      )
    );
    setDraggedItem(null);
  };

  const getItemsByStatus = (status: string) =>
    crisisItems.filter(item => item.status === status);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crisis Management</h1>
          <p className="text-muted-foreground">
            Monitor and resolve client issues quickly
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Crisis Issue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, column]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary">
                {getItemsByStatus(status).length}
              </Badge>
            </div>
            
            <div
              className={`min-h-[400px] rounded-lg border-2 border-dashed p-4 ${column.color}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status as CrisisItem['status'])}
            >
              {getItemsByStatus(status).map((item) => (
                <Card
                  key={item.id}
                  className="mb-3 cursor-move transition-all hover:shadow-md"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">
                        {item.clientName}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={priorityColors[item.priority]}
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.issueSummary}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mb-3 italic">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {item.responsibleMember}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {item.createdAt}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
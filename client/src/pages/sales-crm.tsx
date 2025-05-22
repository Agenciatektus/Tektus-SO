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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Eye, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Target, 
  TrendingUp,
  Users,
  HandshakeIcon,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { insertSalesLeadSchema, type SalesLead, type InsertSalesLead } from "@shared/schema";
import { z } from "zod";

// Stage configurations with colors and icons
const stageConfig = {
  new_lead: { label: "New Lead", color: "bg-slate-500", icon: Target },
  contact_made: { label: "Contact Made", color: "bg-blue-500", icon: Phone },
  meeting_scheduled: { label: "Meeting Scheduled", color: "bg-yellow-500", icon: Calendar },
  proposal_sent: { label: "Proposal Sent", color: "bg-orange-500", icon: Mail },
  negotiation: { label: "Negotiation", color: "bg-purple-500", icon: HandshakeIcon },
  won: { label: "Won", color: "bg-green-500", icon: CheckCircle },
  lost: { label: "Lost", color: "bg-red-500", icon: AlertCircle },
};

const sourceConfig = {
  website: { label: "Website", color: "bg-blue-100 text-blue-800" },
  referral: { label: "Referral", color: "bg-green-100 text-green-800" },
  social_media: { label: "Social Media", color: "bg-purple-100 text-purple-800" },
  email_marketing: { label: "Email Marketing", color: "bg-orange-100 text-orange-800" },
  cold_outreach: { label: "Cold Outreach", color: "bg-gray-100 text-gray-800" },
  advertising: { label: "Advertising", color: "bg-red-100 text-red-800" },
  networking: { label: "Networking", color: "bg-yellow-100 text-yellow-800" },
  other: { label: "Other", color: "bg-slate-100 text-slate-800" },
};

export default function SalesCRM() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<SalesLead | null>(null);
  const [newLead, setNewLead] = useState<InsertSalesLead>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    position: "",
    stage: "new_lead",
    source: "website",
    dealValue: "0",
    probability: 10,
    assignedUserId: 1, // Will be replaced with current user
    notes: "",
    estimatedCloseDate: null,
    lastContactDate: null,
    nextFollowUpDate: null,
    lostReason: null,
  });

  const { data: leads, isLoading } = useQuery<SalesLead[]>({
    queryKey: ["/api/sales/leads"],
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/sales/analytics"],
  });

  const createLeadMutation = useMutation({
    mutationFn: async (leadData: InsertSalesLead) => {
      const res = await apiRequest("POST", "/api/sales/leads", leadData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sales/analytics"] });
      setIsAddDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Lead created successfully",
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

  const updateLeadStageMutation = useMutation({
    mutationFn: async ({ id, stage }: { id: number; stage: string }) => {
      const res = await apiRequest("PATCH", `/api/sales/leads/${id}`, { stage });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sales/analytics"] });
      toast({
        title: "Success",
        description: "Lead stage updated successfully",
      });
    },
  });

  const resetForm = () => {
    setNewLead({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      position: "",
      stage: "new_lead",
      source: "website",
      dealValue: "0",
      probability: 10,
      assignedUserId: 1,
      notes: "",
      estimatedCloseDate: null,
      lastContactDate: null,
      nextFollowUpDate: null,
      lostReason: null,
    });
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertSalesLeadSchema.parse(newLead);
      await createLeadMutation.mutateAsync(validatedData);
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

  const handleStageChange = (leadId: number, newStage: string) => {
    updateLeadStageMutation.mutate({ id: leadId, stage: newStage });
  };

  const getLeadsByStage = (stage: string) => {
    return leads?.filter(lead => lead.stage === stage) || [];
  };

  const getTotalPipelineValue = () => {
    return leads?.reduce((total, lead) => {
      if (lead.stage !== 'lost' && lead.dealValue) {
        return total + parseFloat(lead.dealValue);
      }
      return total;
    }, 0) || 0;
  };

  const getWeightedPipelineValue = () => {
    return leads?.reduce((total, lead) => {
      if (lead.stage !== 'lost' && lead.dealValue && lead.probability) {
        return total + (parseFloat(lead.dealValue) * (lead.probability / 100));
      }
      return total;
    }, 0) || 0;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Sales CRM Pipeline"
          description="Manage leads, track deals, and analyze sales performance"
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateLead} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={newLead.companyName}
                        onChange={(e) => setNewLead({ ...newLead, companyName: e.target.value })}
                        placeholder="Acme Corp"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input
                        id="contactName"
                        value={newLead.contactName}
                        onChange={(e) => setNewLead({ ...newLead, contactName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newLead.email}
                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                        placeholder="john@acme.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newLead.phone || ""}
                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={newLead.position || ""}
                        onChange={(e) => setNewLead({ ...newLead, position: e.target.value })}
                        placeholder="Marketing Director"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="source">Lead Source</Label>
                      <Select
                        value={newLead.source}
                        onValueChange={(value) => setNewLead({ ...newLead, source: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(sourceConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key}>{config.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dealValue">Deal Value ($)</Label>
                      <Input
                        id="dealValue"
                        type="number"
                        step="0.01"
                        value={newLead.dealValue}
                        onChange={(e) => setNewLead({ ...newLead, dealValue: e.target.value })}
                        placeholder="25000.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="probability">Probability (%)</Label>
                      <Input
                        id="probability"
                        type="number"
                        min="0"
                        max="100"
                        value={newLead.probability || 10}
                        onChange={(e) => setNewLead({ ...newLead, probability: parseInt(e.target.value) })}
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newLead.notes || ""}
                      onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                      placeholder="Additional notes about the lead..."
                      rows={3}
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
                      disabled={createLeadMutation.isPending}
                    >
                      {createLeadMutation.isPending ? "Creating..." : "Create Lead"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          }
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="pipeline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            {/* Pipeline Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leads?.length || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${getTotalPipelineValue().toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weighted Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${getWeightedPipelineValue().toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leads?.length ? 
                      Math.round((getLeadsByStage('won').length / leads.length) * 100) : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <TabsContent value="pipeline" className="space-y-6">
              {/* Kanban Pipeline View */}
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4" style={{ minWidth: '1200px' }}>
                  {Object.entries(stageConfig).map(([stage, config]) => {
                    const stageLeads = getLeadsByStage(stage);
                    const Icon = config.icon;
                    
                    return (
                      <div key={stage} className="flex-1 min-w-72">
                        <div className="bg-card rounded-lg border">
                          <div className={`${config.color} text-white p-4 rounded-t-lg`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <span className="font-semibold">{config.label}</span>
                              </div>
                              <Badge variant="secondary" className="bg-white/20 text-white">
                                {stageLeads.length}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-3 min-h-96">
                            {stageLeads.map((lead) => (
                              <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-semibold text-sm">{lead.companyName}</h4>
                                      <Badge 
                                        variant="outline" 
                                        className={sourceConfig[lead.source as keyof typeof sourceConfig]?.color}
                                      >
                                        {sourceConfig[lead.source as keyof typeof sourceConfig]?.label}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground">{lead.contactName}</p>
                                    
                                    {lead.dealValue && (
                                      <div className="text-sm font-semibold text-green-600">
                                        ${parseFloat(lead.dealValue).toLocaleString()}
                                      </div>
                                    )}
                                    
                                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                                      <span>{lead.probability}% chance</span>
                                      {lead.estimatedCloseDate && (
                                        <span>
                                          Close: {new Date(lead.estimatedCloseDate).toLocaleDateString()}
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Stage Action Buttons */}
                                    <div className="flex space-x-1 mt-2">
                                      {stage !== 'won' && stage !== 'lost' && (
                                        <Select
                                          value={lead.stage}
                                          onValueChange={(newStage) => handleStageChange(lead.id, newStage)}
                                        >
                                          <SelectTrigger className="h-7 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Object.entries(stageConfig).map(([key, stageConfig]) => (
                                              <SelectItem key={key} value={key}>
                                                {stageConfig.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placeholder for analytics charts - will be implemented with real data */}
                <Card>
                  <CardHeader>
                    <CardTitle>Leads Generated by Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(sourceConfig).map(([source, config]) => {
                        const count = leads?.filter(lead => lead.source === source).length || 0;
                        return (
                          <div key={source} className="flex justify-between items-center">
                            <span className="text-sm">{config.label}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${Math.min((count / (leads?.length || 1)) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold w-8">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline by Stage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(stageConfig).map(([stage, config]) => {
                        const count = getLeadsByStage(stage).length;
                        const value = getLeadsByStage(stage).reduce((sum, lead) => 
                          sum + (lead.dealValue ? parseFloat(lead.dealValue) : 0), 0
                        );
                        return (
                          <div key={stage} className="flex justify-between items-center">
                            <span className="text-sm">{config.label}</span>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{count} leads</div>
                              <div className="text-xs text-muted-foreground">
                                ${value.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-6">
              {/* List View */}
              <Card>
                <CardHeader>
                  <CardTitle>All Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : !leads || leads.length === 0 ? (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No leads yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start building your sales pipeline by adding your first lead.
                      </p>
                      <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Lead
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Company</th>
                            <th className="text-left p-2">Contact</th>
                            <th className="text-left p-2">Stage</th>
                            <th className="text-left p-2">Source</th>
                            <th className="text-right p-2">Deal Value</th>
                            <th className="text-center p-2">Probability</th>
                            <th className="text-left p-2">Close Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map((lead) => (
                            <tr key={lead.id} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                <div>
                                  <div className="font-semibold">{lead.companyName}</div>
                                  <div className="text-sm text-muted-foreground">{lead.position}</div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div>
                                  <div className="font-medium">{lead.contactName}</div>
                                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                                </div>
                              </td>
                              <td className="p-2">
                                <Badge 
                                  variant="outline" 
                                  className={`${stageConfig[lead.stage as keyof typeof stageConfig]?.color} text-white`}
                                >
                                  {stageConfig[lead.stage as keyof typeof stageConfig]?.label}
                                </Badge>
                              </td>
                              <td className="p-2">
                                <Badge 
                                  variant="outline" 
                                  className={sourceConfig[lead.source as keyof typeof sourceConfig]?.color}
                                >
                                  {sourceConfig[lead.source as keyof typeof sourceConfig]?.label}
                                </Badge>
                              </td>
                              <td className="p-2 text-right font-semibold">
                                {lead.dealValue ? `$${parseFloat(lead.dealValue).toLocaleString()}` : '-'}
                              </td>
                              <td className="p-2 text-center">
                                <Badge variant="secondary">{lead.probability}%</Badge>
                              </td>
                              <td className="p-2">
                                {lead.estimatedCloseDate ? 
                                  new Date(lead.estimatedCloseDate).toLocaleDateString() : 
                                  '-'
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
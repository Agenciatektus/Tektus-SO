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
import { Plus, Mail, Phone, Building, Heart, AlertTriangle, AlertCircle, Users } from "lucide-react";
import { insertClientSchema, type Client, type InsertClient } from "@shared/schema";
import { z } from "zod";

export default function CRM() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState<InsertClient>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    status: "active",
    healthScore: "healthy",
    monthlyValue: "0",
    notes: "",
    assignedUserId: null,
  });

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createClientMutation = useMutation({
    mutationFn: async (clientData: InsertClient) => {
      const res = await apiRequest("POST", "/api/clients", clientData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setIsAddDialogOpen(false);
      setNewClient({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        status: "active",
        healthScore: "healthy",
        monthlyValue: "0",
        notes: "",
        assignedUserId: null,
      });
      toast({
        title: "Success",
        description: "Client created successfully",
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

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertClientSchema.parse(newClient);
      await createClientMutation.mutateAsync(validatedData);
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

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <Heart className="w-4 h-4 text-green-500" />;
      case "at_risk":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "critical":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  const getHealthBadgeClass = (health: string) => {
    switch (health) {
      case "healthy":
        return "status-healthy";
      case "at_risk":
        return "status-at-risk";
      case "critical":
        return "status-critical";
      default:
        return "";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-completed";
      case "inactive":
        return "status-cancelled";
      case "onboarding":
        return "status-in-progress";
      case "offboarding":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Client Relationship Management"
          description="Manage your clients and track their health scores"
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Client</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateClient} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Client Name</Label>
                      <Input
                        id="name"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newClient.company}
                        onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                        placeholder="Acme Corp"
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
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        placeholder="john@acme.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newClient.phone || ""}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={newClient.industry || ""}
                        onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                        placeholder="Technology"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyValue">Monthly Value</Label>
                      <Input
                        id="monthlyValue"
                        type="number"
                        step="0.01"
                        value={newClient.monthlyValue || ""}
                        onChange={(e) => setNewClient({ ...newClient, monthlyValue: e.target.value })}
                        placeholder="5000.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newClient.status}
                        onValueChange={(value) => setNewClient({ ...newClient, status: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="onboarding">Onboarding</SelectItem>
                          <SelectItem value="offboarding">Offboarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="healthScore">Health Score</Label>
                      <Select
                        value={newClient.healthScore}
                        onValueChange={(value) => setNewClient({ ...newClient, healthScore: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthy">Healthy</SelectItem>
                          <SelectItem value="at_risk">At Risk</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newClient.notes || ""}
                      onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                      placeholder="Additional notes about the client..."
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
                      disabled={createClientMutation.isPending}
                    >
                      {createClientMutation.isPending ? "Creating..." : "Create Client"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          }
        />
        
        <main className="flex-1 overflow-y-auto p-6">
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
          ) : !clients || clients.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Users className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-space font-semibold text-foreground mb-2">
                No clients yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start building your client base by adding your first client. Track their health scores, manage relationships, and grow your business.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {client.company}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getHealthIcon(client.healthScore)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusBadgeClass(client.status)}`}
                        >
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {client.email}
                    </div>
                    {client.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        {client.phone}
                      </div>
                    )}
                    {client.industry && (
                      <div className="text-sm text-muted-foreground">
                        Industry: {client.industry}
                      </div>
                    )}
                    {client.monthlyValue && (
                      <div className="text-sm font-semibold text-foreground">
                        Monthly Value: ${parseFloat(client.monthlyValue).toLocaleString()}
                      </div>
                    )}
                    <div className="pt-2">
                      <Badge 
                        variant="outline" 
                        className={`${getHealthBadgeClass(client.healthScore)}`}
                      >
                        {client.healthScore.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

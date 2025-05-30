import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, UserPlus, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { insertOnboardingFlowSchema, type OnboardingFlow, type InsertOnboardingFlow, type Client } from "@shared/schema";
import { z } from "zod";

export default function Onboarding() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [newFlow, setNewFlow] = useState<InsertOnboardingFlow>({
    clientId: 0,
    currentStep: 1,
    totalSteps: 5,
    status: "pending",
    assignedUserId: null,
    notes: "",
  });

  const { data: flows, isLoading } = useQuery<OnboardingFlow[]>({
    queryKey: ["/api/onboarding"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createFlowMutation = useMutation({
    mutationFn: async (flowData: InsertOnboardingFlow) => {
      const res = await apiRequest("POST", "/api/onboarding", flowData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/onboarding"] });
      setIsAddDialogOpen(false);
      setNewFlow({
        clientId: 0,
        currentStep: 1,
        totalSteps: 5,
        status: "pending",
        assignedUserId: null,
        notes: "",
      });
      toast({
        title: "Success",
        description: "Onboarding flow created successfully",
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

  const handleCreateFlow = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertOnboardingFlowSchema.parse(newFlow);
      await createFlowMutation.mutateAsync(validatedData);
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
      case "completed":
        return "status-completed";
      case "in_progress":
        return "status-in-progress";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const onboardingSteps = [
    "Initial Consultation",
    "Contract & Agreements",
    "Brand Guidelines Review",
    "Account Setup",
    "Project Kickoff"
  ];

  const filteredFlows = flows?.filter(flow => 
    selectedStatus === "all" || flow.status === selectedStatus
  ) || [];

  const statusCounts = {
    all: flows?.length || 0,
    pending: flows?.filter(f => f.status === "pending").length || 0,
    in_progress: flows?.filter(f => f.status === "in_progress").length || 0,
    completed: flows?.filter(f => f.status === "completed").length || 0,
    cancelled: flows?.filter(f => f.status === "cancelled").length || 0,
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Client Onboarding"
          description="Manage client onboarding processes and track progress"
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Start Onboarding
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Start New Onboarding Process</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateFlow} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select
                      value={newFlow.clientId.toString()}
                      onValueChange={(value) => setNewFlow({ ...newFlow, clientId: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients?.filter(c => c.status === "active" || c.status === "onboarding").map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name} - {client.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentStep">Starting Step</Label>
                      <Select
                        value={newFlow.currentStep.toString()}
                        onValueChange={(value) => setNewFlow({ ...newFlow, currentStep: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {onboardingSteps.map((step, index) => (
                            <SelectItem key={index} value={(index + 1).toString()}>
                              Step {index + 1}: {step}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalSteps">Total Steps</Label>
                      <Input
                        id="totalSteps"
                        type="number"
                        min="1"
                        max="10"
                        value={newFlow.totalSteps}
                        onChange={(e) => setNewFlow({ ...newFlow, totalSteps: parseInt(e.target.value) || 5 })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newFlow.notes || ""}
                      onChange={(e) => setNewFlow({ ...newFlow, notes: e.target.value })}
                      placeholder="Additional notes for this onboarding process..."
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
                      disabled={createFlowMutation.isPending}
                    >
                      {createFlowMutation.isPending ? "Starting..." : "Start Onboarding"}
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
              { key: "all", label: "All Processes", count: statusCounts.all },
              { key: "pending", label: "Pending", count: statusCounts.pending },
              { key: "in_progress", label: "In Progress", count: statusCounts.in_progress },
              { key: "completed", label: "Completed", count: statusCounts.completed },
              { key: "cancelled", label: "Cancelled", count: statusCounts.cancelled },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredFlows.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <UserPlus className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-space font-semibold text-foreground mb-2">
                {selectedStatus === "all" ? "No onboarding processes yet" : `No ${selectedStatus.replace('_', ' ')} processes`}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {selectedStatus === "all" 
                  ? "Start onboarding your first client to create a structured process for new client integration."
                  : `You don't have any ${selectedStatus.replace('_', ' ')} onboarding processes at the moment.`
                }
              </p>
              {selectedStatus === "all" && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Start First Onboarding
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFlows.map((flow) => {
                const client = clients?.find(c => c.id === flow.clientId);
                const progressPercentage = (flow.currentStep / flow.totalSteps) * 100;
                
                return (
                  <Card key={flow.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <UserPlus className="w-5 h-5 text-primary" />
                            <span>{client ? `${client.name} - ${client.company}` : "Unknown Client"}</span>
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge 
                              variant="outline" 
                              className={getStatusBadgeClass(flow.status)}
                            >
                              {flow.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Step {flow.currentStep} of {flow.totalSteps}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{Math.round(progressPercentage)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Current Step:</h4>
                        <div className="flex items-center space-x-2 text-sm">
                          {flow.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                          <span className="text-muted-foreground">
                            {onboardingSteps[flow.currentStep - 1] || `Step ${flow.currentStep}`}
                          </span>
                        </div>
                      </div>
                      
                      {flow.notes && (
                        <div className="space-y-1">
                          <h4 className="font-medium text-foreground text-sm">Notes:</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {flow.notes}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-muted-foreground">
                          {flow.startDate && `Started: ${new Date(flow.startDate).toLocaleDateString()}`}
                          {flow.completedDate && ` • Completed: ${new Date(flow.completedDate).toLocaleDateString()}`}
                        </div>
                        {flow.status !== "completed" && (
                          <Button variant="outline" size="sm">
                            <ArrowRight className="w-4 h-4" />
                            Next Step
                          </Button>
                        )}
                      </div>
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

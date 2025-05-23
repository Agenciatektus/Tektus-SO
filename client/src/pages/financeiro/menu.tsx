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
import { Plus, FileText, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { insertInvoiceSchema, type Invoice, type InsertInvoice, type Client } from "@shared/schema";
import { z } from "zod";
import { format } from "date-fns";

export default function Finance() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [newInvoice, setNewInvoice] = useState<InsertInvoice>({
    invoiceNumber: `INV-${Date.now()}`,
    clientId: 0,
    amount: "0",
    tax: "0",
    total: "0",
    status: "draft",
    issuedDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    description: "",
    notes: "",
  });

  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const { data: clients } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoiceData: InsertInvoice) => {
      const res = await apiRequest("POST", "/api/invoices", invoiceData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setIsAddDialogOpen(false);
      setNewInvoice({
        invoiceNumber: `INV-${Date.now()}`,
        clientId: 0,
        amount: "0",
        tax: "0",
        total: "0",
        status: "draft",
        issuedDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        description: "",
        notes: "",
      });
      toast({
        title: "Success",
        description: "Invoice created successfully",
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

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const amount = parseFloat(newInvoice.amount);
      const tax = parseFloat(newInvoice.tax || "0");
      const total = amount + tax;
      
      const validatedData = insertInvoiceSchema.parse({
        ...newInvoice,
        total: total.toString(),
      });
      
      await createInvoiceMutation.mutateAsync(validatedData);
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
      case "paid":
        return "status-completed";
      case "sent":
        return "status-in-progress";
      case "draft":
        return "status-pending";
      case "overdue":
        return "status-critical";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const filteredInvoices = invoices?.filter(invoice => 
    selectedStatus === "all" || invoice.status === selectedStatus
  ) || [];

  const statusCounts = {
    all: invoices?.length || 0,
    draft: invoices?.filter(i => i.status === "draft").length || 0,
    sent: invoices?.filter(i => i.status === "sent").length || 0,
    paid: invoices?.filter(i => i.status === "paid").length || 0,
    overdue: invoices?.filter(i => i.status === "overdue").length || 0,
  };

  const totalRevenue = invoices?.filter(i => i.status === "paid")
    .reduce((sum, invoice) => sum + parseFloat(invoice.total), 0) || 0;

  const pendingRevenue = invoices?.filter(i => i.status === "sent")
    .reduce((sum, invoice) => sum + parseFloat(invoice.total), 0) || 0;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Finance Management"
          description="Track invoices, payments, and revenue"
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateInvoice} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input
                        id="invoiceNumber"
                        value={newInvoice.invoiceNumber}
                        onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                        placeholder="INV-001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Select
                        value={newInvoice.clientId.toString()}
                        onValueChange={(value) => setNewInvoice({ ...newInvoice, clientId: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients?.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.name} - {client.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={newInvoice.amount}
                        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax">Tax</Label>
                      <Input
                        id="tax"
                        type="number"
                        step="0.01"
                        value={newInvoice.tax || '0'}
                        onChange={(e) => setNewInvoice({ ...newInvoice, tax: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total">Total</Label>
                      <Input
                        id="total"
                        type="number"
                        step="0.01"
                        value={(parseFloat(newInvoice.amount) + parseFloat(newInvoice.tax || "0")).toFixed(2)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issuedDate">Issue Date</Label>
                      <Input
                        id="issuedDate"
                        type="date"
                        value={newInvoice.issuedDate?.toISOString().split('T')[0] || ''}
                        onChange={(e) => setNewInvoice({ ...newInvoice, issuedDate: new Date(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newInvoice.dueDate.toISOString().split('T')[0]}
                        onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: new Date(e.target.value) })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newInvoice.description || ""}
                      onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                      placeholder="Service description..."
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
                      disabled={createInvoiceMutation.isPending}
                    >
                      {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          }
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-space font-bold text-foreground">
                      ${totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <FileText className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Revenue</p>
                    <p className="text-2xl font-space font-bold text-foreground">
                      ${pendingRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-space font-bold text-foreground">
                      {statusCounts.overdue}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted/30 p-1 rounded-lg w-fit">
            {[
              { key: "all", label: "All Invoices", count: statusCounts.all },
              { key: "draft", label: "Draft", count: statusCounts.draft },
              { key: "sent", label: "Sent", count: statusCounts.sent },
              { key: "paid", label: "Paid", count: statusCounts.paid },
              { key: "overdue", label: "Overdue", count: statusCounts.overdue },
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
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                      <div className="h-6 bg-muted rounded-full w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-space font-semibold text-foreground mb-2">
                {selectedStatus === "all" ? "No invoices yet" : `No ${selectedStatus} invoices`}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {selectedStatus === "all" 
                  ? "Create your first invoice to start tracking your revenue and managing client payments."
                  : `You don't have any ${selectedStatus} invoices at the moment.`
                }
              </p>
              {selectedStatus === "all" && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Invoice
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => {
                const client = clients?.find(c => c.id === invoice.clientId);
                return (
                  <Card key={invoice.id} className="card-hover border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-4">
                            <h3 className="font-space font-semibold text-foreground">
                              {invoice.invoiceNumber}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`${getStatusBadgeClass(invoice.status)}`}
                            >
                              {invoice.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {client ? `${client.name} - ${client.company}` : "Unknown Client"}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Due: {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                            </span>
                            {invoice.description && (
                              <span className="truncate max-w-xs">
                                {invoice.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-space font-bold text-foreground">
                            ${parseFloat(invoice.total).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Issued: {format(new Date(invoice.issuedDate), "MMM d, yyyy")}
                          </p>
                        </div>
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

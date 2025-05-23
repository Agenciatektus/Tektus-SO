import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Webhook, Settings, Play, Pause, Activity, Plus, Link, AlertCircle } from "lucide-react";

export default function Automation() {
  // Placeholder data for automation workflows
  const automationWorkflows = [
    {
      id: 1,
      name: "New Client Onboarding",
      description: "Automatically create tasks and send welcome emails when a new client is added",
      status: "active",
      triggers: 2,
      actions: 5,
      lastRun: "2 hours ago",
    },
    {
      id: 2,
      name: "Invoice Reminder",
      description: "Send reminder emails for overdue invoices",
      status: "active",
      triggers: 1,
      actions: 2,
      lastRun: "1 day ago",
    },
    {
      id: 3,
      name: "Task Completion Notification",
      description: "Notify clients when their tasks are completed",
      status: "paused",
      triggers: 1,
      actions: 3,
      lastRun: "5 days ago",
    },
  ];

  const webhookEndpoints = [
    {
      id: 1,
      name: "CRM Integration",
      endpoint: "https://hooks.tektus.so/crm-update",
      status: "active",
      lastTriggered: "30 minutes ago",
    },
    {
      id: 2,
      name: "Task Management",
      endpoint: "https://hooks.tektus.so/task-complete",
      status: "active",
      lastTriggered: "2 hours ago",
    },
    {
      id: 3,
      name: "Payment Processing",
      endpoint: "https://hooks.tektus.so/payment-received",
      status: "inactive",
      lastTriggered: "Never",
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-completed";
      case "paused":
        return "status-pending";
      case "inactive":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Automation Center"
          description="Streamline your workflows with n8n integration"
          action={
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          }
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Workflows</p>
                    <p className="text-2xl font-space font-bold text-foreground">
                      {automationWorkflows.filter(w => w.status === "active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Executions Today</p>
                    <p className="text-2xl font-space font-bold text-foreground">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Webhook className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Webhook Endpoints</p>
                    <p className="text-2xl font-space font-bold text-foreground">
                      {webhookEndpoints.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Failed Executions</p>
                    <p className="text-2xl font-space font-bold text-foreground">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Automation Workflows */}
          <div className="mb-8">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-space">Automation Workflows</CardTitle>
                  <Button variant="outline" size="sm">
                    <Link className="w-4 h-4 mr-2" />
                    Connect n8n
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-space font-semibold text-foreground">
                            {workflow.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={getStatusBadgeClass(workflow.status)}
                          >
                            {workflow.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {workflow.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{workflow.triggers} triggers</span>
                          <span>{workflow.actions} actions</span>
                          <span>Last run: {workflow.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={workflow.status === "active" ? "text-yellow-500" : "text-green-500"}
                        >
                          {workflow.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Webhook Endpoints */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-space">Webhook Endpoints</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Endpoint
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhookEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-space font-semibold text-foreground">
                          {endpoint.name}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusBadgeClass(endpoint.status)}
                        >
                          {endpoint.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono mb-1">
                        {endpoint.endpoint}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last triggered: {endpoint.lastTriggered}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Copy URL
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Guide */}
          <Card className="border mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg font-space flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>n8n Integration Setup</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Connect your n8n instance to Tektus.SO to automate your marketing operations workflows.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Quick Setup:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Install the HTTP Request node in your n8n workflow</li>
                  <li>Configure webhook endpoints using the URLs above</li>
                  <li>Set up authentication with your API key</li>
                  <li>Test the connection and activate your workflows</li>
                </ol>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  View Documentation
                </Button>
                <Button>
                  Get API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

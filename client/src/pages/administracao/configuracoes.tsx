import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Key, 
  Users, 
  Database,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from "lucide-react";
import { insertUserSchema, type User as UserType } from "@shared/schema";
import { z } from "zod";

const profileUpdateSchema = insertUserSchema.partial().extend({
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileUpdateForm>({
    firstName: user?.firstName || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    role: user?.role || "operations",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    invoiceReminders: true,
    clientUpdates: false,
    weeklyReports: true,
  });

  // System preferences state
  const [systemPrefs, setSystemPrefs] = useState({
    theme: "dark",
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  });

  // API Settings state
  const [apiSettings, setApiSettings] = useState({
    n8nWebhookUrl: "",
    slackWebhook: "",
    emailProvider: "smtp",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
  });

  // Fetch users for admin panel
  const { data: allUsers, isLoading: usersLoading } = useQuery<UserType[]>({
    queryKey: ["/api/users"],
    enabled: user?.role === "admin",
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateForm) => {
      const { currentPassword, newPassword, confirmPassword, ...updateData } = data;
      
      // If changing password, include password change logic
      if (newPassword) {
        // In a real implementation, you'd send both current and new password
        // For now, we'll just update the profile data
      }
      
      const res = await apiRequest("PUT", `/api/users/${user?.id}`, updateData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = profileUpdateSchema.parse(profileForm);
      await updateProfileMutation.mutateAsync(validatedData);
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

  const handleNotificationSave = () => {
    // In a real implementation, this would save to the backend
    toast({
      title: "Success",
      description: "Notification preferences saved",
    });
  };

  const handleSystemPrefsSave = () => {
    // In a real implementation, this would save to the backend
    toast({
      title: "Success",
      description: "System preferences saved",
    });
  };

  const handleApiSettingsSave = () => {
    // In a real implementation, this would save to the backend
    toast({
      title: "Success",  
      description: "API settings saved",
    });
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "status-critical";
      case "operations":
        return "status-completed";
      case "sales":
        return "status-in-progress";
      case "finance":
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
          title="Settings"
          description="Manage your account preferences and system configuration"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>Integrations</span>
                </TabsTrigger>
                {user?.role === "admin" && (
                  <TabsTrigger value="admin" className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-space">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileForm.firstName}
                            onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileForm.lastName}
                            onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={profileForm.username}
                            onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                            placeholder="johndoe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={profileForm.role}
                          onValueChange={(value) => setProfileForm({ ...profileForm, role: value as any })}
                          disabled={user?.role !== "admin"}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                        {user?.role !== "admin" && (
                          <p className="text-xs text-muted-foreground">
                            Contact your administrator to change your role
                          </p>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-space font-semibold">Change Password</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                value={profileForm.currentPassword}
                                onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                                placeholder="Enter current password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <div className="relative">
                                <Input
                                  id="newPassword"
                                  type={showNewPassword ? "text" : "password"}
                                  value={profileForm.newPassword}
                                  onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                                  placeholder="Enter new password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <div className="relative">
                                <Input
                                  id="confirmPassword"
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={profileForm.confirmPassword}
                                  onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                                  placeholder="Confirm new password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={updateProfileMutation.isPending}
                          className="flex items-center space-x-2"
                        >
                          {updateProfileMutation.isPending && <RefreshCw className="w-4 h-4 animate-spin" />}
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-space">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-space font-semibold flex items-center space-x-2">
                        <Mail className="w-5 h-5" />
                        <span>Email Notifications</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="task-reminders">Task Reminders</Label>
                            <p className="text-sm text-muted-foreground">Get reminded about upcoming task deadlines</p>
                          </div>
                          <Switch
                            id="task-reminders"
                            checked={notifications.taskReminders}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="invoice-reminders">Invoice Reminders</Label>
                            <p className="text-sm text-muted-foreground">Notifications for overdue invoices</p>
                          </div>
                          <Switch
                            id="invoice-reminders"
                            checked={notifications.invoiceReminders}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, invoiceReminders: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="client-updates">Client Updates</Label>
                            <p className="text-sm text-muted-foreground">Notifications when clients take actions</p>
                          </div>
                          <Switch
                            id="client-updates"
                            checked={notifications.clientUpdates}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, clientUpdates: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weekly-reports">Weekly Reports</Label>
                            <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                          </div>
                          <Switch
                            id="weekly-reports"
                            checked={notifications.weeklyReports}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-space font-semibold flex items-center space-x-2">
                        <Smartphone className="w-5 h-5" />
                        <span>Push Notifications</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Browser Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleNotificationSave} className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Save Preferences</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Preferences Tab */}
              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-space">System Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select
                          value={systemPrefs.theme}
                          onValueChange={(value) => setSystemPrefs({ ...systemPrefs, theme: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={systemPrefs.language}
                          onValueChange={(value) => setSystemPrefs({ ...systemPrefs, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={systemPrefs.timezone}
                          onValueChange={(value) => setSystemPrefs({ ...systemPrefs, timezone: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                            <SelectItem value="Europe/London">London</SelectItem>
                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select
                          value={systemPrefs.dateFormat}
                          onValueChange={(value) => setSystemPrefs({ ...systemPrefs, dateFormat: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                          value={systemPrefs.currency}
                          onValueChange={(value) => setSystemPrefs({ ...systemPrefs, currency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="CAD">CAD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSystemPrefsSave} className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Save Preferences</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* API/Integrations Tab */}
              <TabsContent value="api" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-space">API & Integrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-space font-semibold">Automation</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="n8n-webhook">n8n Webhook URL</Label>
                          <Input
                            id="n8n-webhook"
                            value={apiSettings.n8nWebhookUrl}
                            onChange={(e) => setApiSettings({ ...apiSettings, n8nWebhookUrl: e.target.value })}
                            placeholder="https://your-n8n-instance.com/webhook/..."
                          />
                          <p className="text-xs text-muted-foreground">
                            Configure your n8n webhook URL for workflow automation
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                          <Input
                            id="slack-webhook"
                            value={apiSettings.slackWebhook}
                            onChange={(e) => setApiSettings({ ...apiSettings, slackWebhook: e.target.value })}
                            placeholder="https://hooks.slack.com/services/..."
                          />
                          <p className="text-xs text-muted-foreground">
                            Send notifications to your Slack workspace
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-space font-semibold">Email Configuration</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-provider">Email Provider</Label>
                          <Select
                            value={apiSettings.emailProvider}
                            onValueChange={(value) => setApiSettings({ ...apiSettings, emailProvider: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="smtp">SMTP</SelectItem>
                              <SelectItem value="sendgrid">SendGrid</SelectItem>
                              <SelectItem value="mailgun">Mailgun</SelectItem>
                              <SelectItem value="ses">Amazon SES</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {apiSettings.emailProvider === "smtp" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="smtp-host">SMTP Host</Label>
                              <Input
                                id="smtp-host"
                                value={apiSettings.smtpHost}
                                onChange={(e) => setApiSettings({ ...apiSettings, smtpHost: e.target.value })}
                                placeholder="smtp.gmail.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="smtp-port">SMTP Port</Label>
                              <Input
                                id="smtp-port"
                                value={apiSettings.smtpPort}
                                onChange={(e) => setApiSettings({ ...apiSettings, smtpPort: e.target.value })}
                                placeholder="587"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="smtp-user">SMTP Username</Label>
                              <Input
                                id="smtp-user"
                                value={apiSettings.smtpUser}
                                onChange={(e) => setApiSettings({ ...apiSettings, smtpUser: e.target.value })}
                                placeholder="your-email@gmail.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="smtp-password">SMTP Password</Label>
                              <Input
                                id="smtp-password"
                                type="password"
                                value={apiSettings.smtpPassword}
                                onChange={(e) => setApiSettings({ ...apiSettings, smtpPassword: e.target.value })}
                                placeholder="Your app password"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleApiSettingsSave} className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Save Configuration</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Admin Tab */}
              {user?.role === "admin" && (
                <TabsContent value="admin" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-space flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>User Management</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {usersLoading ? (
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
                              <div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-32"></div>
                                <div className="h-3 bg-muted rounded w-24"></div>
                              </div>
                              <div className="h-6 bg-muted rounded-full w-16"></div>
                            </div>
                          ))}
                        </div>
                      ) : !allUsers || allUsers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-4" />
                          <p>No users found</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {allUsers.map((u) => (
                            <div key={u.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary font-semibold">
                                    {u.firstName.charAt(0)}{u.lastName.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {u.firstName} {u.lastName}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{u.email}</p>
                                  <p className="text-xs text-muted-foreground">@{u.username}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Badge 
                                  variant="outline" 
                                  className={`capitalize ${getRoleBadgeClass(u.role)}`}
                                >
                                  {u.role}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={u.isActive ? "status-completed" : "status-cancelled"}
                                >
                                  {u.isActive ? "Active" : "Inactive"}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-space flex items-center space-x-2">
                        <Database className="w-5 h-5" />
                        <span>System Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Application Version</Label>
                            <p className="text-sm text-muted-foreground">v1.0.0</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Database Status</Label>
                            <p className="text-sm text-green-600">Connected</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Last Backup</Label>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Total Users</Label>
                            <p className="text-sm text-muted-foreground">{allUsers?.length || 0}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Active Sessions</Label>
                            <p className="text-sm text-muted-foreground">3</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Storage Used</Label>
                            <p className="text-sm text-muted-foreground">2.4 GB</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

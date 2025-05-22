import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Grid, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  UserMinus, 
  DollarSign, 
  CheckSquare, 
  Edit3, 
  Zap, 
  Settings, 
  Shield,
  LogOut
} from "lucide-react";

const navigationItems = [
  {
    title: "Core Modules",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "CRM", href: "/crm", icon: Users },
      { name: "Onboarding", href: "/onboarding", icon: UserPlus },
      { name: "Offboarding", href: "/offboarding", icon: UserMinus },
      { name: "Finance", href: "/finance", icon: DollarSign },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Content Center", href: "/content", icon: Edit3 },
      { name: "Automation", href: "/automation", icon: Zap },
    ]
  },
  {
    title: "Administration", 
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "User Management", href: "/users", icon: Shield, adminOnly: true },
    ]
  }
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="w-64 bg-card border-r border-border flex-shrink-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Grid className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="font-space font-bold text-lg text-foreground">Tektus</h1>
            <p className="text-xs text-muted-foreground">Marketing OS</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navigationItems.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items
                .filter(item => !item.adminOnly || user?.role === 'admin')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === "/" 
                    ? location === "/" 
                    : location.startsWith(item.href) && item.href !== "/";
                  
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start space-x-3 ${
                          isActive 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user ? getInitials(user.firstName, user.lastName) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user ? `${user.firstName} ${user.lastName}` : "Unknown User"}
            </p>
            <p className="text-xs text-muted-foreground truncate capitalize">
              {user?.role || "User"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground p-2"
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

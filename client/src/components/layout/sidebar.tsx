import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  LogOut,
  ChevronDown,
  ChevronRight,
  Building2,
  Calendar,
  Target,
  TrendingUp,
  Scale,
  Megaphone,
  Globe,
  UserCheck,
  Folder
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    items: []
  },
  {
    title: "Central de Tarefas",
    icon: Folder,
    items: [
      { name: "Tarefas", href: "/central-tarefas/tarefas" },
      { name: "Painel de Desempenho", href: "/central-tarefas/painel-desempenho" },
    ],
  },
  {
    title: "Central de Clientes",
    icon: Users,
    items: [
      { name: "Agenda de Reuniões", href: "/central-clientes/agenda-reunioes" },
      { name: "Controle de Clientes", href: "/central-clientes/controle-clientes" },
      { name: "Dashboard Clientes", href: "/central-clientes/dashboard-clientes" },
      { name: "NPS Tracker", href: "/central-clientes/nps-tracker" },
      { name: "Onboarding Cliente", href: "/central-clientes/onboarding" },
      { name: "Gestão de Crise", href: "/central-clientes/gestao-crise" },
      { name: "OffBoarding e Churn", href: "/central-clientes/offboarding-churn" },
    ],
    roles: ['admin', 'operations', 'sales']
  },
  {
    title: "Administration",
    icon: Settings,
    items: [
      { name: "Services & Pricing", href: "/admin/services" },
      { name: "Documents Repository", href: "/admin/documents" },
      { name: "Organizational Chart", href: "/admin/org-chart" },
      { name: "Partner List", href: "/admin/partners" },
      { name: "Culture Code", href: "/admin/culture" },
      { name: "Brand Identity", href: "/admin/brand" },
      { name: "Links & Tools", href: "/admin/tools" },
    ],
    roles: ['admin']
  },
  {
    title: "Clients Center",
    icon: Users,
    items: [
      { name: "Meeting Calendar", href: "/clients/calendar" },
      { name: "Controle de Clientes", href: "/clientes/controle" },
      { name: "Client Dashboards", href: "/clients/dashboards" },
      { name: "NPS Tracker", href: "/clients/nps" },
      { name: "Onboarding Pipelines", href: "/clients/onboarding" },
      { name: "Crisis Management", href: "/clients/crisis" },
      { name: "Offboarding & Churn", href: "/clients/offboarding" },
    ],
    roles: ['admin', 'operations', 'sales']
  },
  {
    title: "Content Center",
    icon: Edit3,
    items: [
      { name: "Content Guidelines", href: "/content/guidelines" },
      { name: "Account Setup Guides", href: "/content/setup-guides" },
      { name: "Seasonal Dates", href: "/content/seasonal" },
      { name: "Editorial Pipeline", href: "/content/editorial" },
      { name: "Content Production", href: "/content/production" },
      { name: "Publication Calendar", href: "/content/calendar" },
    ],
    roles: ['admin', 'operations', 'content']
  },
  {
    title: "Traffic Center",
    icon: TrendingUp,
    items: [
      { name: "Traffic Team", href: "/traffic/team" },
      { name: "Task View", href: "/traffic/tasks" },
      { name: "Meta Ads", href: "/traffic/meta-ads" },
      { name: "Google Ads", href: "/traffic/google-ads" },
      { name: "Campaign Standards", href: "/traffic/standards" },
      { name: "Investment Strategy", href: "/traffic/strategy" },
    ],
    roles: ['admin', 'operations', 'traffic']
  },
  {
    title: "Sales Team",
    icon: Target,
    items: [
      { name: "CRM Pipeline", href: "/sales/crm" },
      { name: "Sales Team View", href: "/sales/team" },
      { name: "Meeting Calendar", href: "/sales/calendar" },
      { name: "Sales Scripts", href: "/sales/scripts" },
      { name: "Client Profile DB", href: "/sales/profiles" },
      { name: "Goals & Funnel", href: "/sales/goals" },
      { name: "Intake Form", href: "/sales/intake" },
      { name: "Objection Handling", href: "/sales/objections" },
      { name: "Proposal Templates", href: "/sales/proposals" },
      { name: "Service Catalog", href: "/sales/catalog" },
      { name: "Sales Manual", href: "/sales/manual" },
    ],
    roles: ['admin', 'sales']
  },
  {
    title: "Website Creation",
    icon: Globe,
    items: [
      { name: "Active Projects", href: "/websites/active" },
      { name: "Completed Projects", href: "/websites/completed" },
      { name: "Plugin Database", href: "/websites/plugins" },
      { name: "Web References", href: "/websites/references" },
      { name: "Site Onboarding", href: "/websites/site-onboarding" },
      { name: "E-commerce Onboarding", href: "/websites/ecommerce-onboarding" },
    ],
    roles: ['admin', 'operations']
  },
  {
    title: "Legal",
    icon: Scale,
    items: [
      { name: "Legal Cases", href: "/legal/cases" },
      { name: "Contract Registry", href: "/legal/contracts" },
      { name: "Contract Templates", href: "/legal/templates" },
      { name: "Terms & Conditions", href: "/legal/terms" },
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Legal Notes", href: "/legal/notes" },
    ],
    roles: ['admin', 'finance']
  },
  {
    title: "Agency Marketing",
    icon: Megaphone,
    items: [
      { name: "Internal Campaigns", href: "/marketing/campaigns" },
      { name: "Email Sequences", href: "/marketing/email" },
      { name: "Lead Magnets", href: "/marketing/magnets" },
      { name: "Success Cases", href: "/marketing/cases" },
      { name: "Content Management", href: "/marketing/content" },
    ],
    roles: ['admin', 'operations']
  },
  {
    title: "OKRs",
    icon: Target,
    items: [
      { name: "Pro-Labore Summary", href: "/okrs/prolabore" },
      { name: "3-Month Growth Plan", href: "/okrs/growth" },
      { name: "OKR Tracker", href: "/okrs/tracker" },
    ],
    roles: ['admin']
  },
  {
    title: "HR",
    icon: UserCheck,
    items: [
      { name: "Strategic Onboarding", href: "/hr/strategic-onboarding" },
      { name: "Bureaucratic Onboarding", href: "/hr/bureaucratic-onboarding" },
      { name: "Team Offboarding", href: "/hr/offboarding" },
      { name: "Team List", href: "/hr/team" },
      { name: "Talent Pool", href: "/hr/talent" },
      { name: "Job Openings", href: "/hr/jobs" },
      { name: "Salary Ladder", href: "/hr/salary" },
      { name: "Responsibility Matrix", href: "/hr/responsibilities" },
      { name: "Rules & Agreements", href: "/hr/rules" },
    ],
    roles: ['admin', 'hr']
  },
  {
    title: "Finance",
    icon: DollarSign,
    items: [
      { name: "Monthly Summary", href: "/finance/summary" },
      { name: "Outstanding Invoices", href: "/finance/invoices" },
      { name: "Expense Breakdown", href: "/finance/expenses" },
      { name: "Revenue Composition", href: "/finance/revenue" },
      { name: "Account Balances", href: "/finance/accounts" },
      { name: "Debt Overview", href: "/finance/debt" },
      { name: "Accounting View", href: "/finance/accounting" },
      { name: "Client Billing", href: "/finance/billing" },
      { name: "Payroll", href: "/finance/payroll" },
      { name: "Payment Calendar", href: "/finance/calendar" },
      { name: "Manual Entries", href: "/finance/manual" },
    ],
    roles: ['admin', 'finance']
  }
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [openSections, setOpenSections] = useState<string[]>(['Dashboard']);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const hasAccess = (item: any) => {
    if (!item.roles) return true;
    if (!user?.role) return false;
    return item.roles.includes(user.role);
  };

  const isActiveSection = (item: any) => {
    if (item.href) {
      return item.href === "/" ? location === "/" : location.startsWith(item.href);
    }
    return item.items?.some((subItem: any) => 
      subItem.href === "/" ? location === "/" : location.startsWith(subItem.href)
    );
  };

  const isActiveSubItem = (href: string) => {
    return href === "/" ? location === "/" : location.startsWith(href) && href !== "/";
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
            <p className="text-xs text-muted-foreground">Work OS</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems
            .filter(hasAccess)
            .map((item) => {
              const Icon = item.icon;
              const isOpen = openSections.includes(item.title);
              const isActive = isActiveSection(item);
              
              if (item.items.length === 0) {
                // Direct link item (like Dashboard)
                return (
                  <Link key={item.title} to={item.href || "/"}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start space-x-3 h-9 transition-all
                        ${isActive
                          ? 'bg-tektus-green text-tektus-black dark:bg-tektus-green dark:text-tektus-black border-l-4 border-tektus-green dark:border-tektus-green font-bold shadow-sm'
                          : 'text-tektus-black dark:text-white hover:bg-tektus-gray/40 dark:hover:bg-tektus-gray/10'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Button>
                  </Link>
                );
              }

              return (
                <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleSection(item.title)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between h-9 transition-all
                        ${isActive
                          ? 'bg-tektus-green text-tektus-black dark:bg-tektus-green dark:text-tektus-black border-l-4 border-tektus-green dark:border-tektus-green font-bold shadow-sm'
                          : 'text-tektus-black dark:text-white hover:bg-tektus-gray/40 dark:hover:bg-tektus-gray/10'}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 pt-1 space-y-1">
                    {item.items.map((subItem: any) => (
                      <Link key={subItem.name} to={subItem.href || "/"}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-xs h-8 transition-all
                            ${isActiveSubItem(subItem.href)
                              ? 'bg-tektus-green/20 text-tektus-black dark:bg-tektus-green/80 dark:text-tektus-black font-bold'
                              : 'text-tektus-black dark:text-white hover:bg-tektus-gray/30 dark:hover:bg-tektus-gray/10'}
                          `}
                        >
                          {subItem.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user ? getInitials(user.username) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.username || "Unknown User"}
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

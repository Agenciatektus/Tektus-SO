import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ClientHealthChart } from "@/components/dashboard/client-health-chart";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { TeamStatus } from "@/components/dashboard/team-status";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Users, CheckCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: clientHealth, isLoading: healthLoading } = useQuery({
    queryKey: ["/api/dashboard/client-health"],
  });

  const { data: recentTasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["/api/tasks/recent"],
  });

  const { data: upcomingTasks, isLoading: upcomingLoading } = useQuery({
    queryKey: ["/api/tasks/upcoming"],
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas gerais do sistema.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Últimas atividades do sistema.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Alertas e notificações importantes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

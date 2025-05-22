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

export default function Dashboard() {
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
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard"
          description="Welcome back, here's what's happening today"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))
            ) : (
              <>
                <KPICard
                  title="Monthly Revenue"
                  value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
                  change={`+${stats?.revenueGrowth?.toFixed(1) || 0}%`}
                  icon={DollarSign}
                  trend="up"
                  color="green"
                />
                <KPICard
                  title="Active Clients"
                  value={stats?.activeClients?.toString() || "0"}
                  change={`+${stats?.clientGrowth?.toFixed(0) || 0}`}
                  icon={Users}
                  trend="up"
                  color="primary"
                />
                <KPICard
                  title="Tasks This Month"
                  value={stats?.tasksCompleted?.toString() || "0"}
                  change={`+${stats?.taskGrowth?.toFixed(0) || 0}`}
                  icon={CheckCircle}
                  trend="up"
                  color="blue"
                />
                <KPICard
                  title="Team Utilization"
                  value={`${stats?.teamUtilization || 0}%`}
                  change="85%"
                  icon={Activity}
                  trend="neutral"
                  color="purple"
                />
              </>
            )}
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueChart />
            <ClientHealthChart data={clientHealth} isLoading={healthLoading} />
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTasks data={recentTasks} isLoading={tasksLoading} />
            </div>
            <div className="space-y-6">
              <TeamStatus />
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="mt-8">
            <UpcomingDeadlines data={upcomingTasks} isLoading={upcomingLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}

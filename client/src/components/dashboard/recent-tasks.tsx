import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { type Task } from "@shared/schema";

interface RecentTasksProps {
  data?: Task[];
  isLoading?: boolean;
}

export function RecentTasks({ data, isLoading }: RecentTasksProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-space">Recent Tasks</CardTitle>
          <Skeleton className="h-4 w-16" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3">
              <Skeleton className="w-2 h-2 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-space">Recent Tasks</CardTitle>
        <Link href="/tasks">
          <span className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer">
            View all
          </span>
        </Link>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recent tasks
          </div>
        ) : (
          <div className="space-y-4">
            {data.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center space-x-4 p-3 hover:bg-accent/50 rounded-lg transition-colors">
                <div className={`w-2 h-2 ${getStatusColor(task.status)} rounded-full`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium truncate">
                    {task.title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {task.dueDate 
                      ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
                      : "No due date"
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusBadgeClass(task.status)}`}
                  >
                    {task.status.replace('_', ' ')}
                  </Badge>
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {task.assigneeId ? "U" : "—"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

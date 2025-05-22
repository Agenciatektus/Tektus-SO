import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { type Task } from "@shared/schema";
import { format, isToday, isTomorrow, differenceInDays } from "date-fns";

interface UpcomingDeadlinesProps {
  data?: Task[];
  isLoading?: boolean;
}

export function UpcomingDeadlines({ data, isLoading }: UpcomingDeadlinesProps) {
  const getUrgencyBadge = (dueDate: string) => {
    const date = new Date(dueDate);
    const daysDiff = differenceInDays(date, new Date());
    
    if (isToday(date)) {
      return { text: "Due Today", class: "status-critical" };
    } else if (isTomorrow(date)) {
      return { text: "Due Tomorrow", class: "status-at-risk" };
    } else if (daysDiff <= 7) {
      return { text: `${daysDiff} days`, class: "status-pending" };
    } else {
      return { text: format(date, "MMM d"), class: "status-healthy" };
    }
  };

  const getBorderClass = (dueDate: string) => {
    const date = new Date(dueDate);
    const daysDiff = differenceInDays(date, new Date());
    
    if (isToday(date)) {
      return "border-red-500/20 bg-red-500/5";
    } else if (isTomorrow(date) || daysDiff <= 3) {
      return "border-yellow-500/20 bg-yellow-500/5";
    } else {
      return "border-primary/20 bg-primary/5";
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-space">Upcoming Deadlines</CardTitle>
          <Skeleton className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex items-center space-x-2 mt-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const upcomingTasks = data?.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) > new Date() &&
    (task.status === "pending" || task.status === "in_progress")
  ).slice(0, 6) || [];

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-space">Upcoming Deadlines</CardTitle>
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming deadlines
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTasks.map((task) => {
              const urgency = getUrgencyBadge(task.dueDate!);
              return (
                <div 
                  key={task.id} 
                  className={`border rounded-lg p-4 ${getBorderClass(task.dueDate!)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2">
                      {task.title}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ml-2 ${urgency.class} border-0`}
                    >
                      {urgency.text}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">
                    {task.description ? task.description.slice(0, 50) + "..." : "No description"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {task.assigneeId ? "U" : "—"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">
                      {task.assigneeId ? "Assigned" : "Unassigned"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

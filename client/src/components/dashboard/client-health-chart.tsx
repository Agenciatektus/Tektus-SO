import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";

interface ClientHealthData {
  healthy: number;
  atRisk: number;
  critical: number;
}

interface ClientHealthChartProps {
  data?: ClientHealthData;
  isLoading?: boolean;
}

export function ClientHealthChart({ data, isLoading }: ClientHealthChartProps) {
  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-space">Client Health Distribution</CardTitle>
          <Skeleton className="h-8 w-8 rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const total = (data?.healthy || 0) + (data?.atRisk || 0) + (data?.critical || 0);
  
  const healthItems = [
    {
      label: "Healthy",
      count: data?.healthy || 0,
      percentage: total > 0 ? ((data?.healthy || 0) / total) * 100 : 0,
      color: "bg-green-500",
      textColor: "text-green-500"
    },
    {
      label: "At Risk", 
      count: data?.atRisk || 0,
      percentage: total > 0 ? ((data?.atRisk || 0) / total) * 100 : 0,
      color: "bg-yellow-500",
      textColor: "text-yellow-500"
    },
    {
      label: "Critical",
      count: data?.critical || 0,
      percentage: total > 0 ? ((data?.critical || 0) / total) * 100 : 0,
      color: "bg-red-500",
      textColor: "text-red-500"
    }
  ];

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-space">Client Health Distribution</CardTitle>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {total === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No client data available
          </div>
        ) : (
          healthItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-foreground font-medium">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={item.percentage} 
                    className="w-24 h-2"
                  />
                  <span className={`text-sm font-medium ${item.textColor}`}>
                    {item.count}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

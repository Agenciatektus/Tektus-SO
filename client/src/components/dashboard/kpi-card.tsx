import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
  color: "green" | "primary" | "blue" | "purple" | "red";
}

export function KPICard({ title, value, change, icon: Icon, trend, color }: KPICardProps) {
  const getIconBgClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500/10 text-green-500";
      case "primary":
        return "bg-primary/10 text-primary";
      case "blue":
        return "bg-blue-500/10 text-blue-500";
      case "purple":
        return "bg-purple-500/10 text-purple-500";
      case "red":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getChangeBadgeClass = (trend: string, color: string) => {
    if (trend === "neutral") {
      return "bg-muted text-muted-foreground";
    }
    
    switch (color) {
      case "green":
        return "text-green-500 bg-green-500/10";
      case "primary":
        return "text-primary bg-primary/10";
      case "blue":
        return "text-blue-500 bg-blue-500/10";
      case "purple":
        return "text-purple-500 bg-purple-500/10";
      case "red":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card className="card-hover border-border hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${getIconBgClass(color)}`}>
            <Icon className="w-5 h-5" />
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs ${getChangeBadgeClass(trend, color)} border-0`}
          >
            {change}
          </Badge>
        </div>
        <h3 className="text-2xl font-space font-bold text-foreground mb-1">
          {value}
        </h3>
        <p className="text-muted-foreground text-sm">{title}</p>
      </CardContent>
    </Card>
  );
}

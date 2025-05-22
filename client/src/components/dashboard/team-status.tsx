import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@shared/schema";

export function TeamStatus() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: false, // Only load if user is admin
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-500" : "bg-gray-500";
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-space">Team Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-16" />
              </div>
              <Skeleton className="w-2 h-2 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Mock team data for demonstration since user management requires admin access
  const mockTeamMembers = [
    { id: 1, firstName: "Sarah", lastName: "Chen", role: "Designer", isActive: true },
    { id: 2, firstName: "Marcus", lastName: "Johnson", role: "Developer", isActive: false },
    { id: 3, firstName: "Emma", lastName: "Rodriguez", role: "Content Manager", isActive: true },
    { id: 4, firstName: "David", lastName: "Kim", role: "Account Manager", isActive: true },
  ];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-space">Team Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTeamMembers.map((member) => (
          <div key={member.id} className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {getInitials(member.firstName, member.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-sm font-medium">
                {member.firstName} {member.lastName}
              </p>
              <p className="text-muted-foreground text-xs capitalize">
                {member.role}
              </p>
            </div>
            <div className={`w-2 h-2 ${getStatusColor(member.isActive)} rounded-full`}></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

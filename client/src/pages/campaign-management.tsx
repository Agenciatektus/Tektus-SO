import { useState } from "react";
import { Target, TrendingUp, Eye, DollarSign, BarChart3, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Campaign {
  id: string;
  name: string;
  client: string;
  platform: 'meta' | 'google';
  objective: string;
  dailyBudget: number;
  currentSpend: number;
  ctr: number;
  roas: number;
  responsibleBuyer: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
}

const platforms = {
  meta: { name: "Meta Ads", color: "bg-blue-600", icon: "📘" },
  google: { name: "Google Ads", color: "bg-green-600", icon: "🟢" }
};

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800"
};

export default function CampaignManagement() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "camp-1",
      name: "GreenLeaf Organic Food - Awareness",
      client: "GreenLeaf Organics",
      platform: "meta",
      objective: "Brand Awareness",
      dailyBudget: 150,
      currentSpend: 1240,
      ctr: 2.8,
      roas: 4.2,
      responsibleBuyer: "Mike Chen",
      status: "active",
      impressions: 45000,
      clicks: 1260,
      conversions: 89,
      startDate: "2025-05-01"
    },
    {
      id: "camp-2", 
      name: "TechFlow SaaS - Lead Generation",
      client: "TechFlow Solutions",
      platform: "google",
      objective: "Lead Generation",
      dailyBudget: 200,
      currentSpend: 2850,
      ctr: 3.5,
      roas: 5.8,
      responsibleBuyer: "Sarah Martinez",
      status: "active",
      impressions: 82000,
      clicks: 2870,
      conversions: 156,
      startDate: "2025-04-28"
    },
    {
      id: "camp-3",
      name: "HealthFirst Clinic - Local Reach",
      client: "HealthFirst Clinic", 
      platform: "meta",
      objective: "Local Awareness",
      dailyBudget: 80,
      currentSpend: 560,
      ctr: 1.9,
      roas: 3.1,
      responsibleBuyer: "Mike Chen",
      status: "active",
      impressions: 28000,
      clicks: 532,
      conversions: 34,
      startDate: "2025-05-10"
    },
    {
      id: "camp-4",
      name: "PropertyPro Realty - Search Ads",
      client: "PropertyPro Realty",
      platform: "google",
      objective: "Traffic",
      dailyBudget: 120,
      currentSpend: 980,
      ctr: 2.1,
      roas: 2.8,
      responsibleBuyer: "Sarah Martinez", 
      status: "paused",
      impressions: 38000,
      clicks: 798,
      conversions: 45,
      startDate: "2025-05-05"
    },
    {
      id: "camp-5",
      name: "ManufactureTech B2B Campaign",
      client: "ManufactureTech Co",
      platform: "google",
      objective: "Conversions",
      dailyBudget: 300,
      currentSpend: 4200,
      ctr: 4.2,
      roas: 6.5,
      responsibleBuyer: "Sarah Martinez",
      status: "active", 
      impressions: 95000,
      clicks: 3990,
      conversions: 287,
      startDate: "2025-04-20"
    }
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredCampaigns = campaigns.filter(campaign => {
    const platformMatch = selectedPlatform === "all" || campaign.platform === selectedPlatform;
    const statusMatch = selectedStatus === "all" || campaign.status === selectedStatus;
    return platformMatch && statusMatch;
  });

  const toggleCampaignStatus = (campaignId: string) => {
    // In production: update campaign status via API
    console.log(`Toggling status for campaign ${campaignId}`);
  };

  const getTotalStats = () => {
    const activeCampaigns = filteredCampaigns.filter(c => c.status === 'active');
    return {
      totalSpend: activeCampaigns.reduce((sum, c) => sum + c.currentSpend, 0),
      totalConversions: activeCampaigns.reduce((sum, c) => sum + c.conversions, 0),
      avgRoas: activeCampaigns.length > 0 ? 
        activeCampaigns.reduce((sum, c) => sum + c.roas, 0) / activeCampaigns.length : 0,
      avgCtr: activeCampaigns.length > 0 ?
        activeCampaigns.reduce((sum, c) => sum + c.ctr, 0) / activeCampaigns.length : 0
    };
  };

  const stats = getTotalStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Target className="h-8 w-8 text-teal-600" />
            Campaign Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and optimize paid traffic campaigns across platforms
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpend.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROAS</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRoas.toFixed(1)}x</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCtr.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="meta">Meta Ads</SelectItem>
            <SelectItem value="google">Google Ads</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base line-clamp-2">
                    {campaign.name}
                  </CardTitle>
                  <p className="text-sm text-teal-600 font-medium">
                    {campaign.client}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={platforms[campaign.platform].color}>
                    {platforms[campaign.platform].icon} {platforms[campaign.platform].name}
                  </Badge>
                  <Badge variant="secondary" className={statusColors[campaign.status]}>
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Objective:</span>
                  <p className="font-medium">{campaign.objective}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Media Buyer:</span>
                  <p className="font-medium">{campaign.responsibleBuyer}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Daily Budget:</span>
                  <p className="font-medium">${campaign.dailyBudget}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Spend:</span>
                  <p className="font-medium">${campaign.currentSpend}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">CTR:</span>
                  <p className="font-medium text-blue-600">{campaign.ctr}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">ROAS:</span>
                  <p className="font-medium text-green-600">{campaign.roas}x</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <p className="text-muted-foreground">Impressions</p>
                  <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Clicks</p>
                  <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Conversions</p>
                  <p className="font-medium">{campaign.conversions}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  Since {campaign.startDate}
                </span>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={campaign.status === 'active'}
                    onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                    size="sm"
                  />
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
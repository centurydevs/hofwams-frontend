import { Card } from "@/components/ui/card";
import { Users, UserPlus, TrendingUp, Globe } from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "2,420",
    change: "+12%",
    icon: Users,
  },
  {
    title: "New This Month",
    value: "145",
    change: "+4%",
    icon: UserPlus,
  },
  {
    title: "Growth Rate",
    value: "8.5%",
    change: "+2.1%",
    icon: TrendingUp,
  },
  {
    title: "Active Regions",
    value: "12",
    change: "+1",
    icon: Globe,
  },
];

export const AnalyticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="p-6 hover:shadow-lg transition-all duration-200 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className="h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

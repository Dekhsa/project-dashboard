import React from "react";
import StatCard from "../StatCard";
import { Users, FolderOpen, FileText, TrendingUp } from "lucide-react";
import { DashboardStats as StatsType } from "../../types";

interface DashboardStatsProps {
  stats: StatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const quickStats = [
    {
      title: "Total Visitors",
      value: stats.totalVisitors.toLocaleString(),
      change: +17.8,
      icon: Users,
      color: "blue" as const,
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      change: +5.2,
      icon: FolderOpen,
      color: "green" as const,
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      change: +12.3,
      icon: FileText,
      color: "purple" as const,
    },
    {
      title: "Monthly Growth",
      value: "15.6%",
      change: +8.1,
      icon: TrendingUp,
      color: "yellow" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={{
            value: stat.change,
            isPositive: stat.change > 0,
          }}
        />
      ))}
    </div>
  );
};

export default DashboardStats;

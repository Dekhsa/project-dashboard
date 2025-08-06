import React from "react";
import Layout from "../components/Layout";
import { 
  DashboardStats, 
  RecentActivities, 
  ProjectBreakdown 
} from "../components/dashboard";
import {
  FolderOpen,
  FileText,
  Calendar,
  Eye,
  CheckCircle
} from "lucide-react";
import { DashboardStats as DashboardStatsType } from "../types";

const Dashboard: React.FC = () => {
  const stats: DashboardStatsType = {
    totalVisitors: 8500,
    totalProjects: 12,
    completedProjects: 8,
    totalBlogPosts: 24,
    publishedPosts: 18,
    monthlyVisitors: 2400,
  };

  const completionPercentage = Math.round((stats.completedProjects / stats.totalProjects) * 100);

  const recentActivities = [
    {
      id: 1,
      action: 'Project "E-commerce Platform" updated',
      time: "2 hours ago",
      type: "project",
    },
    {
      id: 2,
      action: 'New blog post "React Best Practices" published',
      time: "4 hours ago",
      type: "blog",
    },
    {
      id: 3,
      action: 'Project "Mobile App" completed',
      time: "1 day ago",
      type: "project",
    },
    {
      id: 4,
      action: "Website traffic increased by 15%",
      time: "2 days ago",
      type: "analytics",
    },
    {
      id: 5,
      action: 'Started new project "Dashboard Redesign"',
      time: "3 days ago",
      type: "project",
    },
    {
      id: 6,
      action: 'Blog post "TypeScript Tips" drafted',
      time: "5 days ago",
      type: "blog",
    },
  ];

  const projectBreakdown = [
    { status: "Active", count: 4, percentage: 33, color: "bg-blue-500" },
    { status: "Completed", count: 8, percentage: 67, color: "bg-green-500" },
    { status: "Paused", count: 0, percentage: 0, color: "bg-yellow-500" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </div>
        </div>

        {/* Quick Stats */}
        <DashboardStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <RecentActivities activities={recentActivities} />
          </div>

          {/* Right Side Widgets */}
          <div className="space-y-6">
            {/* Project Breakdown */}
            <ProjectBreakdown 
              projectBreakdown={projectBreakdown}
              completionPercentage={completionPercentage}
            />

            {/* Performance Score */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Score
              </h2>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <span className="text-2xl font-bold text-green-600">92</span>
                </div>
                <p className="text-green-600 font-medium">Excellent</p>
                <p className="text-sm text-gray-500 mt-2">
                  Based on project completion rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <FolderOpen className="w-8 h-8 text-blue-500 mb-2" />
                <p className="font-medium text-gray-900">New Project</p>
                <p className="text-sm text-gray-500">Create a new project</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <FileText className="w-8 h-8 text-green-500 mb-2" />
                <p className="font-medium text-gray-900">Write Post</p>
                <p className="text-sm text-gray-500">Create a new blog post</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <Eye className="w-8 h-8 text-purple-500 mb-2" />
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-500">View detailed stats</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
                <CheckCircle className="w-8 h-8 text-yellow-500 mb-2" />
                <p className="font-medium text-gray-900">Tasks</p>
                <p className="text-sm text-gray-500">Manage your tasks</p>
              </button>
            </div>
          </div>

          {/* Project Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                  <p className="text-sm text-gray-600">Total Projects</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{completionPercentage}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

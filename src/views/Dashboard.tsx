import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  DashboardStats,
  RecentActivities,
  ProjectBreakdown,
} from "../components/dashboard";
import { FolderOpen, FileText, Calendar, Eye, CheckCircle } from "lucide-react";
import { DashboardStats as DashboardStatsType } from "../types";
import { statsAPI, projectAPI, blogAPI } from "../utils/api";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStatsType>({
    totalVisitors: 0,
    totalProjects: 0,
    completedProjects: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
    monthlyVisitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: "Loading recent activities...",
      time: "Just now",
      type: "system",
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await statsAPI.get();
        setStats(response.data || {
          totalVisitors: 0,
          totalProjects: 0,
          completedProjects: 0,
          totalBlogPosts: 0,
          publishedPosts: 0,
          monthlyVisitors: 0,
        });
        setError(null);

        // Update recent activities with real data
        setRecentActivities([
          {
            id: 1,
            action: "Dashboard statistics updated",
            time: "Just now",
            type: "system",
          },
          {
            id: 2,
            action: `Found ${response.data?.totalProjects || 0} projects in database`,
            time: "1 minute ago",
            type: "project",
          },
          {
            id: 3,
            action: `${response.data?.publishedPosts || 0} blog posts are published`,
            time: "2 minutes ago",
            type: "blog",
          },
        ]);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        console.error("Error fetching stats:", err);
        // Keep default values for stats if API fails
        setRecentActivities([
          {
            id: 1,
            action: "Failed to load recent activities",
            time: "Just now",
            type: "error",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Quick action handlers
  const handleCreateProject = async () => {
    try {
      const newProject = {
        title: "New Project",
        description: "Project description",
        status: "active" as const,
        technologies: [],
        progress: 0,
      };

      await projectAPI.create(newProject);

      // Refresh stats after creating project
      const updatedStats = await statsAPI.get();
      setStats(updatedStats);

      // Add recent activity
      setRecentActivities((prev) => [
        {
          id: Date.now(),
          action: `Created new project: "${newProject.title}"`,
          time: "Just now",
          type: "project",
        },
        ...prev.slice(0, 4), // Keep only 5 activities
      ]);

      // Navigate to projects page
      navigate("/projects");
    } catch (err) {
      setError("Failed to create new project");
      console.error("Error creating project:", err);
    }
  };

  const handleCreateBlogPost = async () => {
    try {
      const newPost = {
        title: "New Blog Post",
        content: "Blog post content...",
        excerpt: "Blog post excerpt",
        author: "Admin",
        tags: [],
        published: false,
      };

      await blogAPI.create(newPost);

      // Refresh stats after creating post
      const updatedStats = await statsAPI.get();
      setStats(updatedStats);

      // Add recent activity
      setRecentActivities((prev) => [
        {
          id: Date.now(),
          action: `Created new blog post: "${newPost.title}"`,
          time: "Just now",
          type: "blog",
        },
        ...prev.slice(0, 4), // Keep only 5 activities
      ]);

      // Navigate to blog page
      navigate("/blog");
    } catch (err) {
      setError("Failed to create new blog post");
      console.error("Error creating blog post:", err);
    }
  };

  const handleViewAnalytics = () => {
    // Navigate to a dedicated analytics page or show analytics modal
    navigate("/dashboard"); // Stay on dashboard for now
  };

  const handleManageTasks = () => {
    // Navigate to tasks/experience page
    navigate("/experience");
  };

  const completionPercentage =
    stats.totalProjects > 0
      ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
      : 0;

  const projectBreakdown = [
    {
      status: "Active",
      count: stats.totalProjects - stats.completedProjects,
      percentage:
        stats.totalProjects > 0
          ? Math.round(
              ((stats.totalProjects - stats.completedProjects) /
                stats.totalProjects) *
                100
            )
          : 0,
      color: "bg-blue-500",
    },
    {
      status: "Completed",
      count: stats.completedProjects,
      percentage: completionPercentage,
      color: "bg-green-500",
    },
    {
      status: "Paused",
      count: 0,
      percentage: 0,
      color: "bg-yellow-500",
    },
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading dashboard...</span>
          </div>
        ) : (
          <>
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
                      <span className="text-2xl font-bold text-green-600">
                        92
                      </span>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleCreateProject}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <FolderOpen className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="font-medium text-gray-900">New Project</p>
                    <p className="text-sm text-gray-500">
                      Create a new project
                    </p>
                  </button>
                  <button
                    onClick={handleCreateBlogPost}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <FileText className="w-8 h-8 text-green-500 mb-2" />
                    <p className="font-medium text-gray-900">Write Post</p>
                    <p className="text-sm text-gray-500">
                      Create a new blog post
                    </p>
                  </button>
                  <button
                    onClick={handleViewAnalytics}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <Eye className="w-8 h-8 text-purple-500 mb-2" />
                    <p className="font-medium text-gray-900">Analytics</p>
                    <p className="text-sm text-gray-500">View detailed stats</p>
                  </button>
                  <button
                    onClick={handleManageTasks}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <CheckCircle className="w-8 h-8 text-yellow-500 mb-2" />
                    <p className="font-medium text-gray-900">Tasks</p>
                    <p className="text-sm text-gray-500">Manage your tasks</p>
                  </button>
                </div>
              </div>

              {/* Project Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalProjects}
                      </p>
                      <p className="text-sm text-gray-600">Total Projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        {stats.completedProjects}
                      </p>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

"use client";

import { QuickActions } from "@/app/modules/dashboard/components/QuickActions";
import { StatsGrid } from "@/app/modules/dashboard/components/StatsGrid";
import { Eye, Users, Heart, MessageSquare } from "lucide-react";

interface DashboardViewProps {}

export function DashboardView({}: DashboardViewProps) {
  const stats = [
    {
      icon: <Eye size={24} />,
      label: "Total Views",
      value: "124.5K",
      change: "+12.5%",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Users size={24} />,
      label: "Followers",
      value: "8.2K",
      change: "+8.3%",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Heart size={24} />,
      label: "Total Likes",
      value: "45.8K",
      change: "+15.2%",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <MessageSquare size={24} />,
      label: "Comments",
      value: "2.1K",
      change: "+5.7%",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const recentBlogs = [
    {
      id: 1,
      title: "The Rise of Quantum Computing",
      views: 12400,
      likes: 856,
      status: "Published",
      date: "Nov 8, 2025",
    },
    {
      id: 2,
      title: "Web3 Infrastructure Deep Dive",
      views: 9800,
      likes: 623,
      status: "Published",
      date: "Nov 7, 2025",
    },
    {
      id: 3,
      title: "AI Ethics in 2025",
      views: 8200,
      likes: 512,
      status: "Draft",
      date: "Nov 6, 2025",
    },
    {
      id: 4,
      title: "Serverless Edge Computing",
      views: 15600,
      likes: 1024,
      status: "Published",
      date: "Nov 5, 2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid Component */}
      <StatsGrid stats={stats} />

      {/* Quick Actions */}
      <QuickActions onViewAnalytics={() => {}} onEditProfile={() => {}} />

      {/* Recent Blogs */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold mb-4">Recent Blog Posts</h3>
        {/* <BlogList blogs={recentBlogs} /> */}
      </div>
    </div>
  );
}

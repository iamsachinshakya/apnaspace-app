"use client";

import { EngagementChart } from "@/app/modules/dashboard/components/analytics/EngagementChart";
import { TopPosts } from "@/app/modules/dashboard/components/analytics/TopPosts";
import { ViewsChart } from "@/app/modules/dashboard/components/analytics/ViewsChart";

const topPosts = [
  { id: 1, title: "The Rise of Quantum Computing", views: 12400 },
  { id: 2, title: "Web3 Infrastructure Deep Dive", views: 9800 },
  { id: 3, title: "AI Ethics in 2025", views: 8200 },
  { id: 4, title: "Serverless Edge Computing", views: 15600 },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ViewsChart />
        <EngagementChart />
      </div>
      <TopPosts posts={topPosts} />
    </div>
  );
}

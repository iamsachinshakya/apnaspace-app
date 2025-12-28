"use client";

import { useState } from "react";
import { Header } from "@/app/modules/dashboard/components/layout/Header";
import { Sidebar } from "@/app/modules/dashboard/components/layout/Sidebar";
import { DashboardView } from "@/app/modules/dashboard/components/views/DashboardView";
import { BlogsView } from "@/app/modules/dashboard/components/views/BlogsView";
import { AnalyticsView } from "@/app/modules/dashboard/components/views/AnalyticsView";
import { ProfileView } from "@/app/modules/dashboard/components/views/ProfileView";
import { SettingsView } from "@/app/modules/dashboard/components/views/SettingsView";
import { AdminView } from "@/app/modules/dashboard/components/views/AdminView";

export default function DashboardPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen relative z-10">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header activeTab={activeTab} />

        {/* Content Views */}
        <div className="p-8">
          {activeTab === "dashboard" && <DashboardView />}

          {activeTab === "blogs" && <BlogsView />}

          {activeTab === "analytics" && <AnalyticsView />}

          {activeTab === "profile" && <ProfileView />}

          {activeTab === "admin" && <AdminView />}

          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

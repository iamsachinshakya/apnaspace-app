"use client";

import { useState } from "react";
import { Users, MessageSquare, FolderOpen } from "lucide-react";
import { UsersTable } from "@/app/modules/dashboard/components/UsersTable";
import { CommentsTable } from "@/app/modules/dashboard/components/CommentsTable";
import { CategoriesTable } from "@/app/modules/dashboard/components/CategoriesTable";

type AdminTab = "users" | "comments" | "categories";

export function AdminView() {
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>("users");

  const tabs = [
    { id: "users" as AdminTab, label: "Users", icon: Users, count: 1234 },
    {
      id: "comments" as AdminTab,
      label: "Comments",
      icon: MessageSquare,
      count: 567,
    },
    {
      id: "categories" as AdminTab,
      label: "Categories",
      icon: FolderOpen,
      count: 12,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Tabs */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeAdminTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/30"
                    : "hover:bg-gray-700/30"
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold">{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeAdminTab === tab.id ? "bg-white/20" : "bg-gray-700/50"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        {activeAdminTab === "users" && <UsersTable />}
        {activeAdminTab === "comments" && <CommentsTable />}
        {activeAdminTab === "categories" && <CategoriesTable />}
      </div>
    </div>
  );
}

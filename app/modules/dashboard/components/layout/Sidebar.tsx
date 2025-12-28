"use client";

import { NavButton } from "@/app/modules/dashboard/components/layout/NavButton";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "blogs", icon: FileText, label: "My Blogs" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "admin", icon: Shield, label: "Admin Panel" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ApnaSpace
          </h1>
        </Link>
        <p className="text-sm text-gray-400 mt-1">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            {...item}
            activeTab={activeTab}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

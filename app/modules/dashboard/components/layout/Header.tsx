"use client";

import { useState } from "react";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserAvatar } from "./UserAvatar";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/app/modules/auth/redux/authSlice";

interface HeaderProps {
  activeTab: string;
}

export function Header({ activeTab }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const user = useSelector(selectAuthUser); // null OR user object

  const titles: Record<string, string> = {
    dashboard: "Dashboard Overview",
    blogs: "My Blogs",
    analytics: "Analytics",
    profile: "Profile Settings",
    settings: "Settings",
  };

  return (
    <header className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{titles[activeTab]}</h2>

          {/* Show only if user exists */}
          {user && (
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, {user.username}!
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <NotificationDropdown
            show={showNotifications}
            onToggle={() => setShowNotifications(!showNotifications)}
          />

          {/* Only render avatar if user exists */}
          {user && (
            <UserAvatar
              name={user.username}
              role={user.role}
              avatar={user.avatar}
            />
          )}
        </div>
      </div>
    </header>
  );
}

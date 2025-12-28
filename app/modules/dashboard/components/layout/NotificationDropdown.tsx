"use client";

import { Bell } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
  type: string;
}

interface NotificationDropdownProps {
  show: boolean;
  onToggle: () => void;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: 'New comment on "Quantum Computing"',
    time: "5m ago",
    type: "comment",
  },
  {
    id: 2,
    message: "Your blog reached 10K views!",
    time: "1h ago",
    type: "milestone",
  },
  {
    id: 3,
    message: "Sarah Johnson started following you",
    time: "2h ago",
    type: "follow",
  },
];

export function NotificationDropdown({
  show,
  onToggle,
}: NotificationDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all relative"
      >
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="p-2 max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 hover:bg-gray-700/30 rounded-xl transition-all cursor-pointer"
              >
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

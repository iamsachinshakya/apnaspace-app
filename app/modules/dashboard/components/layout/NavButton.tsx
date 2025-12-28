"use client";

import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  id: string;
  icon: LucideIcon;
  label: string;
  activeTab: string;
  onClick: () => void;
}

export function NavButton({
  id,
  icon: Icon,
  label,
  activeTab,
  onClick,
}: NavButtonProps) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/30"
          : "hover:bg-gray-700/30"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

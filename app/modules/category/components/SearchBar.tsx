"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  searchQuery = "",
  onSearchChange,
  placeholder = "Search blogs...",
}: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md mx-auto mb-10">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
        size={20}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-400"
      />
    </div>
  );
}

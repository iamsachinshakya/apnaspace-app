"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search categories...",
}: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <Search
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-all duration-300 group-focus-within:scale-110"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-6 py-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400 text-lg"
        />
      </div>
    </div>
  );
}

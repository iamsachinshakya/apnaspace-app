"use client";

import { FilterType } from "@/app/modules/category/types/types";

interface FilterButtonsProps {
  filters: FilterType[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterButtons({
  filters,
  selectedFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter, index) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 animate-fade-in-up ${
            selectedFilter === filter
              ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30 scale-105"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:scale-105"
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

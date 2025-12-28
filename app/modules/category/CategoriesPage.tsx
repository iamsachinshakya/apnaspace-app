"use client";

import { CategoriesGrid } from "@/app/modules/category/components/CategoriesGrid";
import { HeroSection } from "@/app/modules/category/components/HeroSection";
import { StatsSection } from "@/app/modules/category/components/StatsSection";
import { FilterType } from "@/app/modules/category/types/types";
import { CATEGORIES, FILTERS } from "@/app/modules/category/utils/constants";
import { useState } from "react";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Trending" && cat.trending);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={FILTERS}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <CategoriesGrid categories={filteredCategories} />
        </div>
      </section>

      <StatsSection />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Category } from "@/app/modules/category/types/types";
import { CategoryCard } from "@/app/modules/category/components/CategoryCard";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

interface CategoriesGridProps {
  categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  if (categories.length === 0) {
    return (
      <FadeInOnScroll direction="scale" delay="short">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No categories found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      </FadeInOnScroll>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        // Staggered delays based on position in grid
        const getDelay = (idx: number) => {
          const position = idx % 3;
          if (position === 0) return "short" as const;
          if (position === 1) return "medium" as const;
          return "long" as const;
        };

        return (
          <FadeInOnScroll
            key={category.id}
            direction="up"
            delay={getDelay(index)}
            threshold={0.2}
          >
            <CategoryCard
              category={category}
              isHovered={hoveredCategory === category.id}
              onHover={setHoveredCategory}
            />
          </FadeInOnScroll>
        );
      })}
    </div>
  );
}

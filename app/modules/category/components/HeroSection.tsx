"use client";

import { FilterButtons } from "@/app/modules/category/components/FilterButtons";
import { SearchBar } from "@/app/modules/category/components/SearchBar";
import { FilterType } from "@/app/modules/category/types/types";
import { Sparkles } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import FloatingBackground from "@/app/shared/components/ui/FloatingBackground";
import FloatingElements from "@/app/shared/components/ui/FloatingElements";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterType[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  filters,
  selectedFilter,
  onFilterChange,
}: HeroSectionProps) {
  const scrollY = useScrollPosition({ throttle: 16 });

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Parallax Badge */}
          <ParallaxElement
            scrollY={scrollY}
            speed={0.1}
            className="inline-block mb-6"
          >
            <FadeInOnScroll direction="scale" delay="none">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm">
                <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                <span className="text-sm text-cyan-400">
                  Explore Tech Categories
                </span>
              </div>
            </FadeInOnScroll>
          </ParallaxElement>

          {/* Title */}
          <FadeInOnScroll direction="up" delay="short">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Topics
              </span>
            </h1>
          </FadeInOnScroll>

          {/* Description */}
          <FadeInOnScroll direction="up" delay="medium">
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Dive deep into cutting-edge technology categories. From AI to
              Web3, find articles that match your interests.
            </p>
          </FadeInOnScroll>

          {/* Search Bar */}
          <FadeInOnScroll direction="up" delay="long">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </FadeInOnScroll>

          {/* Filter Buttons */}
          <FadeInOnScroll direction="up" delay="long">
            <FilterButtons
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterChange={onFilterChange}
            />
          </FadeInOnScroll>
        </div>
      </div>

      {/* Floating Elements with Parallax */}
      <ParallaxElement
        scrollY={scrollY}
        speed={0.2}
        className="absolute top-1/3 left-10"
      >
        <div className="w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-float-slow"></div>
      </ParallaxElement>

      <ParallaxElement
        scrollY={scrollY}
        speed={0.15}
        className="absolute bottom-1/3 right-10"
      >
        <div className="w-16 h-16 border border-purple-500/20 rounded-full animate-float-slow-delayed"></div>
      </ParallaxElement>

      {/* Additional Floating Elements */}
      <ParallaxElement
        scrollY={scrollY}
        speed={0.1}
        className="absolute top-1/2 left-1/4 hidden lg:block"
      >
        <div className="w-12 h-12 border border-pink-500/20 rounded-lg rotate-12 animate-float"></div>
      </ParallaxElement>

      <ParallaxElement
        scrollY={scrollY}
        speed={0.25}
        className="absolute bottom-1/3 right-1/4 hidden lg:block"
      >
        <div className="w-14 h-14 border border-cyan-500/20 rounded-full animate-float-delayed"></div>
      </ParallaxElement>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  );
}

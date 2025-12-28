"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

interface Category {
  name: string;
  color: string;
  count: number;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    { name: "AI", color: "from-cyan-500 to-blue-500", count: 24 },
    { name: "Web3", color: "from-purple-500 to-pink-500", count: 18 },
    { name: "Cloud", color: "from-violet-500 to-purple-500", count: 31 },
    { name: "Frontend", color: "from-pink-500 to-rose-500", count: 42 },
  ];

  // Map delays for staggered animation
  const delays = ["short", "short", "medium", "medium"] as const;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <FadeInOnScroll direction="up" delay="short">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Explore by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
        </FadeInOnScroll>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <FadeInOnScroll
              key={cat.name}
              direction="up"
              delay={delays[idx]}
              threshold={0.2}
            >
              <div className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`inline-block w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}
                  ></div>
                  <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-gray-400 text-sm">{cat.count} articles</p>
                </div>
                <ChevronRight className="absolute bottom-6 right-6 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

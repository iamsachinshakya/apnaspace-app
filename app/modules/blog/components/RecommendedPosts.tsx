"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Eye,
  Clock,
  User,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  views: string;
}

interface RecommendedPostsProps {
  posts: Post[];
}

export default function RecommendedPosts({ posts }: RecommendedPostsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerPage =
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 3;
  const maxSlides = Math.ceil(posts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      AI: "from-cyan-500 to-blue-500",
      Web3: "from-purple-500 to-pink-500",
      Cloud: "from-violet-500 to-purple-500",
      Frontend: "from-pink-500 to-rose-500",
      Security: "from-red-500 to-orange-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Continue{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Reading
            </span>
          </h2>
          <div className="flex items-center gap-2 text-cyan-400">
            <TrendingUp size={20} />
            <span className="text-sm font-semibold">Trending</span>
          </div>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out py-4"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                    {posts
                      .slice(
                        slideIndex * itemsPerPage,
                        (slideIndex + 1) * itemsPerPage
                      )
                      .map((post) => (
                        <div
                          key={post.id}
                          className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                        >
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                            <span
                              className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${getCategoryColor(
                                post.category
                              )} text-white shadow-lg backdrop-blur-sm`}
                            >
                              {post.category}
                            </span>
                            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-white/80">
                              <Eye size={14} />
                              {post.views}
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
                              {post.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <User size={14} />
                                <span className="font-medium">
                                  {post.author}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={14} />
                                {post.readTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {maxSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center transition-all ${
                  currentSlide === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-cyan-500/50 hover:scale-110"
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlides - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center transition-all ${
                  currentSlide === maxSlides - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-cyan-500/50 hover:scale-110"
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "w-2 bg-gray-700 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

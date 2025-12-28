"use client";

import { useState } from "react";
import { Bookmark, Share2, Eye, MessageCircle, Sparkles } from "lucide-react";
import ShareMenu from "./ShareMenu";
import { BlogHeroProps } from "@/app/modules/blog/types/IBlog";

export default function BlogHero({ blogPost }: BlogHeroProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
    <>
      <div className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Category & Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${getCategoryColor(
                blogPost.category
              )} text-white shadow-lg`}
            >
              <Sparkles size={16} />
              {blogPost.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {blogPost.views}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {blogPost.comments}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {blogPost.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {blogPost.subtitle}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-800/50">
            <div className="flex items-center gap-4">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="w-14 h-14 rounded-full border-2 border-cyan-500/50"
              />
              <div>
                <h3 className="font-semibold text-white">
                  {blogPost.author.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{blogPost.date}</span>
                  <span>•</span>
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isBookmarked
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                    : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-cyan-500/50"
                }`}
              >
                <Bookmark
                  size={20}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <Share2 size={20} />
                </button>
                {showShareMenu && <ShareMenu />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={blogPost.coverImage}
              alt={blogPost.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}

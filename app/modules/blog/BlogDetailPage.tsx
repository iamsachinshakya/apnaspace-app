"use client";

import AuthorBio from "@/app/modules/blog/components/AuthorBio";
import BlogContent from "@/app/modules/blog/components/BlogContent";
import BlogHero from "@/app/modules/blog/components/BlogHero";
import CommentSection from "@/app/modules/blog/components/CommentSection";
import RecommendedPosts from "@/app/modules/blog/components/RecommendedPosts";
import { BLOG_POST } from "@/app/modules/blog/data/blogData";
import { RECOMMENDED_POSTS } from "@/app/modules/blog/data/recommendedPostsData";
import { useState, useEffect } from "react";

export default function BlogDetailPage() {
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Total scrollable height of the page
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Current scroll position
      const scrollPosition = window.scrollY;

      // Calculate percentage
      const progress = (scrollPosition / totalHeight) * 100;

      setReadProgress(Math.min(progress, 100));
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="pt-20"></div>
      <BlogHero blogPost={BLOG_POST} />
      <BlogContent content={BLOG_POST.content} tags={BLOG_POST.tags} />
      <AuthorBio author={BLOG_POST.author} />
      <CommentSection />
      <RecommendedPosts posts={RECOMMENDED_POSTS} />
    </div>
  );
}

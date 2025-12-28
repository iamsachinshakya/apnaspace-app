"use client";

import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const FeaturedPosts: React.FC = () => {
  const featuredPosts: Post[] = [
    {
      id: 1,
      title: "AI-Powered Development: The Future is Now",
      description:
        "How artificial intelligence is revolutionizing the way we write, test, and deploy code in 2025",
      author: "Sarah Mitchell",
      date: "Nov 8, 2025",
      category: "AI",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Web3 Revolution: Decentralized Apps Take Center Stage",
      description:
        "Exploring the rise of dApps and how blockchain is transforming digital ownership",
      author: "Alex Thompson",
      date: "Nov 7, 2025",
      category: "Web3",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Cloud Native Architecture: Building for Scale",
      description:
        "Best practices for designing microservices that handle millions of requests",
      author: "Priya Sharma",
      date: "Nov 6, 2025",
      category: "Cloud",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "React Server Components: A Game Changer",
      description:
        "Deep dive into React's latest paradigm shift and what it means for frontend developers",
      author: "James Chen",
      date: "Nov 5, 2025",
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    },
  ];

  const categories = [
    { name: "AI", color: "from-cyan-500 to-blue-500" },
    { name: "Web3", color: "from-purple-500 to-pink-500" },
    { name: "Cloud", color: "from-violet-500 to-purple-500" },
    { name: "Frontend", color: "from-pink-500 to-rose-500" },
  ];

  // Staggered delays for articles
  const delays = ["short", "short", "medium", "medium"] as const;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <FadeInOnScroll direction="up" delay="short">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
        </FadeInOnScroll>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, idx) => (
            <FadeInOnScroll
              key={post.id}
              direction="up"
              delay={delays[idx]}
              threshold={0.2}
            >
              <article className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                  {/* Category Badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${
                      categories.find((c) => c.name === post.category)?.color
                    } text-white backdrop-blur-sm`}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {post.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </span>
                    </div>
                    <ArrowRight
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      size={20}
                    />
                  </div>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Optional: View All Link */}
        <FadeInOnScroll direction="up" delay="long">
          <div className="text-center mt-12">
            <a
              href="/posts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-full font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group"
            >
              View All Articles
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default FeaturedPosts;

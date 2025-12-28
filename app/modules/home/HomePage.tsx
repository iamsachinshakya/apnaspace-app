import Categories from "@/app/modules/home/components/Categories";
import FeaturedPosts from "@/app/modules/home/components/FeaturedPosts";
import HomeHero from "@/app/modules/home/components/HomeHero";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />
      <HomeHero />
      <Categories />
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;

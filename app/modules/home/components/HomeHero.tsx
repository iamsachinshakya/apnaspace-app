"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";

const HomeHero: React.FC = () => {
  const scrollY = useScrollPosition({ throttle: 16 });

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge with Parallax */}
        <ParallaxElement scrollY={scrollY} speed={0.1} className="mb-6">
          <FadeInOnScroll direction="scale" delay="none">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm mb-4">
              <Sparkles size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400 font-medium">
                Welcome to the Future
              </span>
            </div>
          </FadeInOnScroll>
        </ParallaxElement>

        {/* Main Title */}
        <FadeInOnScroll direction="up" delay="short">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              ApnaSpace
            </span>
          </h1>
        </FadeInOnScroll>

        {/* Subtitle */}
        <FadeInOnScroll direction="up" delay="medium">
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-semibold">
            Where Innovation Meets Tomorrow
          </p>
        </FadeInOnScroll>

        {/* Description */}
        <FadeInOnScroll direction="up" delay="long">
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the latest in AI, Web3, Cloud Computing, and cutting-edge
            development. Join thousands of tech enthusiasts exploring the future
            of technology.
          </p>
        </FadeInOnScroll>

        {/* CTA Button */}
        <FadeInOnScroll direction="scale" delay="long">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Read Latest Posts
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </FadeInOnScroll>

        {/* Stats or Features (Optional) */}
        <FadeInOnScroll direction="up" delay="long">
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <FadeInOnScroll direction="up" delay="short" threshold={0.5}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  50K+
                </div>
                <div className="text-sm text-gray-400">Readers</div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay="medium" threshold={0.5}>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay="long" threshold={0.5}>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  150+
                </div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay="long" threshold={0.5}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">25+</div>
                <div className="text-sm text-gray-400">Experts</div>
              </div>
            </FadeInOnScroll>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Floating Elements with Parallax */}
      <ParallaxElement
        scrollY={scrollY}
        speed={0.2}
        className="absolute top-1/4 left-10"
      >
        <div className="w-20 h-20 border border-cyan-500/30 rounded-lg rotate-45 animate-float-slow"></div>
      </ParallaxElement>

      <ParallaxElement
        scrollY={scrollY}
        speed={0.15}
        className="absolute bottom-1/4 right-10"
      >
        <div className="w-16 h-16 border border-purple-500/30 rounded-full animate-float-slow-delayed"></div>
      </ParallaxElement>

      <ParallaxElement
        scrollY={scrollY}
        speed={0.1}
        className="absolute top-1/2 left-1/4"
      >
        <div className="w-12 h-12 border border-pink-500/20 rounded-lg rotate-12 animate-float"></div>
      </ParallaxElement>

      <ParallaxElement
        scrollY={scrollY}
        speed={0.25}
        className="absolute bottom-1/3 right-1/4"
      >
        <div className="w-14 h-14 border border-cyan-500/20 rounded-full animate-float-delayed"></div>
      </ParallaxElement>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  );
};

export default HomeHero;

"use client";

import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const scrollY = useScrollPosition({ throttle: 16 });

  const scrollTo = () => {
    const formSection = document.querySelector("#mission");
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8 section-marker overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Parallax Badge */}
        <ParallaxElement
          scrollY={scrollY}
          speed={0.1}
          className="inline-block mb-6"
        >
          <FadeInOnScroll direction="scale" delay="none">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <Sparkles size={20} className="text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-semibold">
                About ApnaSpace
              </span>
            </div>
          </FadeInOnScroll>
        </ParallaxElement>

        {/* Title */}
        <FadeInOnScroll direction="up" delay="short" threshold={0.2}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Empowering Developers,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shaping the Future
            </span>
          </h1>
        </FadeInOnScroll>

        {/* Description */}
        <FadeInOnScroll direction="up" delay="medium" threshold={0.2}>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make cutting-edge technology accessible to
            everyone. From AI breakthroughs to Web3 innovations, we bring you
            the insights that matter.
          </p>
        </FadeInOnScroll>

        {/* CTA Buttons - Alternating Directions */}
        <div className="flex flex-wrap justify-center gap-4">
          <FadeInOnScroll direction="right" delay="long" threshold={0.2}>
            <div
              onClick={scrollTo}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              Our Mission
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </FadeInOnScroll>

          {/* <FadeInOnScroll direction="left" delay="long" threshold={0.2}>
            <a
              href="#team"
              className="flex items-center gap-2 px-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-full font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
            >
              Meet the Team
            </a>
          </FadeInOnScroll> */}
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
};

export default HeroSection;

"use client";

import { ChevronRight } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

interface CTASectionProps {
  onSubscribeClick: () => void;
}

export function CTASection({ onSubscribeClick }: CTASectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInOnScroll direction="up" delay="short" threshold={0.3}>
          <h2 className="text-4xl font-bold mb-4">
            Can't find what you're{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              looking for?
            </span>
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay="medium" threshold={0.3}>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter and get personalized content
            recommendations
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll direction="scale" delay="long" threshold={0.3}>
          <button
            onClick={onSubscribeClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Subscribe Now
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Star, Mail } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

const CTASection: React.FC = () => {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInOnScroll direction="scale" delay="short" threshold={0.3}>
          <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-cyan-500/20 backdrop-blur-sm overflow-hidden text-center">
            {/* Animated Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="relative z-10">
              {/* Star Icon */}
              <FadeInOnScroll direction="scale" delay="medium" threshold={0.5}>
                <Star
                  className="inline-block text-cyan-400 mb-4 animate-pulse"
                  size={48}
                />
              </FadeInOnScroll>

              {/* Title */}
              <FadeInOnScroll direction="up" delay="medium" threshold={0.5}>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Join Our{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Community
                  </span>
                </h2>
              </FadeInOnScroll>

              {/* Description */}
              <FadeInOnScroll direction="up" delay="long" threshold={0.5}>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Be part of 50,000+ developers and tech enthusiasts shaping the
                  future of technology
                </p>
              </FadeInOnScroll>

              {/* CTA Buttons */}
              <FadeInOnScroll direction="up" delay="long" threshold={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Subscribe to Newsletter
                  </a>
                  <a
                    href="#"
                    className="px-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-full font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                  >
                    Start Reading
                  </a>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default CTASection;

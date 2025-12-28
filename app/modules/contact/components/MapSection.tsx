"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Mail, Phone } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

export default function MapSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <FadeInOnScroll direction="scale" delay="none">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4 backdrop-blur-sm">
              <MapPin size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400">Let's Connect</span>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay="short">
            <h2 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Where to Find Me
              </span>
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay="medium">
            <p className="text-gray-400 max-w-2xl mx-auto">
              Based in Gurugram, India - Available for remote opportunities
              worldwide
            </p>
          </FadeInOnScroll>
        </div>

        {/* Main Interactive Location Card */}
        <FadeInOnScroll direction="up" delay="long" threshold={0.2}>
          <div
            className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>

            {/* Animated grid overlay */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                `,
                  backgroundSize: "50px 50px",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              ></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-12 lg:p-16 min-h-[500px]">
              {/* Left side - Info */}
              <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                {/* Animated icon */}
                <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-cyan-500/20">
                  <MapPin
                    size={64}
                    className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
                  My Location
                </h3>

                <div className="space-y-3 mb-8">
                  <p className="text-xl text-gray-300 font-semibold">
                    Gurugram, Haryana
                  </p>
                  <p className="text-gray-400">Cyber City, Delhi NCR, India</p>
                  <p className="text-sm text-gray-500 font-mono">
                    IST (UTC+5:30) • Available for Remote Work
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:ApnaSpace@gmail.com"
                    className="group/link flex items-center justify-center lg:justify-start gap-3 text-gray-300 hover:text-cyan-400 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover/link:border-cyan-500/50 group-hover/link:scale-110 transition-all duration-300">
                      <Mail size={18} className="text-cyan-400" />
                    </div>
                    <span className="text-base font-medium">
                      ApnaSpace@gmail.com
                    </span>
                  </a>

                  <a
                    href="tel:+917500986056"
                    className="group/link flex items-center justify-center lg:justify-start gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover/link:border-purple-500/50 group-hover/link:scale-110 transition-all duration-300">
                      <Phone size={18} className="text-purple-400" />
                    </div>
                    <span className="text-base font-medium">
                      +91 7500986056
                    </span>
                  </a>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="https://maps.google.com/?q=DLF+Cyber+City+Gurugram+Haryana+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View on Map
                      <Navigation
                        size={18}
                        className="group-hover/btn:rotate-45 transition-transform duration-300"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
              </div>

              {/* Right side - Visual elements */}
              <div className="flex-1 relative w-full h-64 lg:h-full">
                {/* Pulsing rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-48 h-48">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"
                        style={{
                          animationDuration: `${3 + i}s`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      ></div>
                    ))}

                    {/* Center pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="p-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full shadow-2xl shadow-cyan-500/50 group-hover:scale-125 transition-transform duration-500">
                          <MapPin size={32} className="text-white" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                {[
                  { top: "20%", left: "30%", delay: "0s" },
                  { top: "60%", left: "70%", delay: "1s" },
                  { top: "40%", left: "60%", delay: "2s" },
                ].map((pos, idx) => (
                  <div
                    key={idx}
                    className="absolute w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      animationDelay: pos.delay,
                    }}
                  >
                    <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-center gap-6 px-6 py-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Available for Freelance & Full-time</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>Response Time: Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {[
            { label: "Local Time", value: "IST (UTC+5:30)", icon: "🕐" },
            { label: "Remote Work", value: "Available", icon: "🌍" },
            { label: "Response", value: "< 24hrs", icon: "⚡" },
          ].map((stat, idx) => (
            <FadeInOnScroll
              key={idx}
              direction="up"
              delay={idx === 0 ? "short" : idx === 1 ? "medium" : "long"}
              threshold={0.3}
            >
              <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

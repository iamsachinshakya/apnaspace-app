"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  Zap,
  Globe,
  ArrowDown,
  Mail,
  Phone,
} from "lucide-react";

export default function ContactHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 25,
          y: (e.clientY - rect.top - rect.height / 2) / 25,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToForm = () => {
    const formSection = document.querySelector("#contact-form");
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Advanced Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.15) 2px, transparent 2px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.15) 2px, transparent 2px),
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
            backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${
              mousePosition.y * 2
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
          style={{
            animationDelay: "1s",
            transform: `translate(${-mousePosition.x * 2}px, ${
              -mousePosition.y * 2
            }px)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes with parallax */}
        <div
          className="absolute top-[15%] left-[10%] w-24 h-24 border-2 border-cyan-500/30 rounded-2xl rotate-45 backdrop-blur-sm"
          style={{
            transform: `translate(${mousePosition.x * 3}px, ${
              mousePosition.y * 3
            }px) rotate(45deg)`,
            transition: "transform 0.3s ease-out",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl"></div>
        </div>

        <div
          className="absolute top-[25%] right-[15%] w-20 h-20 border-2 border-purple-500/30 rounded-full backdrop-blur-sm"
          style={{
            transform: `translate(${-mousePosition.x * 2}px, ${
              mousePosition.y * 2
            }px)`,
            transition: "transform 0.3s ease-out",
            animation: "float 8s ease-in-out infinite 1s",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full"></div>
        </div>

        <div
          className="absolute bottom-[20%] left-[15%] w-16 h-16 border-2 border-pink-500/30 rounded-lg rotate-12 backdrop-blur-sm"
          style={{
            transform: `translate(${mousePosition.x * 2.5}px, ${
              -mousePosition.y * 2.5
            }px) rotate(12deg)`,
            transition: "transform 0.3s ease-out",
            animation: "float 7s ease-in-out infinite 2s",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-lg"></div>
        </div>

        <div
          className="absolute bottom-[30%] right-[10%] w-28 h-28 border-2 border-cyan-500/20 rounded-3xl rotate-[30deg] backdrop-blur-sm"
          style={{
            transform: `translate(${-mousePosition.x * 3}px, ${
              -mousePosition.y * 3
            }px) rotate(30deg)`,
            transition: "transform 0.3s ease-out",
            animation: "float 9s ease-in-out infinite 1.5s",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl"></div>
        </div>

        {/* Floating Icons */}
        {[
          {
            Icon: Zap,
            position: "top-[20%] right-[20%]",
            delay: "0s",
            color: "cyan",
          },
          {
            Icon: Mail,
            position: "bottom-[25%] left-[20%]",
            delay: "1s",
            color: "purple",
          },
          {
            Icon: Globe,
            position: "top-[40%] left-[8%]",
            delay: "2s",
            color: "pink",
          },
        ].map(({ Icon, position, delay, color }, idx) => (
          <div
            key={idx}
            className={`absolute ${position}`}
            style={{
              animation: `float 6s ease-in-out infinite ${delay}`,
              transform: `translate(${mousePosition.x * (idx + 1)}px, ${
                mousePosition.y * (idx + 1)
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div
              className={`p-3 rounded-xl bg-${color}-500/10 backdrop-blur-sm border border-${color}-500/20 shadow-lg shadow-${color}-500/20`}
            >
              <Icon size={20} className={`text-${color}-400`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge with Animation */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-full mb-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group"
          style={{
            transform: `translateY(${-mousePosition.y * 0.5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="relative">
            <Sparkles size={18} className="text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 blur-md">
              <Sparkles size={18} className="text-cyan-400" />
            </div>
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            We'd love to hear from you
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
        </div>

        {/* Main Heading with 3D Text Effect */}
        <div className="relative mb-8">
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
            style={{
              transform: `perspective(1000px) rotateX(${
                mousePosition.y * 0.05
              }deg) rotateY(${mousePosition.x * 0.05}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Layered text for 3D depth effect */}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                Get in Touch
              </span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                Get in Touch
              </span>
              {/* 3D shadow layers */}
              <span
                className="absolute top-1 left-1 -z-10 bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/30 bg-clip-text text-transparent blur-sm"
                aria-hidden="true"
              >
                Get in Touch
              </span>
              <span
                className="absolute top-2 left-2 -z-20 bg-gradient-to-r from-cyan-700/20 via-purple-700/20 to-pink-700/20 bg-clip-text text-transparent blur-md"
                aria-hidden="true"
              >
                Get in Touch
              </span>
            </span>
          </h1>

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-1.5 w-48 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          style={{
            transform: `translateY(${-mousePosition.y * 0.3}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          Have a question or want to collaborate?{" "}
          <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            We're just a message away.
          </span>
        </p>

        {/* Single Primary CTA Button */}
        <div
          className="flex justify-center items-center mb-16"
          style={{
            transform: `translateY(${-mousePosition.y * 0.2}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <button
            onClick={scrollToForm}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 min-w-[240px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Send us a Message
              <Send
                size={22}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-[-2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-sm"></div>
            </div>
          </button>
        </div>

        {/* Quick Contact Info Bar */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          style={{
            transform: `translateY(${-mousePosition.y * 0.15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <a
            href="tel:+917500986056"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
          >
            <Phone
              size={16}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>+91 7500 986 056</span>
          </a>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <a
            href="mailto:furturecodex@gmail.com"
            className="flex items-center gap-2 hover:text-purple-400 transition-colors group"
          >
            <Mail
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span>furturecodex@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
}

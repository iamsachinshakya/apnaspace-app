"use client";

import React from "react";
import { Rocket, Target, Users, Heart } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import ValueCard from "@/app/shared/components/ui/ValueCard";

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const MissionSection: React.FC = () => {
  const values: Value[] = [
    {
      icon: <Rocket size={28} />,
      title: "Innovation First",
      description:
        "We're constantly exploring the bleeding edge of technology, bringing you insights before they become mainstream.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Target size={28} />,
      title: "Quality Content",
      description:
        "Every article is thoroughly researched, fact-checked, and crafted by industry experts with real-world experience.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users size={28} />,
      title: "Community Driven",
      description:
        "We build together. Our community shapes what we write about and helps us stay connected to real developer needs.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <Heart size={28} />,
      title: "Open Knowledge",
      description:
        "We believe in making technology accessible to everyone. All our content is free and built to educate.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      id="mission"
      className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 section-marker"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInOnScroll direction="up" delay="short">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              To bridge the gap between complex technology and those who want to
              understand it, creating a world where innovation is accessible to
              all.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Values Grid with Alternating Animations */}
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <FadeInOnScroll
              key={index}
              direction={index % 2 === 0 ? "right" : "left"}
              delay={index < 2 ? "medium" : "long"}
              threshold={0.2}
            >
              <ValueCard value={value} />
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

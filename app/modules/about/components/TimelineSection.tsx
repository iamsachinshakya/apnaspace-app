"use client";

import TimelineItem from "@/app/shared/components/ui/TimelineItem";
import React from "react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const TimelineSection: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: "2023",
      title: "ApnaSpace Founded",
      description: "Started with a vision to democratize tech education",
    },
    {
      year: "2023",
      title: "10K Readers",
      description: "Reached our first 10,000 monthly readers",
    },
    {
      year: "2024",
      title: "Expert Team Formed",
      description: "Assembled a team of 25+ industry experts",
    },
    {
      year: "2024",
      title: "500+ Articles",
      description: "Published over 500 in-depth technical articles",
    },
    {
      year: "2025",
      title: "50K+ Community",
      description: "Built a thriving community of 50,000+ tech enthusiasts",
    },
    {
      year: "2025",
      title: "Global Impact",
      description: "Readers from 150+ countries worldwide",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30 section-marker">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeInOnScroll direction="up" delay="short">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              From a simple idea to a global community
            </p>
          </div>
        </FadeInOnScroll>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 hidden md:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <FadeInOnScroll
                key={index}
                direction={index % 2 === 0 ? "right" : "left"}
                delay="short"
                threshold={0.3}
              >
                <TimelineItem milestone={milestone} index={index} />
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

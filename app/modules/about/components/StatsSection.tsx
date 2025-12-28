"use client";

import React from "react";
import { Users, Globe, Code, Award } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import StatCard from "@/app/shared/components/ui/StatCard";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const StatsSection: React.FC = () => {
  const stats: Stat[] = [
    {
      icon: <Users size={32} />,
      value: "50K+",
      label: "Active Readers",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Globe size={32} />,
      value: "150+",
      label: "Countries",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Code size={32} />,
      value: "500+",
      label: "Articles",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <Award size={32} />,
      value: "25+",
      label: "Expert Writers",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const delays = ["short", "short", "medium", "medium"] as const;

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 section-marker">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeInOnScroll
              key={index}
              direction="scale"
              delay={delays[index]}
              threshold={0.2}
            >
              <StatCard stat={stat} index={index} />
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

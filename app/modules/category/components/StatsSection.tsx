"use client";

import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

export function StatsSection() {
  const stats = [
    {
      value: "12+",
      label: "Categories",
      gradient: "from-cyan-400 to-blue-400",
    },
    {
      value: "1.5K+",
      label: "Articles",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      value: "50K+",
      label: "Readers",
      gradient: "from-pink-400 to-rose-400",
    },
  ];

  const delays = ["short", "medium", "long"] as const;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <FadeInOnScroll direction="scale" delay="short" threshold={0.3}>
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <FadeInOnScroll
                  key={index}
                  direction="up"
                  delay={delays[index]}
                  threshold={0.5}
                >
                  <div>
                    <div
                      className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

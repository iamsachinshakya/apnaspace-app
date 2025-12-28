"use client";

import { ReactNode } from "react";

interface Stat {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  gradient: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
          ></div>
          <div className="relative z-10">
            <div
              className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <span className="text-green-400 text-sm">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

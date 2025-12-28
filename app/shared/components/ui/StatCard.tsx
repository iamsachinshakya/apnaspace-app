"use client";

import React from "react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

interface StatCardProps {
  stat: Stat;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <div
      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      ></div>
      <div className="relative z-10">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}
        >
          {stat.icon}
        </div>
        <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
        <p className="text-gray-400">{stat.label}</p>
      </div>
    </div>
  );
};

export default StatCard;

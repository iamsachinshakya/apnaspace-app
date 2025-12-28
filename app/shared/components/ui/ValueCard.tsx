"use client";

import React from "react";

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface ValueCardProps {
  value: Value;
}

const ValueCard: React.FC<ValueCardProps> = ({ value }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 blur-2xl`}
      ></div>
      <div className="relative z-10">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} mb-4`}
        >
          {value.icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
        <p className="text-gray-400 leading-relaxed">{value.description}</p>
      </div>
    </div>
  );
};

export default ValueCard;

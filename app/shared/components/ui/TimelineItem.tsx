"use client";

import React from "react";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index }) => {
  return (
    <div
      className={`relative flex items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Content */}
      <div
        className={`w-full md:w-5/12 ${
          index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
        }`}
      >
        <div className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-sm font-bold mb-3">
            {milestone.year}
          </div>
          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
          <p className="text-gray-400">{milestone.description}</p>
        </div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-gray-900 hidden md:block"></div>
    </div>
  );
};

export default TimelineItem;

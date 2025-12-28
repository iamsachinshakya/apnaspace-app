"use client";

import React from "react";

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  info: string;
  gradient: string;
}

export default function ContactMethod({
  icon,
  title,
  info,
  gradient,
}: ContactMethodProps) {
  return (
    <div className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      ></div>
      <div className="relative z-10">
        <div
          className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{info}</p>
      </div>
    </div>
  );
}

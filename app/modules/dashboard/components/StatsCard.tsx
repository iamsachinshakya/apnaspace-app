import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  gradient: string;
}

export function StatsCard({
  icon,
  label,
  value,
  change,
  gradient,
}: StatsCardProps) {
  return (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
      ></div>
      <div className="relative z-10">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}
        >
          {icon}
        </div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold">{value}</h3>
          <span className="text-green-400 text-sm">{change}</span>
        </div>
      </div>
    </div>
  );
}

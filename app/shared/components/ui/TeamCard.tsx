"use client";

import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="relative mb-6">
          <Image
            src={member.avatar}
            alt={member.name}
            width={400}
            height={400}
            className="w-full aspect-square object-cover rounded-2xl border-2 border-gray-700/50 group-hover:border-cyan-500/50 transition-colors"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-2xl"></div>
        </div>
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {member.bio}
        </p>
        <div className="flex gap-3">
          <a
            href={member.social.twitter}
            className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
          >
            <Twitter size={18} />
          </a>
          <a
            href={member.social.linkedin}
            className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={member.social.github}
            className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;

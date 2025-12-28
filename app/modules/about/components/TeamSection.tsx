"use client";

import TeamCard from "@/app/shared/components/ui/TeamCard";
import React from "react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

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

const TeamSection: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Former Meta AI researcher with 10+ years in machine learning",
      social: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "Alex Thompson",
      role: "Head of Content",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Ex-Google engineer, specialist in Web3 and blockchain tech",
      social: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "Priya Sharma",
      role: "Lead Cloud Architect",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "AWS Solutions Architect with expertise in cloud-native systems",
      social: { twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "James Chen",
      role: "Senior Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "React core contributor and modern frontend evangelist",
      social: { twitter: "#", linkedin: "#", github: "#" },
    },
  ];

  const delays = ["short", "short", "medium", "medium"] as const;

  return (
    <section
      id="team"
      className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 section-marker"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInOnScroll direction="up" delay="short">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate experts dedicated to bringing you the best tech content
            </p>
          </div>
        </FadeInOnScroll>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <FadeInOnScroll
              key={index}
              direction="scale"
              delay={delays[index]}
              threshold={0.2}
            >
              <TeamCard member={member} />
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

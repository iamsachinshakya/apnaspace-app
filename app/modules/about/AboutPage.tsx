"use client";

import HeroSection from "@/app/modules/about/components/HeroSection";
import MissionSection from "@/app/modules/about/components/MissionSection";
import StatsSection from "@/app/modules/about/components/StatsSection";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <StatsSection />
      <MissionSection />
      {/* <TimelineSection /> */}
      {/* <TeamSection /> */}
      {/* <CTASection /> */}
    </div>
  );
};

export default AboutPage;

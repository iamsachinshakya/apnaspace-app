"use client";

import React from "react";

const FloatingElements: React.FC = () => {
  return (
    <>
      {/* Floating geometric shapes for visual interest */}
      <div className="absolute top-1/3 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-float-slow-delayed"></div>
    </>
  );
};

export default FloatingElements;

"use client";

import { useState, useEffect } from "react";

import FloatingBackground from "@/app/shared/components/ui/FloatingBackground";
import ContactHero from "@/app/modules/contact/components/ContactHero";
import ContactForm from "@/app/modules/contact/components/ContactForm";
import MapSection from "@/app/modules/contact/components/MapSection";

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      <FloatingBackground />
      <ContactHero />
      <ContactForm />
      <MapSection />
    </div>
  );
}

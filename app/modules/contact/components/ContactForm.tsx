"use client";

import React, { useState } from "react";
import { Send, Mail, User, MessageSquare, Check } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section
      id="contact-form"
      className="py-12 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <FadeInOnScroll direction="up" delay="short" threshold={0.2}>
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Title */}
              <FadeInOnScroll direction="scale" delay="none">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Send us a{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Message
                  </span>
                </h2>
              </FadeInOnScroll>

              <div className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FadeInOnScroll
                    direction="left"
                    delay="short"
                    threshold={0.3}
                  >
                    <div className="relative group">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Your Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
                          size={20}
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </FadeInOnScroll>

                  {/* Email Field */}
                  <FadeInOnScroll
                    direction="right"
                    delay="short"
                    threshold={0.3}
                  >
                    <div className="relative group">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
                          size={20}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </FadeInOnScroll>
                </div>

                {/* Subject Field */}
                <FadeInOnScroll direction="up" delay="medium" threshold={0.3}>
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Subject
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
                        size={20}
                      />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>
                </FadeInOnScroll>

                {/* Message Field */}
                <FadeInOnScroll direction="up" delay="long" threshold={0.3}>
                  <div className="relative group">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                </FadeInOnScroll>

                {/* Submit Button */}
                <FadeInOnScroll direction="up" delay="long" threshold={0.3}>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isSubmitted}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <Check size={20} />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </FadeInOnScroll>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

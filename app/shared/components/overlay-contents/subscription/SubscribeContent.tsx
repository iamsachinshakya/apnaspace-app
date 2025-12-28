"use client";

import { useEffect, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import "@/app/styles/scrollbar.css";
import { useSelector } from "react-redux";
import { CATEGORIES } from "@/app/modules/category/utils/constants";
import { getOverlayState } from "@/app/shared/redux/globalSlice";
import { OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";

interface SubscribeContentProps {
  onClose: () => void;
  data?: OverlayData;
}

export function SubscribeContent({ onClose, data }: SubscribeContentProps) {
  const globalEmail = useSelector(getOverlayState);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = CATEGORIES || [];

  useEffect(() => {
    if (globalEmail) {
      setEmail(globalEmail);
    }
  }, [globalEmail]);

  const handleSubmit = () => {
    if (!email || !name || selectedInterests.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail("");
        setName("");
        setSelectedInterests([]);
      }, 2000);
    }, 1500);
  };

  const toggleInterest = (categoryName: string) => {
    setSelectedInterests((prev) =>
      prev.includes(categoryName)
        ? prev.filter((i) => i !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto scrollbar-custom">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8 md:p-12">
        {!success ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Subscribe
                </h2>
                <button
                  onClick={onClose}
                  className="px-2 rounded-full hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-2xl text-gray-300">×</span>
                </button>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-sm text-cyan-400">
                  Join ApnaSpace Community
                </span>
              </div>
              <p className="text-gray-400">
                Get personalized content delivered to your inbox weekly
              </p>
            </div>

            <div className="space-y-5">
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Select Your Interests (Choose at least one)
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => toggleInterest(category.name)}
                      className={`p-3 rounded-xl border transition-all duration-300 text-left ${
                        selectedInterests.includes(category.name)
                          ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                          : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-700/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full transition-all ${
                            selectedInterests.includes(category.name)
                              ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                              : "bg-gray-600"
                          }`}
                        ></div>
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedInterests.length > 0 && (
                  <p className="text-sm text-cyan-400 mt-3 flex items-center gap-2">
                    <Check size={16} />
                    {selectedInterests.length}{" "}
                    {selectedInterests.length === 1 ? "interest" : "interests"}{" "}
                    selected
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !email ||
                  !name ||
                  selectedInterests.length === 0
                }
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe Now"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By subscribing, you agree to receive our weekly newsletter.
                Unsubscribe anytime.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 shadow-2xl shadow-cyan-500/30 animate-scale-in">
              <Check size={40} />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Successfully Subscribed!
              </span>
            </h3>
            <p className="text-gray-400 text-lg">
              Check your inbox for a confirmation email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

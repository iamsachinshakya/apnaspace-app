"use client";

import React, { useState } from "react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setOverlayState } from "@/app/shared/redux/globalSlice";
import { useResize } from "@/app/shared/hooks/useResize";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { DialogType } from "@/app/modules/overlays/types/IOverlayTypes";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const handleSubscribe = () => {
    dispatch(setOverlayState(email));

    if (isMobile) {
      dispatch(
        setBottomSheet({
          show: true,
          type: DialogType.SUBSCRIBE,
          mode: null,
        })
      );
    } else {
      dispatch(
        setDialog({
          show: true,
          type: DialogType.SUBSCRIBE,
          mode: null,
        })
      );
    }
    console.log("Subscribing:", email);
  };

  return (
    <footer className=" bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <div className="relative z-10  overflow-hidden">
        {/* Futuristic Divider */}
        <FadeInOnScroll direction="none" delay="none">
          <div className="relative h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        </FadeInOnScroll>

        <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900 backdrop-blur-xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Newsletter Section */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <FadeInOnScroll direction="up" delay="short" threshold={0.3}>
                  <div className="relative bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 sm:p-12 border border-cyan-500/20 backdrop-blur-sm overflow-hidden">
                    {/* Glowing Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-transparent blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent blur-2xl"></div>

                    <div className="relative z-10 text-center">
                      <FadeInOnScroll
                        direction="scale"
                        delay="short"
                        threshold={0.5}
                      >
                        <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                          <span className="text-cyan-400 text-sm font-semibold">
                            Newsletter
                          </span>
                        </div>
                      </FadeInOnScroll>

                      <FadeInOnScroll
                        direction="up"
                        delay="medium"
                        threshold={0.5}
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                          Stay Ahead of the{" "}
                          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Curve
                          </span>
                        </h3>
                      </FadeInOnScroll>

                      <FadeInOnScroll
                        direction="up"
                        delay="long"
                        threshold={0.5}
                      >
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                          Join 50,000+ developers and tech enthusiasts. Get
                          weekly insights on AI breakthroughs, Web3 innovations,
                          cloud architecture, and modern development practices
                          delivered straight to your inbox.
                        </p>
                      </FadeInOnScroll>

                      <FadeInOnScroll
                        direction="scale"
                        delay="long"
                        threshold={0.5}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                          />
                          <button
                            onClick={handleSubscribe}
                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl  font-semibold overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/50"
                          >
                            <span className="relative z-10">Subscribe Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>
                        </div>
                      </FadeInOnScroll>
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>

            {/* Bottom Bar - Futuristic */}
            <FadeInOnScroll direction="up" delay="long" threshold={0.3}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent h-px"></div>
                <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
                    <p className="text-center sm:text-left">
                      © 2025{" "}
                      <span className="text-cyan-400 font-semibold">
                        <Link href="/">ApnaSpace</Link>
                      </span>
                      . All rights reserved.
                    </p>
                    {/* <div className="flex items-center gap-3">
                      <a
                        // href="https://ApnaSpace.blog/privacy"
                        className="hover:text-cyan-400 transition-colors duration-300"
                      >
                        Privacy
                      </a>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <a
                        // href="https://ApnaSpace.blog/terms"
                        className="hover:text-cyan-400 transition-colors duration-300"
                      >
                        Terms
                      </a>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <a
                        // href="https://ApnaSpace.blog/cookies"
                        className="hover:text-cyan-400 transition-colors duration-300"
                      >
                        Cookies
                      </a>
                    </div> */}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Crafted with</span>
                    <span className="text-pink-500 animate-pulse">♥</span>
                    <span>by the Sachin Shakya</span>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

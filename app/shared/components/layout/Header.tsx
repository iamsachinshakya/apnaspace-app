"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import {
  selectAuthUser,
  selectAuthLoading,
  clearUserData,
} from "@/app/modules/auth/redux/authSlice";
import { useResize } from "@/app/shared/hooks/useResize";
import { DialogType } from "@/app/modules/overlays/types/IOverlayTypes";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";
import { authService } from "@/app/modules/auth/services/authService";
import { showError, showSuccess } from "@/app/modules/common/utils/toast";
import { UserRole } from "@/app/modules/auth/types/auth.entity";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const user = useSelector(selectAuthUser);
  const isLoading = useSelector(selectAuthLoading);

  const openAuthUI = (type: DialogType) => {
    const payload = { show: true, type, mode: null };

    if (isMobile) {
      dispatch(setBottomSheet(payload));
    } else {
      dispatch(setDialog(payload));
    }
  };

  const onLoginClick = () => openAuthUI(DialogType.LOGIN);
  const onRegisterClick = () => openAuthUI(DialogType.REGISTER);

  const handleLogout = async () => {
    const response = await authService.logout();
    if (!response.success) {
      showError(response.message);
      return;
    }
    dispatch(clearUserData());
    showSuccess(response.message);
  };

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add base navigation links
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Categories", link: "/categories" },
    { title: "Contact", link: "/contact" },
  ];

  if (
    user &&
    (user.role === UserRole.ADMIN ||
      user.role === UserRole.AUTHOR ||
      user.role === UserRole.EDITOR)
  ) {
    navLinks.push({ title: "Dashboard", link: "/dashboard" });
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isVisible ? "animate-slide-in-top" : ""
        } ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href={"/"}
              className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent transition-all duration-700 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              ApnaSpace
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((nav, index) => (
                <Link
                  href={nav.link}
                  key={index}
                  className={`text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group ${
                    isVisible ? "animate-fade-in-down" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + index * 75}ms` }}
                >
                  {nav.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {/* Auth UI */}
              <div className="flex items-center gap-3 ml-4">
                {isLoading && user ? (
                  <span className="text-cyan-400">Loading...</span>
                ) : user ? (
                  <>
                    <span className="text-cyan-400">
                      Hello, {user.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2 text-red-500 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onLoginClick}
                      className={`px-5 py-2 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 hover:scale-105 transition-all duration-300 ${
                        isVisible
                          ? "animate-fade-in-down delay-400"
                          : "opacity-0"
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={onRegisterClick}
                      className={`px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${
                        isVisible
                          ? "animate-fade-in-down delay-500"
                          : "opacity-0"
                      }`}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 ${
                isVisible ? "animate-fade-in-scale delay-300" : "opacity-0"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className={`block text-gray-300 hover:text-cyan-400 hover:translate-x-2 transition-all duration-300 py-2 ${
                  isMenuOpen ? "animate-fade-in-right" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.title}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              {user ? (
                <>
                  <span className="block text-cyan-400 px-5 py-3">
                    Hello, {user.username}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-5 py-3 text-red-500 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 transition-all duration-300 ${
                      isMenuOpen ? "animate-fade-in-up delay-200" : "opacity-0"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onRegisterClick();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 ${
                      isMenuOpen ? "animate-fade-in-up delay-300" : "opacity-0"
                    }`}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

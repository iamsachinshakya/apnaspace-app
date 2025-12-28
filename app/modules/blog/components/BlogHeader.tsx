"use client";

import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import Link from "next/link";

export default function BlogHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            ApnaSpace
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button className="p-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 transition-all"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-cyan-500/50"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-700/50">
                    <p className="font-semibold text-white">John Doe</p>
                    <p className="text-sm text-gray-400">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400 transition-all"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400 transition-all"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/bookmarks"
                      className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400 transition-all"
                    >
                      Bookmarks
                    </Link>
                    <hr className="my-2 border-gray-700/50" />
                    <button className="w-full text-left px-4 py-2.5 text-red-400 hover:bg-gray-700/50 transition-all">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-500/50 transition-all"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-800/50" />
              <Link
                href="/profile"
                className="px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400 rounded-lg transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button className="text-left px-4 py-2.5 text-red-400 hover:bg-gray-800/50 rounded-lg transition-all">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

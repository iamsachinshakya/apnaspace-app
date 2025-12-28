"use client";

import { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import { OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";

interface AddProfileContentProps {
  onClose: () => void;
  data: OverlayData;
}

export function AddProfileContent({ onClose, data }: AddProfileContentProps) {
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);

  //   useEffect(() => {
  //     if (data?.name) setProfileName(data.name);
  //     if (data?.email) setProfileEmail(data.email);
  //     if (data?.bio) setProfileBio(data.bio);
  //     if (data?.avatar) setProfileAvatar(data.avatar);
  //   }, [data]);

  const handleSave = () => {
    // data?.onSave?.({
    //   name: profileName,
    //   email: profileEmail,
    //   bio: profileBio,
    //   avatar: profileAvatar || undefined,
    // });
    onClose();
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {profileAvatar ? (
                <img
                  src={profileAvatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                  {getInitials(profileName || "User")}
                </div>
              )}
              <label className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:scale-110 transition-all shadow-lg cursor-pointer">
                <Upload size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 resize-none"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">
              {profileBio.length} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-purple-500/25 font-semibold"
            >
              <Check size={20} />
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

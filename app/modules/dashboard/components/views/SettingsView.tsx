"use client";

import { ResetPasswordModal } from "@/app/modules/dashboard/components/modals/ResetPasswordModal";
import { useState } from "react";

export function SettingsView() {
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Handle password reset
  const handlePasswordReset = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      // const response = await axiosInstance.post("/api/auth/change-password", {
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword,
      // });

      // if (response.data.success) {
      //   // Show success notification (you can use a toast library)
      //   alert("Password updated successfully!");
      //   setShowResetPassword(false);
      // }

      alert("Password updated successfully!");
    } catch (error: any) {
      // Error will be caught by the modal and displayed
      throw new Error(
        error.response?.data?.error || "Failed to update password"
      );
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Account Settings Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <SettingToggle
              title="Email Notifications"
              description="Receive updates about your blogs"
              defaultChecked
            />
            <SettingToggle
              title="Marketing Updates"
              description="Get the latest news and tips"
            />
            <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-xl">
              <div>
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">
                  Add an extra layer of security
                </p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:scale-105 transition-all text-sm font-semibold">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold mb-4">Privacy & Security</h3>
          <div className="space-y-3">
            {/* Change Password Button - Opens Modal */}
            <button
              onClick={() => setShowResetPassword(true)}
              className="w-full text-left p-4 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-all"
            >
              <p className="font-semibold">Change Password</p>
              <p className="text-sm text-gray-400">
                Update your password regularly
              </p>
            </button>

            <button className="w-full text-left p-4 bg-gray-700/20 rounded-xl hover:bg-gray-700/30 transition-all">
              <p className="font-semibold">Privacy Settings</p>
              <p className="text-sm text-gray-400">
                Control who can see your content
              </p>
            </button>

            <button className="w-full text-left p-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all">
              <p className="font-semibold">Delete Account</p>
              <p className="text-sm text-red-300/70">
                Permanently remove your account
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={showResetPassword}
        onClose={() => setShowResetPassword(false)}
        onSave={handlePasswordReset}
      />
    </>
  );
}

function SettingToggle({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-xl">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={defaultChecked}
        />
        <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
      </label>
    </div>
  );
}

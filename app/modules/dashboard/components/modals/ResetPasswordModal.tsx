"use client";

import { useState, useEffect } from "react";
import { X, Check, Eye, EyeOff, AlertCircle } from "lucide-react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  width: string;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
  onSave,
}: ResetPasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Too weak",
    color: "bg-red-500",
    width: "0%",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate password strength - Hook must be called before any returns
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength({
        score: 0,
        label: "Too weak",
        color: "bg-red-500",
        width: "0%",
      });
      return;
    }

    let score = 0;
    const checks = {
      length: newPassword.length >= 12,
      lowercase: /[a-z]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };

    // Calculate score based on criteria met
    if (checks.length) score++;
    if (checks.lowercase && checks.uppercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    // Determine strength level
    const strengths: PasswordStrength[] = [
      { score: 0, label: "Too weak", color: "bg-red-500", width: "20%" },
      { score: 1, label: "Weak", color: "bg-orange-500", width: "40%" },
      { score: 2, label: "Fair", color: "bg-yellow-500", width: "60%" },
      { score: 3, label: "Good", color: "bg-lime-500", width: "80%" },
      { score: 4, label: "Strong", color: "bg-green-500", width: "100%" },
    ];

    setPasswordStrength(strengths[score] || strengths[0]);
  }, [newPassword]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!currentPassword) {
      newErrors.push("Current password is required");
    }

    if (!newPassword) {
      newErrors.push("New password is required");
    }

    if (newPassword.length < 12) {
      newErrors.push("Password must be at least 12 characters long");
    }

    if (!/[a-z]/.test(newPassword)) {
      newErrors.push("Password must contain at least one lowercase letter");
    }

    if (!/[A-Z]/.test(newPassword)) {
      newErrors.push("Password must contain at least one uppercase letter");
    }

    if (!/\d/.test(newPassword)) {
      newErrors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      newErrors.push("Password must contain at least one special character");
    }

    if (newPassword !== confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    if (currentPassword === newPassword) {
      newErrors.push("New password must be different from current password");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave?.({ currentPassword, newPassword });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors([]);
      onClose();
    } catch (error: any) {
      setErrors([error.message || "Failed to reset password"]);
    } finally {
      setIsLoading(false);
    }
  };

  // Early return AFTER all hooks have been called
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-red-500/30 shadow-2xl shadow-red-500/20 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/20 to-transparent blur-3xl"></div>

        <div className="relative z-10 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="text-red-400 mt-0.5 flex-shrink-0"
                  size={20}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-400 mb-2">
                    Please fix the following errors:
                  </p>
                  <ul className="text-sm text-red-300 space-y-1">
                    {errors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-white"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-white"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400">
                      Password Strength
                    </span>
                    <span
                      className={`text-xs font-semibold ${passwordStrength.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="p-4 bg-gray-700/20 rounded-xl">
              <p className="text-xs font-semibold text-gray-400 mb-2">
                Password must contain:
              </p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li
                  className={newPassword.length >= 12 ? "text-green-400" : ""}
                >
                  ✓ At least 12 characters
                </li>
                <li
                  className={
                    /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ Uppercase and lowercase letters
                </li>
                <li className={/\d/.test(newPassword) ? "text-green-400" : ""}>
                  ✓ At least one number
                </li>
                <li
                  className={
                    /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                      ? "text-green-400"
                      : ""
                  }
                >
                  ✓ At least one special character (!@#$%^&*)
                </li>
              </ul>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border ${
                    confirmPassword && newPassword !== confirmPassword
                      ? "border-red-500"
                      : "border-gray-700/50"
                  } rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-white`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword === confirmPassword && (
                <p className="mt-2 text-xs text-green-400 flex items-center gap-1">
                  <Check size={14} /> Passwords match
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-red-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Update Password
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

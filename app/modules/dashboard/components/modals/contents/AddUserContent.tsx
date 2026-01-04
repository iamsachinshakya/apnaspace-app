"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Save,
  Upload,
  Mail,
  User as UserIcon,
  Shield,
  Lock,
  AtSign,
  EyeOff,
  Eye,
} from "lucide-react";
import { useSelector } from "react-redux";
import { getOverlayState } from "@/app/shared/redux/globalSlice";
import {
  AuthStatus,
  UserRole,
  IAuthEntity,
} from "@/app/modules/auth/types/auth.entity";
import { useState } from "react";
import { toast } from "sonner";
import { authService } from "@/app/modules/auth/services/authService";
import { Mode, OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";
import {
  getEmptyAuthFormData,
  getParsedAuthFormData,
} from "@/app/modules/auth/utils/auth.utils";
import { IAuthFormData } from "@/app/modules/auth/types/auth.dto";

interface UserContentProps {
  onClose: () => void;
  data: OverlayData;
}

export function AddUserContent({ onClose, data }: UserContentProps) {
  const userData = useSelector(getOverlayState) as IAuthEntity | null;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = data?.mode === Mode.EDIT;

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IAuthFormData>({
    defaultValues: getEmptyAuthFormData(),
  });

  useEffect(() => {
    if (userData && isEditMode) {
      reset(getParsedAuthFormData(userData), { keepDefaultValues: false });
    } else {
      reset(getEmptyAuthFormData(), { keepDefaultValues: false });
    }
  }, [userData, isEditMode, reset]);

  // Smart form submit handler
  const onSubmit = async (formData: IAuthFormData) => {
    try {
      setIsLoading(true);

      if (isEditMode && "id" in formData) {
        // UPDATE MODE
        if (!isDirty) {
          toast.info("No changes to save");
          setIsLoading(false);
          return;
        }

        const updateData: IAuthFormData = {
          id: formData.id,
          username: formData.username,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };

        const result = await authService.updateUser(updateData.id!, updateData);

        if (result.success) {
          toast.success("User updated successfully!");
          onClose();
        } else {
          toast.error(
            (result.errors && result.errors[0]?.message) ||
              result.message ||
              "Failed to update user"
          );
        }
      } else {
        // CREATE MODE
        const createData = formData;

        const result = await authService.createUser(createData);
        if (result.success) {
          toast.success("User created successfully!");
          onClose();
        } else {
          toast.error(
            (result.errors && result.errors[0]?.message) ||
              "Failed to create user"
          );
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error?.message || "Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if save button should be enabled
  const canSubmit = !isLoading && (!isEditMode || isDirty);

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl pointer-events-none"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {isEditMode ? "Edit User" : "Create New User"}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <ul className="text-sm text-red-300 space-y-1">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>• {error?.message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar Display */}
          {/* <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
              {getInitials(username || "")}
            </div>
          </div> */}

          {/* Username & Email */}
          <div className="grid grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <AtSign size={16} />
                  Username *
                </div>
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers, and underscores",
                  },
                })}
                placeholder="Enter username"
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  Email Address *
                </div>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="user@example.com"
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password - Only show when creating new user */}
          {!isEditMode && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Lock size={16} />
                  Password *
                </div>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Enter password (min. 8 characters)"
                  className="w-full px-4 py-2.5 pr-12 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-1"
                  disabled={isLoading}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Role & Status */}
          <div className="grid grid-cols-2 gap-4">
            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  Role *
                </div>
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                }}
                disabled={isLoading}
              >
                {Object.values(UserRole).map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-gray-800 text-white py-2"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  Status *
                </div>
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                }}
                disabled={isLoading}
              >
                {Object.values(AuthStatus).map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-gray-800 text-white py-2"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditMode ? "Update User" : "Create User"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  DialogType,
  OverlayData,
} from "@/app/modules/overlays/types/IOverlayTypes";
import { useResize } from "@/app/shared/hooks/useResize";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";
import { ILoginCredentials } from "@/app/modules/auth/types/auth.dto";
import { authService } from "@/app/modules/auth/services/authService";
import { showError, showSuccess } from "@/app/modules/common/utils/toast";

interface LoginContentProps {
  onClose: () => void;
  data: OverlayData;
}

export const LoginContent: React.FC<LoginContentProps> = ({
  onClose,
  data,
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginCredentials>();

  const onSubmit = async (values: ILoginCredentials) => {
    const response = await authService.login(values, dispatch);
    if (!response.success) {
      showError(response.message);
      return;
    }
    showSuccess(response.message);
    onClose();
  };

  const handleSwitchToRegister = () => {
    if (isMobile) {
      dispatch(
        setBottomSheet({
          show: true,
          type: DialogType.REGISTER,
          mode: null,
        })
      );
    } else {
      dispatch(
        setDialog({
          show: true,
          type: DialogType.REGISTER,
          mode: null,
        })
      );
    }
  };

  return (
    <div className="relative">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-8">
          Login to access your ApnaSpace account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
              {...register("password", { required: "Password is required" })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" />
              Remember me
            </label>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/25"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Switch */}
        <div className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={handleSwitchToRegister}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

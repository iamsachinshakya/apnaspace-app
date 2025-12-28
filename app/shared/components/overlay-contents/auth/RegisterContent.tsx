"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  DialogType,
  OverlayData,
} from "@/app/modules/overlays/types/IOverlayTypes";
import { useDispatch } from "react-redux";
import { useResize } from "@/app/shared/hooks/useResize";
import { IRegisterData } from "@/app/modules/auth/types/auth.dto";
import { setBottomSheet } from "@/app/modules/overlays/redux/bottomSheetSlice";
import { setDialog } from "@/app/modules/overlays/redux/dialogSlice";

interface RegisterContentProps {
  onClose: () => void;
  data: OverlayData;
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  onClose,
  data,
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  // const { register: registerAction } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterData>();

  const openLoginModal = () => {
    const action = {
      show: true,
      type: DialogType.LOGIN,
      mode: null,
    };

    if (isMobile) {
      dispatch(setBottomSheet(action));
    } else {
      dispatch(setDialog(action));
    }
  };

  const onSubmit = async (values: IRegisterData) => {
    if (!values.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    // const response = await registerAction(values);
    // console.log("response =>", response);
    // if (response) {
    //   onClose(); // Close register sheet/drawer
    //   openLoginModal();
    // }
  };

  const handleSwitchToLogin = () => {
    openLoginModal();
  };

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join ApnaSpace
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-8">
          Create your account and start exploring
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* FULL NAME + USERNAME */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* <div className="w-full">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
              />
              {errors.fullName && (
                <span className="text-red-400 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div> */}

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="john_doe"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
              />
              {errors.username && (
                <span className="text-red-400 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
              })}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* TERMS */}
          <div className="text-sm">
            <label className="flex items-start text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreeToTerms", { required: true })}
                className="mr-2 mt-1 rounded"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </a>
              </span>
            </label>

            {errors.agreeToTerms && (
              <span className="text-red-400 text-xs">
                Must agree to Terms and Privacy Policy
              </span>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-purple-500/25"
          >
            {isSubmitting ? "Signing Up..." : "Create Account"}
          </button>
        </form>

        {/* SWITCH TO LOGIN */}
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={handleSwitchToLogin}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors cursor-pointer"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

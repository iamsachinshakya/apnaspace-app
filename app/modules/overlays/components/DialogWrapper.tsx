"use client";

import {
  clearDialog,
  getDialogState,
} from "@/app/modules/overlays/redux/dialogSlice";
import { DialogType } from "@/app/modules/overlays/types/IOverlayTypes";
import { LoginContent } from "@/app/shared/components/overlay-contents/auth/LoginContent";
import { RegisterContent } from "@/app/shared/components/overlay-contents/auth/RegisterContent";
import { SubscribeContent } from "@/app/shared/components/overlay-contents/subscription/SubscribeContent";
import { clearOverlayState } from "@/app/shared/redux/globalSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DialogWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const dialogState = useSelector(getDialogState);

  const [component, setComponent] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setComponent(dialogState.type);
  }, [dialogState.type]);

  useEffect(() => {
    if (dialogState.show) {
      document.body.style.overflow = "hidden";
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogState.show]);

  const closeModal = () => {
    dispatch(clearDialog());
    dispatch(clearOverlayState());
  };

  const getModalWidth = () => {
    switch (dialogState.type) {
      case DialogType.SUBSCRIBE:
      case DialogType.REGISTER:
        return "max-w-2xl";
      case DialogType.ADD_BLOG:
        return "max-w-4xl";
      case DialogType.LOGIN:
        return "max-w-md";
      default:
        return "max-w-2xl";
    }
  };

  const list: Partial<Record<DialogType, JSX.Element>> = {
    [DialogType.LOGIN]: (
      <LoginContent onClose={closeModal} data={dialogState} />
    ),
    [DialogType.REGISTER]: (
      <RegisterContent onClose={closeModal} data={dialogState} />
    ),
    [DialogType.SUBSCRIBE]: (
      <SubscribeContent onClose={closeModal} data={dialogState} />
    ),

    // [DialogType.ADD_BLOG]: (
    //   <AddBlogContent onClose={closeModal} data={dialogState} />
    // ),

    // [DialogType.ADD_CATEGORY]: (
    //   <AddCategoryContent onClose={closeModal} data={dialogState} />
    // ),

    // [DialogType.ADD_COMMENT]: (
    //   <AddCommentContent onClose={closeModal} data={dialogState} />
    // ),

    // [DialogType.ADD_PROFILE]: (
    //   <AddProfileContent onClose={closeModal} data={dialogState} />
    // ),

    // [DialogType.RESET_PASSWORD]: (
    //   <ResetPasswordContent onClose={closeModal} data={dialogState} />
    // ),
    // [DialogType.ADD_USER]: (
    //   <AddUserModalContent onClose={closeModal} data={dialogState} />
    // ),
  };

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-500 ease-in-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={closeModal}
        aria-hidden="true"
      />

      <div className="flex items-center justify-center min-h-full p-4">
        <div
          className={`
            relative z-10
            w-full ${getModalWidth()}
            transform transition-all duration-300 ease-in-out
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border border-gray-200 dark:border-gray-800
            shadow-2xl dark:shadow-black/50
            rounded-2xl
            overflow-hidden
            ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {list[component as DialogType] || null}
        </div>
      </div>
    </div>
  );
}

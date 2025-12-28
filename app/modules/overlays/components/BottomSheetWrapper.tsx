"use client";

import {
  clearBottomSheet,
  getBottomSheetState,
} from "@/app/modules/overlays/redux/bottomSheetSlice";
import { BottomSheetType } from "@/app/modules/overlays/types/IOverlayTypes";
import { LoginContent } from "@/app/shared/components/overlay-contents/auth/LoginContent";
import { RegisterContent } from "@/app/shared/components/overlay-contents/auth/RegisterContent";
import { SubscribeContent } from "@/app/shared/components/overlay-contents/subscription/SubscribeContent";
import { clearOverlayState } from "@/app/shared/redux/globalSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BottomSheetWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const bottomSheetState = useSelector(getBottomSheetState);

  const [component, setComponent] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setComponent(bottomSheetState.type);
  }, [bottomSheetState.type]);

  useEffect(() => {
    if (bottomSheetState.show) {
      document.body.style.overflow = "hidden";

      setShouldRender(true);

      // small delay to allow mount before animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 20);
    } else {
      document.body.style.overflow = "unset";

      setIsAnimating(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 450); // match animation

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bottomSheetState.show]);

  const closeBottomSheet = () => {
    dispatch(clearBottomSheet());
    dispatch(clearOverlayState());
  };

  const list: Partial<Record<BottomSheetType, JSX.Element>> = {
    [BottomSheetType.LOGIN]: (
      <LoginContent onClose={closeBottomSheet} data={bottomSheetState} />
    ),
    [BottomSheetType.REGISTER]: (
      <RegisterContent onClose={closeBottomSheet} data={bottomSheetState} />
    ),
    [BottomSheetType.SUBSCRIBE]: (
      <SubscribeContent onClose={closeBottomSheet} data={bottomSheetState} />
    ),

    // [BottomSheetType.ADD_BLOG]: (
    //   <AddBlogContent onClose={closeBottomSheet} data={bottomSheetState} />
    // ),

    // [BottomSheetType.ADD_CATEGORY]: (
    //   <AddCategoryContent onClose={closeBottomSheet} data={bottomSheetState} />
    // ),

    // [BottomSheetType.ADD_COMMENT]: (
    //   <AddCommentContent onClose={closeBottomSheet} data={bottomSheetState} />
    // ),

    // [BottomSheetType.ADD_PROFILE]: (
    //   <AddProfileContent onClose={closeBottomSheet} data={bottomSheetState} />
    // ),

    // [BottomSheetType.RESET_PASSWORD]: (
    //   <ResetPasswordContent
    //     onClose={closeBottomSheet}
    //     data={bottomSheetState}
    //   />
    // ),
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={closeBottomSheet}
      />

      {/* Bottom Sheet */}
      <div
        className={`
          fixed bottom-0 left-0 right-0
          w-full max-h-[90vh]
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          shadow-2xl border-t border-gray-300 dark:border-gray-700

          transform transition-transform
          duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isAnimating ? "translate-y-0" : "translate-y-full"}

          rounded-t-3xl
          overflow-y-auto
          z-50
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {list[component as BottomSheetType] ?? null}
      </div>
    </div>
  );
}

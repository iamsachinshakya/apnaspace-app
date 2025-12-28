"use client";

import {
  clearDrawer,
  getDrawerState,
} from "@/app/modules/overlays/redux/drawerSlice";
import { DrawerType } from "@/app/modules/overlays/types/IOverlayTypes";
import { LoginContent } from "@/app/shared/components/overlay-contents/auth/LoginContent";
import { RegisterContent } from "@/app/shared/components/overlay-contents/auth/RegisterContent";
import { clearOverlayState } from "@/app/shared/redux/globalSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const drawerState = useSelector(getDrawerState);

  const [component, setComponent] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setComponent(drawerState.type);
  }, [drawerState.type]);

  useEffect(() => {
    if (drawerState.show) {
      document.body.style.overflow = "hidden";
      // Mount the component first
      setShouldRender(true);
      // Then trigger the animation after a small delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      document.body.style.overflow = "unset";
      // Start closing animation
      setIsAnimating(false);
      // Delay unmount to match animation duration (500ms)
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerState.show]);

  const closeDrawer = () => {
    dispatch(clearDrawer());
    dispatch(clearOverlayState());
  };

  const list: Partial<Record<DrawerType, JSX.Element>> = {
    [DrawerType.LOGIN]: (
      <LoginContent onClose={closeDrawer} data={drawerState} />
    ),
    [DrawerType.REGISTER]: (
      <RegisterContent onClose={closeDrawer} data={drawerState} />
    ),
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-500 ease-in-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full
          w-full md:w-[470px]
          z-10
          transform
          transition-transform duration-500 ease-in-out
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border-l border-gray-200 dark:border-gray-800
          shadow-2xl dark:shadow-black/50
          overflow-y-auto
          ${isAnimating ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {list[component as DrawerType] || null}
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "@/app/modules/users/services/userService";
import { setUserData } from "@/app/modules/auth/redux/authSlice";

export function AppAuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const syncAuth = async () => {
      const response = await userService.getCurrentUserProfile();

      if (!isMounted) return;

      if (response.success && response.data) {
        dispatch(setUserData(response.data));
      }
      // ❗ no else block → unauth user is normal
    };

    syncAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return null;
}

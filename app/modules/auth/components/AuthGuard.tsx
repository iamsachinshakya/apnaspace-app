// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// import {
//   selectAuthIsLoggedIn,
//   selectAuthLoading,
//   selectAuthUser,
// } from "@/app/modules/auth/redux/authSlice";

// import { UserRole } from "@/app/modules/users/types/IUserTypes";
// import Loader from "@/app/shared/components/loader/Loader";

// const ALLOWED_ROLES = new Set([
//   UserRole.ADMIN,
//   UserRole.AUTHOR,
//   UserRole.EDITOR,
// ]);

// export default function AdminAuthGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();

//   const loading = useSelector(selectAuthLoading);
//   const isLoggedIn = useSelector(selectAuthIsLoggedIn);
//   const authUser = useSelector(selectAuthUser);

//   const [redirecting, setRedirecting] = useState(false);

//   const hasAccess = useMemo(() => {
//     if (!isLoggedIn || !authUser) return false;
//     return ALLOWED_ROLES.has(authUser.role);
//   }, [isLoggedIn, authUser]);

//   /**
//    * Redirect Logic — but keep showing loader until redirect happens
//    */
//   useEffect(() => {
//     if (!loading && !hasAccess) {
//       setRedirecting(true);
//       router.replace("/");
//     }
//   }, [loading, hasAccess, router]);

//   /**
//    * Prevent flicker:
//    * - Show loader when:
//    *   • auth is loading
//    *   • OR we triggered redirect
//    */
//   if (loading || redirecting) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black/80">
//         <Loader />
//       </div>
//     );
//   }

//   /** Authorized → render protected content */
//   return <>{children}</>;
// }

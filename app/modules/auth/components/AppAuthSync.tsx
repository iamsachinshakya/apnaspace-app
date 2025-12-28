// "use client";

// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useAuthActions } from "@/app/modules/auth/actions/authActions";
// import { selectAuthLoading } from "@/app/modules/auth/redux/authSlice";
// import Loader from "@/app/shared/components/loader/Loader";

// export function AppAuthSync() {
//   const { getUser } = useAuthActions();
//   const loading = useSelector(selectAuthLoading);

//   // Prevents double-execution in React Strict Mode
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     getUser(); // No need to await — don't block render
//   }, [getUser]);

//   // Optional: You can show a loader during initial auth sync
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black/80">
//         <Loader />
//       </div>
//     );
//   }

//   return null;
// }

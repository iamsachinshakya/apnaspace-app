// "use client";

// import { useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import {
//   X,
//   Save,
//   Upload,
//   Mail,
//   User as UserIcon,
//   Shield,
//   Lock,
//   AtSign,
//   EyeOff,
//   Eye,
// } from "lucide-react";
// import {
//   Mode,
//   OverlayData,
// } from "@/app/modules/ui-wrappers/types/IOverlayTypes";
// import { useSelector } from "react-redux";
// import { getOverlayState } from "@/app/shared/redux/globalSlice";
// import {
//   CreateUserData,
//   isCreateUserData,
//   isUpdateUserData,
//   UserRole,
//   UserStatus,
// } from "@/app/modules/users/types/IUserTypes";
// import { useUserActions } from "@/app/modules/users/actions/userActions";
// import { useState } from "react";
// import { toast } from "sonner";
// import {
//   getEmptyCreateUserData,
//   getEmptyUpdateUserData,
// } from "@/app/modules/users/utils/userUtils";

// interface UserContentProps {
//   onClose: () => void;
//   data: OverlayData;
// }

// export function AddUserModalContent({ onClose, data }: UserContentProps) {
//   const userData = useSelector(getOverlayState);
//   const { createUser, updateUser, updateAvatar, isCreating, isUpdating } =
//     useUserActions();
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const isEditMode = data?.mode === Mode.EDIT;
//   const getEmptyUser = () =>
//     isEditMode ? getEmptyUpdateUserData() : getEmptyCreateUserData();
//   const isLoading = isCreating || isUpdating || isUploadingAvatar;

//   //  Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, dirtyFields, isDirty },
//     reset,
//     watch,
//   } = useForm<CreateUserData>({
//     defaultValues: getEmptyUser(),
//   });

//   //  Watch form values for avatar initials
//   const fullName = watch("fullName");
//   const username = watch("username");

//   useEffect(() => {
//     if (userData) {
//       // Reset with keepDefaultValues: false to properly track dirty fields
//       reset(userData, { keepDefaultValues: false });

//       //  Check if avatar exists and is not an empty string
//       if (userData.avatar && userData.avatar.trim() !== "") {
//         setAvatarPreview(userData.avatar);
//       } else {
//         setAvatarPreview(null);
//       }
//     } else {
//       reset(getEmptyUser(), { keepDefaultValues: false });
//       setAvatarPreview(null);
//     }
//     setSelectedAvatar(null);
//   }, [userData, reset]);

//   //  Handle avatar file selection
//   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file size (5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size must be less than 5MB");
//       return;
//     }

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       toast.error("Only image files are allowed");
//       return;
//     }

//     setSelectedAvatar(file);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setAvatarPreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   //  Smart form submit handler - handles independent requests
//   const onSubmit = async (formData: CreateUserData) => {
//     try {
//       if (isEditMode && isUpdateUserData(formData)) {
//         const { ...updateData } = formData;

//         //  Check if form has changes using isDirty or dirtyFields
//         const hasFormChanges = isDirty || Object.keys(dirtyFields).length > 0;
//         const hasAvatarChange = selectedAvatar !== null;

//         // Debug logging
//         console.log("Form validation:", {
//           isDirty,
//           dirtyFieldsCount: Object.keys(dirtyFields).length,
//           dirtyFields,
//           hasFormChanges,
//           hasAvatarChange,
//         });

//         // If nothing changed
//         if (!hasFormChanges && !hasAvatarChange) {
//           toast.info("No changes to save");
//           return;
//         }

//         const promises = [];
//         const operations: string[] = [];

//         //  Add user update only if form changed
//         if (hasFormChanges) {
//           console.log("Updating user with data:", updateData);
//           promises.push(updateUser(formData.id, updateData));
//           operations.push("user details");
//         }

//         //  Add avatar upload only if new avatar selected (with userId)
//         if (hasAvatarChange) {
//           setIsUploadingAvatar(true);
//           promises.push(updateAvatar(formData.id, selectedAvatar!));
//           operations.push("avatar");
//         }

//         // Execute all necessary requests in parallel
//         const results = await Promise.all(promises);
//         setIsUploadingAvatar(false);

//         // Check if all succeeded
//         if (results.every((result) => result !== null)) {
//           // Show what was updated
//           const updatedItems = operations.join(" and ");
//           toast.success(`Successfully updated ${updatedItems}!`);

//           setSelectedAvatar(null);
//           onClose();
//         } else {
//           toast.error("Some updates failed");
//         }
//       } else {
//         //  CREATE MODE: Create user first
//         const result = await createUser(formData);

//         if (result) {
//           // If avatar selected, upload it after user creation (with userId)
//           if (selectedAvatar && result.id) {
//             setIsUploadingAvatar(true);
//             await updateAvatar(result.id, selectedAvatar);
//             setIsUploadingAvatar(false);
//           }

//           setSelectedAvatar(null);
//           onClose();
//         }
//       }
//     } catch (error: any) {
//       console.error("Form submission error:", error);
//       toast.error("Failed to save changes");
//       setIsUploadingAvatar(false);
//     }
//   };

//   //  Handle avatar-only update (with userId)
//   const handleAvatarOnlyUpdate = async () => {
//     if (!selectedAvatar || isCreateUserData(userData)) return;

//     try {
//       setIsUploadingAvatar(true);
//       const result = await updateAvatar(userData.id, selectedAvatar);
//       setIsUploadingAvatar(false);

//       if (result) {
//         setSelectedAvatar(null);
//         setAvatarPreview(
//           result.avatar && result.avatar.trim() !== "" ? result.avatar : null
//         );
//         toast.success("Avatar updated successfully!");
//       }
//     } catch (error) {
//       console.error("Avatar update error:", error);
//       toast.error("Failed to update avatar");
//       setIsUploadingAvatar(false);
//     }
//   };

//   const getInitials = (name: string) => {
//     return name
//       ? name
//           .split(" ")
//           .map((n) => n[0])
//           .join("")
//           .toUpperCase()
//           .slice(0, 2)
//       : "U";
//   };

//   const hasValidAvatar = avatarPreview && avatarPreview.trim() !== "";

//   // Check if save button should be enabled
//   const canSubmit =
//     !isLoading &&
//     (!isEditMode || // Always allow in create mode
//       isDirty || // Form has changes
//       Object.keys(dirtyFields).length > 0 || // Explicit dirty field check
//       selectedAvatar !== null);

//   return (
//     <div className="relative w-full bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
//       {/* Glowing accents */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl pointer-events-none"></div>

//       <div className="relative z-10 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//             {isEditMode ? "Edit User" : "Create New User"}
//           </h2>
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="p-2 rounded-full hover:bg-gray-700/50 transition-colors disabled:opacity-50"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Error Messages */}
//         {Object.keys(errors).length > 0 && (
//           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
//             <ul className="text-sm text-red-300 space-y-1">
//               {Object.entries(errors).map(([key, error]) => (
//                 <li key={key}>• {error?.message}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Avatar Upload */}
//           <div className="flex justify-center">
//             <div className="relative">
//               {/*  Avatar Preview with proper validation */}
//               {hasValidAvatar ? (
//                 <img
//                   src={avatarPreview}
//                   alt="Avatar preview"
//                   className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/30"
//                   onError={(e) => {
//                     // Fallback if image fails to load
//                     console.error("Failed to load avatar image");
//                     setAvatarPreview(null);
//                   }}
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
//                   {getInitials(fullName || username || "")}
//                 </div>
//               )}

//               {/* Upload Button */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 className="hidden"
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={isLoading}
//                 className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:scale-110 transition-all shadow-lg disabled:opacity-50"
//                 title="Upload avatar"
//               >
//                 {isUploadingAvatar ? (
//                   <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Upload size={14} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Show selected file name with quick upload option */}
//           {selectedAvatar && isEditMode && (
//             <div className="text-center space-y-2">
//               <p className="text-xs text-gray-400">
//                 Selected: {selectedAvatar.name}
//               </p>
//               <button
//                 type="button"
//                 onClick={handleAvatarOnlyUpdate}
//                 disabled={isUploadingAvatar}
//                 className="text-xs text-cyan-400 hover:text-cyan-300 underline disabled:opacity-50"
//               >
//                 {isUploadingAvatar ? "Uploading..." : "Update avatar only"}
//               </button>
//             </div>
//           )}

//           {/* Full Name & Username - Same Line */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 <div className="flex items-center gap-2">
//                   <UserIcon size={16} />
//                   Full Name *
//                 </div>
//               </label>
//               <input
//                 type="text"
//                 {...register("fullName", {
//                   required: "Full name is required",
//                 })}
//                 placeholder="Enter full name"
//                 className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
//                 disabled={isLoading}
//               />
//               {errors.fullName && (
//                 <p className="mt-1 text-xs text-red-400">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             {/* Username */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 <div className="flex items-center gap-2">
//                   <AtSign size={16} />
//                   Username *
//                 </div>
//               </label>
//               <input
//                 type="text"
//                 {...register("username", {
//                   required: "Username is required",
//                   minLength: {
//                     value: 3,
//                     message: "Username must be at least 3 characters",
//                   },
//                   pattern: {
//                     value: /^[a-zA-Z0-9_]+$/,
//                     message:
//                       "Username can only contain letters, numbers, and underscores",
//                   },
//                 })}
//                 placeholder="Enter username"
//                 className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
//                 disabled={isLoading}
//               />
//               {errors.username && (
//                 <p className="mt-1 text-xs text-red-400">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-300 mb-2">
//               <div className="flex items-center gap-2">
//                 <Mail size={16} />
//                 Email Address *
//               </div>
//             </label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Invalid email format",
//                 },
//               })}
//               placeholder="user@example.com"
//               className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
//               disabled={isLoading}
//             />
//             {errors.email && (
//               <p className="mt-1 text-xs text-red-400">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password - Only show when creating new user */}
//           {!isEditMode && (
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 <div className="flex items-center gap-2">
//                   <Lock size={16} />
//                   Password *
//                 </div>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", {
//                     required: !isEditMode ? "Password is required" : false,
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                   })}
//                   placeholder="Enter password (min. 8 characters)"
//                   className="w-full px-4 py-2.5 pr-12 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-1"
//                   disabled={isLoading}
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-xs text-red-400">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Role & Status */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Role */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 <div className="flex items-center gap-2">
//                   <Shield size={16} />
//                   Role
//                 </div>
//               </label>

//               <select
//                 {...register("role")}
//                 className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white appearance-none cursor-pointer"
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "right 1rem center",
//                   backgroundSize: "1em",
//                 }}
//                 disabled={isLoading}
//               >
//                 {Object.values(UserRole).map((role) => (
//                   <option
//                     key={role}
//                     value={role}
//                     className="bg-gray-800 text-white py-2"
//                   >
//                     {role.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">
//                 Status
//               </label>

//               <select
//                 {...register("status")}
//                 className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white appearance-none cursor-pointer"
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "right 1rem center",
//                   backgroundSize: "1em",
//                 }}
//                 disabled={isLoading}
//               >
//                 {Object.values(UserStatus).map((status) => (
//                   <option
//                     key={status}
//                     value={status}
//                     className="bg-gray-800 text-white py-2"
//                   >
//                     {status.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-300 mb-2">
//               Bio (Optional)
//             </label>
//             <textarea
//               {...register("bio")}
//               rows={3}
//               placeholder="Write a short bio..."
//               className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 resize-none"
//               disabled={isLoading}
//             ></textarea>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="submit"
//               disabled={!canSubmit}
//               className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   {isEditMode ? "Updating..." : "Creating..."}
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} />
//                   {isEditMode ? "Update User" : "Create User"}
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isLoading}
//               className="px-6 py-2.5 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

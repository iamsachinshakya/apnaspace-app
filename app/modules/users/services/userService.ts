import { userClient } from "@/app/lib/api/client";
import { PaginatedData } from "@/app/modules/common/types/common.dto";
import {
    handleErrorDTO,
    handleSuccessDTO,
    unhandledErrorDTO,
    HandleResponseDTO,
} from "@/app/modules/common/utils/apiResponse";
import { IFollowUser, IUpdateUser, IUserDashboard, IUserProfile } from "@/app/modules/users/types/user.dto";

// ---------------------------------------------------
// USER SERVICE
// ---------------------------------------------------
export const userService = {


    // ---------------------------------------------------
    // GET CURRENT USER PROFILE
    // GET /users/me
    // ---------------------------------------------------
    getCurrentUserProfile: async (): Promise<
        HandleResponseDTO<IUserProfile>
    > => {
        try {
            const { data } =
                await userClient.get<HandleResponseDTO<IUserProfile>>("/users/me");

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to fetch user profile",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(data.data!, "Profile fetched successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to fetch user profile";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // GET USER PROFILE BY ID
    // GET /users/profile/:id
    // ---------------------------------------------------
    getUserProfileById: async (
        userId: string
    ): Promise<HandleResponseDTO<IUserProfile>> => {
        try {
            const { data } =
                await userClient.get<HandleResponseDTO<IUserProfile>>(
                    `/users/profile/${userId}`
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to fetch user profile",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(data.data!, "User profile fetched");
        } catch (err: any) {
            const msg = err.message ?? "Failed to fetch user profile";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // GET USER BY ID (ADMIN / PERMISSION BASED)
    // GET /users/:id
    // ---------------------------------------------------
    getUserById: async (
        userId: string
    ): Promise<HandleResponseDTO<IUserDashboard>> => {
        try {
            const { data } =
                await userClient.get<HandleResponseDTO<IUserDashboard>>(
                    `/users/${userId}`
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to fetch user",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(data.data!, "User fetched successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to fetch user";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // UPDATE USER ACCOUNT DETAILS
    // PATCH /users/:id
    // ---------------------------------------------------
    updateAccountDetails: async (
        userId: string,
        payload: IUpdateUser
    ): Promise<HandleResponseDTO<IUpdateUser>> => {
        try {
            const { data } =
                await userClient.patch<HandleResponseDTO<IUpdateUser>>(
                    `/users/${userId}`,
                    payload
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to update account",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(data.data!, "Account updated successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to update account";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // UPDATE USER AVATAR
    // PATCH /users/:id/avatar
    // ---------------------------------------------------
    updateAvatar: async (
        userId: string,
        file: File
    ): Promise<HandleResponseDTO<IUpdateUser>> => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const { data } =
                await userClient.patch<HandleResponseDTO<IUpdateUser>>(
                    `/users/${userId}/avatar`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to update avatar",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(data.data!, "Avatar updated successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to update avatar";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // FOLLOW USER
    // POST /users/follow/:targetUserId
    // ---------------------------------------------------
    followUser: async (
        targetUserId: string
    ): Promise<HandleResponseDTO<null>> => {
        try {
            const { data } =
                await userClient.post<HandleResponseDTO<null>>(
                    `/users/follow/${targetUserId}`
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to follow user",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(null, "User followed successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to follow user";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // UNFOLLOW USER
    // DELETE /users/unfollow/:targetUserId
    // ---------------------------------------------------
    unfollowUser: async (
        targetUserId: string
    ): Promise<HandleResponseDTO<null>> => {
        try {
            const { data } =
                await userClient.delete<HandleResponseDTO<null>>(
                    `/users/unfollow/${targetUserId}`
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Failed to unfollow user",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return handleSuccessDTO(null, "User unfollowed successfully");
        } catch (err: any) {
            const msg = err.message ?? "Failed to unfollow user";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // GET FOLLOWERS
    // GET /users/:id/followers
    // ---------------------------------------------------
    getFollowers: async (
        userId: string
    ): Promise<HandleResponseDTO<IFollowUser[]>> => {
        try {
            const { data } =
                await userClient.get<HandleResponseDTO<IFollowUser[]>>(
                    `/users/${userId}/followers`
                );

            return data.success
                ? handleSuccessDTO(data.data!, "Followers fetched")
                : handleErrorDTO(
                    data.message || "Failed to fetch followers",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
        } catch (err: any) {
            const msg = err.message ?? "Failed to fetch followers";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // GET FOLLOWING
    // GET /users/:id/following
    // ---------------------------------------------------
    getFollowing: async (
        userId: string
    ): Promise<HandleResponseDTO<IFollowUser[]>> => {
        try {
            const { data } =
                await userClient.get<HandleResponseDTO<IFollowUser[]>>(
                    `/users/${userId}/following`
                );

            return data.success
                ? handleSuccessDTO(data.data!, "Following fetched")
                : handleErrorDTO(
                    data.message || "Failed to fetch following",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
        } catch (err: any) {
            const msg = err.message ?? "Failed to fetch following";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },
};

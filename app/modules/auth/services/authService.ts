import { authApiClient } from "@/app/lib/api/client";
import { setError, setUserData, startLoading } from "@/app/modules/auth/redux/authSlice";
import { IAuthDashboard, ILoginCredentials, IRegisterData, IResetPassword } from "@/app/modules/auth/types/auth.dto";
import { IAuthEntity } from "@/app/modules/auth/types/auth.entity";
import { IQueryParams, PaginatedData } from "@/app/modules/common/types/common.dto";
import { handleErrorDTO, HandleResponseDTO, handleSuccessDTO, unhandledErrorDTO } from "@/app/modules/common/utils/apiResponse";
import { showError, showSuccess } from "@/app/modules/common/utils/toast";
import { userService } from "@/app/modules/users/services/userService";
import { IUserProfile } from "@/app/modules/users/types/user.dto";
import { Dispatch } from "@reduxjs/toolkit";

export const authService = {
    // ---------------------------------------------------
    // LOGIN
    // ---------------------------------------------------
    login: async (
        credentials: ILoginCredentials,
        dispatch: Dispatch
    ): Promise<HandleResponseDTO<IUserProfile>> => {
        dispatch(startLoading());

        try {
            // Step 1: Login API
            const { data } = await authApiClient.post<HandleResponseDTO<{ user: IUserProfile; accessToken: string; refreshToken: string }>>(
                "/login",
                credentials
            );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Login failed",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            // const { user } = res.data.data!;

            // Step 2: Fetch user profile
            const userData = await userService.getCurrentUserProfile();

            if (!userData.success) {
                return handleErrorDTO(
                    userData.message || "Failed to fetch user profile",
                    userData.statusCode,
                    userData.errors,
                    userData.meta
                );
            }

            const profile = userData.data!;

            dispatch(setUserData(profile));

            return handleSuccessDTO(profile, "Login successful");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ??
                err.response?.data?.errors?.[0]?.message ??
                err.message ??
                "Login failed";

            dispatch(setError(msg)); // store plain string only
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------
    logout: async (): Promise<HandleResponseDTO<null>> => {
        try {
            const { data } = await authApiClient.post<HandleResponseDTO<null>>(
                "/logout"
            );

            return data;
        } catch (err: any) {
            console.error("Logout failed", err);

            return unhandledErrorDTO(
                "Error while logout!",
                err.response?.data?.errors
            );
        }
    },


    // ---------------------------------------------------
    // REGISTER
    // ---------------------------------------------------
    register: async (
        payload: IRegisterData
    ): Promise<HandleResponseDTO<IAuthEntity>> => {
        try {
            const { data } = await authApiClient.post<HandleResponseDTO<IAuthEntity>>("/register", payload);
            return data;
        } catch (err: any) {
            const msg = err.message ?? "Registration failed";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    // ---------------------------------------------------
    // RESET PASSWORD
    // ---------------------------------------------------
    resetPassword: async (
        payload: IResetPassword
    ): Promise<HandleResponseDTO<null>> => {
        try {
            const { data } = await authApiClient.post<HandleResponseDTO<null>>("/reset-password", payload);
            if (data.success) return handleSuccessDTO(null, "Password reset successful");
            return handleErrorDTO(data.message || "Password reset failed", data.statusCode, data.errors, data.meta);
        } catch (err: any) {
            const msg = err.message ?? "Password reset failed";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

    /* ---------------------------------------------------
       GET ALL AUTH USERS (ADMIN)
       GET /api/v1/auth/users
    --------------------------------------------------- */
    getAllUsers: async (query: IQueryParams): Promise<HandleResponseDTO<PaginatedData<IAuthDashboard>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (query?.page) queryParams.append("page", query.page.toString());
            if (query?.limit) queryParams.append("limit", query.limit.toString());
            if (query?.search) queryParams.append("search", query.search);
            if (query?.sortBy) queryParams.append("sortBy", query.sortBy)
            if (query?.sortOrder) queryParams.append("sortOrder", query.sortOrder)

            const { data } =
                await authApiClient.get<HandleResponseDTO<PaginatedData<IAuthDashboard>>>(
                    `/users?${queryParams.toString()}`
                );
            return data;
        } catch (err: any) {
            return unhandledErrorDTO(
                "Failed to fetch users",
                err.response?.data?.errors
            );
        }
    },

    /* ---------------------------------------------------
       UPDATE AUTH USER (ADMIN)
       PATCH /api/v1/auth/users/:id
    --------------------------------------------------- */
    updateUser: async (
        userId: string,
        payload: Partial<IAuthDashboard>
    ): Promise<HandleResponseDTO<IAuthDashboard>> => {
        try {
            const { data } =
                await authApiClient.patch<HandleResponseDTO<IAuthDashboard>>(
                    `/users/${userId}`,
                    payload
                );

            if (!data.success) {
                return handleErrorDTO(
                    data.message || "Update failed",
                    data.statusCode,
                    data.errors,
                    data.meta
                );
            }

            return data;
        } catch (err: any) {
            return unhandledErrorDTO(
                "Failed to update user",
                err.response?.data?.errors
            );
        }
    },

    /* ---------------------------------------------------
       DELETE AUTH USER (ADMIN)
       DELETE /api/v1/auth/users/:id
    --------------------------------------------------- */
    deleteUser: async (
        userId: string
    ): Promise<HandleResponseDTO<null>> => {
        try {
            const { data } =
                await authApiClient.delete<HandleResponseDTO<null>>(
                    `/users/${userId}`
                );
            return data;
        } catch (err: any) {
            return unhandledErrorDTO(
                "Failed to delete user",
                err.response?.data?.errors
            );
        }
    },

    bulkDeleteUsers: async (
        userIds: string[]
    ): Promise<HandleResponseDTO<null>> => {
        try {
            const results = await Promise.all(
                userIds.map((id) => authService.deleteUser(id))
            );

            const successCount = results.filter(r => r.success).length;
            const failCount = results.filter(r => !r.success).length;

            if (successCount > 0) {
                showSuccess(`${successCount} user(s) deleted successfully!`);
            }

            if (failCount > 0) {
                showError(`Failed to delete ${failCount} user(s)`);
            }

            if (failCount > 0) {
                return handleErrorDTO(
                    "Some users could not be deleted",
                    207 // Multi-Status (semantic fit)
                );
            }

            return handleSuccessDTO(null, "All users deleted successfully");

        } catch (err: any) {
            showError("Bulk delete failed");
            return unhandledErrorDTO(
                "Bulk delete operation failed!",
                err?.response?.data?.errors
            );
        }
    }

};

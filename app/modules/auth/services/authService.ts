import { authClient, userClient } from "@/app/lib/api/client";
import { setError, setUserData, startLoading } from "@/app/modules/auth/redux/authSlice";
import { ILoginCredentials, IRegisterData, IResetPassword } from "@/app/modules/auth/types/auth.dto";
import { IAuthEntity } from "@/app/modules/auth/types/auth.entity";
import { handleErrorDTO, HandleResponseDTO, handleSuccessDTO, unhandledErrorDTO } from "@/app/modules/common/utils/apiResponse";
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
            const { data } = await authClient.post<HandleResponseDTO<{ user: IUserProfile; accessToken: string; refreshToken: string }>>(
                "/auth/login",
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
            const { data } = await authClient.post<HandleResponseDTO<null>>(
                "/auth/logout"
            );

            return data; // return DTO
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
            const { data } = await authClient.post<HandleResponseDTO<IAuthEntity>>("/auth/register", payload);
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
            const { data } = await authClient.post<HandleResponseDTO<null>>("/auth/reset-password", payload);
            if (data.success) return handleSuccessDTO(null, "Password reset successful");
            return handleErrorDTO(data.message || "Password reset failed", data.statusCode, data.errors, data.meta);
        } catch (err: any) {
            const msg = err.message ?? "Password reset failed";
            return unhandledErrorDTO(msg, err.response?.data?.errors);
        }
    },

};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { IUserProfile } from "@/app/modules/users/types/user.dto";

interface AuthState {
    userData: IUserProfile | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userData: null,
    isLoggedIn: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setUserData(state, action: PayloadAction<IUserProfile>) {
            state.userData = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
            state.error = null;
        },
        clearUserData(state) {
            state.userData = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const selectAuthUser = (state: RootState) => state.auth.userData;
export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { startLoading, setUserData, clearUserData, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;

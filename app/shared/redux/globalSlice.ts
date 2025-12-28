import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    overlayState: any | null;   // pass any sidebar/modal/bottom-sheet state
    userData: any | null;
}

const initialState: GlobalState = {
    overlayState: null,
    userData: null,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setOverlayState: (state, action: PayloadAction<any>) => {
            state.overlayState = action.payload;
        },

        clearOverlayState: (state) => {
            state.overlayState = null;
        },

        setUserData: (state, action: PayloadAction<string>) => {
            state.userData = action.payload;
        },

        clearUserData: (state, action: PayloadAction<string>) => {
            state.userData = null;
        },
    },
});

// helpers functions
// Selector to get overlay state
export const getOverlayState = (state: { global: GlobalState }) =>
    state.global.overlayState;

export const getUserDataState = (state: { global: GlobalState }) =>
    state.global.userData;


export const {
    setOverlayState,
    clearOverlayState,
    setUserData,
    clearUserData
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;

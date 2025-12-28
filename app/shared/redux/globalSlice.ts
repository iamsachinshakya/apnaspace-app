import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    overlayState: any | null;   // pass any sidebar/modal/bottom-sheet state
}

const initialState: GlobalState = {
    overlayState: null,
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
        }
    },
});

// helpers functions
// Selector to get overlay state
export const getOverlayState = (state: { global: GlobalState }) =>
    state.global.overlayState;




export const {
    setOverlayState,
    clearOverlayState,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;

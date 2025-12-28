import { BottomSheetState, createInitialOverlayData, OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BottomSheetState = {
    bottomSheet: createInitialOverlayData()
};

export const bottomSheetSlice = createSlice({
    name: "bottomSheet",
    initialState,
    reducers: {
        setBottomSheet: (state, action: PayloadAction<OverlayData>) => {
            state.bottomSheet = action.payload;
        },
        clearBottomSheet: (state) => {
            state.bottomSheet = initialState.bottomSheet;
        },
    },
});

export const getBottomSheetState = (state: { bottomSheet: BottomSheetState }) =>
    state.bottomSheet.bottomSheet

export const { setBottomSheet, clearBottomSheet } = bottomSheetSlice.actions;
export const bottomSheetReducer = bottomSheetSlice.reducer;

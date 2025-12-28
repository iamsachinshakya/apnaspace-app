import { createInitialOverlayData, DialogState, OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: DialogState = {
  dialog: createInitialOverlayData()
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<OverlayData>) => {
      state.dialog = action.payload;
    },
    clearDialog: (state) => {
      state.dialog = initialState.dialog;
    },
  },
});

// helpers functions
export const getDialogState = (state: { dialog: DialogState }) =>
  state.dialog.dialog;

export const { setDialog, clearDialog } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;

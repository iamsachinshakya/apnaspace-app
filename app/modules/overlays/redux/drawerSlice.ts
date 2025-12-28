import { createInitialOverlayData, DrawerState, OverlayData } from "@/app/modules/overlays/types/IOverlayTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: DrawerState = {
    drawer: createInitialOverlayData()
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setDrawer: (state, action: PayloadAction<OverlayData>) => {
            state.drawer = action.payload;
        },
        clearDrawer: (state) => {
            state.drawer = initialState.drawer;
        },
    },
});

export const getDrawerState = (state: { drawer: DrawerState }) =>
    state.drawer.drawer;

export const { setDrawer, clearDrawer } = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;

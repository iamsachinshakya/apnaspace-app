
export enum Mode {
    EDIT = "edit",
    ADD = "add"
}

export interface OverlayData {
    show: boolean;
    type: string;
    mode: Mode | null;
}

export const createInitialOverlayData = (): OverlayData => ({
    show: false,
    type: "",
    mode: null
});

export interface BottomSheetState {
    bottomSheet: OverlayData;
}

export interface DialogState {
    dialog: OverlayData;
}

export interface DrawerState {
    drawer: OverlayData;
}

export enum DialogType {
    LOGIN = "login",
    REGISTER = "register",
    SUBSCRIBE = "subscribe",
    ADD_BLOG = "add-blog",
    ADD_CATEGORY = "add-category",
    ADD_COMMENT = "add-comment",
    ADD_PROFILE = "add-profile",
    RESET_PASSWORD = "reset-password",
    ADD_USER = "add-user"
}

export enum DrawerType {
    LOGIN = "login",
    REGISTER = "register"
}

export enum BottomSheetType {
    LOGIN = "login",
    REGISTER = "register",
    SUBSCRIBE = "subscribe",
    ADD_BLOG = "add-blog",
    ADD_CATEGORY = "add-category",
    ADD_COMMENT = "add-comment",
    ADD_PROFILE = "add-profile",
    RESET_PASSWORD = "reset-password",
    ADD_USER = "add-user"


}

import { toast } from "sonner";

type ToastOptions = {
    description?: string;
    duration?: number;
};

export const showSuccess = (
    message: string,
    options?: ToastOptions
) => {
    toast.success(message, {
        description: options?.description,
        duration: options?.duration ?? 3000,
    });
};

export const showError = (
    message: string,
    options?: ToastOptions
) => {
    toast.error(message, {
        description: options?.description,
        duration: options?.duration ?? 4000,
    });
};

export const showInfo = (
    message: string,
    options?: ToastOptions
) => {
    toast(message, {
        description: options?.description,
        duration: options?.duration ?? 3000,
    });
};

export const showWarning = (
    message: string,
    options?: ToastOptions
) => {
    toast.warning(message, {
        description: options?.description,
        duration: options?.duration ?? 3500,
    });
};

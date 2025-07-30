import { create } from "zustand";
import { nanoid } from "nanoid";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
    toasts: [],
    addToast: (type, message, duration = 5000) => {
        const id = nanoid();
        const newToast: Toast = { id, type, message };
        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));

        setTimeout(() => {
            get().removeToast(id);
        }, duration);
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
}));

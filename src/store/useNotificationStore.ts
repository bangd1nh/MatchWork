import { create } from "zustand";

interface Notification {
    id: number;
    message: string;
    read: boolean;
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (message: string) => void;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
    unreadCount: number;
}

let id = 0;

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (message) =>
        set((state) => {
            const newNotification = { id: id++, message, read: false };
            return {
                notifications: [newNotification, ...state.notifications],
                unreadCount: state.unreadCount + 1,
            };
        }),
    markAsRead: (id) =>
        set((state) => {
            const notificationExists = state.notifications.find(
                (n) => n.id === id && !n.read
            );
            if (!notificationExists) return {}; // Don't update state if already read or doesn't exist

            return {
                notifications: state.notifications.map((notification) =>
                    notification.id === id
                        ? { ...notification, read: true }
                        : notification
                ),
                unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0,
            };
        }),
    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({
                ...n,
                read: true,
            })),
            unreadCount: 0,
        })),
}));

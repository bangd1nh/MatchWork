import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "ADMIN" | "EMPLOYER" | "JOBSEEKER";

interface User {
    id: string;
    name: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage", // name of the item in the storage (must be unique)
        }
    )
);

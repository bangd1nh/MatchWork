import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
    const { user, isAuthenticated, login, logout } = useAuthStore();
    return { user, isAuthenticated, login, logout };
};

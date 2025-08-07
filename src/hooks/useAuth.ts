import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authentication";
import { Role, useAuthStore } from "../store/useAuthStore";
import { useToast } from "./useToast";
import { jwtDecode } from "jwt-decode";
interface User {
    id: string;
    name: string;
    role: Role;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const storeLogin = useAuthStore((state) => state.login);
    const toast = useToast();

    const loginMutation = useMutation({
        // The mutation function calls our API service
        mutationFn: loginUser,

        // When the mutation is successful...
        onSuccess: (data) => {
            // 1. Save user and token to the Zustand store
            const decodedUser: { id: string; username: string; role: Role } =
                jwtDecode(data.payload);
            const user: User = {
                id: decodedUser.id,
                name: decodedUser.username,
                role: decodedUser.role,
            };
            storeLogin(user, data.payload);

            // 2. Navigate based on user role
            setTimeout(() => {
                switch (decodedUser.role) {
                    case "ADMIN":
                        navigate("/admin/dashboard");
                        break;
                    case "EMPLOYER":
                        navigate("/employer/dashboard");
                        break;
                    case "JOBSEEKER":
                        navigate("/jobseeker/dashboard");
                        break;
                    default:
                        navigate("/");
                        break;
                }
            }, 0);
        },

        // When the mutation fails...
        onError: (error) => {
            // You can handle the error here, e.g., show a toast notification
            toast("error", error.message);
            console.error("Login failed:", error);
        },
    });

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isPending, // Use isPending for loading state
        isError: loginMutation.isError,
        error: loginMutation.error,
    };
};

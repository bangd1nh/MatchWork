import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// 1. Create an axios instance with basic configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Configure Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Get token from Zustand store
        // Use getState() to access the store outside of a React component
        const token = useAuthStore.getState().token;

        // If a token exists, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// 3. (Optional) Configure Response Interceptor to handle expired tokens
apiClient.interceptors.response.use(
    (response) => response, // Return response on success
    (error) => {
        if (error.response && error.response.status === 401) {
            // If a 401 Unauthorized error is received
            // Clear token and user info, then redirect to the login page
            useAuthStore.getState().logout(); // Assuming you have a logout function in your store
            // window.location.href = '/login'; // Redirect
            console.error("Unauthorized! Redirecting to login...");
        }
        return Promise.reject(error);
    }
);

export default apiClient;

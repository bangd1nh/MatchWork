import GuestLayout from "../layouts/GuestLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";

export const guestRoutes = {
    element: <GuestLayout />,
    children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
    ],
};

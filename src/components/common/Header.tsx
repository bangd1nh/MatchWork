import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import NotificationBell from "./NotificationBell";
import { Button } from "@/components/ui/button"; // Import Button component
import { useTheme } from "@/hooks/useTheme"; // Import useTheme hook

const Header = () => {
    const { isAuthenticated, logout, user } = useAuthStore();
    const { theme, toggleTheme } = useTheme(); // Use the theme hook

    const getDashboardPath = () => {
        if (!user) return "/";
        switch (user.role) {
            case "ADMIN":
                return "/admin/dashboard";
            case "EMPLOYER":
                return "/employer/dashboard";
            case "JOBSEEKER":
                return "/jobseeker/dashboard";
            default:
                return "/";
        }
    };

    const renderRoleNavItems = () => {
        if (!user) return null;

        switch (user.role) {
            case "ADMIN":
                return (
                    <>
                        <Link to="#" className="nav-link">
                            Manage Users
                        </Link>
                        <Link to="#" className="nav-link">
                            View Reports
                        </Link>
                    </>
                );
            case "EMPLOYER":
                return (
                    <>
                        <Link to="#" className="nav-link">
                            Post a Job
                        </Link>
                        <Link to="#" className="nav-link">
                            My Jobs
                        </Link>
                    </>
                );
            case "JOBSEEKER":
                return (
                    <>
                        <Link to="#" className="nav-link">
                            Find Jobs
                        </Link>
                        <Link to="#" className="nav-link">
                            My Applications
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center z-10 w-full">
            <Link to="/" className="text-2xl font-bold text-primary ">
                Job Board
            </Link>

            <nav className="flex-1 ml-10">
                <div className="flex gap-6 items-center">
                    {renderRoleNavItems()}
                </div>
            </nav>

            <div className="flex items-center gap-4">
                {isAuthenticated && (
                    <>
                        <Link
                            to={getDashboardPath()}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Dashboard
                        </Link>
                        <NotificationBell />
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Logout
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Login
                    </Link>
                )}

                {/* Dark Mode Toggle Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="ml-4"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
            </div>
        </header>
    );
};

export default Header;

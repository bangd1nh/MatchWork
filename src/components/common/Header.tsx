import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import NotificationBell from "./NotificationBell";
import { Button } from "@/components/ui/button"; // Import Button component
import { useTheme } from "@/hooks/useTheme"; // Import useTheme hook
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Header = () => {
    const { isAuthenticated, logout, user } = useAuthStore();
    const { theme, toggleTheme } = useTheme(); // Use the theme hook
    const { t } = useTranslation(); // Use the translation hook

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
                            {t("manage_users")}
                        </Link>
                        <Link to="#" className="nav-link">
                            {t("view_reports")}
                        </Link>
                    </>
                );
            case "EMPLOYER":
                return (
                    <>
                        <Link to="#" className="nav-link">
                            {t("post_a_job")}
                        </Link>
                        <Link to="#" className="nav-link">
                            {t("my_jobs")}
                        </Link>
                    </>
                );
            case "JOBSEEKER":
                return (
                    <>
                        <Link to="#" className="nav-link">
                            {t("find_jobs")}
                        </Link>
                        <Link to="#" className="nav-link">
                            {t("my_applications")}
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
                {t("job_board")}
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
                            {t("dashboard")}
                        </Link>
                        <NotificationBell />
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            {t("logout")}
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        {t("login")}
                    </Link>
                )}

                {/* Dark Mode Toggle Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="ml-4"
                >
                    {theme === "light" ? t("dark_mode") : t("light_mode")}
                </Button>
            </div>
        </header>
    );
};

export default Header;
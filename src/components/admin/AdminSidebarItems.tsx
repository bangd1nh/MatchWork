import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface AdminSidebarItemsProps {
    onLinkClick?: () => void;
}

const AdminSidebarItems = ({ onLinkClick }: AdminSidebarItemsProps) => {
    const location = useLocation();
    const { t } = useTranslation();

    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const handleLinkClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return (
        <div className="space-y-1">
            <Link
                to="/admin/dashboard"
                onClick={handleLinkClick}
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none
                    ${
                        isActive("/admin/dashboard")
                            ? "bg-red-500/20 text-gray-900 dark:text-white border-l-4 border-red-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
            >
                {t("dashboard")}
            </Link>
            <Link
                to="/admin/users"
                onClick={handleLinkClick}
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none
                    ${
                        isActive("/admin/users")
                            ? "bg-red-500/20 text-gray-900 dark:text-white border-l-4 border-red-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gamma-700"
                    }
                `}
            >
                {t("user_management")}
            </Link>
        </div>
    );
};

export default AdminSidebarItems;

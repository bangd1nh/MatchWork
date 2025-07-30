import { Link, useLocation } from "react-router-dom";

const AdminSidebarItems = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="space-y-1">
            <Link
                to="/admin/dashboard"
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none border-l-8
                    ${
                        isActive("/admin/dashboard")
                            ? "bg-red-500/20 text-gray-900 dark:text-white border-l-8 border-red-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
            >
                Dashboard
            </Link>
            <Link
                to="/admin/users"
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none border-l-8
                    ${
                        isActive("/admin/users")
                            ? "bg-red-500/20 text-gray-900 dark:text-white border-l-8 border-red-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
            >
                User Management
            </Link>
        </div>
    );
};

export default AdminSidebarItems;

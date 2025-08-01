import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const JobSeekerSidebarItems = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="space-y-1">
            <Link
                to="/jobseeker/dashboard"
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none
                    ${
                        isActive("/jobseeker/dashboard")
                            ? "bg-green-500/20 text-gray-900 dark:text-white border-l-4 border-green-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
            >
                {t("dashboard")}
            </Link>
            <Link
                to="/jobseeker/applications"
                className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 rounded-s-none
                    ${
                        isActive("/jobseeker/applications")
                            ? "bg-green-500/20 text-gray-900 dark:text-white border-l-4 border-green-500"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                `}
            >
                {t("my_applications")}
            </Link>
        </div>
    );
};

export default JobSeekerSidebarItems;
import { Link } from "react-router-dom";

const EmployerSidebarItems = () => {
    return (
        <ul>
            <li>
                <Link
                    to="/employer/dashboard"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    Dashboard
                </Link>
            </li>
            <li>
                <Link
                    to="/employer/jobs"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    Manage Jobs
                </Link>
            </li>
        </ul>
    );
};

export default EmployerSidebarItems;

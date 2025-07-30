import { Link } from "react-router-dom";

const AdminSidebarItems = () => {
    return (
        <ul>
            <li>
                <Link
                    to="/admin/dashboard"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    Dashboard
                </Link>
            </li>
            <li>
                <Link
                    to="/admin/users"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    User Management
                </Link>
            </li>
        </ul>
    );
};

export default AdminSidebarItems;

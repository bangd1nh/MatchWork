import { Link } from "react-router-dom";

const JobSeekerSidebarItems = () => {
    return (
        <ul>
            <li>
                <Link
                    to="/jobseeker/dashboard"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    Dashboard
                </Link>
            </li>
            <li>
                <Link
                    to="/jobseeker/applications"
                    className="block py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    My Applications
                </Link>
            </li>
        </ul>
    );
};

export default JobSeekerSidebarItems;

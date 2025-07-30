import { useAuthStore } from "@/store/useAuthStore";
import EmployerSidebarItems from "./EmployerSidebarItems";

const EmployerSidebar = () => {
    const { user } = useAuthStore();

    return (
        <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 flex flex-col flex-shrink-0">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-indigo-500 font-bold">
                    {user?.role}
                </p>
            </div>
            <nav className="flex-grow">
                <EmployerSidebarItems />
            </nav>
        </aside>
    );
};

export default EmployerSidebar;

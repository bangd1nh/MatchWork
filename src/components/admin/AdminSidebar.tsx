// src/components/admin/AdminSidebar.tsx
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebarItems from "./AdminSidebarItems";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
    className?: string;
    onLinkClick?: () => void; // Hàm callback để đóng sidebar trên mobile
}

const AdminSidebar = ({ className, onLinkClick }: AdminSidebarProps) => {
    const { user } = useAuthStore();

    return (
        // Sử dụng `cn` để kết hợp các class mặc định và class được truyền vào
        <aside
            className={cn(
                "bg-gray-200 dark:bg-gray-800 p-4 flex flex-col",
                className
            )}
        >
            <div className="mb-4">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-red-500 font-bold">{user?.role}</p>
            </div>
            <nav className="flex-grow">
                {/* Truyền hàm onLinkClick xuống component con */}
                <AdminSidebarItems onLinkClick={onLinkClick} />
            </nav>
        </aside>
    );
};

export default AdminSidebar;

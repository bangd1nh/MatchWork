// src/layouts/AdminLayout.tsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { socket } from "@/lib/socket";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = () => {
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        socket.connect();
        socket.on("new-notification", (data) => addNotification(data.message));

        return () => {
            socket.disconnect();
            socket.off("new-notification");
        };
    }, [addNotification]);

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* Sidebar cho màn hình lớn */}
            <div className="hidden md:flex md:flex-shrink-0">
                <AdminSidebar className="w-64" />
            </div>

            {/* Sheet (Sidebar trượt ra) cho màn hình nhỏ */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <AdminSidebar onLinkClick={closeSidebar} />
                </SheetContent>
            </Sheet>

            <div className="flex-grow flex flex-col overflow-y-auto">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-grow p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

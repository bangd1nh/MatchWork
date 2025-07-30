import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import EmployerSidebar from "@/components/employer/EmployerSidebar";
import { socket } from "@/lib/socket";
import { useNotificationStore } from "@/store/useNotificationStore";

const EmployerLayout = () => {
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );

    useEffect(() => {
        socket.connect();
        socket.on("new-notification", (data) => addNotification(data.message));

        return () => {
            socket.disconnect();
            socket.off("new-notification");
        };
    }, [addNotification]);

    return (
        <div className="min-h-screen flex h-screen overflow-hidden">
            <EmployerSidebar />
            <div className="flex-grow flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EmployerLayout;

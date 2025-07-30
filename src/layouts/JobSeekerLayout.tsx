import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/common/Header";
import JobSeekerSidebar from "@/components/jobseeker/JobSeekerSidebar";
import { socket } from "@/lib/socket";
import { useNotificationStore } from "@/store/useNotificationStore";

const JobSeekerLayout = () => {
    const addNotification = useNotificationStore(
        (state) => state.addNotification
    );
    const location = useLocation();
    const showSidebar = location.pathname !== "/";

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
            {showSidebar && <JobSeekerSidebar />}
            <div className="flex-grow flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default JobSeekerLayout;

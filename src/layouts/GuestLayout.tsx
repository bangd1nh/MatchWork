import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

const GuestLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default GuestLayout;

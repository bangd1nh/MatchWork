import { AppointmentCalendar } from "@/components/common/AppointmentCalendar";

const AdminPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p>This is a protected area for administrators only.</p>
            <div className="mt-8">
                <AppointmentCalendar />
            </div>
        </div>
    );
};

export default AdminPage;

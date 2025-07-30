import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/admin/AdminPage";
import OverviewPage from "../pages/dashboard/OverviewPage";

export const adminRoutes = {
    element: (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
        </ProtectedRoute>
    ),
    children: [
        { path: "/admin", element: <AdminPage /> },
        { path: "/admin/dashboard", element: <OverviewPage /> },
    ],
};

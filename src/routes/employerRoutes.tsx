import EmployerLayout from "../layouts/EmployerLayout";
import ProtectedRoute from "./ProtectedRoute";
import OverviewPage from "../pages/dashboard/OverviewPage";
import JobManage from "@/pages/Employer/JobManage";

export const employerRoutes = {
    element: (
        <ProtectedRoute allowedRoles={["EMPLOYER"]}>
            <EmployerLayout />
        </ProtectedRoute>
    ),
    children: [
        { path: "/employer/dashboard", element: <OverviewPage /> },
        {
            path: "/employer/jobs",
            element: <JobManage />,
        },
    ],
};

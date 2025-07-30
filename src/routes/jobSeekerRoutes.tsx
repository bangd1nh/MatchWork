import JobSeekerLayout from "../layouts/JobSeekerLayout";
import ProtectedRoute from "./ProtectedRoute";
import OverviewPage from "../pages/dashboard/OverviewPage";
import Application from "@/pages/Jobseeker/Application";

export const jobSeekerRoutes = {
    element: (
        <ProtectedRoute allowedRoles={["JOBSEEKER"]}>
            <JobSeekerLayout />
        </ProtectedRoute>
    ),
    children: [
        { path: "/jobseeker/dashboard", element: <OverviewPage /> },
        {
            path: "/jobseeker/applications",
            element: <Application />,
        },
    ],
};

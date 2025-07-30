import { adminRoutes } from "./adminRoutes";
import { employerRoutes } from "./employerRoutes";
import { jobSeekerRoutes } from "./jobSeekerRoutes";
import { guestRoutes } from "./guestRoutes";
import { fallbackRoutes } from "./fallbackRoutes";

export const routes = [
    guestRoutes,
    adminRoutes,
    employerRoutes,
    jobSeekerRoutes,
    ...fallbackRoutes,
];

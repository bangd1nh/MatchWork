export const fallbackRoutes = [
    {
        path: "/unauthorized",
        element: (
            <div>
                <h1>403 - Unauthorized</h1>
                <p>You do not have permission to access this page.</p>
            </div>
        ),
    },
    {
        path: "*",
        element: (
            <div>
                <h1>404 - Not Found</h1>
            </div>
        ),
    },
];

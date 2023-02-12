import Dashboard from "~/pages/dashboard/Dashboard";

export const publicRoutes = [
    {
        path: "/admin",
        component: Dashboard,
        // layout: "không có mặc định là default",
        exact: true,
    },
];

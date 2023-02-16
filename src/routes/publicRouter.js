import Dashboard from "~/pages/dashboard/Dashboard";
import {FullWidthLayout} from "~/layouts";
import SignIn from "~/pages/sign-in";

export const publicRoutes = [
    {
        path: "/admin/dashboard",
        component: Dashboard,
        // layout: "không có mặc định là default",
        exact: true,
    },
    {
        path: "/admin/auth/sign-in",
        component: SignIn,
        layout: FullWidthLayout,
        exact: true,
    }
];

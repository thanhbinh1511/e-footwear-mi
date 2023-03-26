import Dashboard from "~/pages/dashboard/Dashboard";
import Order from "~/pages/order/Order";
import Category from "~/pages/category/Category";
import { FullWidthLayout } from "~/layouts";
import SignIn from "~/pages/sign-in";
import Customer from "~/pages/customer/Customer";
import Product from "~/pages/product/Product";

export const publicRoutes = [
    {
        path: "/admin/dashboard",
        component: Dashboard,
        exact: true,
    },
    {
        path: "/admin/auth/sign-in",
        component: SignIn,
        layout: FullWidthLayout,
        exact: true,
    },
    {
        path: "/admin/customer",
        component: Customer,
    },
    {
        path: "/admin/order",
        component: Order,
    },
    {
        path: "/admin/category",
        component: Category,

    },
    {
        path: "/admin/product",
        component: Product,
    }

];

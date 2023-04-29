import Dashboard from "~/pages/dashboard/Dashboard";
import Order from "~/pages/order/Order";
import Category from "~/pages/category/Category";
import { FullWidthLayout } from "~/layouts";
import SignIn from "~/pages/sign-in";
import Customer from "~/pages/customer/Customer";
import Product from "~/pages/product/Product";
import ProductDetail from "~/pages/product-detail/ProductDetail";
import ProductImage from "~/pages/product-image/ProductImage";
import Colors from "~/pages/colors/Colors";
import Sizes from "~/pages/sizes/Sizes";
import Galleries from "~/pages/galleries/Galleries";

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
    },
    {
        path: "/admin/details",
        component: ProductDetail,
    },
    {
        path: "/admin/images",
        component: ProductImage,
    },
    {
        path: "/admin/colors",
        component: Colors,
    },
    {
        path: "/admin/sizes",
        component: Sizes,
    },
    {
        path: "/admin/galleries",
        component: Galleries,
    },
];

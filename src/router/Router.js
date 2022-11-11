import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../authentication/Login";
import Menu from "../components/menu/Menu";
import Dashboard from "../components/dashboard/Dashboard";
import UpdatePizza from "../components/pizza/UpdatePizza";
import DeletePizza from "../components/pizza/DeletePizza";
import AddPizza from "../components/pizza/AddPizza";
import AddCoupon from "../components/coupons/AddCoupon";
import UpdateCoupon from "../components/coupons/UpdateCoupon";
import DeleteCoupon from "../components/coupons/DeleteCoupon";
import Coupons from "../components/coupons/Coupons"
import Customer from "../components/customer/Customer";
import AllOrders from "../components/orders/AllOrders";

export default createBrowserRouter([
	{ path: "/", element: <Navigate to="/login" replace /> },
	{ path: "/menu", element: <Menu /> },
	{ path: "/dashboard", element: <Dashboard /> },
	{ path: "/login", element: <Login /> },
	{ path: "/menu/update/:pizzaId", element: <UpdatePizza /> },
	{ path: "/menu/delete/:pizzaId", element: <DeletePizza /> },
	{ path: "/addpizza", element: <AddPizza /> },

	{ path: "/coupon", element: <Coupons /> },
	{ path: "/coupon/update/:couponId", element: <UpdateCoupon /> },
	{ path: "/coupon/delete/:couponId", element: <DeleteCoupon /> },
	{ path: "/addcoupon", element: <AddCoupon /> },
	{ path: "/viewcustomers", element: <Customer /> },
	{ path: "/viewallorders", element: <AllOrders /> },
]);

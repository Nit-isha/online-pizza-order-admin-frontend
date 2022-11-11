import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../authentication/Login";
import Menu from "../components/menu/Menu";
import Dashboard from "../components/dashboard/Dashboard";
import UpdatePizza from "../components/pizza/UpdatePizza";

export default createBrowserRouter([
	{ path: "/", element: <Navigate to="/login" replace /> },
	{ path: "/menu", element: <Menu /> },
	{ path: "/dashboard", element: <Dashboard /> },
	{ path: "/login", element: <Login /> },
	{ path: "/menu/:pizzaId", element: <UpdatePizza /> }
]);

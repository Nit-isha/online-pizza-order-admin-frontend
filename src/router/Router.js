import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../authentication/Login";
import Menu from "../components/menu/Menu";
import Dashboard from "../components/dashboard/Dashboard";

export default createBrowserRouter([
	{ path: "/", element: <Navigate to="/login" replace /> },
	{ path: "/menu", element: <Menu /> },
	{ path: "/dashboard", element: <Dashboard /> },
	{ path: "/login", element: <Login /> },
]);

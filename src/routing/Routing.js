import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
import Signup from "../pages/signUp/Signup";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home/></PrivateRoute>,
  },
  {
    path: "/signup",
    element: <PublicRoute><Signup/></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><Login/></PublicRoute>,
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}

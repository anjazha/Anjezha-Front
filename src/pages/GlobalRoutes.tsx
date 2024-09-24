import { Navigate, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";

const GlobalRoutes = () => {
    const cookie = Cookie().get("token")
    return (
        cookie ? <Navigate to={"/"} /> :<Outlet />
    );
}

export default GlobalRoutes;
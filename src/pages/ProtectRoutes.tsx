import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
    const cookie = Cookie().get("token")
    return (
        cookie ? <Outlet /> : <Navigate to={"/login"} />
    );
}

export default ProtectRoutes;


import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

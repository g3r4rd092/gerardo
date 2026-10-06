import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {

    const token = localStorage.getItem("token");

    //console.log("TOKEN EN PROTECTED:", token);

    return token
        ? children
        : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
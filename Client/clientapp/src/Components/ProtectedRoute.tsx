import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate} from "react-router-dom";

interface JwtPayload {
    sub: string;    
    name: string;   
    role: string;   
    iat: number;    
    exp: number;   
}

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    const decoded = jwtDecode<JwtPayload>(token);
    
    if (decoded.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }
    
    return <>{children}</>;
};

export default ProtectedRoute;

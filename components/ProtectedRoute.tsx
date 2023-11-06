import { useRouter } from "next/router";
import Redirect from "./Redirect";


interface ProtectedRouteProps {
    allowedRoles?: string[]; // Specify the type for allowedRoles prop
    children: React.ReactNode;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
        
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes('brother')) {
      // Redirect to forbidden page if user does not have the required role
      return <Redirect route="/404" />
    }
    // Render the protected content if user is logged in and has the required role
    return <>{children}</>;
  };
  
  export default ProtectedRoute;
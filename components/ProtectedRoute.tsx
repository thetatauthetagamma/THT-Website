import { useRouter } from "next/router";
import Redirect from "./Redirect";


interface ProtectedRouteProps {
    isBrother?: boolean; // Specify the type for allowedRoles prop
    children: React.ReactNode;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isBrother, children }) => {
        
    if (!isBrother) {
      // Redirect to forbidden page if user does not have the required role
      return <Redirect route="/404" />
    }
    // Render the protected content if user is logged in and has the required role
    return <>{children}</>;
  };
  
  export default ProtectedRoute;
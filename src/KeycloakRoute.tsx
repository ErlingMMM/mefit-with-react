import { Navigate } from "react-router-dom";
import keycloak from "./Keycloak";

interface KeycloakRouteProps {
    children: React.ReactNode;
    role: string;
    redirectTo?: string;
  }
  
  
  function KeycloakRoute({ children, role, redirectTo = "/" }: KeycloakRouteProps) {

    if (!keycloak.authenticated) {
      return <Navigate replace to={redirectTo} />;
    }

  
    if (keycloak.hasRealmRole(role)) {
      return <>{children}</>;
    }
    

  
    return <Navigate replace to={redirectTo} />;
  }
  
  export default KeycloakRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import keycloak from '../Keycloak'; // import your custom hook

interface AuthGuardProps {
    component: React.FC<any>;
    path: string;
}

const AuthGuardAdminContributor: React.FC<AuthGuardProps> = ({ component: Component, ...props }) => {
    const isAdmin = keycloak.hasRealmRole('admin');
    const isContributor = keycloak.hasRealmRole('contributor');

    if (isAdmin || isContributor) {
        return <Component {...props} />;
    }
    return <Navigate to="/" />;
};

export default AuthGuardAdminContributor;

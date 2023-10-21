import React from 'react';
import keycloak from "../../../Keycloak";


interface NavigationLinksProps {
  switchToComponent: (component: string) => void;
  isAdmin: boolean;
  isContributor: boolean;
  onclickAdminContributor: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  switchToComponent,
  isAdmin,
  isContributor,
  onclickAdminContributor,
}) => {
  return (
    <div className="sm:flex sm:space-x-4 nav-links hidden">
      <div>User: {keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
      <button onClick={() => switchToComponent('dashboard')}>Dashboard</button>
      <button onClick={() => switchToComponent('profile')}>Profile</button>
      <button onClick={() => switchToComponent('explorer')}>Explorer</button>

      {(isAdmin || isContributor) && (
        <button onClick={onclickAdminContributor}>Contributor</button>
      )}
      {keycloak.authenticated && (
        <button onClick={() => keycloak.logout()}>Logout</button>
      )}
    </div>
  );
};

export default NavigationLinks;

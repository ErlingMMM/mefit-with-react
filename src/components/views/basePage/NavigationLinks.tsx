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
    <div className="sm:flex sm:space-x-4 nav-links hidden justify-between bg-black">
      <div className="space-x-4 flex items-center ml-7">
        <p className='text-custom-green italic text-lg'>Mefit</p>
        <button className='text-white' onClick={() => switchToComponent('dashboard')}>Dashboard</button>
        <button className='text-white' onClick={() => switchToComponent('profile')}>Profile</button>
        <button className='text-white' onClick={() => switchToComponent('explorer')}>Explorer</button>
        {(isAdmin || isContributor) && (
          <button className='text-white' onClick={onclickAdminContributor}>Contributor</button>
        )}
      </div>
  
      <div className="space-x-4 flex items-center ml-4 text-white">
        <div>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
        {keycloak.authenticated && (
          <button className="pr-7" onClick={() => keycloak.logout()}>log out</button>
        )}
      </div>
    </div>
  );
};

export default NavigationLinks;

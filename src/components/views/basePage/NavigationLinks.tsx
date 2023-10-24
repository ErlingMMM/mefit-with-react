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
    <div className="sm:flex sm:space-x-4 nav-links hidden justify-between bg-black py-2">
      <div className="space-x-10 flex items-center ml-7 ">
        <p className='text-custom-green italic text-lg font-sans font-bold'>Mefit</p>
        <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('dashboard')}>Dashboard</button>
        <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('explorer')}>Explorer</button>
        {(isAdmin || isContributor) && (
          <button className='text-white hover:text-custom-green' onClick={onclickAdminContributor}>Contributor</button>
        )}
      </div>
  
      <div className="space-x-10 flex items-center ml-4 text-white ">
        <div className='hover:text-custom-green text-xs'>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
        <button className='text-custom-green text-center' onClick={() => switchToComponent('profile')} style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}>
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ProfilePage"
              style={{ borderRadius: '50%', width: '50px', height: '50px', border: '3px solid' }}
              className="hover:opacity-80"
              onMouseEnter={(e) => (e.currentTarget.style.border = '3px solid white')}
              onMouseLeave={(e) => (e.currentTarget.style.border = '3px solid')}
              />
          </button>
        {keycloak.authenticated && (
          <button className="pr-7 hover:text-custom-green" onClick={() => keycloak.logout()}>log out</button>
        )}
      </div>
    </div>
  );
};

export default NavigationLinks;

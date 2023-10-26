import React from 'react';
import keycloak from "../../../Keycloak";
import { useSelector } from "react-redux";


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
  const user = useSelector((state: any) => state.data.userData);

  return (
<div className="sm:flex sm:space-x-4 nav-links hidden justify-between bg-black py-2 ring-2 dark:ring-[#A8E52D] dark:ring-2">
      <div className="space-x-10 flex items-center ml-7 ">
        <p className='text-custom-green italic text-lg font-sans font-bold hover:text-white cursor-pointer' onClick={() => switchToComponent('dashboard')}>Mefit</p>
        <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('dashboard')}>Dashboard</button>
        <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('explorer')}>Explorer</button>
        {(isAdmin || isContributor) && (
          <button className='text-white hover:text-custom-green' onClick={onclickAdminContributor}>Contributor</button>
        )}
      </div>
  
      <div className="space-x-10 flex items-center ml-4 text-white ">
        <div className='text-xs'>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
        <button className='text-custom-green text-center' onClick={() => switchToComponent('profile')} style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}>
            <img src={user.picture ? user.picture : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                        alt="ProfilePage"
              style={{ borderRadius: '50%', width: '50px', height: '50px', border: '2px solid' }}
              className="hover:opacity-80 object-cover object-center overflow-hidden"
              onMouseEnter={(e) => (e.currentTarget.style.border = '2px solid white')}
              onMouseLeave={(e) => (e.currentTarget.style.border = '2px solid')}
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

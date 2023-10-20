import React from 'react';
import keycloak from "../../../Keycloak";
import { RootState } from '../../../Redux/Store';
import { useSelector } from 'react-redux';

interface SideMenuProps {
  isOpen: boolean;
  switchToComponent: any;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, switchToComponent }) => {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);

  return (
    <div
      className={`fixed left-0 top-0 h-full w-2/3 bg-black transform opacity-90 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-150`}
    >
      <h1
        className={`font-bold text-custom-green text-2xl italic text-right absolute top-6 right-5`}
      >
        MeFit
      </h1>
      <div className={` text-center text-xl h-full flex flex-col`}>
        <div className='text-custom-green text-center mt-40'>
          <button onClick={() => switchToComponent('profile')} style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}>
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ProfilePage"
              style={{ borderRadius: '50%', width: '150px', height: '150px', border: '4px solid' }}
            />
          </button>
        </div>
        <div className='text-white'>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
        <div className='text-custom-green text-sm'>Beginner</div>
        <button onClick={() => switchToComponent('dashboard')} className={`${activeComponent === "dashboard" ? "text-custom-green": "text-white" } mt-auto`} >Dashboard</button>
        <button onClick={() => switchToComponent('explorer')} className={`${activeComponent === "explorer" ? "text-custom-green": "text-white" } mt-auto`} >Explorer</button>
        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()} className='text-white text-lg mt-auto' style={{ marginBottom: '100px' }}
          >Logout</button>
        )}
      </div>
    </div>
  );
};

export default SideMenu;

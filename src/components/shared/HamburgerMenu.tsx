import React from 'react';
import keycloak from "../../Keycloak";
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';



interface HamburgerMenuProps {
  isOpen: boolean;
  switchToComponent: any;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, switchToComponent, toggleMenu }) => {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);

  return (
    <div className="relative mt-5 z-50">
      {/* Hamburger button */}
      <button
        className={`text-black w-10 h-10 relative focus:outline-none z-50`}
        onClick={toggleMenu}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 w-6 text-custom-green' : 'w-4'
                }`}
              style={{ left: '30px' }}
            ></span>
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 w-6 text-custom-green' : 'w-4'
                }`}
              style={{ left: '30px' }}
            ></span>
          </div>
          <div>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''
                }`}
              style={{ top: '13px', left: '40px' }}
            ></span>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''
                }`}
              style={{ top: '28px', left: '40px' }}
            ></span>
          </div>
        </div>
      </button>

      {/* Side menu */}
      <div
        className={`fixed left-0 top-0 h-full w-2/3 bg-black transform opacity-90 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-150`}
      >
        <h1
          className={`font-bold text-custom-green text-2xl italic text-right absolute top-6 right-5 `}
        >
          MeFit
        </h1>
        <div className={` text-center text-xl h-full flex flex-col`}>
         
         
        <div className='text-custom-green text-center' style={{ padding: '10px' }}>
            <button onClick={() => switchToComponent('profile')} style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}>
              <img
                src="https://placekitten.com/200/200"
                alt="ProfilePage"
                style={{ borderRadius: '50%', width: '100px', height: '100px', border: '3px solid' }}
              />
            </button>
          </div>
          <div className='text-white'>Jane Doe</div>
          <div className='text-custom-green text-sm'>Beginner</div>
          <button onClick={() => switchToComponent('dashboard')} className={`${activeComponent === "dashboard" ? "text-custom-green": "text-white" } mt-auto`} >Dashboard</button>
          <button onClick={() => switchToComponent('explorer')} className={`${activeComponent === "explorer" ? "text-custom-green": "text-white" } mt-auto`} style={{ marginBottom: '90px' }}>Explorer</button>
          {keycloak.authenticated && (
            <button onClick={() => keycloak.logout()} className='text-white mt-auto' style={{ marginBottom: '100px' }}
            >Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;











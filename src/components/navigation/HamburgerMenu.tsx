import React from 'react';
import SideMenu from './SideMenu';

interface HamburgerMenuProps {
  isOpen: boolean;
  page: string;
  switchToComponent: any;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, switchToComponent, toggleMenu, page }) => {
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
              className={`block absolute h-0.5 w-4 bg-current  ${isOpen ? 'opacity-0' : ''
                }`}
              style={{ top: '13px', left: '40px' }}
            ></span>
            <span
              className={`block absolute h-0.5 w-4 bg-current ${isOpen ? 'opacity-0' : ''
                }`}
              style={{ top: '28px', left: '40px' }}
            ></span>
          </div>
        </div>
      </button>


      <SideMenu isOpen={isOpen} switchToComponent={switchToComponent} page={page} />
    </div>
  );
};

export default HamburgerMenu;

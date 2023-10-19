import React from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="relative mt-5">
      {/* Hamburger button */}
      <button
        className="text-black w-10 h-10 relative focus:outline-none bg-white z-50" 
        onClick={toggleMenu}
      >
        <div>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-75 ease-in-out ${
                isOpen ? 'rotate-45 w-5' : 'w-4'
              }`}
              style={{ left: '30px' }}
            ></span>
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-75 ease-in-out ${
                isOpen ? '-rotate-45 w-5' : 'w-4'
              }`}
              style={{ left: '30px' }}
            ></span>
          </div>
          <div>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-75 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '13px', left: '40px' }}
            ></span>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-75 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '28px', left: '40px' }}
            ></span>
          </div>
        </div>
      </button>

      {/* Side menu */}
      <div
        className={`fixed left-0 top-0 h-full w-1/2 bg-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-150`}
      >
      
        <div className="mt-20 text-center">
          <button>Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

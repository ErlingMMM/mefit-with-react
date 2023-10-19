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
        className={`text-black w-10 h-10 relative focus:outline-none z-50`}
        onClick={toggleMenu}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? 'rotate-45 w-6 text-custom-green' : 'w-4'
              }`}
              style={{ left: '30px' }}
            ></span>
            <span
              className={`block absolute h-0.5 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? '-rotate-45 w-6 text-custom-green' : 'w-4'
              }`}
              style={{ left: '30px' }}
            ></span>
          </div>
          <div>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '13px', left: '40px' }}
            ></span>
            <span
              className={`block absolute h-0.5 w-4 bg-current transform transition duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '28px', left: '40px' }}
            ></span>
          </div>
        </div>
      </button>

      {/* Side menu */}
      <div
        className={`fixed left-0 top-0 h-full w-2/3 bg-black transform opacity-90 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-150`}
      >
        <h1
          className={`font-bold text-custom-green text-2xl italic text-right absolute top-6 right-5 ${
            isOpen ? 'top-2' : 'hidden'
          }`}

        >
          MeFit
        </h1>
        <div className={`mt-20 text-center ${isOpen ? 'ml-12' : 'ml-0'}`}>
          <button>Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

import React from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="relative">
      <button
        className="text-black w-10 h-10 relative focus:outline-none bg-white"
        onClick={toggleMenu}
      >
        <div>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span
  className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
    isOpen ? 'rotate-45' : ''
  }`}
  style={{ left: '20px' }} 
></span>
<span
  className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
    isOpen ? '-rotate-45' : ''
  }`}
  style={{ left: '20px' }} 
></span>

          </div>
          <div>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '10px', left: '30px' }} 
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
              style={{ top: '30px', left: '30px' }} 
            ></span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default HamburgerMenu;

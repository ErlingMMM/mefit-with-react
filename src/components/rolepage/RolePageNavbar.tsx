import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../navigation/HamburgerMenu';
import { useNavigate } from 'react-router-dom';

interface RolePageNavbarProps {
  switchToComponent: (component: string) => void;
  isAdmin: boolean;
  toggleMenu: () => void; 
}

const RolePageNavbar: React.FC<RolePageNavbarProps> = ({ switchToComponent, isAdmin }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setMenuOpen(false); // Close the menu whenever switchToComponent is called
      }, [switchToComponent]);

  return (
    <div>
      <div className="block sm:hidden relative">
        <HamburgerMenu isOpen={menuOpen} switchToComponent={switchToComponent} toggleMenu={() => setMenuOpen(!menuOpen)} page={"rolePage"} />
        {menuOpen ? null : (
          <h1 className="font-bold text-lg italic text-center absolute top-0 left-1/2 transform -translate-x-1/2">
            MeFit
          </h1>
        )}
      </div>
      <div className="sm:flex sm:justify-between sm:space-x-4 bg-black py-4 px-7 hidden">
      <div className="space-x-4">
  <button onClick={()=> navigate("/")}className='text-custom-green italic text-lg font-sans font-bold'>Mefit</button>
 
    <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('addExercise')}>Add Exercise</button>
    <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('addWorkout')}>Add Workout</button>
    <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('addProgram')}>Add Program</button>
  </div>
  {isAdmin && (
    <div className="space-x-4">
      <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('manageApplications')}>Manage Applications</button>
      <button className='text-white hover:text-custom-green' onClick={() => switchToComponent('manageUsers')}>Manage Users</button>
    </div>
  )}
</div>

    </div>
  );
};

export default RolePageNavbar;

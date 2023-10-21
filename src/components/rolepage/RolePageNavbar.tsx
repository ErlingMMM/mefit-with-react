import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../navigation/HamburgerMenu';

interface RolePageNavbarProps {
  switchToComponent: (component: string) => void;
  isAdmin: boolean;
  toggleMenu: () => void; 
}

const RolePageNavbar: React.FC<RolePageNavbarProps> = ({ switchToComponent, isAdmin }) => {
    const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="sm:flex sm:space-x-4 nav-links hidden">
        <button onClick={() => switchToComponent('addExercise')}>Add Exercise</button>
        <button onClick={() => switchToComponent('addWorkout')}>Add Workout</button>
        <button onClick={() => switchToComponent('addProgram')}>Add Program</button>
        {isAdmin && (
  <>
    <button onClick={() => switchToComponent('manageApplications')}>Manage Applications</button>
    <button onClick={() => switchToComponent('manageUsers')}>Manage Users</button>
  </>
)}

      </div>
    </div>
  );
};

export default RolePageNavbar;

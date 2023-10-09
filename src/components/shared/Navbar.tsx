import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

function Navbar({ setActiveComponent }: { setActiveComponent: (component: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const switchToComponent = (component: string) => {
    setActiveComponent(component);
    // Close the menu on mobile after clicking a link
    setMenuOpen(false);
  };

  return (
    <div className="bg-red-500 text-orange-300 p-4">
      {/* Hamburger Menu on Mobile */}
      <div className="block sm:hidden">
        <HamburgerMenu isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* Navigation Links */}
      <div className={`${
        menuOpen ? 'block' : 'hidden'
      } sm:block sm:flex sm:space-x-4 nav-links`}>
        <div className="user-indicator">User: John Doe</div>
        <button onClick={() => switchToComponent('contributors')}>Contributors Area</button>
        <button onClick={() => switchToComponent('goals-dashboard')}>Goals Dashboard</button>
        <button onClick={() => switchToComponent('goals-details')}>Goals Details</button>
        <button onClick={() => switchToComponent('programs')}>Programs</button>
        <button onClick={() => switchToComponent('workouts')}>Workouts</button>
        <button onClick={() => switchToComponent('exercises')}>Exercises</button>
        <button onClick={() => switchToComponent('user-details')}>User details</button>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

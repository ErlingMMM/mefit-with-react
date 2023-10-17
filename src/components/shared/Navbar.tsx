import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import keycloak from "../../Keycloak";
import { setActiveComponent } from '../../Redux/NavigationSlice';
import { useDispatch } from 'react-redux';


function Navbar() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchToComponent = (component: string) => {
    dispatch(setActiveComponent(component));
    // Close the menu on mobile after clicking a link
    setMenuOpen(false);
  };

  return (
    <div>
     {/* Hamburger Menu on Mobile */}
     <div className="block sm:hidden relative">
        <HamburgerMenu isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
        <h1 className="font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          MeFit
        </h1>
      </div>

      {/* Navigation Links */}
      <div className={`${
        menuOpen ? 'block' : 'hidden'
      } sm:block sm:flex sm:space-x-4 nav-links`}>
        <div className="user-indicator">User: John Doe</div>
        <button onClick={() => switchToComponent('dashboard')}>Dashboard</button>
        <button onClick={() => switchToComponent('profile')}>Profile</button>
        <button onClick={() => switchToComponent('explorer')}>Explorer</button>
        {keycloak.authenticated && (
            <button onClick={() => keycloak.logout()}>Logout</button>
          )}
      </div>
    </div>
  );
}

export default Navbar;

import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import keycloak from "../../../Keycloak";
import { setActiveComponent } from '../../../Redux/NavigationSlice';
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
        <HamburgerMenu isOpen={menuOpen} switchToComponent={switchToComponent}  toggleMenu={() => setMenuOpen(!menuOpen)} />
        {menuOpen ? null : (
          <h1
            className="font-bold text-lg italic text-center absolute top-0 left-1/2 transform -translate-x-1/2"
          >
            MeFit
          </h1>
          )}
      </div>

      {/* Navigation Links (hidden on mobile, visible on small screens and larger) */}
      <div className="sm:flex sm:space-x-4 nav-links hidden">
        <div>User: John Doe</div>
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

import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import keycloak from "../../../Keycloak";
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const isAdmin = keycloak.hasRealmRole('admin');
 const isContributor = keycloak.hasRealmRole('contributor');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const switchToComponent = (component: string) => {
    dispatch(setActiveComponent(component));
    // Close the menu on mobile after clicking a link
    setMenuOpen(false);
  };

  const OnclickAdminContributor = () => {
    console.log("hei")
    navigate('/rolepage')
    
  }

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
        <div>User: {keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
        <button onClick={() => switchToComponent('dashboard')}>Dashboard</button>
        <button onClick={() => switchToComponent('profile')}>Profile</button>
        <button onClick={() => switchToComponent('explorer')}>Explorer</button>

        {(isAdmin || isContributor) && ( 
          <button onClick={OnclickAdminContributor}>admin/contriutor area</button>
        )}
        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;

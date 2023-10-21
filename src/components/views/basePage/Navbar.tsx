import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import keycloak from "../../../Keycloak";
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './NavigationLinks'; 

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  const isAdmin = keycloak.hasRealmRole('admin');
  const isContributor = keycloak.hasRealmRole('contributor');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const switchToComponent = (component: string) => {
    dispatch(setActiveComponent(component));
    setMenuOpen(false); // Close the menu on mobile after clicking a link
  };

  const onclickAdminContributor = () => {
    navigate('/rolepage');
  }

  return (
    <div>
      {/* Hamburger Menu on Mobile */}
      <div className="block sm:hidden relative">
        <HamburgerMenu isOpen={menuOpen} switchToComponent={switchToComponent} toggleMenu={() => setMenuOpen(!menuOpen)} />
        {menuOpen ? null : (
          <h1 className="font-bold text-lg italic text-center absolute top-0 left-1/2 transform -translate-x-1/2">
            MeFit
          </h1>
        )}
      </div>

      
        <NavigationLinks
          switchToComponent={switchToComponent}
          isAdmin={isAdmin}
          isContributor={isContributor}
          onclickAdminContributor={onclickAdminContributor}
        />
      
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';


import Profile from '../profile/Profile'; 
import Contributors from '../contributors/Contributors'; 

function Navbar() {
  const [activeComponent, setActiveComponent] = useState('dashboard');



  const switchToProfile = () => {
    setActiveComponent('profile');
  };

  const switchToContributors = () => {
    setActiveComponent('contributors');
  };

  const renderComponent = () => {
    switch (activeComponent) {
     
      case 'profile':
        return <Profile />;
      case 'contributors':
        return <Contributors />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="user-indicator">User: John Doe</div>
        <div className="nav-links">
          
          <button onClick={switchToProfile}>Profile</button>
          <button onClick={switchToContributors}>Contributors Area</button>
        </div>
        <div className="logout-button">
          <button>Logout</button>
        </div>
      </div>
      <div className="content">{renderComponent()}</div>
    </div>
  );
}

export default Navbar;

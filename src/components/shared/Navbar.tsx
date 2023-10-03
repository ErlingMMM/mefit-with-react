import React, { useState } from 'react';


import Profile from '../profile/Profile'; 
import Contributors from '../contributors/Contributors'; 
import GoalsDashboard from '../goals/GoalsDashboard';

function Navbar() {
  const [activeComponent, setActiveComponent] = useState('goals-dashboard');



  const switchToProfile = () => {
    setActiveComponent('profile');
  };

  const switchToContributors = () => {
    setActiveComponent('contributors');
  };

  const switchToGoalsDashboard = () => {
    setActiveComponent('goals-dashboard');
  };

  const renderComponent = () => {
    switch (activeComponent) {
     
      case 'profile':
        return <Profile />;
      case 'contributors':
        return <Contributors />;
        case 'goals-dashboard':
            return <GoalsDashboard />;
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
          <button onClick={switchToGoalsDashboard}>Goals Dashboard</button>
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

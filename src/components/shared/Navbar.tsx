
function Navbar({ setActiveComponent }: { setActiveComponent: (component: string) => void }) {


  const switchToProfile = () => {
    setActiveComponent('profile');
  };

  const switchToContributors = () => {
    setActiveComponent('contributors');
  };

  const switchToGoalsDashboard = () => {
    setActiveComponent('goals-dashboard');
  };

  const switchToGoalsDetails = () => {
    setActiveComponent('goals-details');
  };

  return (
    <div>
      <div className="bg-red-500 text-orange-300 p-4">
        <div className="user-indicator">User: John Doe</div>
        <div className="nav-links">
          <button onClick={switchToProfile}>Profile</button>
          <button onClick={switchToContributors}>Contributors Area</button>
          <button onClick={switchToGoalsDashboard}>Goals Dashboard</button>
          <button onClick={switchToGoalsDetails}>Goals Details</button>
        </div>
        <div className="logout-button">
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

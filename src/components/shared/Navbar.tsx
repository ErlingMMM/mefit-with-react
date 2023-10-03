function Navbar({ setActiveComponent }: { setActiveComponent: (component: string) => void }) {
  
  const switchToComponent = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="bg-red-500 text-orange-300 p-4">
        <div className="user-indicator">User: John Doe</div>
        <div className="nav-links">
          <button onClick={() => switchToComponent('profile')}>Profile</button>
          <button onClick={() => switchToComponent('contributors')}>Contributors Area</button>
          <button onClick={() => switchToComponent('goals-dashboard')}>Goals Dashboard</button>
          <button onClick={() => switchToComponent('goals-details')}>Goals Details</button>
        </div>
        <div className="logout-button">
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

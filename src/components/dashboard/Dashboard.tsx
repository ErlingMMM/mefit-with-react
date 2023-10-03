import { useState } from 'react';
import Navbar from '../shared/Navbar';
import Profile from '../profile/Profile';
import Contributors from '../contributors/Contributors';
import GoalsDashboard from '../goals/GoalsDashboard';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('goals');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile />;
      case 'contributors':
        return <Contributors />;
      case 'goals':
        return <GoalsDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>My Dashboard</div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="bg-green-500 text-yellow-300 p-4">{renderComponent()}</div>
    </>
  );
}

export default Dashboard;

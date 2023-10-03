import { useState } from 'react';
import Navbar from '../shared/Navbar';
import Contributors from '../views/contributors/Contributors';
import GoalsDashboard from '../views/goalsDashboard/GoalsDashboard';
import GoalsDetailView from '../views/goalsDetails/GoalsDetails';
import Programs from '../views/programs/Programs';  
import Workouts from '../views/workouts/Workouts';
import Exercises from '../views/exercises/Exercises';
import UserDetails from '../views/userDetails/UserDetails';

function MainView() {
  const [activeComponent, setActiveComponent] = useState('goals-dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'contributors':
        return <Contributors />;
      case 'goals-dashboard':
        return <GoalsDashboard />;
        case 'goals-details':
        return <GoalsDetailView/>;
        case 'programs':
        return <Programs/>;
        case 'workouts':
        return <Workouts/>;
        case 'exercises':
        return <Exercises/>;
        case 'user-details':
        return <UserDetails/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div>Main view</div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="bg-green-500 text-yellow-300 p-4">{renderComponent()}</div>
    </>
  );
}

export default MainView;

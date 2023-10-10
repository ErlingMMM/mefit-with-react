
import Programs from '../views/programs/Programs';  
import Workouts from '../views/workouts/Workouts';
import Exercises from '../views/exercises/Exercises';
import Dashboard from '../views/dashboard/GoalsDashboard';
import Profile from '../views/profile/Profile';

function ContentView({ activeComponent }: { activeComponent: string }) {
  switch (activeComponent) {
   
    case 'dashboard':
      return <Dashboard />;
    case 'profile':
        return <Profile />;
    case 'programs':
      return <Programs />;
    case 'workouts':
      return <Workouts />;
    case 'exercises':
      return <Exercises />;
 
    default:
      return null;
  }
}

export default ContentView;


import Programs from '../programs/Programs';  
import Workouts from '../workouts/Workouts';
import Exercises from '../exercises/Exercises';
import Dashboard from './Dashboard';
import Profile from '../profile/Profile';

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

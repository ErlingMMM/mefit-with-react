import Workouts from '../workouts/Workouts';
import Explorer from '../explorer/Explorer';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import WorkoutsInProgram from '../explorer/WorkoutsInProgram';

function ContentView({ activeComponent = 'dashboard' }: { activeComponent?: string }) {
  switch (activeComponent) {
    case 'dashboard':
      return <Dashboard />;
    case 'profile':
      return <Profile />;
    case 'workouts':
      return <Workouts />;
    case 'explorer':
      return <Explorer />;
      case 'workoutsInProgram':
      return <WorkoutsInProgram />;
    default:
      return null;
  }
}

export default ContentView;

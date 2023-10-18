import Explorer from '../explorer/explore/Explorer';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import WorkoutsInProgram from '../listsFiltered/WorkoutsInProgram';
import ExercisesInWorkouts from '../listsFiltered/ExercisesInWorkouts';


function ContentView({ activeComponent = 'dashboard' }: { activeComponent?: string }) {
  switch (activeComponent) {
    case 'dashboard':
      return <Dashboard />;
    case 'profile':
      return <Profile />;
    case 'explorer':
      return <Explorer />;
      case 'workoutsInProgram':
      return <WorkoutsInProgram />;
      case 'exercisesInWorkouts':
        return <ExercisesInWorkouts />;
    default:
      return null;
  }
}

export default ContentView;

import Explorer from '../explorer/explore/Explorer';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import WorkoutsInProgram from '../../lists/listsFiltered/WorkoutsInProgram';
import ExercisesInWorkouts from '../../lists/listsFiltered/ExercisesInWorkouts';
import ExercisesDisplayerDashboard from '../dashboard/ExercisesDisplayerDashboard';


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
    case 'exercisesInDashboard' :
      return <ExercisesDisplayerDashboard/>;
    default:
      return null;
  }
}

export default ContentView;

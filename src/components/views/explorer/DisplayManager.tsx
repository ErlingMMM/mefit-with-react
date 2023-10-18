import Exercises from './lists/Exercises';
import Programs from './lists/Programs';
import Workouts from './lists/Workouts';

function DisplayManager({ activeComponent, searchQuery }: { activeComponent: string; searchQuery: string; }) {
  switch (activeComponent) {
    case 'exercises':
      return <Exercises searchQuery={searchQuery}  />;
    case 'programs':
      return <Programs searchQuery={searchQuery}  />;
      case 'workouts':
      return <Workouts searchQuery={searchQuery}  />;
    default:
      return null;
  }
}

export default DisplayManager;

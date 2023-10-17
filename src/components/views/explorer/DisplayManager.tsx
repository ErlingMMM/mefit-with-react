import Exercises from './Exercises';
import Programs from './Programs';
import Workouts from './Workouts';

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

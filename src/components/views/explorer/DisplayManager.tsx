import Exercises from './content/Exercises';
import Programs from './content/Programs';
import Workouts from './content/Workouts';

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

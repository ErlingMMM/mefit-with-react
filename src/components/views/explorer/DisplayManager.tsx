import Exercises from './Exercises';
import Workouts from './Workouts';

function DisplayManager({ activeComponent, searchQuery }: { activeComponent: string; searchQuery: string; }) {
  switch (activeComponent) {
    case 'exercises':
      return <Exercises searchQuery={searchQuery}  />;
    case 'workouts':
      return <Workouts searchQuery={searchQuery}  />;
    default:
      return null;
  }
}

export default DisplayManager;

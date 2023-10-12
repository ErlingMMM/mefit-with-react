import Exercises from './Exercises';
import Workouts from './Workouts';

function DisplayManager({ activeComponent, searchQuery, isLoading }: { activeComponent: string; searchQuery: string; isLoading: boolean }) {
  switch (activeComponent) {
    case 'exercises':
      return <Exercises searchQuery={searchQuery} isLoading={isLoading} />;
    case 'workouts':
      return <Workouts searchQuery={searchQuery} isLoading={isLoading} />;
    default:
      return null;
  }
}

export default DisplayManager;

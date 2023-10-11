
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

//This file doesn't really have anything to do with the dashboard itself! It is a component made to display the active component in the basepage,
//Which could be Dashboard, Profile, Programs etc... Look to move the file from /dasboard to a new folder called /Navigation or something.

import Programs from '../programs/Programs';  
import Explorer from '../explorer/Explorer';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';

function ContentView({ activeComponent }: { activeComponent: string }) {
  switch (activeComponent) {
    case 'dashboard':
      return <Dashboard />;
    case 'profile':
      return <Profile />;
    case 'programs':
      return <Programs />;
    case 'explorer':
      return <Explorer />;
     default:
      return null;
  }
}

export default ContentView;


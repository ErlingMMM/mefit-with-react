import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/dashboard/ContentView';

function MainView() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <>
      <div>Main view</div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="bg-green-500 text-yellow-300 p-4">
        <ContentView activeComponent={activeComponent} />
      </div>
    </>
  );
}

export default MainView;
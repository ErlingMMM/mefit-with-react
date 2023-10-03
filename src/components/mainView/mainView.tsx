import { useState } from 'react';
import Navbar from '../shared/Navbar';
import ContentView from './ContentView';

function MainView() {
  const [activeComponent, setActiveComponent] = useState('goals-dashboard');

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

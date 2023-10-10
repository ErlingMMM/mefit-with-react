import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/dashboard/ContentView';

function Index() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="bg-green-500 text-yellow-300 p-4">
        <ContentView activeComponent={activeComponent} />
      </div>
    </>
  );
}

export default Index;
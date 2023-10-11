import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/basePage/ContentView';

function Basepage() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="bg-green-500 text-yellow-300">
        <ContentView activeComponent={activeComponent} />
      </div>
    </>
  );
}

export default Basepage;
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/basePage/ContentView';

function Basepage() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <>
      <Navbar setActiveComponent={setActiveComponent} />
      <h1 className="font-bold">MeFit</h1>
        <ContentView activeComponent={activeComponent} />
      </>
  );
}

export default Basepage;
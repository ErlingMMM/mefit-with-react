import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/basePage/ContentView';

function Basepage() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <>
    <div className='overflow-x-hidden	'>
    <Navbar setActiveComponent={setActiveComponent} />
        <ContentView activeComponent={activeComponent} />
    </div>
   
      </>
  );
}

export default Basepage;
import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/basePage/ContentView';
import authGuard from '../AuthGuard/authGuard';

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

export default authGuard(Basepage)
import { useState } from 'react';
import DisplayManager from './DisplayManager';


function Explorer() {
    const [activeComponent, setActiveComponent] = useState('exercises');

    const switchToComponent = (component: string) => {
        setActiveComponent(component);
      };

  return (
    <>
     <button onClick={() => switchToComponent('exercises')}>exercises</button>
    <button onClick={() => switchToComponent('workouts')}>workouts</button>
     <DisplayManager activeComponent={activeComponent} />
    </>
   )
}

export default Explorer
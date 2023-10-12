import { useState } from 'react';
import DisplayManager from './DisplayManager';
import SearchBar from './SearchBar';


function Explorer() {
    const [activeComponent, setActiveComponent] = useState('exercises');
    const [searchQuery, setSearchQuery] = useState('');

    const switchToComponent = (component: string) => {
        setActiveComponent(component);
      };

      const isWorkoutsView = activeComponent === 'workouts';
  const placeholder = isWorkoutsView ? 'Search workouts' : 'Search exercises';

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={placeholder} />
     <button onClick={() => switchToComponent('exercises')}>exercises</button>
    <button onClick={() => switchToComponent('workouts')}>workouts</button>
     <DisplayManager activeComponent={activeComponent} />
    </>
   )
}

export default Explorer
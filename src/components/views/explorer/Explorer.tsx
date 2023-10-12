import { useState, useEffect } from 'react';
import DisplayManager from './DisplayManager';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo, getWorkoutInfo } from '../../../Redux/GenericSlice';

function Explorer() {
  const [activeComponent, setActiveComponent] = useState('exercises');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getExcersiceInfo());
        await dispatch(getWorkoutInfo());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

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
      <DisplayManager activeComponent={activeComponent} searchQuery={searchQuery} isLoading={isLoading} />
    </>
  );
}

export default Explorer;

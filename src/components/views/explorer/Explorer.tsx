import { useState, useEffect } from 'react';
import DisplayManager from './DisplayManager';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo, getProgramInfo, getWorkoutInfo } from '../../../Redux/GenericSlice';
import loadingGif from '../../../assets/loading.gif';

function Explorer() {
  const [activeComponent, setActiveComponent] = useState('programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getExcersiceInfo());
        await dispatch(getProgramInfo());
        await dispatch(getWorkoutInfo());
        // Simulate a minimum loading time of a second
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [dispatch]);

  const switchToComponent = (component: string) => {
    setActiveComponent(component);
  };

  const isProgramsView = activeComponent === 'programs';
  const isExercisesView = activeComponent === 'exercises';
  const placeholder = isProgramsView
    ? 'Search programs'
    : isExercisesView
    ? 'Search exercises'
    : 'Search workouts';
  

  return (
    <>
      <br />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={placeholder} />
      <br />
      <button onClick={() => switchToComponent('programs')}>programs</button>
      <button onClick={() => switchToComponent('exercises')}>exercises</button>
      <button onClick={() => switchToComponent('workouts')}>workouts</button>

      {isLoading ? (
        <div>
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <DisplayManager activeComponent={activeComponent} searchQuery={searchQuery} />
      )}
    </>
  );
}

export default Explorer;

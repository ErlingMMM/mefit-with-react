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
      <div className="flex justify-between w-full space-x-1">
        <button
          onClick={() => switchToComponent('programs')}
          className="flex-1 pl-10 pr-4  py-2 text-lg  rounded-md"
        >
          programs
        </button>
        <button
          onClick={() => switchToComponent('exercises')}
          className="flex-1 px-4 py-2 text-lg rounded-md"
        >
          exercises
        </button>
        <button
          onClick={() => switchToComponent('workouts')}
          className="flex-1 pr-10 pl-4 py-2 text-lg rounded-md"
        >
          workouts
        </button>
      </div>

      <div className="border-b border-gray-400 my-4"></div>


      {isLoading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-image" />
        </div>
      ) : (
        <DisplayManager activeComponent={activeComponent} searchQuery={searchQuery} />
      )}
    </>
  );
}

export default Explorer;

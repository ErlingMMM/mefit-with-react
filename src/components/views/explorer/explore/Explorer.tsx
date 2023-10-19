import { useState, useEffect } from 'react';
import ExploreManager from '../ExploreManager';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../Redux/Store';
import { getExcersiceInfo, getProgramInfo, getWorkoutInfo } from '../../../../Redux/GenericSlice';
import loadingGif from '../../../../assets/loading.gif';
import SortButton from './SortButton';
import { setSelectedSearchOption } from '../../../../Redux/GenericSlice';
import { setSelectedSortOption } from '../../../../Redux/GenericSlice';


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
    dispatch(setSelectedSearchOption("name"));
    dispatch(setSelectedSortOption("most recent"));
  };

  const isProgramsView = activeComponent === 'programs';
  const isExercisesView = activeComponent === 'exercises';
  const placeholder = isProgramsView
    ? 'Search programs'
    : isExercisesView
      ? 'Search exercises'
      : 'Search workouts';

      const availableSearchOptions = {
        exercises: ["name", "muscleGroup", "difficulty"],
        programs: ["name", "description", "programDifficulty"],
        workouts: ["name", "recommendedFitness", "description"],
      };

  return (
    <>
      <br />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={placeholder} availableSearchOptions={availableSearchOptions[activeComponent as keyof typeof availableSearchOptions]} />
      <br />
      <div className="flex justify-between w-full space-x-1">
        <button
          onClick={() => switchToComponent('programs')}
          className="flex-1 pl-10 pr-4  pt-2 text-base"
        >
          programs
        </button>
        <button
          onClick={() => switchToComponent('exercises')}
          className="flex-1 px-4 pt-2 text-base"
        >
          exercises
        </button>
        <button
          onClick={() => switchToComponent('workouts')}
          className="flex-1 pr-10 pl-4 pt-2 text-base"
        >
          workouts
        </button>
      </div>

      {/*Line under buttons*/}
      <div className="flex mb-5 mt-2">
        <div className={`w-1/3 h-1 ${activeComponent === 'programs' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
        <div className={`w-1/3 h-1 ${activeComponent === 'exercises' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
        <div className={`w-1/3 h-1 ${activeComponent === 'workouts' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
      </div>

      <div className='text-right sm:text-left mb-3 space-x-2 ml-12 sm:ml-32'>
      <SortButton />
      </div>
        
      {isLoading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-image" />
        </div>
      ) : (
        <ExploreManager activeComponent={activeComponent} searchQuery={searchQuery} />
      )}
    </>
  );
}

export default Explorer;
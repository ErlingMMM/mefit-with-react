import { useState, useEffect } from 'react';
import DisplayManager from './DisplayManager';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo, getProgramInfo, getWorkoutInfo } from '../../../Redux/GenericSlice';
import loadingGif from '../../../assets/loading.gif';
import Bars3BottomLeftIconSVG from '../../../SVG/Bars3BottomLeftIcon';


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

  const handleClick = () => {
    console.log("Hello, World!");
  };

  return (
    <>
      <br />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={placeholder} />
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
        <div className={`w-1/3 h-0.5 ${activeComponent === 'programs' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
        <div className={`w-1/3 h-0.5 ${activeComponent === 'exercises' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
        <div className={`w-1/3 h-0.5 ${activeComponent === 'workouts' ? 'bg-green-300' : 'bg-gray-400'}`}></div>
      </div>

      <button onClick={handleClick} className="flex items-center space-x-2 ml-9 mb-3 text-gray-400">
      <div dangerouslySetInnerHTML={{ __html: Bars3BottomLeftIconSVG }}/>
      <span className=' mb-1'>A-Z</span>
    </button>


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

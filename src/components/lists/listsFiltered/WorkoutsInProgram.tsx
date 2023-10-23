import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ExerciseList from '../../lists/ExerciseList';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import DurationUtils from '../../utils/DurationUtils';
import DifficultyUtils from '../../utils/DifficultyUtils';
import { truncateDescription } from '../../utils/TruncateTextUtils';




interface Workout {
  id: number;
  name: string;
  image: string;
  description: string;
  difficulty: number;
  duration: number;
}

function WorkoutsInProgram() {
  const selectedProgramId = useSelector((state: any) => state.selectedProgramId);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(0);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);




  useEffect(() => {
    const fetchData = async () => {
      if (selectedProgramId) {
        try {
          // Fetch workouts
          const workoutsResponse = await fetch(
            `https://mefit-backend.azurewebsites.net/api/Plan/GetWorkouts/${parseInt(selectedProgramId)}`
          );

          if (workoutsResponse.ok) {
            const workoutsData = await workoutsResponse.json();
            setWorkouts(workoutsData);
          } else {
            console.error('Error fetching workouts data');
          }

        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();
  }, [selectedProgramId]);


  useEffect(() => {
    const fetchData = async () => {

      try {
        // Fetch exercises
        const exercisesResponse = await fetch(
          `https://mefit-backend.azurewebsites.net/api/Workouts/${workouts[activeWorkout].id.toString()}/exercises`
        );

        if (exercisesResponse.ok) {
          const exercisesData = await exercisesResponse.json();
          setExercises(exercisesData);
        } else {
          console.error('Error fetching exercises data');
        }

      } catch (error) {
        console.error('Error:', error);
      }

    };

    fetchData();
  }, [activeWorkout, workouts]);





  const workoutsPerPage = 3;
  const totalWorkouts = workouts.length;
  const lastPage = Math.ceil(totalWorkouts / workoutsPerPage);



  const handleActiveWorkout = (workout: number) => {
    setActiveWorkout(workout);
    setActiveLine(workout % workoutsPerPage);
  };

  const handleNextNavigation = () => {
    const newCurrentWorkoutIndex = currentWorkoutIndex + workoutsPerPage;
    if (newCurrentWorkoutIndex < totalWorkouts) {
      setActive(newCurrentWorkoutIndex)
    }
  };

  const handlePreviousNavigation = () => {
    const newCurrentWorkoutIndex = currentWorkoutIndex - workoutsPerPage;
    if (newCurrentWorkoutIndex >= 0) {
      setActive(newCurrentWorkoutIndex)
    }
  };


  const setActive = (index: number) => {
    setCurrentWorkoutIndex(index);
    setActiveWorkout(index);
    setActiveLine(0);
  }



  return (
    <div>
      <br />
      {workouts[activeWorkout] ? (
        <div className="relative">
          <img
            className="h-44 md:h-52 md:rounded-md w-screen max-w-screen-md mx-auto object-cover object-center overflow-hidden"
            src={(workouts[activeWorkout] as { image: string } || {}).image || ''}
            alt="WorkoutImage"
          />
          <div className="absolute bottom-0 right-0 p-2 md:mr-64  text-white z-10">
            <span className="px-2 py-1">Duration: {workouts[activeWorkout].duration ? DurationUtils.formatDuration(workouts[activeWorkout].duration) : ''}
            </span>
          </div>
          <div className="absolute left-0 p-2 bottom-0.5 md:ml-64  text-white z-10">
            <span className="px-2"> {workouts[activeWorkout].difficulty ? DifficultyUtils.difficultyToLabel(workouts[activeWorkout].difficulty) : ''}
            </span>
          </div>
        </div>
      ) : null}
  
      <div className='mx-11 sm:mx-0 my-5'>
        <div className='font-bold text-lg sm:justify-center sm:flex sm:pb-5'>
          {workouts[activeWorkout] ? workouts[activeWorkout].name : 'Loading...'}
        </div>
  
        <div className='sm:justify-center sm:flex max-w-screen-md mx-auto'>
          <div className={showFullDescription ? ' h-full' : 'h-24 sm:h-12'}>
            {showFullDescription
              ? workouts[activeWorkout]?.description || ''
              : truncateDescription(workouts[activeWorkout]?.description || '', 150)}
          </div>
        </div>
  
        {workouts[activeWorkout]?.description?.length > 150 ? (
          <div className="text-center text-xs mt-1">
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-500 cursor-pointer"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ) : (
          <div className="text-center text-xs mt-1">
            <button className="text-white cursor-none">
              {/* To prevent taking up less space in the view. display-hidden did not help */}
              Show More
            </button>
          </div>
        )}
      </div>
  
      <div className="flex justify-center">
        <button onClick={handlePreviousNavigation} className="mr-4">
          <ChevronLeftIcon
            className={`h-6 w-6 hover:brightness-110 ${currentWorkoutIndex / workoutsPerPage + 1 > 1
              ? "text-custom-green"
              : "text-gray-400 cursor-not-allowed"}`}
          />
        </button>
        <p>Page {currentWorkoutIndex / workoutsPerPage + 1}</p>
        <button onClick={handleNextNavigation} className="ml-4">
          <ChevronRightIcon
            className={`h-6 w-6 hover:brightness-110 ${currentWorkoutIndex / workoutsPerPage + 1 < lastPage
              ? "text-custom-green"
              : "text-gray-400 cursor-not-allowed"}`}
          />
        </button>
      </div>
  
      <div className="flex mb-5 mt-5 justify-center">
        {Array.from({ length: workoutsPerPage }).map((_, index) => {
          const workoutIndex = currentWorkoutIndex + index;
          const isButtonVisible = workoutIndex < totalWorkouts;
          const lineClass = `w-${1 / workoutsPerPage} h-1 sm:h-[0.11rem] ${activeLine === index ? 'bg-custom-green' : 'bg-gray-400'}`;
  
          return (
            <div key={index} className={lineClass}>
              {isButtonVisible && (
                <button
                  onClick={() => handleActiveWorkout(workoutIndex)}
                  className={`flex-1 pl-10 md-pl-0 hover:text-custom-green pr-6 pt-2 text-base ${isButtonVisible ? '' : 'hidden'}`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isButtonVisible ? workouts[workoutIndex]?.name || '' : ''}
                </button>
              )}
            </div>
          );
        })}
      </div>
  
      <br />
      <br />
  
      <ExerciseList exercises={exercises} content={"program"} />
    </div>
  );  
}

export default WorkoutsInProgram;
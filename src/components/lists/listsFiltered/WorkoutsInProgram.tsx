import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ExerciseList from '../../lists/ExerciseList';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';



interface Workout {
  id: number;
  name: string;
  image: string;
  description: string;
}

function WorkoutsInProgram() {
  const selectedProgramId = useSelector((state: any) => state.selectedProgramId);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(0);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [activeLine, setActiveLine] = useState(0);




  const products = useMemo(() => [
    {
      id: 1,
      name: 'Product A',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1545575439-3261931f52f1?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'An affordable item priced at $19.99, ideal for everyday use.An affordable item priced at $19.99, ideal for everyday use.',
    },
    {
      id: 2,
      name: 'Product B',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'A quality product priced at $29.99, perfect for various occasions.',
    },
    {
      id: 3,
      name: 'Product C',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'A stylish item priced at $39.99, suitable for fashion enthusiasts.An affordable item priced at $19.99, ideal for everyday use.An affordable item priced at $19.99, ideal for everyday useAn affordable item priced at $19.99, ideal for everyday use.An affordable item priced at $19.99, ideal for everyday use',
    },
    {
      id: 4,
      name: 'Product D',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1690230677207-126e472f37dc?auto=format&fit=crop&q=80&w=1975&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'A premium item priced at $49.99, great for luxury experiences.',
    },
    {
      id: 5,
      name: 'Product E',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'A versatile product priced at $59.99, adaptable for many uses.',
    },
    {
      id: 6,
      name: 'Product F',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1690373403498-a29da916ecf9?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'An elegant choice at $69.99, suitable for special events.',
    },
    {
      id: 7,
      name: 'Product G',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'A high-end item priced at $79.99, excellent for discerning tastes.',
    },
    {
      id: 8,
      name: 'Product H',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto.format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Another $79.99 option, offering style and quality.',
    },
    {
      id: 9,
      name: 'Product I',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto.format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Product H - An alternative choice at $79.99, balancing price and features.',
    },
    {
      id: 10,
      name: 'Product J',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto.format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Product H - An additional variation at $79.99, providing more options.',
    },
    {
      id: 11,
      name: 'Product K',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto.format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Product H - Yet another choice at $79.99, expanding your selection.',
    },
  ], []);


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
          `https://mefit-backend.azurewebsites.net/api/Workouts/${products[activeWorkout].id.toString()}/exercises`
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
  }, [activeWorkout, products]);





  const workoutsPerPage = 3;
  const totalWorkouts = products.length;


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
      <img
        className="h-44 md:h-52 md:rounded-md w-screen max-w-screen-md mx-auto object-cover object-center overflow-hidden"
        src={(workouts[activeWorkout] as { image: string } || {}).image || ''}
        alt="WorkoutImage"
      />



      {/*
      <div>{workouts[activeWorkout].name}</div>
      <div>{workouts[activeWorkout].description}</div>
*/}
      <div className='mx-11 sm:mx-0 my-5'>
        <div className='font-bold text-lg sm:justify-center sm:flex '>{products[activeWorkout].name}</div>
        <div className='sm:justify-center sm:flex max-w-screen-md mx-auto'>
          <div className='sm:max-h-12 sm:h-12 max-h-12 h-12 overflow-y-hidden'>{products[activeWorkout].description}</div>
        </div>
      </div>



      {/* <img
        className="h-44 w-screen"
        src={(products[activeWorkout] as { image: string } || {}).image || ''}
        alt="WorkoutImage"
      />*/}

      <div className="flex justify-center">
        <button onClick={handlePreviousNavigation} className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <p>Page {currentWorkoutIndex / workoutsPerPage + 1}</p>
        <button onClick={handleNextNavigation} className="ml-4">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>


      <div className="flex mb-5 mt-5 justify-center">
        {Array.from({ length: workoutsPerPage }).map((_, index) => {
          const workoutIndex = currentWorkoutIndex + index;
          const isButtonVisible = workoutIndex < totalWorkouts;

          const lineClass = `w-${1 / workoutsPerPage} h-1 ${activeLine === index ? 'bg-custom-green' : 'bg-gray-400'}`;


          return (
            <div key={index} className={lineClass}>
              {isButtonVisible && (
                <button
                  onClick={() => handleActiveWorkout(workoutIndex)}
                  className={`flex-1 pl-10 md-pl-0  pr-6 pt-2 text-base ${isButtonVisible ? '' : 'hidden'
                    }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}

                >
                  {isButtonVisible ? products[workoutIndex].name : ''}

                </button>
              )}
            </div>
          );
        })}
      </div>


      <br />
      <br />

      <ExerciseList exercises={exercises} content={"explorer"} />
    </div>
  );
}

export default WorkoutsInProgram;
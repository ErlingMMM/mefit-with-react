import React, { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';
import WorkoutsInProgramList from './WorkoutsInProgramList';

function WorkoutsInProgram() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedProgramId = useSelector((state: any) => state.selectedProgramId);
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(0);
  const [activeWorkoutList, setActiveWorkoutList] = useState(0);
  const [activeLine, setActiveLine] = useState(0);

  const openModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

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

  const products = [
    {
      id: 1,
      name: 'Product A',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1545575439-3261931f52f1?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Product B',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Product C',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      name: 'Product D',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1690230677207-126e472f37dc?auto=format&fit=crop&q=80&w=1975&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      name: 'Product E',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      name: 'Product F',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1690373403498-a29da916ecf9?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 7,
      name: 'Product G',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

    {
      id: 8,
      name: 'Product H',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1693892014158-fdab425b0e1e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

  ];




  const workoutsPerPage = 3;

  const totalWorkouts = products.length;


  /*const handleActiveWorkout = (chosen: number) => {
    const newActiveWorkout = activeWorkout + chosen;
    setActiveLine(chosen);

    if (newActiveWorkout < totalProducts) {
      setActiveWorkout(newActiveWorkout);
    }
  };*/


  const handleActiveWorkout = (workout: number) => {
    setActiveWorkout(workout);
    setActiveLine(0); 
  };

  const handleActiveWorkoutList = () => {
    const newActiveWorkoutList = activeWorkoutList + workoutsPerPage;
    if (newActiveWorkoutList < totalWorkouts) {
      setActiveWorkoutList(newActiveWorkoutList);
      setActiveWorkout(newActiveWorkoutList);
      setActiveLine(0);
    }
  };


 



  return (
    <div>
      <br />
      <img
        className="h-52 w-screen"
        src={(workouts[activeWorkout] as { image: string } || {}).image || ''}
        alt="WorkoutImage"
      />

      <img
        className="h-52 w-screen"
        src={(products[activeWorkout] as { image: string } || {}).image || ''}
        alt="WorkoutImage"
      />





<div className="flex mb-5 mt-2">
  {Array.from({ length: workoutsPerPage }).map((_, index) => {
    const workoutIndex = activeWorkoutList + index;
    const isButtonVisible = workoutIndex < totalWorkouts;

    const lineClass = `w-${1 / workoutsPerPage} h-1 ${
      activeLine === index ? 'bg-custom-green' : 'bg-gray-400'
    }`;

    return (
      <div key={index} className={lineClass}>
        {isButtonVisible && (
          <button
             onClick={() => handleActiveWorkout(workoutIndex)}
            className={`flex-1 pl-10 pr-6 pt-2 text-base ${
              isButtonVisible ? '' : 'hidden'
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


      <button onClick={() => handleActiveWorkoutList()}>Next</button>

      <WorkoutsInProgramList workouts={workouts} onWorkoutClick={openModal} />
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedWorkout} />
    </div>
  );
}

export default WorkoutsInProgram;
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
      image: 'URL-to-Product-G-Image',
    },
    {
      id: 8,
      name: 'Product H',
      price: 89.99,
      image: 'URL-to-Product-H-Image',
    },
    {
      id: 9,
      name: 'Product I',
      price: 99.99,
      image: 'URL-to-Product-I-Image',
    },
    {
      id: 10,
      name: 'Product J',
      price: 109.99,
      image: 'URL-to-Product-J-Image',
    },
  ];
  
  

    const handleActiveWorkout = (chosen: number) => {
      setActiveWorkout(chosen)
}

   const handleActiveWorkoutList = () => {
    if((activeWorkoutList + 3) < products.length  ) 
    setActiveWorkoutList(activeWorkoutList + 3)
  setActiveWorkout(activeWorkout+3)
       }


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

<button onClick={() => handleActiveWorkout(0)}>{products[activeWorkoutList].name}</button>
<button onClick={() => handleActiveWorkout(1)}>{products[activeWorkoutList + 1].name}</button>
<button onClick={() => handleActiveWorkout(2)}>{products[activeWorkoutList + 2].name}</button>

<button onClick={() => handleActiveWorkoutList()}>Next</button>

      <WorkoutsInProgramList workouts={workouts} onWorkoutClick={openModal} />
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedWorkout} />
    </div>
  );
}

export default WorkoutsInProgram;






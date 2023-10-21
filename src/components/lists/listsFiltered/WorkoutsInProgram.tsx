import React, { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';
import WorkoutsInProgramList from './WorkoutsInProgramList';

function WorkoutsInProgram() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedProgramId = useSelector((state: any) => state.selectedProgramId);
  const [workouts, setWorkouts] = useState([]);

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

  console.log(workouts.length);
  


  return (
    <div>
      <br />
      <img
  className="h-52 w-screen"
  src={(workouts[0] as { image: string } || {}).image || ''}
  alt="WorkoutImage"
/>

      <WorkoutsInProgramList workouts={workouts} onWorkoutClick={openModal} />
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedWorkout} />
    </div>
  );
}

export default WorkoutsInProgram;






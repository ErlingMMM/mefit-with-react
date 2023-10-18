import React, { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';
import WorkoutsInProgramList from './WorkoutsInProgramList';

function WorkoutsInProgram() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedWorkoutId = useSelector((state: any) => state.selectedWorkoutId);
  const [workouts, setWorkouts] = useState([]);
  

  const openModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (selectedWorkoutId) {
        try {
          const response = await fetch(
            `https://mefit-backend.azurewebsites.net/api/Workouts/${parseInt(selectedWorkoutId)}/exercises`
          );

          if (response.ok) {
            const data = await response.json();
            setWorkouts(data);
          } else {
            console.error('Error fetching data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchWorkouts();
  }, [selectedWorkoutId]);

  return (
    <div>
      <WorkoutsInProgramList workouts={workouts} onWorkoutClick={openModal} />
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedWorkout} />
    </div>
  );
}

export default WorkoutsInProgram;

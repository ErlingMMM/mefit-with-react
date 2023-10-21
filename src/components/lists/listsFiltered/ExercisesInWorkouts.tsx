import React, { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';
import ExerciseList from '../../lists/ExerciseList';

function ExercisesInWorkouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedWorkoutId = useSelector((state: any) => state.selectedWorkoutId);
  const [exercises, setExercises] = useState([]);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedWorkoutId) {
        try {
          const response = await fetch(
            `https://mefit-backend.azurewebsites.net/api/Workouts/${parseInt(selectedWorkoutId)}/exercises`
          );

          if (response.ok) {
            const data = await response.json();
            setExercises(data);
          } else {
            console.error('Error fetching data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchExercises();
  }, [selectedWorkoutId]);

  return (
    <div>
      <ExerciseList exercises={exercises} content={"explorer"} />
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedExercise} />
    </div>
  );
}

export default ExercisesInWorkouts;

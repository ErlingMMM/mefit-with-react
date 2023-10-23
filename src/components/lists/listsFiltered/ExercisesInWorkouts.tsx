import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExerciseList from '../../lists/ExerciseList';

function ExercisesInWorkouts() {
  const selectedWorkoutId = useSelector((state: any) => state.selectedWorkoutId);
  const [exercises, setExercises] = useState([]);


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
    </div>
  );
}

export default ExercisesInWorkouts;

import React, { useEffect, useState } from 'react';
import { getAllWorkouts } from '../../endpoints/getAllWorkouts_endpoint';
import { addWorkoutToPlan } from '../../endpoints/addWorkoutToPlan_endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';

function AddWorkoutsComponent() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutIdsList, setWorkoutIdsList] = useState<any[]>([]);
  const [daysList, setDaysList] = useState<number[]>([]);
  const navigate = useNavigate();

  const planId = useSelector((state: RootState) => state.data.programId.id);

  useEffect(() => {
    getAllWorkouts()
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleWorkout = (workoutId: any) => {
    const index = workoutIdsList.indexOf(workoutId);
    if (index === -1) {
      const day = prompt("Enter the day for the workout");
      if (day !== null && !isNaN(parseInt(day))) {
        setWorkoutIdsList([...workoutIdsList, workoutId]);
        setDaysList([...daysList, parseInt(day)]);
      }
    } else {
      const newWorkoutIdsList = [...workoutIdsList];
      const newDaysList = [...daysList];
      newWorkoutIdsList.splice(index, 1);
      newDaysList.splice(index, 1);
      setWorkoutIdsList(newWorkoutIdsList);
      setDaysList(newDaysList);
    }
  };

  const handleSaveButton = () => {
    addWorkoutToPlan(planId, workoutIdsList, daysList)
      .then(result => navigate('/rolepage'))
      .catch(error => console.error("Error adding workouts to plan:", error));
  };

  return (
    <div>
      <ul>
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout: any) => (
            <li
              key={workout.id}
              className={`mb-6 ${workoutIdsList.includes(workout.id) ? 'bg-yellow-300' : ''}`}
              onClick={() => toggleWorkout(workout.id)}
            >
              <div>
                <h3 className="text-lg font-bold" style={{ marginLeft: '-20px' }}>{workout.name}</h3>
                <p style={{ marginLeft: '-45px' }}>{workout.description}</p>
              </div>
            </li>
          ))
        ) : (
          <li>No matching workouts</li>
        )}
      </ul>
      <button onClick={handleSaveButton}>Save</button>
    </div>
  );
}

export default AddWorkoutsComponent;

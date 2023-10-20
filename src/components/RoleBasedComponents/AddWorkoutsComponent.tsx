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

  const workoutId = useSelector((state: RootState) => state.data.workoutId.id);

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

  
  //const handleSaveButton = () => {
  //  addWorkoutToPlan(planId, workoutIdsList, daysList)
  //    .then(result => navigate('/rolepage'))
  //    .catch(error => console.error("Error adding workouts to plan:", error));
  //};

  return (
    <div className="container mx-auto p-4">
      <ul>
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout: any) => (
            <li
              key={workout.id}
              className={`mb-6 p-4 rounded-lg shadow-sm cursor-pointer ${workoutIdsList.includes(workout.id) ? 'bg-yellow-300' : 'bg-white'}`}
              onClick={() => toggleWorkout(workout.id)}
            >
              <div className="flex items-center">
                <img src={workout.imageUrl} alt="Workout" className="w-20 h-20 rounded-full mr-4" /> {/* Assuming there's an imageUrl property */}
                <div>
                  <h3 className="text-lg font-bold">{workout.name}</h3>
                  <p>{workout.description}</p>
                  <p className="text-sm text-gray-500">{workout.duration}</p> {/* Assuming there's a duration property */}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No matching workouts</li>
        )}
      </ul>
      <button className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white">Save</button>
    </div>
  );
}

export default AddWorkoutsComponent;

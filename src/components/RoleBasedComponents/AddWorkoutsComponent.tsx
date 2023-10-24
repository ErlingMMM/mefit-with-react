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
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const navigate = useNavigate();
  const planId = useSelector((state: RootState) => state.data.programId.id);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const allDays = [1, 2, 3, 4, 5, 6, 7];

  const duration = parseInt(localStorage.getItem('duration') || '0');
  const weeks = Math.floor(duration / 7);
  const remainingDays = duration % 7;

  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    getAllWorkouts()
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const isWorkoutSelectedForCurrentWeek = (workoutId: any) => {
    const currentWeekDays = Array.from({ length: 7 }, (_, i) => i + 1 + (currentWeek - 1) * 7);
    return workoutIdsList.some((id, index) => id === workoutId && currentWeekDays.includes(daysList[index]));
  };

  const getAvailableDays = () => {
    let weekDays = [1, 2, 3, 4, 5, 6, 7];
    if (currentWeek === weeks + 1) {
      weekDays = Array.from({ length: remainingDays }, (_, i) => i + 1);
    }
    return weekDays
      .filter(day => !daysList.includes(day + (currentWeek - 1) * 7))
      .sort();
  };

  const toggleWorkout = (workoutId: any) => {
    const index = workoutIdsList.indexOf(workoutId);
    if (index === -1) {
      setEditingWorkoutId(workoutId);
    } else {
      const newWorkoutIdsList = [...workoutIdsList];
      const newDaysList = [...daysList];
      newWorkoutIdsList.splice(index, 1);
      newDaysList.splice(index, 1);
      setWorkoutIdsList(newWorkoutIdsList);
      setDaysList(newDaysList);
    }
  };

  const handleDaySelection = (day: number) => {
    setWorkoutIdsList([...workoutIdsList, editingWorkoutId!]);
    setDaysList([...daysList, day + (currentWeek - 1) * 7]);
    setEditingWorkoutId(null);
  };

  const handleSaveButton = () => {
    console.log(workoutIdsList, daysList);
    addWorkoutToPlan(planId, workoutIdsList, daysList)
      .then(result => navigate('/'))
      .catch(error => console.error("Error adding workouts to plan:", error));
  };

  // Check if all days are taken
  const allDaysTaken = getAvailableDays().length === 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Week {currentWeek}</h1>
      <div>
        <button
          disabled={currentWeek === 1}
          onClick={() => setCurrentWeek(currentWeek - 1)}
          className="bg-custom-green text-white rounded px-4 py-2 m-2"
        >
          Previous Week
        </button>
        {currentWeek === weeks + (remainingDays > 0 ? 1 : 0) ? (
          <button
            onClick={handleSaveButton}
            className={`bg-custom-green text-white rounded px-4 py-2 m-2 ${allDaysTaken ? 'hidden' : ''}`}
          >
            Accept
          </button>
        ) : (
          <button
            disabled={currentWeek === weeks + (remainingDays > 0 ? 1 : 0)}
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="bg-custom-green text-white rounded px-4 py-2 m-2"
          >
            Next Week
          </button>
        )}
      </div>

      {editingWorkoutId !== null && !allDaysTaken && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-bold mb-2">Select a day for the workout:</p>
            {getAvailableDays().map(day => (
              <button
                key={day}
                className="bg-custom-green text-white rounded px-4 py-2 m-1"
                onClick={() => handleDaySelection(day)}
              >
                {daysOfWeek[day - 1]}
              </button>
            ))}
          </div>
        </div>
      )}
      <ul>
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout: any) => (
            <li
              key={workout.id}
              className={`mb-6 p-4 rounded-lg shadow-sm cursor-pointer ${isWorkoutSelectedForCurrentWeek(
                workout.id
              ) ? 'bg-custom-green' : 'bg-white'}`}
              onClick={() => toggleWorkout(workout.id)}
            >
              <div className="flex items-center">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{workout.title}</h3>
                  <p>{workout.description}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
      <button onClick={handleSaveButton} className="bg-custom-green text-white rounded px-4 py-2 mt-4">
        Save
      </button>
    </div>
  );
}

export default AddWorkoutsComponent;

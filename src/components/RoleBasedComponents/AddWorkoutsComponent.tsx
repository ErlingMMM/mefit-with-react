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
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
    return workoutIdsList.some((id, index) => id === workoutId && Math.floor(daysList[index] / 7) + 1 === currentWeek);
  };

  const getAvailableDays = () => {
    let weekDays = [0, 1, 2, 3, 4, 5, 6];
    if (currentWeek === weeks + 1) {
      weekDays = Array.from({ length: remainingDays }, (_, i) => i + 1);
    }
    return weekDays
      .filter(day => !daysList.includes(day + (currentWeek - 1) * 7))
      .sort();
  };

  const difficultys = ["beginner", "intermidiate", "advanced"];

  const toggleWorkout = (workoutId: any) => {
    const index = workoutIdsList.findIndex((id, idx) => id === workoutId && Math.floor(daysList[idx] / 7) + 1 === currentWeek);
    console.log(daysList)
    console.log(workoutIdsList)
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
    addWorkoutToPlan(planId, workoutIdsList, daysList)
      .then(result => navigate('/'))
      .catch(error => console.error("Error adding workouts to plan:", error));
  };

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
        
        <button
          disabled={currentWeek === weeks + (remainingDays > 0 ? 1 : 0)}
          onClick={() => setCurrentWeek(currentWeek + 1)}
          className="bg-custom-green text-white rounded px-4 py-2 m-2"
        >
          Next Week
        </button>
        <button
          onClick={handleSaveButton}
          className={`bg-custom-green text-white rounded px-4 py-2 m-2 ${currentWeek === (weeks + 1) ? "" : "hidden"}`}
        >
          Accept
        </button>
      </div>

      {editingWorkoutId !== null && getAvailableDays().length > 0 &&  (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-bold mb-2">Select a day for the workout:</p>
            {getAvailableDays().map(day => (
              <button
                key={day}
                className="bg-custom-green text-white rounded px-4 py-2 m-1"
                onClick={() => handleDaySelection(day)}
              >
                {daysOfWeek[(day) % 7]}
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
                <h1 className="text-black font-bold text-2xl">{workout.name}</h1>
                <h2 className="text-black-600 italic text-xl">Duration: {workout.duration} min  </h2>
                <h2 className="text-black-600 italic text-xl">Difficulty: {difficultys[workout.difficulty]}</h2>


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
    </div>
  );

}

export default AddWorkoutsComponent;

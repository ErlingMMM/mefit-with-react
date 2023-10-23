import React, { useEffect, useState } from 'react';
import { getAllExercises } from '../../endpoints/getAllExercises_endpoint';
import { addExerciseToWorkout } from '../../endpoints/addExerciseToWorkout_endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';

function AddExercisesComponent() {
  const [exercises, setExercises] = useState([]);
  const [exerciseIdsList, setExerciseIdsList] = useState<any[]>([]);
  
  const navigate = useNavigate();

  const workoutId = useSelector((state: RootState) => state.data.workoutId.id);

  useEffect(() => {
    getAllExercises()
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleExercise = (exerciseId: any) => {
    const index = exerciseIdsList.indexOf(exerciseId);
    if (index === -1) {
      setExerciseIdsList([...exerciseIdsList, exerciseId]);
    } else {
      const newExerciseIdsList = [...exerciseIdsList];
      newExerciseIdsList.splice(index, 1);
      setExerciseIdsList(newExerciseIdsList);
    }
  };

  const handleSaveButton2 = () => {
    addExerciseToWorkout(workoutId, exerciseIdsList)
      .then(result => navigate('/rolepage'))
      .catch(error => console.error("Error adding exercises to workout:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <ul>
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise: any) => (
            <li
              key={exercise.id}
              className={`mb-6 p-4 rounded-lg shadow-sm cursor-pointer ${exerciseIdsList.includes(exercise.id) ? 'bg-green-500' : 'bg-white'}`}
              onClick={() => toggleExercise(exercise.id)}
            >
              <div className="flex items-center">
                <img src={exercise.imageUrl} alt="Exercise" className="w-20 h-20 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{exercise.name}</h3>
                  <p>{exercise.description}</p>
                  <p className="text-sm text-gray-500">{exercise.duration}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No matching exercises</li>
        )}
      </ul>
      <button onClick={handleSaveButton2} className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white">Save</button>
    </div>
  );
}

export default AddExercisesComponent;

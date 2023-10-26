import React, { useEffect, useState } from 'react';
import { getAllExercises } from '../../endpoints/getAllExercises_endpoint';
import { addExerciseToWorkout } from '../../endpoints/addExerciseToWorkout_endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../loading/LoadingAnimation';

function AddExercisesComponent() {
  const [exercises, setExercises] = useState([]);
  const [exerciseIdsList, setExerciseIdsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exerciseCount, setExerciseCount] = useState(0);
  const navigate = useNavigate();
  const workoutId = useSelector((state: RootState) => state.data.workoutId.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllExercises();
        setExercises(data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExercise = (exerciseId: any) => {
    const index = exerciseIdsList.indexOf(exerciseId);
    if (index === -1) {
      setExerciseIdsList([...exerciseIdsList, exerciseId]);
      setExerciseCount(exerciseCount + 1);
    } else {
      const newExerciseIdsList = [...exerciseIdsList];
      newExerciseIdsList.splice(index, 1);
      setExerciseIdsList(newExerciseIdsList);
    }
  };

  const handleSaveButton = async () => {
    try {
      await addExerciseToWorkout(workoutId, exerciseIdsList);
      navigate('/');
    } catch (error) {
      setError('Error adding exercises to workout');
      console.error("Error adding exercises to workout:", error);
    }
  };

  if (isLoading) {
    return <LoadingAnimation/>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleSaveButton} className={`mt-4 px-6 py-2 rounded-lg text-custom-green hover:text-custom-green-hover bg-custom-black ${exerciseCount > 0 ? '' : 'hidden'}`}>Save Workout</button>
      <ul>
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise: any) => (
            <li
              key={exercise.id}
              className={`mb-6 p-4 rounded-lg shadow-sm cursor-pointer ${exerciseIdsList.includes(exercise.id) ? 'bg-custom-green' : 'bg-white'}`}
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
      
    </div>
  );
}

export default AddExercisesComponent;

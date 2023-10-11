import { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo } from '../../../Redux/GenericSlice';
import loadingGif from '../../../assets/loading.gif';

function Exercise() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const exercises = useSelector((state: any) => state.data.exerciseData);
  const exerciseLoading = useSelector((state: any) => state.loading);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getExcersiceInfo());
        // Simulate a minimum loading time of a second
        setTimeout(() => {
          setIsLoading(false); // Data is loaded, set isLoading to false
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const filteredExercises = Array.isArray(exercises)
    ? exercises.filter((exercise: any) => {
        const query = searchQuery.toLowerCase();
        const exerciseName = exercise.name.toLowerCase();
        return exerciseName.includes(query);
      })
    : [];

  return (
    <div>
      <div>
        <br />
        <h1>Exercises:</h1>
        <input
          type="text"
          placeholder="search exercises"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading ? (
          <div>
            <img src={loadingGif} alt="Loading..." />
            <p>Loading exercises...</p>
          </div>
        ) : (
          <ul>
            {Array.isArray(filteredExercises) && filteredExercises.length > 0 ? (
              filteredExercises.map((exercise: any) => (
                <li key={exercise.id}>
<button onClick={() => openModal(exercise)} className="flex items-start">
  <img
    src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-745x490.jpg"
    alt={exercise.name}
    className="max-w-full h-auto w-1/3 sm:w-1/3 md:w-1/4 md:h-auto mx-auto"
  />
  <div className="pl-2">
    <p>Level: {exercise.difficulty}</p>
    <p>{exercise.name}</p>
    <p>{exercise.muscleGroup}</p>
  </div>
</button>


                </li>
              ))
            ) : (
              <div>
                <li>No matching exercises</li>
              </div>
            )}
          </ul>
        )}
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        exercise={selectedExercise}
      />
    </div>
  );
}

export default Exercise;

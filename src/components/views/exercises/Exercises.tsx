import { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo } from '../../../Redux/GenericSlice';



function Exercise() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const exercises = useSelector((state: any) => state.data.exerciseData);
  const exerciseLoading = useSelector((state: any) => state.loading);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getExcersiceInfo());
  }, [dispatch]);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  // Check if exercises is an array before filtering
  const filteredExercises = Array.isArray(exercises)
    ? exercises.filter((exercise: any) => {
        // Perform case-insensitive search by converting both the query and exercise name to lowercase
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
          placeholder="Search by exercise name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {exerciseLoading && <h1>Loading exercises...</h1>}
        <ul>
          {Array.isArray(filteredExercises) && filteredExercises.length > 0 ? (
            filteredExercises.map((exercise: any) => (
              <li key={exercise.id}>
                <button onClick={() => openModal(exercise)}>
                  {exercise.name} - {exercise.description} - {exercise.muscleGroup}
                </button>
              </li>
            ))
          ) : (
            <div>
              <li>No matching exercises</li>
            </div>
          )}
        </ul>
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







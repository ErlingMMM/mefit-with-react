import { useState, useEffect } from 'react';
import ExerciseModal from '../components/modals/ExerciseModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../Redux/Store';
import { getExcersiceInfo } from "../Redux/GenericSlice";

function Exercise() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const exercises = useSelector((state: any) => state.data.exerciseData);
  const exerciseLoading = useSelector((state: any) => state.loading);
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getExcersiceInfo());
  }, [dispatch]);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise); 
    setIsModalOpen(true);
  };

  return (
    <div>
      <div>
        <br />
        <h1>Exercises:</h1>
        {exerciseLoading && <h1>Loading exercises...</h1>}
        <ul>
          {Array.isArray(exercises) ? (
            exercises.map((exercise: any) => (
              <li key={exercise.id}>
                <button onClick={() => openModal(exercise)}>
                  {exercise.name} - {exercise.description} - {exercise.muscleGroup}
                </button>
              </li>
            ))
          ) : (
            <div>
   <li>No exercises available</li>
            <button onClick={() => openModal("hei")}>hei</button>
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

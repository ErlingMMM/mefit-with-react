import { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../../Redux/Store';
import { getExcersiceInfo } from '../../../Redux/GenericSlice';
import loadingGif from '../../../assets/loading.gif';
import '../../../styles/Explorer.css'

//TODO Check if CSS should be in Explorer.css or in Exercise.css



function Exercises({ searchQuery }: { searchQuery: string }) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const exercises = useSelector((state: any) => state.data.exerciseData);
  //const exerciseLoading = useSelector((state: any) => state.loading);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getExcersiceInfo());
          // Simulate a minimum loading time of a second
          setTimeout(() => {
            setIsLoading(false); 
          }, 500);
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


  // Define dummy exercise images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80',
  ];

  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };


  return (
    <div>
      <div>
        {isLoading ? (
          <div>
            <img src={loadingGif} alt="Loading..." />
          </div>
        ) : (
          <ul>
            {Array.isArray(filteredExercises) && filteredExercises.length > 0 ? (
              filteredExercises.map((exercise: any) => (
                <li key={exercise.id} className="mb-6">
                  <button onClick={() => openModal(exercise)} className="flex items-start">
                    <img
                      src={getRandomDummyImageUrl()}
                      alt={exercise.name}
                      className="custom-image-style"
                    />
                    <div>
                      <h3 className='text-lg font-bold' style={{ marginLeft: '-20px' }}>{exercise.name}</h3>
                      <p style={{ marginLeft: '-45px' }}>Level: {exercise.difficulty} </p>
                      <br />
                      <p style={{ marginLeft: '10px' }}>{exercise.muscleGroup}</p>
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

export default Exercises;

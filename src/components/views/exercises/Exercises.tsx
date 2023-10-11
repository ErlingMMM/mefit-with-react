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


  // Define dummy exercise images URLs
  const dummyImageUrls = [
    'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-745x490.jpg',
    'https://info.totalwellnesshealth.com/hs-fs/hubfs/HealthBenefitsFitness.png?width=675&name=HealthBenefitsFitness.png',
    'https://i0.wp.com/beautyleebar.com/wp-content/uploads/2023/05/istockphoto-1344876535-612x612-1.jpg?fit=437%2C612&ssl=1',
    // Add more dummy image URLs as needed
  ];

    // Helper function to get a random dummy image URL
    const getRandomDummyImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
      return dummyImageUrls[randomIndex];
    };


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
src={getRandomDummyImageUrl()}
    alt={exercise.name}
    style={{ maxWidth: '30%', height: 'auto' }}
  />
  <div style={{ marginLeft: '10px' }}>
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

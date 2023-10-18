import React, { useState, useEffect } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';

function WorkoutsInProgram() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedProgramId = useSelector((state: any) => state.selectedProgramId);
  const [workouts, setWorkouts] = useState([]);

  

  const openModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (selectedProgramId) {
        try {
          const response = await fetch(
            `https://mefit-backend.azurewebsites.net/api/Plan/GetWorkouts/${parseInt(
              selectedProgramId
            )}`
          );

          if (response.ok) {
            const data = await response.json();
            setWorkouts(data); 
          } else {
            console.error('Error fetching data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchWorkouts();
  }, [selectedProgramId]);

 

  // Define dummy images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80',
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3274&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3387&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3270&q=80',
  ];

  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  return (
    <div>
      <div>
        <ul>
          {Array.isArray(workouts) && workouts.length > 0 ? (
           workouts.map((workout: any) => (
              <li key={workout.id} className="mb-6">
                <button onClick={() => openModal(workout)} className="flex items-start">
                  <img src={getRandomDummyImageUrl()} alt={workout.name} className="custom-image-style" />
                  <div>
                    <h3 className="text-lg font-bold" style={{ marginLeft: '-20px' }}>
                      {workout.name}
                    </h3>
                    <p style={{ marginLeft: '-45px' }}>Level: {workout.recommendedFitness} </p>
                    <br />
                    <p style={{ marginLeft: '10px' }}>Duration {workout.duration}</p>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <div>
              <li>No matching workouts</li>
            </div>
          )}
        </ul>
      </div>
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedWorkout} />
    </div>
  );
}



export default WorkoutsInProgram;
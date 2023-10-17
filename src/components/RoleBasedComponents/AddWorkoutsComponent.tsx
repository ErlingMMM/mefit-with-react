    import { useEffect, useState } from 'react';
    import ExerciseModal from '../modals/ExerciseModal';

import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
 

    function AddWorkoutsCompoent() {
        const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://mefit-backend.azurewebsites.net/api/Workouts') // Replace with your API URL
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
      
        const openModal = (workout: any) => {
          setSelectedWorkout(workout);
          setIsModalOpen(true);
        }


    return (
        <div>
          <div>
            <ul>
              {Array.isArray(workouts) && workouts.length > 0 ? (
                workouts.map((workout: any) => (
                  <li key={workout.id} className="mb-6">
                    <button onClick={() => openModal(workout)} className="flex items-start">
                 
                      <div>
                        <h3 className="text-lg font-bold" style={{ marginLeft: '-20px' }}>
                          {workout.name}
                        </h3>
                        <p style={{ marginLeft: '-45px' }}>{workout.description}</p>
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
          <ExerciseModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            exercise={selectedWorkout}
          />
        </div>
      );
    }
    
    export default AddWorkoutsCompoent;

function dispatch(arg0: AsyncThunkAction<any, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
    throw new Error('Function not implemented.');
}

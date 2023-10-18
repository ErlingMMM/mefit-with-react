import { useEffect, useState } from 'react';
import ExerciseModal from '../modals/ExerciseModal';
import { getAllWorkouts } from '../../endpoints/getAllWorkouts_endpoint';
import { addWorkoutToPlan } from '../../endpoints/addWorkoutToPlan_endpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
function AddWorkoutsComponent() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const planId = useSelector((state: RootState) => state.data.programId.id);

    useEffect(() => {
      getAllWorkouts()
          .then(data => {
              console.log("Received workouts: ", data);  // Log the data
              setWorkouts(data);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []);
  

    const openModal = (workout : any) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    const handleAddButton = (workoutId: any) => {
      console.log("THIS: " , typeof(workoutId))
      addWorkoutToPlan(planId, workoutId, 1)  // Call the function with the plan and workout IDs
        .then(result => {
          console.log("Successfully added workout to plan:", result);
        })
        .catch(error => {
          console.error("Error adding workout to plan:", error);
        });
    };

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
                    <button onClick={() => handleAddButton(workout.id)} className="flex items-start">Add Workout to Plan</button>
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
    
    export default AddWorkoutsComponent;

///function dispatch(arg0: AsyncThunkAction<any, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
//    throw new Error('Function not implemented.');
//}

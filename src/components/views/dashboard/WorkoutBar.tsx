import { useState } from 'react';
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronUpIcon, ChevronDownIcon, ClockIcon, CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { useAppDispatch } from '../../../Redux/Hooks';
import { completeWorkoutAction } from '../../../Redux/DashboardSlice';
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import { setDisplayedWorkout } from '../../../Redux/DashboardSlice';

interface ExerciseData {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  imageUrl?: string;
  time: number;
  difficulty: number;
  sets: number;
  reps: number;
}

type WorkoutBarProps = {
  workoutData: {
    id: number;
    name: string;
    description?: string;
    recommendedFitness: number;
    image?: string;
    duration: number;
    day: number;
    isCompleted: boolean;
    exercises: ExerciseData[]; 
    };
};

const dayDictionary: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

function WorkoutBar({workoutData, updateWorkout} : WorkoutBarProps & { updateWorkout : React.Dispatch<React.SetStateAction<boolean>> }) { 

  const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateCompletionStatus = async (workoutId:number) => {
    try {
      await dispatch(completeWorkoutAction(workoutId)).unwrap(); // unwrap() will throw an error if the promise is rejected
      updateWorkout(prev => !prev); // updateWorkout is the same function as setWorkoutUpdated passed down from the parent. This will automatically toggle the value of workoutUpdated
  } catch (error) {
      console.error("Failed to complete workout:", error);
      // Handle error appropriately, perhaps show an error message to the user
  }
  }

  const weekday : string = dayDictionary[workoutData.day%7]; 
  //Keep in mind for this to make sense, the start date for the program has to be a monday

  // To navigate to workout displayer when button is clicked
  const handleClick = () => {    
    dispatch(setDisplayedWorkout(workoutData))
    dispatch(setActiveComponent('exercisesInDashboard'));   
  };

  return (
    <div>

      <div className = {styles.workoutBarWrapper}>
        <div>
          <h1 className={styles.day_h1}><b>{weekday}</b>: {workoutData.name}</h1>
          <div className={styles.durationWrapper}>
            <ClockIcon className="h-5 w-5 text-[#A8E52E]"/>
            <span>{workoutData.duration} min</span>
          </div>
        </div>

        <div className={styles.buttonsGroup}>
          <button onClick={() => updateCompletionStatus(workoutData.id)}>{workoutData.isCompleted ? <CheckCircleIcon className="h-7 w-7 text-[#A8E52E]" /> : <PlusCircleIcon className="h-7 w-7 text-[#000000]" />}</button>
          <button onClick={toggleDetails}>{showDetails ? <ChevronUpIcon className="h-7 w-7 text-[#A8E52E]" /> : <ChevronDownIcon className="h-7 w-7 text-[#A8E52E]" />}</button>
        </div>

      </div>
      
      {showDetails && (
        <div className={styles.showDetailsWrapper}>
          <b className={styles.infoRow}><span>Excercise</span><span>Sets</span><span>Reps</span></b>
          {workoutData.exercises.map((exercise) => (
            <p key={exercise.id} className={styles.infoRow}>
              <span>{exercise.name}</span>
              <span>{exercise.sets}</span>
              <span>{exercise.reps}</span>
            </p>
          ))}
          <button onClick={() => handleClick()} className={styles.seeDetailedWorkout}><b>See Workout</b></button>
        </div>
      )}

      

    </div>
  );
}

export default WorkoutBar;